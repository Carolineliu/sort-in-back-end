function writeAllScores(data) {
  var result = [];
  data.forEach(function(val) {
    AddData(val, result);
  });
  return result;
}

function AddData(val, result) {
  for (var i = 0; i < result.length; i++) {
    if (val.student_id === result[i].id) {
      result[i][val.course_name] = val.scores;
      return;
    }
  }
  var obj = {};
  obj.id = val.student_id;
  obj.name = val.student_name;
  obj[val.course_name] = val.scores;
  result.push(obj);
}

module.exports = writeAllScores;
