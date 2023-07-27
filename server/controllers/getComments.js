import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const getComments = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const comments = await Post.findOne({ _id: postId }, "comment").exec();

  if (comments) {
    res.status(200).json(comments);
  } else {
    res
      .status(404)
      .json({ message: "Comments not found for the given postId" });
  }
});

export default getComments;
