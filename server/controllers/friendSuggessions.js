import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const friendSuggession = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}, { email: 1 }); // Projection to select only email
    // Extract emails from the users array
    const emails = users.map((user) => user.email);
    res.json(emails);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.json({ error: error });
  }
});

export default friendSuggession;
