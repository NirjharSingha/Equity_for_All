import asyncHandler from "express-async-handler";
import InboxMessage from "../../models/InboxMessage.js";
import uploadToCloudinary from "../../utils/cloudinaryUpload.js";

const createChat = asyncHandler(async (req, res) => {
  const userEmail = req.email;
  const { chatDescription, receiver, time } = req.body;

  let chatAttachments = [];

  if (req.files && req.files.length > 0) {
    // Upload each file to Cloudinary and wait for all uploads to complete
    chatAttachments = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadToCloudinary(file);
        return result;
      })
    );
  }

  const chat = new InboxMessage({
    sender: userEmail,
    receiver: receiver,
    messageText: chatDescription,
    messageAttachments: chatAttachments,
    time: time,
  });

  await chat.save();

  res.status(201).json({
    message: "chat created successfully",
    chat: chat,
  });
});

export default createChat;
