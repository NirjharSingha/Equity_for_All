import asyncHandler from "express-async-handler";
import User from "../../models/User.js";

const personSearch = asyncHandler(async (req, res) => {
  const email = req.email;
  const friendEmail = req.query.friendEmail;

  const user = await User.findOne(
    { email },
    "friends friendRequestSend friendRequestReceived blockList followings"
  );

  let friends = 0,
    friendRequestSend = 0,
    friendRequestReceived = 0,
    blockList = 0,
    followings = 0;

  if (user) {
    friends = user.friends && user.friends.includes(friendEmail) ? 1 : 0;
    friendRequestSend =
      user.friendRequestSend && user.friendRequestSend.includes(friendEmail)
        ? 1
        : 0;
    friendRequestReceived =
      user.friendRequestReceived &&
      user.friendRequestReceived.includes(friendEmail)
        ? 1
        : 0;
    blockList = user.blockList && user.blockList.includes(friendEmail) ? 1 : 0;
    followings =
      user.followings && user.followings.includes(friendEmail) ? 1 : 0;
  }

  const dataToSend = {
    friends,
    friendRequestSend,
    friendRequestReceived,
    blockList,
    followings,
  };

  if (dataToSend) {
    res.status(200).json(dataToSend);
  } else {
    res.status(404).json({ error: "Error occured." });
  }
});

export default personSearch;
