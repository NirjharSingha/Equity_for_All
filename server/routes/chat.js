import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import getChatList from "../controllers/chat/getChatList.js";

const router = express.Router();

router.get("/getChatUsers", verifyJWT, getChatList);

export default router;
