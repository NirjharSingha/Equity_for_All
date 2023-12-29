import express from "express";
import commentSSE from "../controllers/api/commentSSE.js";
import deleteFile from "../controllers/api/deleteFile.js";
import searchResult from "../controllers/api/searchResult.js";
import personSearch from "../controllers/api/personSearch.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import cors from "cors";

const router = express.Router();

router.get("/commentSSE", cors(), commentSSE);
router.get("/personSearch", verifyJWT, personSearch);
router.get("/searchResult", searchResult);
router.delete("/deleteFile", deleteFile);

export default router;
