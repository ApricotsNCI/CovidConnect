function processDetails() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  $.ajax({
    url: 'Phps/loginphp.php',
    type: 'POST',
    data: {
      username: username,
      password: password
    },
    async: false,
    success: function(data) {
      if (data == false) {
        alert("Error: Password or Username invalid, please try again.");
      } else {
        localStorage.setItem("username", data);
        location.replace("Webpages/home.html");
      }
    },
    cache: false
  });
}

function createUser() {
  var username = document.getElementById("NewUser").value;
  var passwordOne = document.getElementById("NewPass").value;
  var passwordTwo = document.getElementById("NewpassTwo").value;
  var email = document.getElementById("Email").value;

  if (username == null || username == "" || passwordOne == null || passwordOne == "" || passwordTwo == null || passwordTwo == "" || email == null || email == "") {
    alert("Error: Please make sure all fields are filled out.");
  } else {
    if (passwordOne != passwordTwo) {
      alert("Error: Please make sure the two passwords match.")
    } else {
      if (passwordOne.length >= 8) {
        $.ajax({
          url: 'Phps/registrationphp.php',
          type: 'POST',
          data: {
            username: username,
            passwordOne: passwordOne,
            email: email
          },
          async: false,
          success: function(data) {
            alert(data)
          },
          cache: false
        });
      } else {
        alert("Error your password must be greater than 8 characters.");
      }
    }
  }
}

function displayUser() {
  var username = localStorage.getItem("username");
  document.getElementById("usernameDis").innerHTML += username;
}

function displaySettings() {
  var username = localStorage.getItem("username");
  $.ajax({
    url: '../Phps/viewSettingsphp.php',
    type: 'POST',
    data: {
      username: username
    },
    async: false,
    success: function(data) {
      var arr = JSON.parse(data);
      document.getElementById("username").value = username;
      document.getElementById("fullName").value = arr[0];
      document.getElementById("dob").value = arr[1];
      document.getElementById("gender").value = arr[2];
      document.getElementById("email").value = arr[3];
      document.getElementById("password").value = arr[4];
      document.getElementById("bio").innerHTML = arr[5];
    },
    cache: false
  });
}

function updateSettings() {
  var username = localStorage.getItem("username");
  var fullName = document.getElementById("fullName").value;
  var dob = document.getElementById("dob").value;
  var gender = document.getElementById("gender").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var bio = document.getElementById("bio").value;
  $.ajax({
    url: '../Phps/updateSettingsphp.php',
    type: 'POST',
    data: {
      username: username,
      fullName: fullName,
      dob: dob,
      gender: gender,
      email: email,
      password: password,
      bio: bio
    },
    async: false,
    success: function(data) {
      alert(data);
    },
    cache: false
  });
}

function deleteUser() {
  var username = localStorage.getItem("username");
  var confirmation = confirm("Are you sure you wish to delete " + username + "?");
  if (confirmation == true) {
    $.ajax({
      url: '../Phps/deleteUserphp.php',
      type: 'POST',
      data: {
        username: username
      },
      async: false,
      success: function(data) {
        alert(data);
        location.replace("../index.html");
      },
      cache: false
    });
  } else {
    alert("Proccess cancelled!");
  }
}

function displayUserProfile() {
  var username = localStorage.getItem("username");
  $.ajax({
    url: '../Phps/profileViewphp.php',
    type: 'POST',
    data: {
      username: username
    },
    async: false,
    success: function(data) {
      var arr = JSON.parse(data);
      document.getElementById("usernameDis").innerHTML = username;
      document.getElementById("name").innerHTML = arr[0];
      document.getElementById("dob").innerHTML = arr[1];
      document.getElementById("bio").innerHTML = arr[2];
    },
    cache: false
  });
}

/*chatroulette*/

var sio = require("socket.io");

var userList = {};
var waitingList = {};
var socketCount = 0;

io.sockets.on("connection", function(socket) {
  socketCount++;

  socket.on("init_user", function(userData) {
    // update the list of users
    userList[socket.id] = {
      "username": socket.id,
      "fullname": userData.name
    };
    // send the connected user list to the new user
    socket.emit("ui_user_set", userList);
    // send the new user to the all other users
    socket.broadcast.emit("ui_user_add", userList[socket.id]);
  });
  socket.on("next_user", function() {
    if (waitingList[socket.id]) return;

    if (Object.keys(waitingList).length == 0) {
      waitingList[socket.id] = true;
    } else {
      // pick a partner from the waiting list
      socket.partnerId = Object.keys(waitingList)[0];

      // connect two user with each other
      socket.emit("connect_partner", {
        'caller': false,
        'partnerId': socket.partnerId
      });
      partnerSocket = io.sockets.socket(socket.partnerId);
      partnerSocket.partnerId = socket.id;
      partnerSocket.emit("connect_partner", {
        'caller': true,
        'partnerId': socket.id
      });

      // delete the partner from the waiting list
      delete waitingList[socket.partnerId];
    }
  });
});

socket.on('disconnect', function() {
  socket.emit('disconnected');
  online = online - 1;

});
