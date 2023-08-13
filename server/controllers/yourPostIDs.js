import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const yourPostIDs = asyncHandler(async (req, res) => {
  console.log("inside controller");
  const email = req.email;
  try {
    const data = await User.findOne({ email }, "posts");
    const posts = data.posts.reverse();
    console.log(posts);
    res.json(posts);
  } catch (error) {
    console.log("user not found");
    res.json(error);
  }
});

export default yourPostIDs;
