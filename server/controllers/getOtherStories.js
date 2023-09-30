import asyncHandler from "express-async-handler";
import Story from "../models/Story.js";
import User from "../models/User.js";

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
          { userEmail: { $in: [...friends] } }, // Include user and friends
          { createdAt: { $gte: currentDate } }, // Created within the last 24 hours
          { storyVisibility: { $in: ["Anyone", "Friends"] } }, // Visibility is "anyone" or "friends"
        ],
      },
    },
    {
      $limit: 100, // Limit the result to 100 stories
    },
  ]);

  // console.log(stories);
  let userStories = {};

  stories.forEach((story) => {
    const { userEmail } = story;

    // Check if the userEmail is already a key in userStories
    if (!userStories[userEmail]) {
      // If not, create a new key with an array containing the current story
      userStories[userEmail] = [story];
    } else {
      // If yes, push the current story to the existing array
      userStories[userEmail].push(story);
    }
  });

  const userCount = Object.keys(userStories).length;

  if (userCount < 4) {
    const otherStories = await Story.aggregate([
      {
        $match: {
          $and: [
            { userEmail: { $nin: [...friends, email] } }, // Include user and friends
            { createdAt: { $gte: currentDate } }, // Created within the last 24 hours
            { storyVisibility: { $in: ["Anyone"] } }, // Visibility is "anyone"
          ],
        },
      },
      {
        $limit: 50, // Limit the result to 100 stories
      },
    ]);

    otherStories.forEach((story) => {
      const { userEmail } = story;

      // Check if the userEmail is already a key in userStories
      if (!userStories[userEmail]) {
        // If not, create a new key with an array containing the current story
        userStories[userEmail] = [story];
      } else {
        // If yes, push the current story to the existing array
        userStories[userEmail].push(story);
      }
    });
  }

  const reversedStoriesObject = {};

  // Iterate over each user (key) in the object
  for (const userEmail in userStories) {
    // userEmail is the user's email (e.g., 'user121@gmail.com')
    const eachUserStories = userStories[userEmail]; // Array of story objects for the user

    // Reverse the array to have the last created story at the top
    const reversedUserStories = eachUserStories.reverse();

    // Add the reversed array to the new object
    reversedStoriesObject[userEmail] = reversedUserStories;
  }

  console.log(reversedStoriesObject);

  if (reversedStoriesObject) {
    res.status(200).json(reversedStoriesObject);
  } else {
    res.status(404).json({ error: "error in fetching your story." });
  }
});

export default getOtherStories;
