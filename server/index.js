import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import apiRouter from "./routes/api.js";
import cors from "cors";
import dbConfig from "./configs/dbConfig.js";
import bodyParser from "body-parser";
import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// import passport from "passport";
import cookieSession from "cookie-session";
import passport from "./utils/passport.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configs
dotenv.config();
dbConfig();

const app = express();
const port = process.env.server_port;

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(join(__dirname, "uploads")));
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/api", apiRouter);

const server = http.createServer(app);

server.listen(port, () => {
  console.log("hello world");
});
