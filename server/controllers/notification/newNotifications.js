import asyncHandler from "express-async-handler";
import Notification from "../../models/Notification.js";

const newNotifications = asyncHandler(async (req, res) => {
  const userEmail = req.email;

  try {
    const notifications = await Notification.find({ userEmail, isSeen: false });
    console.log(notifications);

    if (notifications.length > 0) {
      let ids = [];
      notifications.forEach((notification) => {
        ids.push(notification._id);
      });

      const updatedNotifications = await Notification.updateMany(
        { _id: { $in: ids } },
        { $set: { isSeen: true } }
      );

      if (updatedNotifications) {
        console.log(`notifications updated.`);
      }
    }

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching notifications" });
  }
});

export default newNotifications;
