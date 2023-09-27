import express from "express";
import fileFind from "../controllers/fileFind.js";
import commentSSE from "../controllers/commentSSE.js";
import deleteFile from "../controllers/deleteFile.js";

const router = express.Router();

router.get("/files/check", fileFind);
router.get("/commentSSE", commentSSE);
router.get("/deleteFile", deleteFile);

export default router;
