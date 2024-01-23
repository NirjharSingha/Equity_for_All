import asyncHandler from "express-async-handler";
import InboxMessage from "../../models/InboxMessage.js";

const makeSeen = asyncHandler(async (req, res) => {
  const { sender } = req.params;
  const receiver = req.email;

  const updatedChat = await InboxMessage.updateMany(
    { sender, receiver, isSeen: false },
    {
      $set: {
        isSeen: true,
      },
    }
  );

  if (updatedChat) {
    res.status(200).json({ message: "Chat seen" });
  }
});

export default makeSeen;
