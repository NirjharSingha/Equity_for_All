import express from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import validateGmailUniqueness from "../middlewares/validateGmailUniqueness.js";
import upload from "../middlewares/multer.js";
import googleAuth from "../controllers/googleAuth.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const router = express.Router();

router.post(
  "/reg",
  [validateGmailUniqueness, upload.single("profilePic")],
  register
);
router.post("/login", login);
router.post("/googleAuth", googleAuth);
router.get("/verifyJWT", verifyJWT);

export default router;
