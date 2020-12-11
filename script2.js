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

// socket.on("disconnect",function(){}) will not work
socket.on('disconnect', function() {
  socket.emit('disconnected');
  online = online - 1;

});
