import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const handleCommentLike = asyncHandler(async (req, res) => {
  const { postID, commentID } = req.body;
  const { selectedLike, prevLike, level, levelParent } = req.body;
  const email = req.email;
  let updatedComment;

  console.log(postID);
  console.log(levelParent);
  console.log(commentID);

  if (level === 0) {
    if (prevLike !== "") {
      updatedComment = await Post.findOneAndUpdate(
        { _id: postID, "comment.commentID": commentID }, // Find the specific comment using both postId and commentId
        {
          $pull: {
            [`comment.$.${prevLike}`]: email,
          },
        },
        { new: true }
      );
    }
    if (selectedLike !== "") {
      updatedComment = await Post.findOneAndUpdate(
        { _id: postID, "comment.commentID": commentID }, // Find the specific comment using both postId and commentId
        {
          $push: {
            [`comment.$.${selectedLike}`]: email,
          },
        },
        { new: true }
      );
    }
  } else {
    if (prevLike !== "") {
      updatedComment = await Post.findOneAndUpdate(
        {
          _id: postID,
          "comment.commentID": levelParent,
          "comment.reply.commentID": commentID,
        },
        {
          $pull: {
            [`comment.$[outerComment].reply.$[innerReply].${prevLike}`]: email,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "outerComment.commentID": levelParent },
            { "innerReply.commentID": commentID },
          ],
        }
      );
    }
    if (selectedLike !== "") {
      updatedComment = await Post.findOneAndUpdate(
        {
          _id: postID,
          "comment.commentID": levelParent,
          "comment.reply.commentID": commentID,
        },
        {
          $push: {
            [`comment.$[outerComment].reply.$[innerReply].${selectedLike}`]:
              email,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "outerComment.commentID": levelParent },
            { "innerReply.commentID": commentID },
          ],
        }
      );
    }
  }

  if (updatedComment) {
    return res.status(200).json({ message: "comment like added successfully" });
  } else {
    return res.status(404).json({ error: "error in adding comment like" });
  }
});

export default handleCommentLike;
