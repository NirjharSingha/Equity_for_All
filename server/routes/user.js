import express from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import validateGmailUniqueness from "../middlewares/validateGmailUniqueness.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import profile from "../controllers/profile.js";
import updateProfile from "../controllers/updateProfile.js";
import upload from "../middlewares/multer.js";
import handleUser from "../controllers/handleUser.js";
import getUserInfo from "../controllers/getUserInfo.js";
import getFriendList from "../controllers/getFriendList.js";
import getFriendSuggession from "../controllers/getFriendSuggessions.js";
import countMutualFriends from "../controllers/countMutualFriends.js";
import updateFriends from "../controllers/updateFriends.js";
import checkBlocked from "../controllers/checkBlocked.js";
import birthdays from "../controllers/birthdays.js";
import googleAuth from "../controllers/googleAuth.js";

const router = express.Router();

router.post(
  "/reg",
  [validateGmailUniqueness, upload.single("profilePic")],
  register
);
router.post("/login", login);
router.get("/profile", verifyJWT, profile);
router.put(
  "/updateProfile",
  [verifyJWT, validateGmailUniqueness, upload.single("profilePic")],
  updateProfile
);
router.put("/addPostID", handleUser);
router.put("/removePostID", handleUser);
router.get("/info/:email", getUserInfo);
router.get("/getFriends", verifyJWT, getFriendList);
router.get("/getFriendSuggessions", verifyJWT, getFriendSuggession);
router.get("/countMutualFriends", verifyJWT, countMutualFriends);
router.put("/updateFriends", verifyJWT, updateFriends);
router.get("/isBlocked", verifyJWT, checkBlocked);
router.get("/friendBirthdays", verifyJWT, birthdays);
router.get("/google/callback/login", (req, res) => {
  // Set the custom parameter to 'login' for login callback
  console.log("google auth");
  res.json({});
});
router.post("/googleAuth", googleAuth);

export default router;
