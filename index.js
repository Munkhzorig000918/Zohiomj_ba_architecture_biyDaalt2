const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const fs = require("fs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    fs.appendFile("chatlogs.txt", "\n" + msg, () => {
      console.log("logged");
    });
    io.emit("chat message", msg);
  });
  socket.broadcast.emit("hi");
});

io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
