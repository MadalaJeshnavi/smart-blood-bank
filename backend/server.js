const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/blood", require("./routes/bloodRoutes")(io));
app.use("/api/emergency", require("./routes/emergencyRoutes"));

io.on("connection", () => {
  console.log("User Connected");
});

server.listen(5001, () => console.log("Server running on port 5001"));
