import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import cors from "cors";
import connectDB from "./configs/connectDB.js";
import bodyParser from "body-parser";
import http from "http";

//configs
dotenv.config();
connectDB();

const app = express();
const port = process.env.server_port;

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//routes
app.use("/user", userRouter);

const server = http.createServer(app);

server.listen(port, () => {
  console.log("hello world 4");
});
