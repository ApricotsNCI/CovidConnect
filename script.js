function processDetails() {
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  $.ajax({
    url: 'dataphp.php',
    type: 'POST',
    data: { name: name, password: password },
    async: false,
    success: function (data) {
      alert("The data being returned from the server is : " + data);
    },
    cache: false
  });
}
