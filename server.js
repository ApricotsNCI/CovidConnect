//Creating exxpress instances
var express = require("express");
var app = express();

//creating http instances
var http = require("http").createServer(app);

//Creating socket.io instances
var io = require("socket.io")(http);

io.on("connection", function(socket){
  console.log("User connected", socket.id);
});

//start the createServer
http.listen(3000, function(){
  console.log("Server started");
});
