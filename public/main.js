$(function() {
  var asc = $("th").data('asc');
  $("#hellos").on("click", "th", function() {
    var sortKey = $(this).data('name');
    $.get('/scores', {
      sortKey: sortKey,
      asc: asc
    }, function(reply) {
      $("#world").empty();
      reply.forEach(function(val) {
        $("#world").append("<tr>" +
          "<td>" + val.name + "</td>" +
          "<td>" + val.chinese + "</td>" +
          "<td>" + val.math + "</td>" + "</tr>");
      });
    });
  });
  asc = -asc;
});
