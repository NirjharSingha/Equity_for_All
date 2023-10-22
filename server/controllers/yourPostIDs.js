import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const yourPostIDs = asyncHandler(async (req, res) => {
  const email = req.email;
  try {
    const data = await Post.find({ userEmail: email }, "_id");
    console.log(data);
    let posts = [];
    for (let index = data.length - 1; index >= 0; index--) {
      const element = data[index]._id;
      posts.push(element);
    }
    res.json(posts);
  } catch (error) {
    console.log("post not found");
    res.json(error);
  }
});

export default yourPostIDs;
