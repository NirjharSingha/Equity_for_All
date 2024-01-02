import asyncHandler from "express-async-handler";
import Notification from "../../models/Notification.js";

const allNotifications = asyncHandler(async (req, res) => {
  const userEmail = req.query.userEmail;

  try {
    const notifications = await Notification.find({ userEmail });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching notifications" });
  }
});

export default allNotifications;
