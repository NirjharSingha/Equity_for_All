import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import getChatList from "../controllers/chat/getChatList.js";
import upload from "../middlewares/multer.js";
import createChat from "../controllers/chat/createChat.js";

const router = express.Router();

router.get("/getChatUsers", verifyJWT, getChatList);
router.post(
  "/createChat",
  [verifyJWT, upload.array("chatAttachments")],
  createChat
);

export default router;
