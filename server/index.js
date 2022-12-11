const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const createPlayer = require("./createPlayer");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let lastId = "";
let limit = 0;
app.use(express.static("../client"));
app.get("/", (req, res) => {
  res.sendFile("/index.html");
});
io.on("connection", (socket) => {
  io.emit("contextCreated", (ctx) => {
    io.emit("createP1", createPlayer(socket.id).createP1());
    socket.on("playerAction", (action) => {
      console.log("ACTION");
    });

    lastId = socket.id;
    limit += 1;
  });

  //if (!lastId) {
  // } else io.emit("createP2", createPlayer(socket.id).createP2());
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
