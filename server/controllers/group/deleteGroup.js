import asyncHandler from "express-async-handler";
import Group from "../../models/Group.js";

const deleteGroup = asyncHandler(async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }
    return res.status(200).json({
      message: "Group deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteGroup;
