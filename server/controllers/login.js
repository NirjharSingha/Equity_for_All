import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const isValidEmail = await User.findOne({ email });
  if (!isValidEmail) {
    return res.status(400).json({ error: "Invalid gmail" });
  }
  const isValidPassword = await User.findOne({ email, password });
  if (!isValidPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }
  return res.status(200).json({ message: "Successful login" });
});

export default login;
