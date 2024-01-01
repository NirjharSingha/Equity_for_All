import asyncHandler from "express-async-handler";
import Group from "../../models/Group.js";
import { sendSseDataToClients } from "../../utils/sse.js";
import Notification from "../../models/Notification.js";

const deleteGroup = asyncHandler(async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findOne({ _id: groupId }, "groupName allMembers");

  try {
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    } else {
      res.status(200).json({
        message: "Group deleted successfully",
      });

      const groupMembers = group.allMembers;

      let notifications = [];
      groupMembers.forEach((member) => {
        const notification = new Notification({
          userEmail: member,
          message: `The admin has deleted the group ${group.groupName}`,
          time: new Date(Date.now()).toLocaleString(),
          isSeen: false,
        });
        notifications.push(notification);
      });

      const insertedNotifications = await Notification.insertMany(
        notifications
      );
      if (insertedNotifications) {
        groupMembers.forEach((member) => {
          sendSseDataToClients(
            `The admin has deleted the group ${group.groupName}`,
            member
          );
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteGroup;
