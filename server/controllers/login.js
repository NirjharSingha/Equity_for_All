import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "password");

  if (user == null) {
    return res.status(400).json({ error: "Invalid gmail" });
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid password" });
  }
  return res.status(200).json({ message: "Successful login" });
});

export default login;
