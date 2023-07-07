import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
  let profilePic;
  if (req.file === undefined) {
    profilePic = "";
  } else {
    profilePic = process.env.server_url + req.file.path;
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
    reasonOfBeingHere,
    opinionOnEquity,
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
    reasonOfBeingHere,
    opinionOnEquity,
    profilePic,
    createdAt,
  });

  await user.save();
  const expiresIn = "1h";
  const token = jwt.sign({ email }, process.env.jwt_secret, { expiresIn });
  res
    .status(201)
    .json({ message: "user registered successfully", token: token });
});

export default register;
