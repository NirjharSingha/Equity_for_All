import express from "express";
import commentSSE from "../controllers/api/commentSSE.js";
import deleteFile from "../controllers/api/deleteFile.js";
import searchResult from "../controllers/api/searchResult.js";

const router = express.Router();

router.get("/commentSSE", commentSSE);
router.get("/searchResult", searchResult);
router.delete("/deleteFile", deleteFile);

export default router;
