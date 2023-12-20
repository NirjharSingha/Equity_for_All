import asyncHandler from "express-async-handler";
import Group from "../../models/Group.js";
import uploadToCloudinary from "../../utils/cloudinaryUpload.js";

const createGroup = asyncHandler(async (req, res) => {
  const userEmail = req.email;
  let backgroundImage;

  if (req.file === undefined) {
    backgroundImage = "";
  } else {
    backgroundImage = await uploadToCloudinary(req.file);
  }

  const { groupName, groupVisibility, createdAt } = req.body;

  const group = new Group({
    admin: userEmail,
    groupImage: backgroundImage,
    groupName,
    createdAt,
    groupVisibility,
  });

  await group.save();

  res.status(201).json({
    message: "group created successfully",
    group: group,
  });
});

export default createGroup;
