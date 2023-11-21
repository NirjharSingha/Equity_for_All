import asyncHandler from "express-async-handler";
import Post from "../../models/Post.js";

const createPost = asyncHandler(async (req, res) => {
  const userEmail = req.email;
  const { postDescription, postCategory, createdAt, group } = req.body;

  let postAttachments = [];

  if (req.files === undefined || req.files.length === 0) {
    postAttachments = [];
  } else {
    postAttachments = req.files.map(
      (file) => process.env.server_url + file.path
    );
  }

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
