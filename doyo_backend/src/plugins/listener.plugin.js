const http = require("http");
const {configs}=require('../config/index')
const socketIo = require("socket.io");
const cors=require('cors')
const ListenerPlugin = {
  listen(app) {
    const server = http.createServer(app);
    const io = socketIo(server,{
      cors:{
        origin:"http://localhost:5173"
      }
    });
    io.on("connection", (socket) => {
      console.log("New client connected");

      // Handle incoming messages from clients
      socket.on("chat message", (message) => {
        console.log("Received message:", message);
        // Broadcast the message to all connected clients
        io.emit("chat message", message);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
    server.listen(configs.PORT, () => {
      console.log(`\n server running on port ${configs.PORT}`);
    });
  },
};

module.exports = { ListenerPlugin };
