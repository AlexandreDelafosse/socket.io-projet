const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "*"
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => { 
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('cha', msg)
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
    socket.emit('informations',infos)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});