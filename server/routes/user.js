import express from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import validateGmailUniqueness from "../middlewares/validateGmailUniqueness.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import profile from "../controllers/profile.js";
import updateProfile from "../controllers/updateProfile.js";
import upload from "../configs/multerConfig.js";
import handleUser from "../controllers/handleUser.js";
import getUserInfo from "../controllers/getUserInfo.js";

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
router.put("/post", handleUser);
router.get("/info/:email", getUserInfo);

export default router;
