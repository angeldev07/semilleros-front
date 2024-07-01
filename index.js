require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const unzipper = require('unzipper');

const app = express();


console.log('Database configuration:');
console.log({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(uploadsDir));

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/semilleros-front')));

// Serve the Angular app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/semilleros-front/index.html'));
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100 MB file size limit
});

// Endpoint to get all semilleros
app.get('/api/semilleros', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM semilleros');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching semilleros:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint to create a new semillero
app.post('/api/semilleros', upload.single('imagen'), async (req, res) => {
  const { nombre, descripcion, director, logo_url } = req.body;
  const imagen_url = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const result = await pool.query(
      'INSERT INTO semilleros (nombre, descripcion, director, imagen_url, logo_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, descripcion, director, imagen_url, logo_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error creating semillero:', err);
    res.status(500).send('Server error');
  }
});

app.put('/api/semilleros/:id', upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, director, imagen_url, logo_url } = req.body;
  const newImagenUrl = req.file ? `/uploads/${req.file.filename}` : imagen_url;
  try {
    const result = await pool.query(
      'UPDATE semilleros SET nombre = $1, descripcion = $2, director = $3, imagen_url = $4, logo_url = $5 WHERE id = $6 RETURNING *',
      [nombre, descripcion, director, newImagenUrl, logo_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Semillero not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating semillero:', err);
    res.status(500).send('Server error');
  }
});

app.delete('/api/semilleros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM semilleros WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Semillero not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error deleting semillero:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint to get all proyectos
app.get('/api/proyectos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proyectos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching proyectos:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint to create a new proyecto
app.post('/api/proyectos', upload.single('archivo'), async (req, res) => {
  const { semillero_id, nombre, descripcion, fecha_inicio, fecha_fin, calificacion } = req.body;
  const archivo_url = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate and adjust date values
  const validFechaInicio = fecha_inicio ? fecha_inicio : null;
  const validFechaFin = fecha_fin ? fecha_fin : null;

  if (archivo_url && path.extname(archivo_url) === '.zip') {
    // Extract files from the .zip if necessary
    const zipPath = path.join(__dirname, archivo_url);
    fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: uploadsDir }))
      .on('close', async () => {
        try {
          const result = await pool.query(
            'INSERT INTO proyectos (semillero_id, nombre, descripcion, archivo_url, fecha_inicio, fecha_fin, calificacion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [semillero_id, nombre, descripcion, archivo_url, validFechaInicio, validFechaFin, calificacion]
          );
          res.json(result.rows[0]);
        } catch (err) {
          console.error('Error creating proyecto:', err);
          res.status(500).send('Server error');
        }
      });
  } else {
    try {
      const result = await pool.query(
        'INSERT INTO proyectos (semillero_id, nombre, descripcion, archivo_url, fecha_inicio, fecha_fin, calificacion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [semillero_id, nombre, descripcion, archivo_url, validFechaInicio, validFechaFin, calificacion]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error creating proyecto:', err);
      res.status(500).send('Server error');
    }
  }
});

// Endpoint to update a proyecto
app.put('/api/proyectos/:id', upload.single('archivo'), async (req, res) => {
  const { id } = req.params;
  const { semillero_id, nombre, descripcion, archivo_url, fecha_inicio, fecha_fin, calificacion } = req.body;
  const newArchivoUrl = req.file ? `/uploads/${req.file.filename}` : archivo_url;

  // Validate and adjust date values
  const validFechaInicio = fecha_inicio ? fecha_inicio : null;
  const validFechaFin = fecha_fin ? fecha_fin : null;

  if (newArchivoUrl && path.extname(newArchivoUrl) === '.zip') {
    // Extract files from the .zip if necessary
    const zipPath = path.join(__dirname, newArchivoUrl);
    fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: uploadsDir }))
      .on('close', async () => {
        try {
          const result = await pool.query(
            'UPDATE proyectos SET semillero_id = $1, nombre = $2, descripcion = $3, archivo_url = $4, fecha_inicio = $5, fecha_fin = $6, calificacion = $7 WHERE id = $8 RETURNING *',
            [semillero_id, nombre, descripcion, newArchivoUrl, validFechaInicio, validFechaFin, calificacion, id]
          );
          if (result.rows.length === 0) {
            return res.status(404).send('Proyecto not found');
          }
          res.json(result.rows[0]);
        } catch (err) {
          console.error('Error updating proyecto:', err);
          res.status(500).send('Server error');
        }
      });
  } else {
    try {
      const result = await pool.query(
        'UPDATE proyectos SET semillero_id = $1, nombre = $2, descripcion = $3, archivo_url = $4, fecha_inicio = $5, fecha_fin = $6, calificacion = $7 WHERE id = $8 RETURNING *',
        [semillero_id, nombre, descripcion, newArchivoUrl, validFechaInicio, validFechaFin, calificacion, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).send('Proyecto not found');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating proyecto:', err);
      res.status(500).send('Server error');
    }
  }
});

app.delete('/api/proyectos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM proyectos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Proyecto not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error deleting proyecto:', err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
