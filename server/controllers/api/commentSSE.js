import asyncHandler from "express-async-handler";
import { addClient, removeClient } from "../../utils/sse.js";
import cors from "cors";

const commentSSE = asyncHandler(async (req, res) => {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", false);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, POST, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  cors()(req, res, () => {});

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  addClient(res);

  req.on("close", () => {
    removeClient(res);
  });
});

export default commentSSE;
