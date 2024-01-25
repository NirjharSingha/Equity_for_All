import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/post.js";
import apiRouter from "./routes/api.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import friendRouter from "./routes/friend.js";
import storyRouter from "./routes/story.js";
import groupRouter from "./routes/group.js";
import notificationRouter from "./routes/notification.js";
import chatRouter from "./routes/chat.js";
import cors from "cors";
import dbConfig from "./configs/dbConfig.js";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cloudinary from "cloudinary";
import { createServer } from "http";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configs
dotenv.config();
dbConfig();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = process.env.server_port;

//middlewares
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(join(__dirname, "uploads")));

//routes
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/friend", friendRouter);
app.use("/post", postRouter);
app.use("/api", apiRouter);
app.use("/story", storyRouter);
app.use("/group", groupRouter);
app.use("/notification", notificationRouter);
app.use("/chat", chatRouter);

//socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  pingTimeout: 300000,
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  socket.on("global_chat_socket", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("join_chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("global_send_message", (data) => {
    socket.to(data.chat.receiver).emit("global_receive_message", data);
  });
  socket.on("typing", (room) => socket.to(room).emit("typing"));
  socket.on("stop_typing", (room) => socket.to(room).emit("stop_typing"));
  socket.on("seen", (room) => socket.to(room).emit("seen"));
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

httpServer.listen(port, () => {
  console.log("hello world");
});
