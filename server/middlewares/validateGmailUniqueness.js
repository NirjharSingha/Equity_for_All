import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const validateGmailUniqueness = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("duplicate email");
    return;
  }
  next();
});

export default validateGmailUniqueness;
