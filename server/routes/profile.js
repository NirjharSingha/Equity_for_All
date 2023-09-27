import express from "express";
import validateGmailUniqueness from "../middlewares/validateGmailUniqueness.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import profile from "../controllers/profile.js";
import updateProfile from "../controllers/updateProfile.js";
import upload from "../middlewares/multer.js";
import getUserInfo from "../controllers/getUserInfo.js";

const router = express.Router();

router.get("/", verifyJWT, profile);
router.put(
  "/updateProfile",
  [verifyJWT, validateGmailUniqueness, upload.single("profilePic")],
  updateProfile
);
router.get("/info/:email", getUserInfo);

export default router;
