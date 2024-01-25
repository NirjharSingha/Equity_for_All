import asyncHandler from "express-async-handler";
import InboxMessage from "../../models/InboxMessage.js";

const seenById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedChat = await InboxMessage.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        isSeen: true,
      },
    }
  );

  if (updatedChat) {
    res.status(200).json({ message: "Chat seen by id" });
  }
});

export default seenById;
