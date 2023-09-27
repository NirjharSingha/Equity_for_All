import express from "express";
import commentSSE from "../controllers/commentSSE.js";
import deleteFile from "../controllers/deleteFile.js";

const router = express.Router();

router.get("/commentSSE", commentSSE);
router.delete("/deleteFile", deleteFile);

export default router;
