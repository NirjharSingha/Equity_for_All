import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import cors from "cors";
import connectDB from "./configs/connectDB.js";
import bodyParser from "body-parser";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configs
dotenv.config();
connectDB();

const app = express();
const port = process.env.server_port;

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(join(__dirname, "uploads")));

//routes
app.use("/user", userRouter);
app.use("/post", postRouter);

const server = http.createServer(app);

server.listen(port, () => {
  console.log("hello world 4");
});
