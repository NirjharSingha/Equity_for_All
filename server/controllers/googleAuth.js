import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const googleAuth = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user == null) {
    const { name, profilePic } = req.body;
    const createdAt = new Date(Date.now()).toISOString();
    const user = new User({
      name,
      email,
      profilePic,
      createdAt,
    });
    try {
      await user.save();
    } catch {
      res.status(409).json({ error: "cannot create user" });
    }
  }

  const expiresIn = "1d";
  const token = jwt.sign({ email }, process.env.jwt_secret, { expiresIn });
  return res.status(200).json({ message: "Successful login", token: token });
});

export default googleAuth;
