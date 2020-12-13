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

/*chatroulette
function displayMessage() {
  var userMessage = localStorage.getItem("userMessage");
  $.ajax({
    url: '../Phps/displayMessagephp.php',
    type: 'POST',
    data: {
      userMessage: userMessage
    },
    async: false,
    success: function(data) {
      var arr = JSON.parse(data);
      document.getElementById("userMessage").value = userMessage;
    },
    cache: false
  });
}


function updateMessage() {
  var username = localStorage.getItem("username");
  var fullName = document.getElementById("fullName").value;
  var userMessage = document.getElementById("userMessage").value;
  $.ajax({
    url: '../Phps/updateMessagephp.php',
    type: 'POST',
    data: {
      username: username,
      fullName: fullName,
      userMessage: userMessage
    },
    async: false,
    success: function(data) {
      alert(data);
    },
    cache: false
  });
}


function onlineUsers() {
  var session = localStorage.getItem("session");
  $.ajax({
    url: '../Phps/onlineUsersphp.php',
    type: 'POST',
    data: {
      username: username,
      session: session,
      fullName: fullName
    },
    async: false,
    success: function(data) {
      var arr = JSON.parse(data);
      document.getElementById("session").value = fullName;
    },
    cache: false
  });
}

const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})


messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}*/

/*rating*/
function userRate(){
  var username = localStorage.getItem("username");
  var usernameTwo =  document.getElementById("testingUser");
  var rating = 0;
  var connection;
  if(document.getElementById('starOne').checked){
    rating = document.getElementById('starOne').value;
  }else if(document.getElementById('starTwo').checked){
    rating = document.getElementById('starTwo').value;
  }else if(document.getElementById('starThree').checked){
    rating = document.getElementById('starThree').value;
  }else if(document.getElementById('starFour').checked){
    rating = document.getElementById('starFour').value;
  }else if(document.getElementById('starFive').checked){
    rating = document.getElementById('starFive').value;
  }
  else{
    alert("No value selected!")
    return;
  }

  connection = document.getElementById("connectform").value;

  if(connection=="Yes"){
    connection=true;
  }else{
    connection=false;
  }

  $.ajax({
    url: '../Phps/ratingphp.php',
    type: 'POST',
    data: {
      username: username,
      usernameTwo: usernameTwo,
      rating: rating,
      connection: connection
    },
    async: false,
    success: function(data) {
      alert(data);
      location.replace("chatroulette.html");
    },
    cache: false
  });
}
