import asyncHandler from "express-async-handler";
import User from "../../models/User.js";

const getFriendSuggessions = asyncHandler(async (req, res) => {
  const idsString = req.query.ids;
  const idArray = idsString.split(",").filter((id) => id);

  if (idArray.length === 0) {
    const email = req.email;
    const user = await User.findOne(
      { email },
      "school college university workplace"
    );

    let matchingUsers = new Set();

    if (user.school !== "") {
      const usersFromSchool = await User.find({ school: user.school }, "email");
      usersFromSchool.forEach((u) => matchingUsers.add(u.email));
    }

    if (user.college !== "") {
      const usersFromCollege = await User.find(
        { college: user.college },
        "email"
      );
      usersFromCollege.forEach((u) => matchingUsers.add(u.email));
    }

    if (user.university !== "") {
      const usersFromUniversity = await User.find(
        { university: user.university },
        "email"
      );
      usersFromUniversity.forEach((u) => matchingUsers.add(u.email));
    }

    if (user.workplace !== "") {
      const usersFromWorkplace = await User.find(
        { workplace: user.workplace },
        "email"
      );
      usersFromWorkplace.forEach((u) => matchingUsers.add(u.email));
    }

    if (matchingUsers.size < 5) {
      const lastN = 30;
      const randomUsers = await User.aggregate([
        { $sort: { createdAt: -1 } },
        { $limit: lastN },
        { $project: { email: 1 } },
      ]);
      randomUsers.forEach((e) => {
        matchingUsers.add(e.email);
      });
    }

    const uniqueMatchingUsers = Array.from(matchingUsers);
    res.json(uniqueMatchingUsers);
  } else {
    try {
      const dataToSend = await Promise.all(
        idArray.map(async (id) => {
          const mutualFriends = await User.findOne(
            { email: id },
            "email friends"
          );
          return mutualFriends;
        })
      );

      const allFriendSuggessions = Array.from(
        new Set(dataToSend.flatMap((obj) => obj.friends))
      );
      if (allFriendSuggessions.length < 5) {
        const lastN = 30;
        const randomUsers = await User.aggregate([
          { $sort: { createdAt: -1 } },
          { $limit: lastN },
          { $project: { email: 1 } },
        ]);
        randomUsers.forEach((e) => {
          allFriendSuggessions.push(e.email);
        });
      }

      res.json(allFriendSuggessions);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "An error occurred while fetching posts" });
    }
  }
});

export default getFriendSuggessions;
