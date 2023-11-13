import asyncHandler from "express-async-handler";
import Group from "../../models/Group.js";

const editGroup = asyncHandler(async (req, res) => {
  const { groupName, groupVisibility, _id, updatedAt, deleteFile } = req.body;
  let updatedGroup;

  if (req.file === undefined) {
    if (deleteFile === "deleted") {
      updatedGroup = await Group.findOneAndUpdate(
        { _id },
        {
          groupName,
          groupVisibility,
          updatedAt,
          groupImage: "",
        },
        { new: true }
      );
    } else {
      updatedGroup = await Group.findOneAndUpdate(
        { _id },
        {
          groupName,
          groupVisibility,
          updatedAt,
        },
        { new: true }
      );
    }
  } else {
    updatedGroup = await Group.findOneAndUpdate(
      { _id },
      {
        groupName,
        groupVisibility,
        updatedAt,
        groupImage: process.env.server_url + req.file.path,
      },
      { new: true }
    );
  }

  if (updatedGroup) {
    return res.status(200).json({
      message: "Group updated successfully",
      updatedGroup: updatedGroup,
    });
  } else {
    return res.status(404).json({ error: "Group not found" });
  }
});

export default editGroup;
