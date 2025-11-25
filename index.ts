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

const state = createArray(200, 200);

function createArray(length: number): any[];
function createArray(length: number, arg1: number, ...rest: number[]): any[];
function createArray(length: any): any[] {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("draw", (data) => {
    socket.emit("message", "this is a test");
    io.emit("draw", data);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
