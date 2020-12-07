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
    url: '../Phps/viewSettingsphp.php',
    type: 'POST',
    data: {username:username},
    async: false,
    success: function(data){
      var arr = JSON.parse(data);
      document.getElementById("username").value = username;
      document.getElementById("fullName").value = arr[0];
      document.getElementById("dob").value = arr[1];
      document.getElementById("gender").value = arr[2];
      document.getElementById("email").value = arr[3];
      document.getElementById("password").value = arr[4];
    },
    cache:false
  });
}

function updateSettings(){
  var username = localStorage.getItem("username");
  var fullName = document.getElementById("fullName").value;
  var dob = document.getElementById("dob").value;
  var gender = document.getElementById("gender").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  $.ajax({
    url: '../Phps/updateSettingsphp.php',
    type: 'POST',
    data: {username:username, fullName:fullName, dob:dob, gender:gender, email:email, password:password},
    async: false,
    success: function(data){
      alert(data);
    },
    cache:false
  });
}

function deleteUser(){
  var username = localStorage.getItem("username");
  var confirmation = confirm("Are you sure you wish to delete "+username+"?");
  if(confirmation==true){
    $.ajax({
      url: '../Phps/deleteUserphp.php',
      type: 'POST',
      data: {username:username},
      async: false,
      success: function(data){
          alert(data);
            location.replace("../index.html");
      },
      cache:false
    });
  }else{
    alert("Proccess cancelled!");
  }
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

/*ChatRoulette*/
const socket = io('https://covid-connect-heroku.herokuapp.com/Webpages/chatroulette.html')
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


Talk.ready.then(function() {
    var me = new Talk.User({
        id: "123456",
        name: "Alice",
        email: "alice@example.com",
        photoUrl: "https://demo.talkjs.com/img/alice.jpg",
        welcomeMessage: "Hey there! How are you? :-)"
    });
    window.talkSession = new Talk.Session({
        appId: "tV6gHbbq",
        me: me
    });
    var other = new Talk.User({
        id: "654321",
        name: "Sebastian",
        email: "Sebastian@example.com",
        photoUrl: "https://demo.talkjs.com/img/sebastian.jpg",
        welcomeMessage: "Hey, how can I help?"
    });

    var conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
    conversation.setParticipant(me);
    conversation.setParticipant(other);

    var inbox = talkSession.createInbox({selected: conversation});
    inbox.mount(document.getElementById("talkjs-container"));
});
