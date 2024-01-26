import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import getChatUsers from "../controllers/chat/getChatUsers.js";
import upload from "../middlewares/multer.js";
import createChat from "../controllers/chat/createChat.js";
import getChatIds from "../controllers/chat/getChatIds.js";
import editChat from "../controllers/chat/editChat.js";
import deleteChat from "../controllers/chat/deleteChat.js";
import updateLike from "../controllers/chat/updateLike.js";
import makeSeen from "../controllers/chat/makeSeen.js";
import seenById from "../controllers/chat/seenById.js";
import getChats from "../controllers/chat/getChats.js";

const router = express.Router();

router.get("/getChatUsers", verifyJWT, getChatUsers);
router.post(
  "/createChat",
  [verifyJWT, upload.array("chatAttachments")],
  createChat
);
router.put("/editChat", [verifyJWT, upload.array("chatAttachments")], editChat);
router.get("/getChats", verifyJWT, getChats);
router.put("/updateLike/:id", verifyJWT, updateLike);
router.put("/makeSeen/:sender", verifyJWT, makeSeen);
router.put("/seenById/:id", verifyJWT, seenById);
router.delete("/deleteChat/:chatId", verifyJWT, deleteChat);
router.get("/getChatIds/:userId2", verifyJWT, getChatIds);

export default router;
