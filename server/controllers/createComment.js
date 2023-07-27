import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import { sendSseDataToClients } from "../utils/sse.js";

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

  let updatedPost;

  try {
    if (level === 0) {
      updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comment: comment } },
        { new: true }
      );
    } else if (level === 1) {
      updatedPost = await Post.findOneAndUpdate(
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
    } else {
      updatedPost = await Post.findOneAndUpdate(
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
    }

    if (updatedPost) {
      sendSseDataToClients(dataToSend);
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment to post" });
  }
});

export default createComment;
