const mysql = require('mysql');

const db = mysql.createConnection({
  host: '154.56.47.52',
  user: 'u196388150_SPDD',
  password: 'JPFf34K$WA^v4%',
  database: 'u196388150_SPDD'
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
