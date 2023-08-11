import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const handleUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const route = req.path;
  let updatedUser;
  if (route === "/addPostID") {
    const { postID } = req.body;
    updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $push: { posts: postID } },
      { new: true }
    );
  }
  if (route === "/removePostID") {
    const { postID } = req.body;
    updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $pull: { posts: postID } },
      { new: true }
    );
  }
  if (updatedUser) {
    return res.status(200).json({ message: "user updated successfully" });
  } else {
    return res.status(404).json({ error: "error in user update" });
  }
});

export default handleUser;
