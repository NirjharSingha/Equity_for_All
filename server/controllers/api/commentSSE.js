import asyncHandler from "express-async-handler";
import { addClient, removeClient } from "../../utils/sse.js";

const commentSSE = asyncHandler(async (req, res) => {
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
