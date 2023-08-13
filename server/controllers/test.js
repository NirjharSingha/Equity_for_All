import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Post.js";

const getFriendsPostsInLastDay = asyncHandler(async (req, res) => {
  const userEmail = req.email;

  console.log("id fetch");

  const time = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const user = await User.findOne({ email: userEmail }, "friends");
  const friendEmails = user.friends;

  if (friendEmails.length > 0) {
    const friendPosts = await User.aggregate([
      { $match: { email: { $in: friendEmails } } },
      {
        $lookup: {
          from: "Posts",
          let: { postIds: "$posts" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [{ $toString: "$_id" }, "$$postIds"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                createdAt: 1,
                postCategory: 1,
              },
            },
          ],
          as: "postDetails",
        },
      },
      { $unwind: "$postDetails" },
      {
        $match: {
          "postDetails.createdAt": { $gte: time },
        },
      },
      {
        $group: {
          _id: "$email",
          posts: { $addToSet: "$postDetails" },
        },
      },
    ]);

    const allFriendPosts = friendPosts.map((friend) => {
      return friend.posts.map((post) => post);
    });

    const allPosts = [].concat(...allFriendPosts);
    const postToSend = allPosts.filter(
      (post) => post.postCategory !== "onlyMe"
    );
    const postIDs = postToSend.map((post) => post._id.toString());

    if (postIDs.length < 50) {
      const randomPosts = await Post.aggregate([
        { $sort: { createdAt: -1 } },
        { $limit: 250 },
        { $project: { _id: 1, postCategory: 1, userEmail: 1 } },
      ]);
      const filteredPost = randomPosts.filter(
        (post) => post.postCategory === "public" && post.userEmail !== userEmail
      );
      const dataToSend = filteredPost.map((post) => post._id.toString());

      const uniqueSet = new Set();
      for (const element of dataToSend) {
        uniqueSet.add(element);
      }

      for (const element of postIDs) {
        uniqueSet.add(element);
      }
      const mergedArray = Array.from(uniqueSet);
      console.log(mergedArray);

      res.json(mergedArray);
    } else {
      console.log(postIDs.length);
      res.json(postIDs);
    }
  } else {
    const lastN = 300;
    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: lastN },
      { $project: { _id: 1, postCategory: 1, userEmail: 1 } },
    ]);
    const filteredPost = posts.filter(
      (post) => post.postCategory === "public" && post.userEmail !== userEmail
    );
    const dataToSend = filteredPost.map((post) => post._id);
    res.send(dataToSend);
  }
});

export default getFriendsPostsInLastDay;
