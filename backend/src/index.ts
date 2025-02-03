import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { GameSocket } from "./utils/socket"; // Import ChatSocket class
import { Server } from "socket.io";
import { log } from "./utils/logger";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend to connect
    methods: ["GET", "POST"],
  },
});

// Initialize GamesSocket
new GameSocket(io);
server.listen(port, () => {
  log.info(`[backend]: Server is running on port ${port}`);
});
