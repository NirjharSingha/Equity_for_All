import express from "express";
import upload from "../configs/multerConfig.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import createPost from "../controllers/createPost.js";
import getAllPosts from "../controllers/getAllPosts.js";
import handleLike from "../controllers/handleLike.js";
import createComment from "../controllers/createComment.js";
import getComments from "../controllers/getComments.js";

const router = express.Router();

router.post(
  "/createPost",
  [verifyJWT, upload.array("postAttachments")],
  createPost
);
router.get("/all", getAllPosts);
router.put("/postOptions/like", verifyJWT, handleLike);
router.put("/postOptions/createComment", createComment);
router.get("/postOptions/getComments/:postId", getComments);

export default router;
