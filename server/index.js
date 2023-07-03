import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import cors from "cors";
import connectDB from "./configs/connectDB.js";

//configs
dotenv.config();
connectDB();

const app = express();
const port = process.env.server_port;

//middlewares
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log("hello world 4");
});
