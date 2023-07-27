import express from "express";
import fileFind from "../controllers/fileFind.js";
import commentSSE from "../controllers/commentSSE.js";

const router = express.Router();

router.get("/files/check", fileFind);
router.get("/commentSSE", commentSSE);

export default router;
