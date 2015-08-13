var express = require('express');
var app = express();
var hbs = require('hbs');
var data = require("./data.js");
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.get('/', function(req, res) {
  res.render('hello', {
    student: data
  });
});

app.get("/scores", function(req, res) {
  var sortKey = req.query.sortKey;
  var asc = req.query.asc;
  data.sort(function(a, b) {
    return (parseInt(a[sortKey]) - parseInt(b[sortKey])*asc);
  });
  res.send(data);

});

var server = app.listen(5000, function() {
  console.log("app listen ");
});
