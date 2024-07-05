
const http = require("http");
const { configs } = require("../config/index");
const socketIo = require("socket.io");
const cors = require("cors");
// const { sendMessage } = require("../business-logic/message.business-logic");

const ListenerPlugin = {
  listen(app) {
    const server = http.createServer(app);
    const io = socketIo(server, {
      cors: {
        origin: "http://localhost:5173",
      },
    });
    io.on("connection", (socket) => {
      console.log("New client connected", socket.id);

      // Handle incoming messages from clients
      socket.on("chat message", (message,userId,senderId) => {
        console.log("Received message:", message,userId,senderId);
        // Broadcast the message to all connected clients
        io.emit("chat message", message);
      });

      // Handle private messaging
      socket.on("private message", ({ receiverId, message, senderId }) => {
        console.log(receiverId, senderId,message);
        io.to(receiverId).emit("private message", {
          message,
          senderId,
          receiverId,
        });
      });

      // Handle room creation and joining
      socket.on("join room", (room) => {
        socket.join(room);
        console.log(`Socket ${socket.id} joined room ${room}`);
      });

      // Handle room messaging
      socket.on("room message", ({ room, message }) => {
        io.to(room).emit("room message", { message, senderId: socket.id });
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
