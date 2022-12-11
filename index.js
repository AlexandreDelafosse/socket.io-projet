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

let pointArrivee = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log(' user connected');

  socket.on("myConnexion", (newUser) => {
    // if (allUsers.find(oldUser => oldUser.name !== newUser.name) || allUsers.length == 0) {
    allUsers.push(newUser);
    io.emit("showUsers", allUsers);
  });

  socket.on("changeInfoUser", (newInfoUser) => {
    // io.emit("moveUser", allUsers);
    console.log("index ", newInfoUser[0]);
    console.log("length ", allUsers.length);

    allUsers[newInfoUser[1]].distance = newInfoUser[0].distance;
    allUsers[newInfoUser[1]].latlng = newInfoUser[0].latlng;
    allUsers[newInfoUser[1]].latlngArrivee = newInfoUser[0].latlngArrivee;
    io.emit("showUsers", allUsers);

  });

  socket.on("changeInfoArrivee", (newInfoArrivee) => {
    // io.emit("moveUser", allUsers);
    // console.log("index ", newInfoUser[0]);
    // console.log("length ", allUsers.length);

    pointArrivee.distance = newInfoArrivee[0].distance;
    pointArrivee.latlngArrivee = newInfoArrivee[0].latlngArrivee[1];

    allUsers.forEach(theUser => {
      theUser.latlngArrivee[1] = newInfoArrivee[0].latlngArrivee[1];

    });

    io.emit("showArrivee", pointArrivee);

  });


  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('cha', msg)
  });
  socket.on('chatBot', (msg) => {
    console.log('message: ' + msg);
    io.emit('fromChatBot', msg)
  });

  socket.on('name', (infos) => {
    console.log('username: ' + infos);
    socket.emit('informations', infos)
  });

  socket.on('name', (infos) => {
    let userlist = ' Nom : ' + infos
    io.emit('listofconnected', userlist)
  });

  socket.on('restaurants', (infos) => {
    let testtest = 'Restaurant : ' + infos
    io.emit('listrestaurant', testtest)
  });

  socket.on('restaurants', (infos) => {
    socket.emit('informations', infos)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    // allUsers.pop()
  });

});