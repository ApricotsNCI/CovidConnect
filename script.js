function processDetails() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  $.ajax({
    url: 'Phps/loginphp.php',
    type: 'POST',
    data: { username: username, password: password },
    async: false,
    success: function (data) {
      if(data==false){
        alert("Error: Password or Username invalid, please try again.");
      }else{
        localStorage.setItem("username", data);
        location.replace("Webpages/home.html");
      }
    },
    cache: false
  });
}

function createUser(){
  var username = document.getElementById("NewUser").value;
  var passwordOne = document.getElementById("NewPass").value;
  var passwordTwo = document.getElementById("NewpassTwo").value;
  var email = document.getElementById("Email").value;

  if(username==null||username==""||passwordOne==null||passwordOne==""||passwordTwo==null||passwordTwo==""||email==null||email==""){
    alert("Error: Please make sure all fields are filled out.");
  } else{
    if(passwordOne!=passwordTwo){
      alert("Error: Please make sure the two passwords match.")
    } else{
      if(passwordOne.length>=8){
        $.ajax({
          url: 'Phps/registrationphp.php',
          type: 'POST',
          data: { username: username, passwordOne: passwordOne, email:email },
          async: false,
          success: function(data){
            alert(data)
          },
          cache:false
        });
      } else{
        alert("Error your password must be greater than 8 characters.");
      }
    }
  }
}

function updateUser(){

}

function displayUser(){
  var username = localStorage.getItem("username");
  document.getElementById("usernameDis").innerHTML += username;
}

function displaySettings(){
  var username = localStorage.getItem("username");
  $.ajax({
    url: 'Phps/viewSettingsphp.php',
    type: 'POST',
    data: {username:username},
    async: false,
    success: function(data){
      var dataTwo = JSON.parse(data);
      document.getElementById("fullName").innerHTML += dataTwo[0];
      document.getElementById("dob").innerHTML += dataTwo[1];
      document.getElementById("gender").innerHTML += dataTwo[2];
      document.getElementById("email").innerHTML += dataTwo[3];
      document.getElementById("password").innerHTML += dataTwo[4];
    },
    cache:false
  });
}
