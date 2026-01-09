const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const os = require("os");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const FILE = "./watched.txt";
let lastValue = "";

/* -------- CPU -------- */

function cpuSnapshot() {
  const cpus = os.cpus();
  let idle = 0, total = 0;

  cpus.forEach(c => {
    for (type in c.times) total += c.times[type];
    idle += c.times.idle;
  });

  return { idle, total };
}

let lastCpu = cpuSnapshot();

function cpuPercent() {
  const now = cpuSnapshot();
  const idle = now.idle - lastCpu.idle;
  const total = now.total - lastCpu.total;
  lastCpu = now;
  return Math.max(0, 100 - Math.round(100 * idle / total));
}

/* -------- Frontend -------- */

app.use(express.static(path.join(__dirname, "frontend/dist")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

/* -------- Realtime loop -------- */

setInterval(() => {
  let value = "FILE_NOT_FOUND";
  try { value = fs.readFileSync(FILE, "utf8").trim(); } catch {}

  const mem = Math.round((1 - os.freemem() / os.totalmem()) * 100);
  const cpu = cpuPercent();

  io.emit("update", {
    value,
    cpu,
    mem,
    host: process.env.HOSTNAME || os.hostname(),
    time: new Date().toLocaleTimeString()
  });

}, 1000);

io.on("connection", () => {
  console.log("Cliente conectado");
});

server.listen(3000, () => {
  console.log("App en http://0.0.0.0:3000");
});
