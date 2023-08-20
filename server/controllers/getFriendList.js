import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const getFriendList = asyncHandler(async (req, res) => {
  const email = req.email;
  const user = await User.findOne(
    { email },
    "friends friendRequestSend friendRequestReceived blockList"
  );

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found." });
  }
});

export default getFriendList;
