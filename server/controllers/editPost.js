import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const editPost = asyncHandler(async (req, res) => {
  console.log("inside edit post");
  const {
    postDescription,
    postCategory,
    updatedAt,
    isDeleted,
    id,
    prevAttachments,
  } = req.body;

  let postAttachments = [];

  if (req.files === undefined || req.files.length === 0) {
    postAttachments = [];
  } else {
    postAttachments = req.files.map(
      (file) => process.env.server_url + file.path
    );
  }

  let finalAttachments = [];

  if (isDeleted === "false") {
    console.log(isDeleted);
    postAttachments = postAttachments.concat(prevAttachments);
  }

  console.log(postAttachments);
  console.log(prevAttachments);
  console.log(isDeleted);

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
    return res.status(200).json({ message: "Post updated successfully" });
  } else {
    return res.status(404).json({ error: "Post not found" });
  }
});

export default editPost;
