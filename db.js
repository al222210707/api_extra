const mysql = require('mysql');

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: 'srv1247.hstgr.io',
    user: 'u630845697_luz',
    password: '@Ye738292o9rjfs',
    database: 'u630845697_smartpower'
  });

  db.connect(function(err) {
    if (err) {
      console.error('Error en la conexión a la base de datos:', err);
      setTimeout(handleDisconnect, 2000); // Intentar la reconexión después de 2 segundos
    } else {
      console.log('MySQL connected');
    }
  });

  db.on('error', function(err) {
    console.error('Error de base de datos:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Reconectar si la conexión se perdió
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = db;
