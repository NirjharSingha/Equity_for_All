import asyncHandler from "express-async-handler";
import Post from "../../models/Post.js";
import cloudinary from "cloudinary";

// const uploadToCloudinary = async (file) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.v2.uploader.upload_stream(
//       {
//         folder: "your_folder_name",
//         public_id: file.originalname,
//       },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           file.uploaded = true;
//           file.secure_url = result.secure_url;
//           console.log(result.secure_url);
//           resolve(result.secure_url);
//         }
//       }
//     );

//     uploadStream.end(file.buffer);
//   });
// };

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

const createPost = asyncHandler(async (req, res) => {
  const userEmail = req.email;
  const { postDescription, postCategory, createdAt, group } = req.body;

  let postAttachments = [];

  if (req.files && req.files.length > 0) {
    // Upload each file to Cloudinary and wait for all uploads to complete
    postAttachments = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadToCloudinary(file);
        return result;
      })
    );
  }

  console.log(postAttachments);

  const post = new Post({
    userEmail,
    postDescription,
    postAttachments,
    postCategory,
    createdAt,
    group,
  });

  await post.save();
  const postId = post._id;

  res.status(201).json({
    message: "post created successfully",
    postId: postId,
    email: userEmail,
    post: post,
  });
});

export default createPost;
