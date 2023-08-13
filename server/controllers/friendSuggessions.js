import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const getFriendSuggession = asyncHandler(async (req, res) => {
  const email = req.params.email;
  try {
    const mutualFriends = await User.aggregate([
      { $match: { email: email } }, // Match the user by email
      { $unwind: "$friends" }, // Unwind the friends array
      {
        $lookup: {
          from: "users", // Your collection name
          localField: "friends",
          foreignField: "email",
          as: "friendInfo",
        },
      },
      { $unwind: "$friendInfo" }, // Unwind the friendInfo array
      {
        $lookup: {
          from: "users", // Your collection name
          localField: "friendInfo.friends",
          foreignField: "email",
          as: "mutualFriends",
        },
      },
      { $unwind: "$mutualFriends" }, // Unwind the mutualFriends array
      {
        $match: {
          "mutualFriends.email": { $ne: email }, // Exclude the user by email
          //   "mutualFriends.email": { $nin: "$friends" },
        },
      },
      {
        $group: {
          _id: "$mutualFriends.email",
          name: { $first: "$mutualFriends.name" },
        },
      },
      {
        $sort: {
          name: 1, // Sort by name in ascending order
        },
      },
      { $limit: 100 }, // Limit to 100 mutual friends
    ]);

    console.log(mutualFriends);
    res.send(mutualFriends);
  } catch (error) {
    console.error(error);
  }
});

export default getFriendSuggession;
