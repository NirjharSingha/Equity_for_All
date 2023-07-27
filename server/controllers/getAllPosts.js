import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().select("-share -comment");
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404).json({ error: "post not found." });
  }
});

export default getAllPosts;
