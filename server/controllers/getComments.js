import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import mongoose from "mongoose";

const getComments = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  const idsString = req.query.ids;
  const idArray = idsString.split(",").filter((id) => id);

  try {
    const nestedComments = await Promise.all(
      idArray.map(async (id) => {
        const comment = await Post.aggregate([
          { $match: { _id: new mongoose.Types.ObjectId(postId) } },
          {
            $project: {
              comment: {
                $filter: {
                  input: "$comment",
                  as: "comment",
                  cond: { $eq: ["$$comment.commentID", id] }, // No conversion to ObjectId
                },
              },
            },
          },
        ]);
        return comment;
      })
    );

    const flatComments = [];

    for (const nestedCommentArray of nestedComments) {
      for (const commentObject of nestedCommentArray) {
        flatComments.push(commentObject.comment[0]);
      }
    }
    res.json(flatComments);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
});

export default getComments;
