import express from "express";
import upload from "../configs/multerConfig.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import createPost from "../controllers/createPost.js";

const router = express.Router();

router.post(
  "/createPost",
  [verifyJWT, upload.array("postAttachments")],
  createPost
);

export default router;
