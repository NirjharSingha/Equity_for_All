import asyncHandler from "express-async-handler";
import User from "../../models/User.js";

const chatSearchResult = asyncHandler(async (req, res) => {
  const value = req.query.value;
  const users = await User.find(
    { name: { $regex: value, $options: "i" } },
    "email name profilePic"
  );

  if (users) {
    const usersWithFlag = users.map((user) => ({
      id: user.email,
      name: user.name,
      profilePic: user.profilePic,
    }));
    res.status(200).json(usersWithFlag);
  }
});

export default chatSearchResult;
