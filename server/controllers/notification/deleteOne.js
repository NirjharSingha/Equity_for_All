import Notification from "../../models/Notification.js";
import asyncHandler from "express-async-handler";

const deleteOne = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (deletedNotification) {
      return res.status(200).json({
        message: "Notification deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteOne;
