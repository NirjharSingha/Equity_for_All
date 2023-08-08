import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const updateProfile = asyncHandler(async (req, res) => {
  let {
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
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  let updatedUser;

  if (req.file === undefined) {
    updatedUser = await User.findOneAndUpdate(
      { email: req.email },
      {
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
      },
      { new: true }
    );
  } else {
    let profilePic = process.env.server_url + req.file.path;
    updatedUser = await User.findOneAndUpdate(
      { email: req.email },
      {
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
      },
      { new: true }
    );
  }

  if (updatedUser) {
    const expiresIn = "1h";
    const token = jwt.sign({ email }, process.env.jwt_secret, { expiresIn });
    return res
      .status(200)
      .json({ message: "User updated successfully", token: token });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

export default updateProfile;
