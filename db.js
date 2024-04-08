const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'alex',
  password: 'admin12214945',
  database: 'luz'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

module.exports = db;
