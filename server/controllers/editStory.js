import asyncHandler from "express-async-handler";
import Story from "../models/Story.js";

const editStory = asyncHandler(async (req, res) => {
  console.log("inside edit story");
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

  console.log(id);
  if (req.file === undefined) {
    backgroundImage = prevBg;
  } else {
    backgroundImage = process.env.server_url + req.file.path;
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

  console.log(updatedStory);

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
