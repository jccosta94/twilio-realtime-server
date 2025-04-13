const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("🔗 Twilio stream connected.");

  ws.on("message", async (message) => {
    const data = JSON.parse(message);

    if (data.event === "start") {
      console.log("📞 Call started");
    } else if (data.event === "media") {
      const audioBuffer = Buffer.from(data.media.payload, "base64");
      console.log("🎧 Audio chunk received:", audioBuffer.length);
    } else if (data.event === "stop") {
      console.log("❌ Call ended");
    }
  });

  ws.on("close", () => {
    console.log("🚪 Twilio stream closed");
  });
});

app.get("/", (req, res) => {
  res.send("👋 WebSocket Server is running!");
});

const PORT = process.env.PORT || 3000;
server
server.listen(PORT, () => {
    console.log(`🧠 WebSocket server ready on port ${PORT}`);
  });
  