import asyncHandler from "express-async-handler";
import Story from "../../models/Story.js";

const createStory = asyncHandler(async (req, res) => {
  const userEmail = req.email;
  let backgroundImage;

  if (req.file === undefined) {
    backgroundImage = "";
  } else {
    backgroundImage = process.env.server_url + req.file.path;
  }

  const {
    storyDescription,
    storyVisibility,
    backgroundColor,
    fontStyle,
    fontColor,
    createdAt,
  } = req.body;

  const story = new Story({
    userEmail,
    storyDescription,
    storyVisibility,
    backgroundColor,
    backgroundImage,
    fontStyle,
    fontColor,
    createdAt,
  });

  await story.save();

  res.status(201).json({
    message: "story created successfully",
    story: story,
  });
});

export default createStory;
