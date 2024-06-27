const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'semilleros',
  password: 'ufps2024',
  
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// Endpoint para obtener todos los semilleros
app.get('/api/semilleros', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM semilleros');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Endpoint para crear un nuevo semillero
app.post('/api/semilleros', async (req, res) => {
  const { nombre, descripcion, imagen_url, logo_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO semilleros (nombre, descripcion, imagen_url, logo_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, imagen_url, logo_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.put('/api/semilleros/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagen_url, logo_url } = req.body;
    try {
      const result = await pool.query(
        'UPDATE semilleros SET nombre = $1, descripcion = $2, imagen_url = $3, logo_url = $4 WHERE id = $5 RETURNING *',
        [nombre, descripcion, imagen_url, logo_url, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).send('Semillero no encontrado');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
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
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  app.put('/api/semilleros/:semilleroId/proyectos/:id', async (req, res) => {
    const { semilleroId, id } = req.params;
    const { nombre, descripcion, archivo_url, fecha_inicio, fecha_fin, calificacion } = req.body;
    try {
      const result = await pool.query(
        'UPDATE proyectos SET nombre = $1, descripcion = $2, archivo_url = $3, fecha_inicio = $4, fecha_fin = $5, calificacion = $6 WHERE id = $7 AND semillero_id = $8 RETURNING *',
        [nombre, descripcion, archivo_url, fecha_inicio, fecha_fin, calificacion, id, semilleroId]
      );
      if (result.rows.length === 0) {
        return res.status(404).send('Proyecto no encontrado');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  app.delete('/api/semilleros/:semilleroId/proyectos/:id', async (req, res) => {
    const { semilleroId, id } = req.params;
    try {
      const result = await pool.query('DELETE FROM proyectos WHERE id = $1 AND semillero_id = $2 RETURNING *', [id, semilleroId]);
      if (result.rows.length === 0) {
        return res.status(404).send('Proyecto no encontrado');
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });

  
// Endpoint para obtener todos los proyectos de un semillero
app.get('/api/semilleros/:semilleroId/proyectos', async (req, res) => {
  const { semilleroId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM proyectos WHERE semillero_id = $1', [semilleroId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Endpoint para crear un nuevo proyecto en un semillero
app.post('/api/semilleros/:semilleroId/proyectos', async (req, res) => {
  const { semilleroId } = req.params;
  const { nombre, descripcion, archivo_url, fecha_inicio, fecha_fin, calificacion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO proyectos (semillero_id, nombre, descripcion, archivo_url, fecha_inicio, fecha_fin, calificacion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [semilleroId, nombre, descripcion, archivo_url, fecha_inicio, fecha_fin, calificacion]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Endpoint para obtener comentarios de un proyecto
app.get('/api/proyectos/:proyectoId/comentarios', async (req, res) => {
  const { proyectoId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM comentarios WHERE proyecto_id = $1', [proyectoId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Endpoint para crear un nuevo comentario en un proyecto
app.post('/api/proyectos/:proyectoId/comentarios', async (req, res) => {
  const { proyectoId } = req.params;
  const { usuario_id, comentario } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO comentarios (proyecto_id, usuario_id, comentario) VALUES ($1, $2, $3) RETURNING *',
      [proyectoId, usuario_id, comentario]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
