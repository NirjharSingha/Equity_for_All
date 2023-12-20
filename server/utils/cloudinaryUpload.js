import cloudinary from "cloudinary";

const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    const resourceType = file.mimetype.startsWith("video") ? "video" : "image";

    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "your_folder_name",
        public_id: file.originalname,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          file.uploaded = true;
          file.secure_url = result.secure_url;
          console.log(result.secure_url);
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

export default uploadToCloudinary;
