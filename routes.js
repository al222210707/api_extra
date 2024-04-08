const express = require('express');
const db = require('./db');

const router = express.Router();
router.use(express.json()); // Middleware para analizar solicitudes JSON

// Ruta para obtener todos los usuarios
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error al obtener todos los usuarios:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ users: rows });
  });
});

// Ruta para obtener todos las mediciones de consumo
router.get('/mediciones', (req, res) => {
  db.query('SELECT * FROM consumptiondata', (err, rows) => {
    if (err) {
      console.error('Error al obtener todas las mediciones de consumo:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ mediciones: rows });
  });
});

// Ruta para obtener todas las mediciones de consumo de un usuario por su ID
router.get('/users/:id/mediciones', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM consumptiondata WHERE id_user = ?', id, (err, rows) => {
    if (err) {
      console.error('Error al obtener mediciones de consumo:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({ mediciones: rows });
  });
});

