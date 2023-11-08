import express from "express";
import commentSSE from "../controllers/commentSSE.js";
import deleteFile from "../controllers/deleteFile.js";
import searchResult from "../controllers/searchResult.js";

const router = express.Router();

router.get("/commentSSE", commentSSE);
router.get("/searchResult", searchResult);
router.delete("/deleteFile", deleteFile);

export default router;
