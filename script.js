function processDetails() {
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  $.ajax({
    url: 'dataphp.php',
    type: 'post',
    data: { name: name, password: password },
    async: false,
    success: function (data) {
      //alert("The data being returned from the server is : " + data);
      window.location.replace("[http://www.w3schools.com%22%29%3B/]http://www.w3schools.com");
    },
    cache: false
  });
}
