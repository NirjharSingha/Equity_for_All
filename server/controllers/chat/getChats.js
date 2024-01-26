import asyncHandler from "express-async-handler";
import InboxMessage from "../../models/InboxMessage.js";

const getChats = asyncHandler(async (req, res) => {
  const idsString = req.query.ids;
  if (idsString.length <= 1) {
    res.send([]);
    return;
  }
  const idArray = idsString.split(",").filter((id) => id);

  try {
    const dataToSend = await Promise.all(
      idArray.map(async (id) => {
        const chat = await InboxMessage.findOne({ _id: id });
        return chat;
      })
    );
    res.json(dataToSend);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
});

export default getChats;
