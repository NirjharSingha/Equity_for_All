import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    country,
    city,
    dob,
    school,
    college,
    university,
    workplace,
    contactNumber,
    relationshipStatus,
    reasonOfBeingHere,
    opinionOnEquity,
    profilePic,
    createdAt,
  } = req.body;

  const user = new User({
    name,
    email,
    password,
    gender,
    country,
    city,
    dob,
    school,
    college,
    university,
    workplace,
    contactNumber,
    relationshipStatus,
    reasonOfBeingHere,
    opinionOnEquity,
    profilePic,
    createdAt,
  });

  await user.save();
  res.status(201).json({ message: "user registered successfully" });
});

export default register;
