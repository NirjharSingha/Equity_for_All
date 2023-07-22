import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const createComment = asyncHandler(async (req, res) => {
  const userEmail = req.email;
  const {
    postId,
    commentDesc,
    timeStamp,
    parentID,
    level,
    levelParent,
    like,
    dislike,
    laugh,
    love,
    angry,
    sad,
    reply,
  } = req.body;

  const commentID = `${Date.now()}${userEmail}`;

  const comment = {
    commentID,
    userEmail,
    commentDesc,
    timeStamp,
    parentID,
    level,
    levelParent,
    like,
    dislike,
    laugh,
    love,
    angry,
    sad,
    reply,
  };

  if (level === 0) {
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comment: comment } },
        { new: true }
      );

      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to add comment to post" });
    }
  } else {
    try {
      const updatedComment = await Post.findOneAndUpdate(
        { _id: postId, "comment.commentID": levelParent }, // Find the specific comment using both postId and commentId
        {
          $push: {
            "comment.$.reply": comment,
          },
        },
        { new: true }
      );
      if (updatedComment) {
        res.status(200).json(updatedComment);
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to add reply to comment" });
    }
  }
});

export default createComment;
