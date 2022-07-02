// Create IO App with Express
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

// Configure Cors
const cors = require("cors");
app.use(cors());

// Configure All Routes
const router = require("./router");
app.use(router);

// Socket Controllers
// const handleJoinRoom = require("./socket_controllers/join_room");
const addUser = require("./socket_controllers/add_user");
const removeUser = require("./socket_controllers/remove_user");
const getUser = require("./socket_controllers/get_user");
const getUsersInRoom = require("./socket_controllers/get_users_in_room");

// SocketIo Part
io.on("connection", (socket) => {
  console.log("User Joined");

  // User Disconnects
  socket.on("disconnect", () => {
    console.log("User Left");
    const user = removeUser({ id: socket.id });
    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("room_users", {
        room: user.room,
        roomUsers: getUsersInRoom({ room: user.room }),
      });
    }
  });

  // User Joins Room For First Time
  socket.on("join_room", ({ name, room }, callback) => {
    // console.log(`Name: ${name}`, `Room: ${room}`);
    const { error, user } = addUser({ id: socket?.id, name, room });
    if (error) return callback(error);

    // console.log(user);
    socket.emit("message", {
      user: "admin",
      text: `${user?.name}, welcome to the room ${user?.room}`,
    });
    socket.broadcast.to(user?.room).emit("message", {
      user: "admin",
      text: `${user?.name}, has joined`,
    });
    io.to(user.room).emit("room_users", {
      room: user.room,
      roomUsers: getUsersInRoom({ room: user.room }),
    });
    socket.emit("room_users", {
      room: user.room,
      roomUsers: getUsersInRoom({ room: user.room }),
    });

    socket.join(user?.room);
    callback();
  });

  // When User Send Text In Room
  socket.on("send_message", (message, callback) => {
    const user = getUser({ id: socket?.id });
    io.to(user?.room).emit("message", { user: user?.name, text: message });
    callback();
  });
});

// Running Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
