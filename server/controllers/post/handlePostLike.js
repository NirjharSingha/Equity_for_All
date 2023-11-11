import asyncHandler from "express-async-handler";
import Post from "../../models/Post.js";

const handlePostLike = asyncHandler(async (req, res) => {
  const { postID } = req.body;
  const { selectedLike, prevLike } = req.body;
  const email = req.email;
  let updatedPost;

  if (prevLike !== "") {
    updatedPost = await Post.findOneAndUpdate(
      { _id: postID },
      { $pull: { [prevLike]: email } },
      { new: true }
    );
  }

  if (selectedLike !== "") {
    updatedPost = await Post.findOneAndUpdate(
      { _id: postID },
      { $push: { [selectedLike]: email } },
      { new: true }
    );
  }
  if (updatedPost) {
    return res
      .status(200)
      .json({ message: "post options updated successfully" });
  } else {
    return res.status(404).json({ error: "error in post ontions update" });
  }
});

export default handlePostLike;
