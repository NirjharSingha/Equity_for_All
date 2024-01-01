import asyncHandler from "express-async-handler";
import Group from "../../models/Group.js";
import uploadToCloudinary from "../../utils/cloudinaryUpload.js";
import { sendSseDataToClients } from "../../utils/sse.js";
import Notification from "../../models/Notification.js";

const editGroup = asyncHandler(async (req, res) => {
  const { groupName, groupVisibility, _id, updatedAt, deleteFile } = req.body;
  let updatedGroup;
  const group = await Group.findOne({ _id }, "groupName allMembers");

  if (req.file === undefined) {
    if (deleteFile === "deleted") {
      updatedGroup = await Group.findOneAndUpdate(
        { _id },
        {
          groupName,
          groupVisibility,
          updatedAt,
          groupImage: "",
        },
        { new: true }
      );
    } else {
      updatedGroup = await Group.findOneAndUpdate(
        { _id },
        {
          groupName,
          groupVisibility,
          updatedAt,
        },
        { new: true }
      );
    }
  } else {
    updatedGroup = await Group.findOneAndUpdate(
      { _id },
      {
        groupName,
        groupVisibility,
        updatedAt,
        groupImage: await uploadToCloudinary(req.file),
      },
      { new: true }
    );
  }

  if (updatedGroup) {
    res.status(200).json({
      message: "Group updated successfully",
      updatedGroup: updatedGroup,
    });

    const groupMembers = group.allMembers;

    let notifications = [];
    groupMembers.forEach((member) => {
      const notification = new Notification({
        userEmail: member,
        message: `The admin has updated the group ${group.groupName}`,
        time: new Date(Date.now()).toLocaleString(),
        isSeen: false,
      });
      notifications.push(notification);
    });

    const insertedNotifications = await Notification.insertMany(notifications);
    if (insertedNotifications) {
      groupMembers.forEach((member) => {
        sendSseDataToClients(
          `The admin has updated the group ${group.groupName}`,
          member
        );
      });
    }
  } else {
    return res.status(404).json({ error: "Group not found" });
  }
});

export default editGroup;
