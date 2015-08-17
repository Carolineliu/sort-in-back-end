var express = require('express');
var app = express();
var hbs = require('hbs');
var bodyParser = require('body-parser');
var result = require('./writeAllScores.js');
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.use(bodyParser.urlencoded({
  extended: false
}));
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
app.all('*', function(req, res, next) {
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
  var sortkey = req.query.sortKey;
  var sortKey = parseInt(sortkey);
  var deleteSQL = 'delete from scores where student_id =' + sortKey;
  conn.query({
    sql: deleteSQL
  }, function(error, results) {
    if (error) throw error;
    res.send("true");
    // conn.release();
  });
});

app.post('/post', function(req, res) {
  // var id = parseInt(req.body.student_id);
  var name = req.body.student_name;
  var chinese = parseInt(req.body.chinese);
  var math = parseInt(req.body.math);
  var insertStudent = 'insert into student(student_name) values(\'' + name + '\');';
  conn.query(insertStudent, function(error, results) {
    if (error) throw error;
    var id = results.insertId;
    var insertScores1 = 'insert into scores(student_id,course_id,scores) values(' + '\'' +
      id + '\'' + ',' + 1 + ',' + chinese + ')';
    conn.query(insertScores1, function(error, results) {
      if (error) throw error;
      var insertScores2 = 'insert into scores(student_id,course_id,scores) values(' + '\'' +
        id + '\'' + ',' + 2 + ',' + math + ')';
      conn.query(insertScores2, function(error, results) {
        if (error) throw error;
        var temp={id:id};
        res.send(temp);
      });
      // conn.release();
    });
  });
});

// app.put('/put', function(req, res) {
//   var id = parseInt(req.query.student_id);
//   var name = req.query.student_name;
//   var chinese = parseInt(req.body.chinese);
//   var math = parseInt(req.body.math);
//   console.log(name);
//   console.log(chinese);
//   // var updateSQL = "update name set birthday='1971-01-10' where uname='张三';
//   // conn.query({
//   //   sql: updateSQL
//   // }, function(error, results) {
//   //   if (error) throw error;
//   //   res.send("true");
//   //   // conn.release();
//   // });
// });

var server = app.listen(5000, function() {
  console.log("app listen ");
});
