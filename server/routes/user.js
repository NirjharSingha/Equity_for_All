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
import friendSuggession from "../controllers/friendSuggessions.js";

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
router.get("/getFriendSuggessions", verifyJWT, friendSuggession);
router.get("/countMutualFriends", verifyJWT, countMutualFriends);
router.put("/updateFriends", verifyJWT, updateFriends);
router.get("/isBlocked", verifyJWT, checkBlocked);
export default router;
