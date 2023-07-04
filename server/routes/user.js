import express from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import validateGmailUniqueness from "../middlewares/validateGmailUniqueness.js";

const router = express.Router();

router.post("/reg", validateGmailUniqueness, register);
router.post("/login", login);

export default router;
