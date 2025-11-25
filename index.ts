import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const state = new Map<number, boolean>();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const filledPixels = Array.from(state.entries())
    .filter(([key, value]) => value) // filter out false values
    .map(([key, value]) => ({
      x: key % 200,
      y: Math.floor(key / 200),
    }));
  socket.emit("sync", filledPixels);
  socket.on("draw", (data) => {
    const key = data.y * 200 + data.x; // encode coords into a single number as a key for the state
    state.set(key, true);
    socket.broadcast.emit("draw", data);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
