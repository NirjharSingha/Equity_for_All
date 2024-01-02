import Notification from "../../models/Notification.js";
import asyncHandler from "express-async-handler";

const deleteAll = asyncHandler(async (req, res) => {
  const userEmail = req.email;

  try {
    const deletedNotifications = await Notification.deleteMany({ userEmail });

    if (deletedNotifications) {
      return res.status(200).json({
        message: "All Notifications deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteAll;
