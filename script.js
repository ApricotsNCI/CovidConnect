function processDetails() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  $.ajax({
    url: 'dataphp.php',
    type: 'POST',
    data: { username: username, password: password },
    async: false,
    success: function (data) {
      alert(data);
    },
    cache: false
  });
}
