import Group from "../../models/Group.js";
import asyncHandler from "express-async-handler";

const getGroup = asyncHandler(async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findOne(
    { _id: groupId },
    "_id admin groupName groupImage groupVisibility"
  );
  if (group) {
    res.json(group);
  }
});

export default getGroup;
