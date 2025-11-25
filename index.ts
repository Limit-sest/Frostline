import express from "express";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface DrawPixel {
  x: number;
  y: number;
  color: number;
}

const state = new Map<number, number>();

function savePixel(pixel: DrawPixel) {
  const key = pixel.y * 200 + pixel.x; // encode coords into a single number as a key for the state
  if (pixel.color == -1) {
    state.delete(key);
    return;
  }
  state.set(key, pixel.color);
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const filledPixels = Array.from(state.entries()).map(([key, value]) => ({
    x: key % 200,
    y: Math.floor(key / 200),
    color: value,
  }));
  socket.emit("sync", filledPixels);
  socket.on("draw", (data: DrawPixel) => {
    savePixel(data);
    socket.broadcast.emit("draw", data);
  });

  socket.on("drawBatch", (pixels: DrawPixel[]) => {
    pixels.forEach((data: DrawPixel) => savePixel(data));
    socket.broadcast.emit("drawBatch", pixels);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
