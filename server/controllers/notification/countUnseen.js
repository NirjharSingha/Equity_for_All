import asyncHandler from "express-async-handler";
import Notification from "../../models/Notification.js";

const countUnseen = asyncHandler(async (req, res) => {
  const userEmail = req.email;

  try {
    const countOfUnseenNotifications = await Notification.countDocuments({
      userEmail,
      isSeen: false,
    });
    res.json(countOfUnseenNotifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching notifications" });
  }
});

export default countUnseen;
