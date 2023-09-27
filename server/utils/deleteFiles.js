import fs from "fs";
import path from "path";

const deleteFileByPath = (filePath) => {
  const filename = path.basename(filePath);
  const localFilePath = path.join(__dirname, "uploads", filename);

  if (fs.existsSync(localFilePath)) {
    fs.unlinkSync(localFilePath);
    console.log(`File '${filename}' deleted successfully.`);
  } else {
    console.log(`File '${filename}' not found.`);
  }
};
