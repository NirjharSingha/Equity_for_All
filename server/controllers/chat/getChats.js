import asyncHandler from "express-async-handler";
import InboxMessage from "../../models/InboxMessage.js";

const getChats = asyncHandler(async (req, res) => {
  const userId1 = req.email;
  const userId2 = req.params.userId2;

  try {
    const chats = await InboxMessage.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    })
      .sort({ time: -1 })
      .exec();

    res.json(chats);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default getChats;
