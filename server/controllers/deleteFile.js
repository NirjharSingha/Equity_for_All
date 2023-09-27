import asyncHandler from "express-async-handler";
import fs from "fs";

const deleteFile = asyncHandler(async (req, res) => {
  const fileUrl = req.query.fileUrl;
  console.log(fileUrl);
  const exists = fs.existsSync(fileUrl);
  if (exists) {
    fs.unlinkSync(fileUrl);
    console.log(`File deleted successfully.`);
  } else {
    console.log("file not found");
  }
  res.json({ exists });
});

export default deleteFile;
