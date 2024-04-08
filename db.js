const mysql = require('mysql');

const db = mysql.createConnection({
  host: '162.241.62.191',
  user: 'cuervoso_smar',
  password: 'Y94h6251*',
  database: 'cuervoso_luz'
});

db.connect((err) => {
  if (err) {
  }
  console.log('MySQL connected');
});

module.exports = db;
