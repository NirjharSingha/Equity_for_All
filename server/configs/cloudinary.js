// import cloudinary from "cloudinary";
// import fs from "fs";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadFile = async (filePath) => {
//   try {
//     // Read the file content from the server
//     const fileBuffer = fs.readFileSync(filePath);

//     // Upload the file content to Cloudinary
//     const result = await cloudinary.uploader
//       .upload_stream({ resource_type: "auto" }, async (error, result) => {
//         if (error) {
//           console.error(error.message);
//         } else {
//           console.log(result);
//           // Handle the Cloudinary result as needed (e.g., return the URL)
//         }
//       })
//       .end(fileBuffer);

//     return result;
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// export { uploadFile };
