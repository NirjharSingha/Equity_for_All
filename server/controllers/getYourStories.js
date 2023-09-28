import asyncHandler from "express-async-handler";
import Story from "../models/Story.js";

const getYourStories = asyncHandler(async (req, res) => {
  const email = req.email;
  const stories = await Story.find({ userEmail: email }, "_id createdAt");

  const currentTime = new Date();

  const filteredData = stories.filter((item) => {
    const createdAtTime = new Date(item.createdAt);
    const timeDifferenceInHours =
      (currentTime - createdAtTime) / (1000 * 60 * 60);

    return timeDifferenceInHours > 24;
  });

  for (let index = 0; index < filteredData.length; index++) {
    const _id = filteredData[index]._id;
    await Story.findByIdAndDelete(_id);
  }

  const validStories = await Story.find({ userEmail: email });

  if (validStories) {
    res.status(200).json(validStories);
  } else {
    res.status(404).json({ error: "error in fetching your story." });
  }
});

export default getYourStories;
