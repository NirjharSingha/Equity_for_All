import asyncHandler from "express-async-handler";
import User from "../../models/User.js";

const getUserInfo = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email }, "name profilePic");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found." });
  }
});

export default getUserInfo;
