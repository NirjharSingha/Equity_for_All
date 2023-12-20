import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import uploadToCloudinary from "../../utils/cloudinaryUpload.js";

const register = asyncHandler(async (req, res) => {
  let profilePic;
  if (req.file === undefined) {
    profilePic = "";
  } else {
    profilePic = await uploadToCloudinary(req.file);
  }

  const {
    name,
    email,
    password,
    gender,
    country,
    countryCode,
    city,
    dob,
    school,
    college,
    university,
    workplace,
    contactNumber,
    relationshipStatus,
    profileStatus,
    reasonOfBeingHere,
    aboutYourself,
    createdAt,
  } = req.body;

  const user = new User({
    name,
    email,
    password,
    gender,
    country,
    countryCode,
    city,
    dob,
    school,
    college,
    university,
    workplace,
    contactNumber,
    relationshipStatus,
    profileStatus,
    reasonOfBeingHere,
    aboutYourself,
    profilePic,
    createdAt,
  });

  try {
    await user.save();
    const expiresIn = "1d";
    const token = jwt.sign({ email }, process.env.jwt_secret, { expiresIn });
    res
      .status(201)
      .json({ message: "user registered successfully", token: token });
  } catch {
    res.status(409).json({ error: "Gmail address is already taken." });
  }
});

export default register;
