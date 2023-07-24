import asyncHandler from "express-async-handler";
import fs from "fs";

const fileFind = asyncHandler(async (req, res) => {
  const fileUrl = req.query.fileUrl;
  const exists = fs.existsSync(fileUrl);
  res.json({ exists });
});

export default fileFind;
