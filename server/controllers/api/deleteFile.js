import asyncHandler from "express-async-handler";
import fs from "fs";

const deleteFile = asyncHandler(async (req, res) => {
  const fileUrl = req.query.fileUrl;
  if (fileUrl.length === 0) {
    res.json({ message: "no attachments" });
    return;
  }

  const fileArray = fileUrl.split(",").filter((id) => id);
  for (let index = 0; index < fileArray.length; index++) {
    const element = fileArray[index];
    const exists = fs.existsSync(element);
    if (exists) {
      fs.unlinkSync(element);
      console.log(`File deleted successfully.`);
    } else {
      console.log("file not found");
    }
  }
  res.json({ message: "files deleted successfully" });
});

export default deleteFile;
