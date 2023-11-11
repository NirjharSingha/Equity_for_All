import express from "express";
import validateGmailUniqueness from "../middlewares/validateGmailUniqueness.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import profile from "../controllers/profile/profile.js";
import updateProfile from "../controllers/profile/updateProfile.js";
import upload from "../middlewares/multer.js";
import getUserInfo from "../controllers/profile/getUserInfo.js";

const router = express.Router();

router.get("/", verifyJWT, profile);
router.put(
  "/updateProfile",
  [verifyJWT, validateGmailUniqueness, upload.single("profilePic")],
  updateProfile
);
router.get("/info/:email", getUserInfo);

export default router;
