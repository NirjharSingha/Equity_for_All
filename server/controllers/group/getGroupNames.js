import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import Group from "../../models/Group.js";

const getGroupNames = asyncHandler(async (req, res) => {
  const email = req.email;
  const groupsCreated = await Group.find(
    { admin: email },
    "_id groupName groupImage"
  );
  const groupsJoined = await Group.find(
    { allMembers: { $in: [email] } },
    "_id groupName groupImage"
  );
  const reqSent = await Group.find(
    { reqReceived: { $in: [email] } },
    "_id groupName groupImage groupVisibility"
  );
  const invitationReceived = await Group.find(
    { invitationSent: { $in: [email] } },
    "_id groupName groupImage groupVisibility"
  );
  let groupSuggessions = [];

  const friendObj = await User.findOne({ email }, "friends");
  const friendsList = friendObj.friends;
  groupSuggessions = await Group.aggregate([
    { $match: { allMembers: { $in: friendsList } } },
    { $unwind: "$allMembers" },
    {
      $group: {
        _id: "$_id",
        groupName: { $first: "$groupName" },
        groupImage: { $first: "$groupImage" },
        groupVisibility: { $first: "$groupVisibility" },
        friendsCount: {
          $sum: { $cond: [{ $in: ["$allMembers", friendsList] }, 1, 0] },
        },
      },
    },
    { $sort: { friendsCount: -1 } },
    { $limit: 10 },
  ]);
  if (groupSuggessions.length == 0) {
    if (
      groupsCreated.length == 0 &&
      groupsJoined.length == 0 &&
      reqSent.length == 0 &&
      invitationReceived.length == 0
    ) {
      groupSuggessions = await Group.find(
        {},
        "_id groupName groupImage groupVisibility"
      ).limit(5);
    }
  }
  let allGroupIds = new Set();

  [groupsCreated, groupsJoined, reqSent, invitationReceived].forEach(
    (groupList) => {
      groupList.forEach((group) => {
        allGroupIds.add(group._id.toString());
      });
    }
  );

  let uniqueGroupSuggestions = groupSuggessions.filter((group) => {
    return !allGroupIds.has(group._id.toString());
  });

  return res.json({
    createdGroups: groupsCreated,
    joinedGroups: groupsJoined,
    reqSentGroups: reqSent,
    invitationReceivedGroups: invitationReceived,
    groupSuggessions: uniqueGroupSuggestions,
  });
});

export default getGroupNames;
