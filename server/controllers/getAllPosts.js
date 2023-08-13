import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

const getAllPosts = asyncHandler(async (req, res) => {
  const idsString = req.query.ids;
  if (idsString.length <= 1) {
    res.send([]);
    return;
  }
  const idArray = idsString.split(",").filter((id) => id);

  try {
    const dataToSend = await Promise.all(
      idArray.map(async (id) => {
        const post = await Post.findOne({ _id: id }, "-share -comment");
        return post;
      })
    );
    console.log(dataToSend);
    res.json(dataToSend);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
});

export default getAllPosts;
