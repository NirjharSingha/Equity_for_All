import asyncHandler from "express-async-handler";
import Post from "../../models/Post.js";
import uploadToCloudinary from "../../utils/cloudinaryUpload.js";

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
