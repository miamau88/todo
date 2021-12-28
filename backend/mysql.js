
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root'
});

connection.connect();

// connection.query('SELECT * from study.todos' , function(err, rows, fields) {
const userId=1
const id=1
// sql injection
connection.query(`delete from study.todos where userId=? and id=?`, [userId, id] , function(err, rows, fields) {
  if (err) throw err;
  console.log(rows);
});

connection.end();
