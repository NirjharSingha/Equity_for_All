import asyncHandler from "express-async-handler";
import Post from "../../models/Post.js";
import { sendSseDataToClients } from "../../utils/sse.js";

const editOrDeleteComment = asyncHandler(async (req, res) => {
  const { postID, comment, newDesc, editedAt, deletedAt } = req.body;

  const dataToSend = {
    comment,
    newDesc,
    editedAt,
    deletedAt,
  };

  let updatedComment;

  try {
    if (comment.level === 0) {
      updatedComment = await Post.findOneAndUpdate(
        { _id: postID, "comment.commentID": comment.commentID },
        {
          $set: {
            [`comment.$.commentDesc`]: newDesc,
            [`comment.$.editedAt`]: editedAt,
            [`comment.$.deletedAt`]: deletedAt,
          },
        },
        { new: true }
      );
    } else if (comment.level === 1) {
      updatedComment = await Post.findOneAndUpdate(
        {
          _id: postID,
          "comment.commentID": comment.levelParent,
          "comment.reply.commentID": comment.commentID,
        },
        {
          $set: {
            [`comment.$[outerComment].reply.$[innerReply].commentDesc`]:
              newDesc,
            [`comment.$[outerComment].reply.$[innerReply].editedAt`]: editedAt,
            [`comment.$[outerComment].reply.$[innerReply].deletedAt`]:
              deletedAt,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "outerComment.commentID": comment.levelParent },
            { "innerReply.commentID": comment.commentID },
          ],
        }
      );
    } else {
      updatedComment = await Post.findOneAndUpdate(
        {
          _id: postID,
          "comment.commentID": comment.higherParent,
          "comment.reply.commentID": comment.levelParent,
          "comment.reply.reply.commentID": comment.commentID,
        },
        {
          $set: {
            [`comment.$[mainComment].reply.$[outerComment].reply.$[innerReply].commentDesc`]:
              newDesc,
            [`comment.$[mainComment].reply.$[outerComment].reply.$[innerReply].editedAt`]:
              editedAt,
            [`comment.$[mainComment].reply.$[outerComment].reply.$[innerReply].deletedAt`]:
              deletedAt,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "mainComment.commentID": comment.higherParent },
            { "outerComment.commentID": comment.levelParent },
            { "innerReply.commentID": comment.commentID },
          ],
        }
      );
    }

    if (updatedComment) {
      res.status(200).json(dataToSend);
      sendSseDataToClients(dataToSend);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment to post" });
  }
});

export default editOrDeleteComment;
