import asyncHandler from "express-async-handler";
import Story from "../../models/Story.js";
import uploadToCloudinary from "../../utils/cloudinaryUpload.js";

const editStory = asyncHandler(async (req, res) => {
  const {
    storyDescription,
    storyVisibility,
    backgroundColor,
    fontStyle,
    fontColor,
    updatedAt,
    id,
    prevBg,
  } = req.body;
  let backgroundImage;

  if (req.file === undefined) {
    backgroundImage = prevBg;
  } else {
    backgroundImage = await uploadToCloudinary(req.file);
  }

  const updatedStory = await Story.findOneAndUpdate(
    { _id: id },
    {
      storyDescription,
      storyVisibility,
      backgroundColor,
      fontStyle,
      fontColor,
      updatedAt,
      backgroundImage,
    },
    { new: true }
  );

  if (updatedStory) {
    return res.status(200).json({
      message: "Story updated successfully",
      updatedStory: updatedStory,
    });
  } else {
    return res.status(404).json({ error: "Story not found" });
  }
});

export default editStory;
