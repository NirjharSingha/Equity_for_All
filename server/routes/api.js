import express from "express";
import fileFind from "../controllers/fileFind.js";

const router = express.Router();

router.get("/files/check", fileFind);

export default router;
