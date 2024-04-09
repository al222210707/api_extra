const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'srv1247.hstgr.io',
  user: 'u630845697_luz',
  password: '@Ye738292o9rjfs',
  database: 'u630845697_smartpower'
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

module.exports = db;

