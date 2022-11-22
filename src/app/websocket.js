const { io } = require("../app/server");

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);
  socket.on("disconnect", () => {
    console.log(`user ${socket.id} connected`);
  });
});

module.exports = { io };
