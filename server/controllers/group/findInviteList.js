import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import Group from "../../models/Group.js";

const findInviteList = asyncHandler(async (req, res) => {
  const email = req.email;
  let { flag, id } = req.query;

  const user = await User.findOne({ email }, "friends");

  if (user) {
    const group = await Group.findOne(
      { _id: id },
      "admin allMembers invitationSent reqReceived"
    );
    if (group) {
      const { admin, allMembers, invitationSent, reqReceived } = group;
      const friends = user.friends;
      const selectedFriends = friends.filter((friend) => {
        return (
          friend !== admin &&
          !allMembers.includes(friend) &&
          !invitationSent.includes(friend) &&
          !reqReceived.includes(friend)
        );
      });

      const dataToSend = await User.find(
        { email: { $in: selectedFriends } },
        "email name profilePic"
      );
      if (dataToSend) {
        res.json(dataToSend);
      }
    } else {
      res.status(404).json({ error: "Group not found." });
    }
  } else {
    res.status(404).json({ error: "User not found." });
  }
});

export default findInviteList;
