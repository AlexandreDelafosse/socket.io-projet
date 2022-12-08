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

  socket.on("myConnexion", (newUser) => {
    if (allUsers.find(oldUser => oldUser.name !== newUser.name) || allUsers.length == 0) {
      allUsers.push(newUser);
      // console.log("la longueur", allUsers);
      io.emit("showUsers", allUsers);
    } else {

      console.log("deja user");
    }

  });

  socket.on("changeInfoUser", (newInfoUser) => {
    // io.emit("moveUser", allUsers);
    console.log(newInfoUser);
    allUsers[newInfoUser[1]] = newInfoUser[0];
    io.emit("showUsers", allUsers);

  })



  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

    console.log(allUsers);
    io.emit('cha', msg);

  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});