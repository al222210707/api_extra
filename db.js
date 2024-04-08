const mysql = require('mysql');

const db = mysql.createConnection({
  host: '162.241.62.191',
  user: 'cuervoso_smart',
  password: 'gQz3fa47ebHgGt7',
  database: 'cuervoso_luz'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

module.exports = db;
