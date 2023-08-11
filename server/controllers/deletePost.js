import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const userEmail = req.email;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res
      .status(200)
      .json({
        message: "Post deleted successfully",
        id: postId,
        email: userEmail,
      });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default deletePost;
