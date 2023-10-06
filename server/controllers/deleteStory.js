import asyncHandler from "express-async-handler";
import Story from "../models/Story.js";

const deleteStory = asyncHandler(async (req, res) => {
  const storyId = req.params.storyId;

  try {
    const deletedStory = await Story.findByIdAndDelete(storyId);

    if (!deletedStory) {
      return res.status(404).json({ message: "Story not found" });
    }
    return res.status(200).json({
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting story:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteStory;
