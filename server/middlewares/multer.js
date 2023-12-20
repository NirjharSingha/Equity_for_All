import multer from "multer";

const generateFileName = (originalName) => {
  const sanitizedFilename = originalName.replace(/\s+/g, "_");
  const uniqueIdentifier = Date.now();
  return `${uniqueIdentifier}-${sanitizedFilename}`;
};

const storage = multer.memoryStorage({
  filename: function (req, file, cb) {
    cb(null, generateFileName(file.originalname));
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
