const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'srv1247.hstgr.io',
  user: 'u630845697_luz',
  password: '@Ye738292o9rjfs',
  database: 'u630845697_smartpower'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    // Aquí puedes manejar el error de conexión, lanzar una excepción o emitir un evento de error
  } else {
    console.log('MySQL connected');
  }
});

// Manejo de errores para consultas
db.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
  // Aquí puedes manejar el error de la conexión de base de datos
});

module.exports = db;
