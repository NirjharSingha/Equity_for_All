import asyncHandler from "express-async-handler";
import User from "../../models/User.js";

const checkBlocked = asyncHandler(async (req, res) => {
  const userEmail = req.email;
  const friendEmail = req.query.friendEmail;

  const isBlocked = await User.findOne(
    {
      email: friendEmail,
      blockList: { $in: [userEmail] },
    },
    { _id: 1 }
  );

  if (isBlocked) {
    res.json({ message: "blocked" });
  } else {
    res.json({ message: "unblocked" });
  }
});

export default checkBlocked;
