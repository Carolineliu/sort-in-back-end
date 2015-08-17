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
          "<td>" + "删除 " + "</td>" +
          "</tr>");
      });
    });
    asc = -asc;
  });

  $("#world").on("click", "tr", function() {
    var sortKey = $(this).data('name');
    var r=confirm("delete this rows,Are you sure?");
    var tr = $(this);
    $.ajax({
      url: '/delete?sortKey=' + sortKey,
      type: 'DELETE',
      success: function(data) {
        if (data === "true") {
          $(tr).remove();
        }
      }
    });
  });
});

$(function() {
  $("#add1").on("click", function() {
    var name = $("#name").val();
    var chinese = $("#chinese").val();
    var math = $("#math").val();
    $.post('/post', {
      student_name: name,
      chinese: chinese,
      math: math
    }, function(id) {
       var realId=id.id;
      console.log(id);
      if (realId > 0) {
        console.log(1);
        $("#world").append("<tr>" +
          "<td>" + realId + "</td>" +
          "<td>" + name + "</td>" +
          "<td>" + chinese + "</td>" + "<td>" + math + "</td>" +
          "<td>" + "删除 " + "</td>" +
          "</tr>");
      }
      console.log(1);
    });
  });
});


$(function() {
  $("#put1").on("click", function() {
    alert(3);
    var id = $("#Pid").val();
    var name = $("#Pname").val();
    var chinese = $("#Pchinese").val();
    var math = $("#Pmath").val();
    var data = {
      id: id,
      name: name,
      chinese: chinese,
      math: math
    };
    $.ajax({
      url: '/put',
      type: 'PUT',
      data: data,
      success: function(data) {
        if (data === "true") {
          $("#world tr").html("<tr>" +
            "<td>" + id + "</td>" +
            "<td>" + name + "</td>" +
            "<td>" + chinese + "</td>" + "<td>" + math + "</td>" +
            "<td>" + "删除 " + "</td>" +
            "</tr>");
        }
      }
    });
  });
});
