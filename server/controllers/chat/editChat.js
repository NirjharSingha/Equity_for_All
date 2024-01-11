import asyncHandler from "express-async-handler";
import InboxMessage from "../../models/InboxMessage.js";
import uploadToCloudinary from "../../utils/cloudinaryUpload.js";

const editChat = asyncHandler(async (req, res) => {
  const { chatDescription, prevFiles, id } = req.body;
  const updatedAt = new Date(Date.now());

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

  if (prevFiles !== undefined) {
    chatAttachments = chatAttachments.concat(prevFiles);
  }

  const updatedChat = await InboxMessage.findOneAndUpdate(
    { _id: id },
    {
      messageText: chatDescription,
      messageAttachments: chatAttachments,
      updatedAt: updatedAt,
    },
    { new: true }
  );

  if (updatedChat) {
    res.status(200).json(updatedChat);
  }
});

export default editChat;
