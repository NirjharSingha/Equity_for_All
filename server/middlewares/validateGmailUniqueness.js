import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const validateGmailUniqueness = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "Gmail address is already taken." });
  }
  next();
});

export default validateGmailUniqueness;
