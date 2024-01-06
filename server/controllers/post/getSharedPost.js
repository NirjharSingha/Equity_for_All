import asyncHandler from "express-async-handler";
import Post from "../../models/Post.js";
import User from "../../models/User.js";

const getSharedPost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findOne(
      { _id: postId },
      "userEmail postAttachments postDescription createdAt"
    );
    if (post) {
      const user = await User.findOne(
        { email: post.userEmail },
        "name profilePic"
      );
      if (user) {
        const dataToSend = {
          _id: postId,
          userEmail: post.userEmail,
          name: user.name,
          profilePic: user.profilePic,
          postAttachments: post.postAttachments,
          postDescription: post.postDescription,
          createdAt: post.createdAt,
        };
        console.log(dataToSend);
        res.json(dataToSend);
      }
    }
  } catch (error) {
    console.log("post not found");
    res.json(error);
  }
});

export default getSharedPost;
