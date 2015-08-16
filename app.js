var express = require('express');
var app = express();
var hbs = require('hbs');
var result = require('./writeAllScores.js');
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'studentscore',
});
var conn;
app.get('*', function(req, res, next) {
  pool.getConnection(function(err, connection) {
    conn = connection;
    next();
  });
});

app.get('/', function(req, res, next) {
  conn.query({
    sql: ' select scores.scores_id,student.student_id,student.student_name,course.course_name,scores.scores from student,scores,course  where student.student_id = scores.student_id and course.course_id = scores.course_id',
    timeout: 40000, // 40s
  }, function(error, results, fields) {
    if (error) throw error;
    var array = result(results);
    res.render('hello', {
      student: array
    });
    conn.release();
  });
});

app.get("/sort", function(req, res) {
  conn.query({
    sql: ' select scores.scores_id,student.student_id,student.student_name,course.course_name,scores.scores from student,scores,course  where student.student_id = scores.student_id and course.course_id = scores.course_id',
    timeout: 40000, // 40s
  }, function(error, results) {
    var array = result(results);
    var sortKey = req.query.sortKey;
    var asc = req.query.asc;
    array.sort(function(a, b) {
      return (parseInt(a[sortKey]) - parseInt(b[sortKey])) * asc;
    });
    res.send(array);
   conn.release();
  });
});

app.delete('/delete', function(req, res) {
  var sortkey=req.query.sortKey;
  var sortKey=parseInt(sortkey);
  var deleteSQL = 'delete from scores where student_id =' + sortKey;
  conn.query({
    sql: deleteSQL
  }, function(error, results) {
    if (error) throw error;
    res.send("true");
    // conn.release();
  });
});

// app.get("/detele", function(req, res) {
//   var sortKey = req.query.sortKey;
//   var deleteSQL = 'delete from scores where student_id =' + sortKey;
//   var getSQL = ' select scores.scores_id,student.student_id,student.student_name,course.course_name,scores.scores from student,scores,course  where student.student_id = scores.student_id and course.course_id = scores.course_id';
//   connection.query({
//     sql: deleteSQL
//   }, function(error, results) {
//     // var newarray = result(results);
//     console.log(newarray);
//     console.log(sortKey);
//     if (error) throw error;
//
//     res.send(1);
//   });
// });
//
var server = app.listen(5000, function() {
  console.log("app listen ");
});
