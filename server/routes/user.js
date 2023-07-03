import express from "express";
import register from "../controllers/register.js";
import validateGmailUniqueness from "../middlewares/validateGmailUniqueness.js";

const router = express.Router();

router.post("/reg", validateGmailUniqueness, register);

export default router;
