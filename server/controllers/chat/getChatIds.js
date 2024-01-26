import asyncHandler from "express-async-handler";
import InboxMessage from "../../models/InboxMessage.js";

const getChatIds = asyncHandler(async (req, res) => {
  const userId1 = req.email;
  const userId2 = req.params.userId2;

  try {
    const chatIdsObjects = await InboxMessage.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    })
      .sort({ time: -1 })
      .select("_id") // Project only the _id field
      .exec();

    const chatIdsArray = chatIdsObjects.map((chat) => chat._id);

    res.json(chatIdsArray);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default getChatIds;
