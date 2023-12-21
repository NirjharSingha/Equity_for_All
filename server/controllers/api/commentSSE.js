import asyncHandler from "express-async-handler";
import { addClient, removeClient } from "../../utils/sse.js";

const commentSSE = asyncHandler(async (req, res) => {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  addClient(res);

  req.on("close", () => {
    removeClient(res);
  });
});

export default commentSSE;
