import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const getFriendList = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const flag = req.query.flag;
  let user;

  if (flag === "friendsAndFollowers") {
    user = await User.aggregate([
      { $match: { email: email } },
      {
        $project: {
          commonElements: {
            $setIntersection: ["$friends", "$followers"],
          },
        },
      },
    ]);
  } else if (flag === "friendsAndFollowings") {
    user = await User.aggregate([
      { $match: { email: email } },
      {
        $project: {
          commonElements: {
            $setIntersection: ["$friends", "$followings"],
          },
        },
      },
    ]);
  } else {
    user = await User.findOne({ email }, flag);
  }

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found." });
  }
});

export default getFriendList;
