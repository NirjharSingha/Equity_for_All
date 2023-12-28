import asyncHandler from "express-async-handler";
import Group from "../../models/Group.js";

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
    return res.status(200).json({
      email: email,
      message: "Action done successfully",
    });
  } catch (error) {
    console.log("inside catch");
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default addOrRemove;
