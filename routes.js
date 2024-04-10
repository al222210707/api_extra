const express = require('express');
const router = express.Router();
const db = require('./db');

// Manejo de errores para consultas a la base de datos
db.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
  // Aquí puedes manejar el error de la conexión de base de datos
});

// Obtener todos los usuarios
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios: ' + err.message });
      return;
    }
    res.json({ users: rows });
  });
});

// Obtener todas las mediciones de consumo de energía
router.get('/mediciones', (req, res) => {
  db.query('SELECT * FROM consumptiondata', (err, rows) => {
    if (err) {
      console.error('Error al obtener mediciones de consumo:', err);
      res.status(500).json({ error: 'Error al obtener mediciones de consumo: ' + err.message });
      return;
    }
    res.json({ consumptionData: rows });
  });
});

// Obtener un usuario por su ID
router.get('/users/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Users WHERE id_user = ?', id, (err, rows) => {
    if (err) {
      console.error('Error al obtener usuario por ID:', err);
      res.status(500).json({ error: 'Error al obtener usuario por ID: ' + err.message });
      return;
    }
    if (rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }
    res.json({ user: rows[0] });
  });
});

// Crear un nuevo usuario
router.post('/users', (req, res) => {
  const { nombre, app, apm, email, password, telefono, fn } = req.body;
  db.query(
    'INSERT INTO Users (nombre, app, apm, email, password, telefono, fn) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, app, apm, email, password, telefono, fn],
    (err, result) => {
      if (err) {
        console.error('Error al crear un nuevo usuario:', err);
        res.status(500).json({ error: 'Error al crear un nuevo usuario: ' + err.message });
        return;
      }
      res.json({ message: 'Usuario creado exitosamente', id: result.insertId });
    }
  );
});

// Actualizar un usuario
router.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, app, apm, email, password, telefono, fn } = req.body;
  db.query(
    'UPDATE Users SET nombre=?, app=?, apm=?, email=?, password=?, telefono=?, fn=? WHERE id_user=?',
    [nombre, app, apm, email, password, telefono, fn, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar un usuario:', err);
        res.status(500).json({ error: 'Error al actualizar un usuario: ' + err.message });
        return;
      }
      res.json({ message: 'Usuario actualizado exitosamente' });
    }
  );
});

// Eliminar un usuario
router.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Users WHERE id_user = ?', id, (err, result) => {
    if (err) {
      console.error('Error al eliminar un usuario:', err);
      res.status(500).json({ error: 'Error al eliminar un usuario: ' + err.message });
      return;
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
  });
});

// Obtener todas las mediciones de consumo de un usuario por su ID
router.get('/users/:id/mediciones', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM consumptiondata WHERE id_user = ?', id, (err, rows) => {
    if (err) {
      console.error('Error al obtener mediciones de consumo de un usuario:', err);
      res.status(500).json({ error: 'Error al obtener mediciones de consumo de un usuario: ' + err.message });
      return;
    }
    res.json({ mediciones: rows });
  });
});

// Crear una nueva medición de consumo para un usuario
router.post('/users/:id/mediciones', (req, res) => {
  const id = req.params.id;
  const { potencia, corriente } = req.body;
  db.query(
    'INSERT INTO consumptiondata (id_user, potencia, corriente) VALUES (?, ?, ?)',
    [id, potencia, corriente],
    (err, result) => {
      if (err) {
        console.error('Error al crear una nueva medición de consumo:', err);
        res.status(500).json({ error: 'Error al crear una nueva medición de consumo: ' + err.message });
        return;
      }
      res.json({ message: 'Medición de consumo creada exitosamente', id: result.insertId });
    }
  );
});

// Actualizar una medición de consumo para un usuario
router.put('/users/:userId/mediciones/:medicionId', (req, res) => {
  const userId = req.params.userId;
  const medicionId = req.params.medicionId;
  const { potencia, corriente } = req.body;
  db.query(
    'UPDATE consumptiondata SET potencia=?, corriente=? WHERE id_consumption=? AND id_user=?',
    [potencia, corriente, medicionId, userId],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar una medición de consumo:', err);
        res.status(500).json({ error: 'Error al actualizar una medición de consumo: ' + err.message });
        return;
      }
      res.json({ message: 'Medición de consumo actualizada exitosamente' });
    }
  );
});

// Eliminar una medición de consumo para un usuario
router.delete('/users/:userId/mediciones/:medicionId', (req, res) => {
  const userId = req.params.userId;
  const medicionId = req.params.medicionId;
  db.query(
    'DELETE FROM consumptiondata WHERE id_consumption=? AND id_user=?',
    [medicionId, userId],
    (err, result) => {
      if (err) {
        console.error('Error al eliminar una medición de consumo:', err);
        res.status(500).json({ error: 'Error al eliminar una medición de consumo: ' + err.message });
        return;
      }
      res.json({ message: 'Medición de consumo eliminada exitosamente' });
    }
  );
});

// Ruta para agregar una nueva medición (actualizada para coincidir con la ruta del ESP32)
router.post('/api/mediciones', (req, res) => {
  const { potencia, corriente } = req.body;
  
  // Insertar la nueva medición en la tabla consumptiondata
  const query = 'INSERT INTO consumptiondata (potencia, corriente, created_at) VALUES (?, ?, CURRENT_TIMESTAMP())';
  db.query(query, [potencia, corriente], (error) => {
    if (error) {
      console.error('Error al agregar medición:', error);
      res.status(500).json({ error: 'Error al agregar medición: ' + error.message });
    } else {
      res.status(201).json({ message: 'Medición agregada correctamente' });
    }
  });
});

module.exports = router;
