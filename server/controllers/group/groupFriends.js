import asyncHandler from "express-async-handler";
import Group from "../../models/Group.js";
import User from "../../models/User.js";

const groupFriends = asyncHandler(async (req, res) => {
  const groupId = req.params.groupId;
  const email = req.email;
  const user = await User.findOne({ email }, "friends");
  const group = await Group.findOne({ _id: groupId }, "allMembers");
  const userFriends = user.friends;
  const groupMembers = group.allMembers;

  const commonFriends = userFriends.filter((friend) =>
    groupMembers.includes(friend)
  );

  const userPic = await User.find(
    { email: { $in: commonFriends } },
    "profilePic"
  );

  const profilePic = userPic.map((data) => data.profilePic);
  const finalPic = profilePic.filter((pic) => pic !== "");
  const firstEightPics = finalPic.length > 8 ? finalPic.slice(0, 8) : finalPic;

  if (firstEightPics) {
    res.status(200).json({ count: commonFriends.length, pic: firstEightPics });
  } else {
    res.status(404).json({ error: "Group not found." });
  }
});

export default groupFriends;
