import asyncHandler from "express-async-handler";
import InboxMessage from "../../models/InboxMessage.js";

const updateLike = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { selectedLike } = req.body;

  const updatedChat = await InboxMessage.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        react: selectedLike,
      },
    },
    { new: true }
  );

  if (updatedChat) {
    res.status(200).json(updatedChat);
  }
});

export default updateLike;
