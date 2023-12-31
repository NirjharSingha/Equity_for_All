import asyncHandler from "express-async-handler";
import Group from "../../models/Group.js";
import { sendSseDataToClients } from "../../utils/sse.js";

const addOrRemove = asyncHandler(async (req, res) => {
  const groupId = req.body.groupId;
  const email = req.body.email;
  const action = req.body.action;
  const option = req.body.option;
  let updatedGroup;
  try {
    if (action === "add") {
      updatedGroup = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $push: { [option]: email } },
        { new: true }
      );
    } else {
      updatedGroup = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $pull: { [option]: email } },
        { new: true }
      );
    }
    if (!updatedGroup) {
      return res.status(404).json({ message: "error occured" });
    }
    res.status(200).json({
      email: email,
      message: "Action done successfully",
    });

    const notificationMessage = req.body.notificationMessage;
    const notificationTarget = req.body.notificationTarget;
    if (notificationMessage !== undefined && notificationMessage !== "") {
      sendSseDataToClients(notificationMessage, notificationTarget);
    }
  } catch (error) {
    console.log("inside catch");
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default addOrRemove;
