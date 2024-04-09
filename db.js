const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'srv1247.hstgr.io',
  user: 'u630845697_luz',
  password: '@Ye738292o9rjfs',
  database: 'u630845697_smartpower'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('MySQL connected');
});

// Add error event listener
db.on('error', (err) => {
  console.error('MySQL error:', err);
});

module.exports = db;
