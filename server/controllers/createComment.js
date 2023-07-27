import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import { sendSseDataToClients } from "../index.js";

const createComment = asyncHandler(async (req, res) => {
  console.log("inside createComment");
  const {
    postId,
    commentID,
    userEmail,
    commentDesc,
    timeStamp,
    parentID,
    level,
    levelParent,
    higherParent,
    like,
    dislike,
    laugh,
    love,
    angry,
    sad,
    reply,
    helperComment,
  } = req.body;

  console.log(postId);
  console.log(higherParent);
  console.log(levelParent);

  const comment = {
    commentID,
    userEmail,
    commentDesc,
    timeStamp,
    parentID,
    level,
    levelParent,
    higherParent,
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
    higherParent,
    like,
    dislike,
    laugh,
    love,
    angry,
    sad,
    reply,
    helperComment,
  };

  console.log(level);

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
  } else if (level === 1) {
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
  } else {
    try {
      const updatedComment = await Post.findOneAndUpdate(
        {
          _id: postId,
          "comment.commentID": higherParent,
          "comment.reply.commentID": levelParent,
        },
        {
          $push: {
            "comment.$[elem].reply.$[innerReply].reply": comment,
          },
        },
        {
          new: true,
          arrayFilters: [
            {
              "elem.commentID": higherParent,
            },
            {
              "innerReply.commentID": levelParent,
            },
          ],
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
