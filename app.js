const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PORT = 3306; // Puerto de MySQL

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://:${PORT}`);
});

// Código de conexión a la base de datos MySQL
const mysql = require('mysql');

const db = mysql.createConnection({
  host: '193.203.166.112', // Reemplaza con tu dirección de host
  user: 'u630845697_luz', // Reemplaza con tu usuario de base de datos
  password: '@RamirezLzga41', // Reemplaza con tu contraseña de base de datos
  database: 'u630845697_smartpower', // Reemplaza con el nombre de tu base de datos
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err.message);
    return;
  }
  console.log('MySQL conectado en el puerto', DB_PORT);
});

module.exports = db;
