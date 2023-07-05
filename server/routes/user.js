import express from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import validateGmailUniqueness from "../middlewares/validateGmailUniqueness.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import profile from "../controllers/profile.js";

const router = express.Router();

router.post("/reg", validateGmailUniqueness, register);
router.post("/login", login);
router.get("/profile", verifyJWT, profile);

export default router;
