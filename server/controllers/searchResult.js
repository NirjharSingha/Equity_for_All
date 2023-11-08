import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Group from "../models/Group.js";

const searchResult = asyncHandler(async (req, res) => {
  const value = req.query.value;
  const users = await User.find(
    { name: { $regex: value, $options: "i" } },
    "name profilePic"
  );

  const usersWithFlag = users.map((user) => ({
    _id: user._id,
    name: user.name,
    pic: user.profilePic,
    flag: "user",
  }));

  const groups = await Group.find(
    { groupName: { $regex: value, $options: "i" } },
    "groupName groupImage"
  );

  const groupsWithFlag = groups.map((group) => ({
    _id: group._id,
    name: group.groupName,
    pic: group.groupImage,
    flag: "group",
  }));

  // Merge usersWithFlag and groupsWithFlag arrays
  const mergedResults = usersWithFlag.concat(groupsWithFlag);

  res.status(200).json(mergedResults);
});

export default searchResult;
