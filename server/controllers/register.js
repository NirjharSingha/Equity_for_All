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

  const user = await User.create({
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
});

export default register;
