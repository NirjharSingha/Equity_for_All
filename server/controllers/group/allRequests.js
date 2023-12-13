import asyncHandler from "express-async-handler";
import Group from "../../models/Group.js";
import User from "../../models/User.js";

const allRequests = asyncHandler(async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findOne({ _id: groupId }, "reqReceived");
  const groupMembers = group.reqReceived;

  const dataToSend = await User.find(
    { email: { $in: groupMembers } },
    "email name profilePic"
  );

  if (dataToSend) {
    res.status(200).json(dataToSend);
  } else {
    res.status(404).json({ error: "Group not found." });
  }
});

export default allRequests;
