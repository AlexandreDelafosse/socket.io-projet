const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

let allUsers = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log(' user connected');

  socket.on("getUsers", () => {
    io.emit("getAllUser", allUsers);

  });

  socket.on('addOneUser', (user) => {
    if (allUsers.find(oldUser => oldUser.name !== user.name) || allUsers.length == 0) {
      allUsers.push(user);
      
    } else {
      console.log("deja user");
    }
    io.emit("showUser", allUsers[0]);

  });


  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

    console.log(allUsers);
    socket.emit('cha', msg);

  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});