import asyncHandler from "express-async-handler";
import Story from "../../models/Story.js";
import User from "../../models/User.js";

const getOtherStories = asyncHandler(async (req, res) => {
  const email = req.email;
  const friendsData = await User.findOne({ email }, "friends");
  const { friends } = friendsData;

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 24); // Calculate the date 24 hours ago

  const stories = await Story.aggregate([
    {
      $match: {
        $and: [
          { userEmail: { $in: [...friends] } },
          // { createdAt: { $gte: currentDate } }, // Created within the last 24 hours
          { storyVisibility: { $in: ["Anyone", "Friends"] } },
        ],
      },
    },
    {
      $limit: 100,
    },
  ]);

  let userStories = {};

  stories.forEach((story) => {
    const { userEmail } = story;
    if (!userStories[userEmail]) {
      userStories[userEmail] = [story];
    } else {
      userStories[userEmail].push(story);
    }
  });

  const userCount = Object.keys(userStories).length;

  if (userCount < 4) {
    const otherStories = await Story.aggregate([
      {
        $match: {
          $and: [
            { userEmail: { $nin: [...friends, email] } },
            // { createdAt: { $gte: currentDate } }, // Created within the last 24 hours
            { storyVisibility: { $in: ["Anyone"] } },
          ],
        },
      },
      {
        $limit: 50,
      },
    ]);

    otherStories.forEach((story) => {
      const { userEmail } = story;
      if (!userStories[userEmail]) {
        userStories[userEmail] = [story];
      } else {
        userStories[userEmail].push(story);
      }
    });
  }

  const reversedStoriesObject = {};
  for (const userEmail in userStories) {
    const eachUserStories = userStories[userEmail];
    const reversedUserStories = eachUserStories.reverse();
    reversedStoriesObject[userEmail] = reversedUserStories;
  }

  if (reversedStoriesObject) {
    res.status(200).json(reversedStoriesObject);
  } else {
    res.status(404).json({ error: "error in fetching your story." });
  }
});

export default getOtherStories;
