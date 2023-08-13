import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import mongoose from "mongoose";

const getAllPosts = asyncHandler(async (req, res) => {
  console.log("post fetch");
  const idsString = req.query.ids;
  if (idsString.length <= 1) {
    res.send([]);
    return;
  }
  const idArray = idsString.split(",").filter((id) => id);

  const posts = await Post.find({ _id: { $in: idArray } }).select(
    "-share -comment"
  );
  res.json(posts);
});

export default getAllPosts;
