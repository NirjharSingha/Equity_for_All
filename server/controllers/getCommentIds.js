import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const getCommentIds = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const commentIds = await Post.findOne({ _id: postId }, "commentID");

  if (commentIds) {
    res.status(200).json(commentIds);
  } else {
    res
      .status(404)
      .json({ message: "Comment count not found for the given postId" });
  }
});

export default getCommentIds;
