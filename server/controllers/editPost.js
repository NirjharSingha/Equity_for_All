import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const editPost = asyncHandler(async (req, res) => {
  const {
    postDescription,
    postCategory,
    updatedAt,
    isDeleted,
    id,
    prevAttachments,
  } = req.body;
  console.log(id);

  let postAttachments = [];

  if (req.files === undefined || req.files.length === 0) {
    postAttachments = [];
  } else {
    postAttachments = req.files.map(
      (file) => process.env.server_url + file.path
    );
  }

  if (isDeleted === "false") {
    postAttachments = postAttachments.concat(prevAttachments);
  }

  const updatedPost = await Post.findOneAndUpdate(
    { _id: id },
    {
      postDescription,
      postCategory,
      updatedAt,
      postAttachments,
    },
    { new: true }
  );

  if (updatedPost) {
    return res
      .status(200)
      .json({ message: "Post updated successfully", updatedPost: updatedPost });
  } else {
    return res.status(404).json({ error: "Post not found" });
  }
});

export default editPost;
