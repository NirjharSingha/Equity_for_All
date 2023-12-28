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

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  cors()(req, res, () => {});

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  addClient(res);

  // Function to send comments periodically
  const sendCommentPeriodically = () => {
    // Customize this part to generate your comment data
    const commentData = "New comment data";

    // Send the comment to the connected clients
    res.write(`data: ${JSON.stringify({ comment: commentData })}\n\n`);
  };

  // Set up a timer to send comments every few seconds
  const commentInterval = setInterval(sendCommentPeriodically, 5000);

  req.on("close", () => {
    // Remove the client when the connection is closed
    removeClient(res);

    // Clear the interval when the connection is closed
    clearInterval(commentInterval);
  });
});

export default commentSSE;
