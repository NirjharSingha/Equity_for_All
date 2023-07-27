import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import { sendSseDataToClients } from "../index.js";

const createComment = asyncHandler(async (req, res) => {
  const {
    postId,
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
    helperComment,
  } = req.body;

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

  const dataToSend = {
    postId,
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
    helperComment,
  };

  if (level === 0) {
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comment: comment } },
        { new: true }
      );

      if (updatedPost) {
        sendSseDataToClients(comment);
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
        { _id: postId },
        {
          $push: {
            "comment.$[elem].reply": comment,
          },
        },
        {
          new: true,
          arrayFilters: [{ "elem.commentID": levelParent }],
        }
      );
      if (updatedComment) {
        sendSseDataToClients(dataToSend);
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
