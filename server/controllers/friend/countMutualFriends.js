import asyncHandler from "express-async-handler";
import User from "../../models/User.js";

const countMutualFriends = asyncHandler(async (req, res) => {
  const userEmail = req.email;
  const friendEmail = req.query.friendEmail;

  User.findOne({ email: userEmail }, "friends")
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      User.findOne({ email: friendEmail }, "friends")
        .exec()
        .then((friend) => {
          if (!friend) {
            return res.status(404).json({ error: "Friend not found" });
          }

          const commonFriendsCount = user.friends.filter((email) =>
            friend.friends.includes(email)
          ).length;

          res.status(200).json({
            commonFriendsCount,
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "An error occurred" });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    });
});

export default countMutualFriends;
