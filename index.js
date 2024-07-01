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
const port = process.env.PORT || 3000;

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

// Crear el directorio uploads si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(uploadsDir));

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
  limits: { fileSize: 100 * 1024 * 1024 } // Limite de tamaño de archivo de 100 MB
});

// Función para validar y convertir los campos antes de insertarlos en la base de datos
const validateAndConvertFields = (fields) => {
  return {
    semillero_id: fields.semillero_id ? parseInt(fields.semillero_id, 10) : null,
    nombre: fields.nombre || null,
    descripcion: fields.descripcion || null,
    archivo_url: fields.archivo_url || null,
    fecha_inicio: fields.fecha_inicio || null,
    fecha_fin: fields.fecha_fin || null,
    calificacion: fields.calificacion ? parseInt(fields.calificacion, 10) : null,
  };
};

// Endpoint para obtener todos los semilleros
app.get('/api/semilleros', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM semilleros');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener semilleros:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint para crear un nuevo semillero
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
    console.error('Error al crear semillero:', err);
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
      return res.status(404).send('Semillero no encontrado');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar semillero:', err);
    res.status(500).send('Server error');
  }
});

app.delete('/api/semilleros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM semilleros WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Semillero no encontrado');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al eliminar semillero:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint para obtener todos los proyectos
app.get('/api/proyectos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proyectos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener proyectos:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint para crear un nuevo proyecto
app.post('/api/proyectos', upload.single('archivo'), async (req, res) => {
  const fields = validateAndConvertFields(req.body);
  const archivo_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      'INSERT INTO proyectos (semillero_id, nombre, descripcion, archivo_url, fecha_inicio, fecha_fin, calificacion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [fields.semillero_id, fields.nombre, fields.descripcion, archivo_url, fields.fecha_inicio, fields.fecha_fin, fields.calificacion]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear proyecto:', err);
    res.status(500).send('Server error');
  }
});

// Endpoint para actualizar un proyecto
app.put('/api/proyectos/:id', upload.single('archivo'), async (req, res) => {
  const { id } = req.params;
  const fields = validateAndConvertFields(req.body);
  const newArchivoUrl = req.file ? `/uploads/${req.file.filename}` : fields.archivo_url;

  try {
    const result = await pool.query(
      'UPDATE proyectos SET semillero_id = $1, nombre = $2, descripcion = $3, archivo_url = $4, fecha_inicio = $5, fecha_fin = $6, calificacion = $7 WHERE id = $8 RETURNING *',
      [fields.semillero_id, fields.nombre, fields.descripcion, newArchivoUrl, fields.fecha_inicio, fields.fecha_fin, fields.calificacion, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Proyecto no encontrado');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar proyecto:', err);
    res.status(500).send('Server error');
  }
});

app.delete('/api/proyectos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM proyectos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Proyecto no encontrado');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al eliminar proyecto:', err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
