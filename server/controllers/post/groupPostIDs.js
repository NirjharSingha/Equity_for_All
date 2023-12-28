import asyncHandler from "express-async-handler";
import Post from "../../models/Post.js";

const groupPostIDs = asyncHandler(async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const data = await Post.find({ group: groupId }, "_id");
    let posts = [];
    for (let index = data.length - 1; index >= 0; index--) {
      const element = data[index]._id;
      posts.push(element);
    }
    res.json(posts);
  } catch (error) {
    console.log("post not found");
    res.json(error);
  }
});

export default groupPostIDs;
