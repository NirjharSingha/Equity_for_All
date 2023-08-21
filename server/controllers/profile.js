import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const profile = asyncHandler(async (req, res) => {
  let email = req.email;
  const friendEmail = req.query.friendEmail;
  if (friendEmail !== "undefined") {
    email = friendEmail;
  }
  const user = await User.findOne(
    { email },
    "name email gender country city dob school college university workplace contactNumber relationshipStatus profileStatus reasonOfBeingHere aboutYourself profilePic"
  );

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found." });
  }
});

export default profile;
