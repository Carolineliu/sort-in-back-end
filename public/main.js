$(function() {
  var asc = $("th").data('asc');
  $("#hellos").on("click", "th", function() {
    var sortKey = $(this).data('name');
    if (sortKey === "id") return;
    $.get('/sort', {
      sortKey: sortKey,
      asc: asc
    }, function(reply) {
      $("#world").empty();
      reply.forEach(function(val) {

        $("#world").append("<tr>" +
          "<td>" + val.id + "</td>" +
          "<td>" + val.name + "</td>" +
          "<td>" + val.chinese + "</td>" + "<td>" + val.math + "</td>" +
          // "<td>" + "增加 " + "</td>" +
          "<td>" + "删除 " + "</td>" +
          "</tr>");
      });
    });
    asc = -asc;
  });

  $("#world").on("click", "tr", function() {
    var sortKey = $(this).data('name');
    var tr=$(this);
    $.ajax({
      url: '/delete?sortKey='+sortKey,
      // "/admin/list?id=" +id'',
      type: 'DELETE',
      data:'sortKey',
      success:function(data) {
        if (data === "true") {
          console.log(tr);
          $(tr).remove();
        }
      }
    });
    // $.delete('/delete', {
    //   sortKey: sortKey
    // }, function(reply) {
    //
    //   console.log(sortKey);
    //   $("#world").empty();
    //   console.log(reply);
    //   reply.forEach(function(val) {
    //
    //     $("#world").append("<tr>" +
    //       "<td>" + val.id + "</td>" +
    //       "<td>" + val.name + "</td>" +
    //       "<td>" + val.chinese + "</td>" + "<td>" + val.math + "</td>" +
    //       "<td>" + "增加 " + "</td>" +
    //       "<td>" + "删除 " + "</td>" +
    //       "</tr>");
    //   });
    // });

  });

  // $("#world").on("click", "tr", function() {
  //   var sortKey = $(this).data('name');
  //   $.delete('/delete', {
  //     sortKey: sortKey
  //   }, function(reply) {
  //
  //     console.log(sortKey);
  //     $("#world").empty();
  //     console.log(reply);
  //     reply.forEach(function(val) {
  //
  //       $("#world").append("<tr>" +
  //         "<td>" + val.id + "</td>" +
  //         "<td>" + val.name + "</td>" +
  //         "<td>" + val.chinese + "</td>" + "<td>" + val.math + "</td>" +
  //         "<td>" + "增加 " + "</td>" +
  //         "<td>" + "删除 " + "</td>" +
  //         "</tr>");
  //     });
  //   });
  // });


});
