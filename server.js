const fs = require("fs");
const os = require("os");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const WATCHED_FILE = "./watched.txt";
const HOSTNAME = process.env.HOSTNAME_CUSTOM || os.hostname();

let lastValue = "";

// Servir frontend
app.use(express.static("frontend/dist"));

// ----------------- Health check -----------------
app.get("/health", (req, res) => {
  try {
    value = fs.readFileSync(WATCHED_FILE, "utf8").trim();
  } catch (err) {
    // archivo puede no existir todavía
  }
  res.status(200).json({
    status: "ok",
    hostname: HOSTNAME,
    cloud: value,
    timestamp: new Date().toISOString()
  });
});

// ----------------- Socket.io -----------------
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Enviar datos iniciales
  sendUpdate(socket);

  socket.on("disconnect", (reason) => {
    console.log("Client disconnected:", reason);
  });
});

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

// ----------------- Función para enviar updates -----------------
function sendUpdate(socket) {
  let value = lastValue;
  try {
    value = fs.readFileSync(WATCHED_FILE, "utf8").trim();
  } catch (err) {
    // archivo puede no existir todavía
  }
  lastValue = value;
  const mem = Math.round((1 - os.freemem() / os.totalmem()) * 100);
  const cpu = cpuPercent();

  const data = {
    host: HOSTNAME,
    value,
    cpu: cpu,
    mem: mem,
    time: new Date().toLocaleTimeString()
  };

  if (socket) {
    socket.emit("update", data);
  } else {
    io.emit("update", data);
  }
}

// ----------------- Actualizar cada 1s -----------------
setInterval(() => sendUpdate(), 1000);

// ----------------- Iniciar servidor -----------------
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
