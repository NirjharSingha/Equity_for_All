import asyncHandler from "express-async-handler";
import InboxMessage from "../../models/InboxMessage.js";
import User from "../../models/User.js";

const getChatList = asyncHandler(async (req, res) => {
  const userId = req.email;

  try {
    const chatList = await InboxMessage.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $project: {
          otherUserId: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$receiver",
              else: "$sender",
            },
          },
          time: 1,
        },
      },
      {
        $sort: { time: -1 },
      },
      {
        $group: {
          _id: "$otherUserId",
          lastMessageTime: { $first: "$time" },
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    if (chatList) {
      const uniqueUserIds = chatList.map((entry) => entry._id);

      const unreadCounts = [];
      for (const otherUserId of uniqueUserIds) {
        const unreadCount = await InboxMessage.countDocuments({
          $and: [{ sender: otherUserId, receiver: userId, isSeen: false }],
        });

        unreadCounts.push({ id: otherUserId, unreadCount });
      }

      const friendsData = await User.findOne(
        { email: userId },
        "friends blockList"
      );

      const friends = friendsData.friends;
      const filteredFriends = friends.filter(
        (friend) => !uniqueUserIds.includes(friend)
      );

      const mergedChatList = unreadCounts.concat(
        filteredFriends.map((friend) => ({ id: friend, unreadCount: 0 }))
      );

      const chatUserInfoList = [];

      for (const chatId of mergedChatList) {
        const userInfo = await User.findOne(
          { email: chatId.id },
          "name profilePic"
        );

        chatUserInfoList.push({
          id: chatId.id,
          unreadCount: chatId.unreadCount,
          name: userInfo.name,
          profilePic: userInfo.profilePic,
        });
      }

      const dataToSend = {
        mergedChatList: chatUserInfoList,
        blockList: friendsData.blockList,
      };

      console.log(dataToSend);

      res.json(dataToSend);
    }
  } catch (error) {
    res.json(error);
  }
});

export default getChatList;
