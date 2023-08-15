import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const getSharedPost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  try {
    const data = await Post.findOne(
      { _id: postId },
      "userEmail postAttachments postDescription createdAt"
    );
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("post not found");
    res.json(error);
  }
});

export default getSharedPost;
