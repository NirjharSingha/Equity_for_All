import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "password");

  if (user == null) {
    return res.status(400).json({ error: "Invalid gmail" });
  } else if (user.password === undefined) {
    return res.status(400).json({ error: "Invalid password" });
  } else if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const expiresIn = 10;
  const token = jwt.sign({ email }, process.env.jwt_secret, { expiresIn });
  return res.status(200).json({ message: "Successful login", token: token });
});

export default login;
