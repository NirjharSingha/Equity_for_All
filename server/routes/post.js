import express from "express";
import upload from "../middlewares/multer.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import createPost from "../controllers/createPost.js";
import getAllPosts from "../controllers/getAllPosts.js";
import handlePostLike from "../controllers/handlePostLike.js";
import createComment from "../controllers/createComment.js";
import getComments from "../controllers/getComments.js";
import handleCommentLike from "../controllers/handleCommentLike.js";

const router = express.Router();

router.post(
  "/createPost",
  [verifyJWT, upload.array("postAttachments")],
  createPost
);
router.get("/all", getAllPosts);
router.put("/postOptions/postLike", verifyJWT, handlePostLike);
router.put("/postOptions/commentLike", verifyJWT, handleCommentLike);
router.put("/postOptions/createComment", createComment);
router.get("/postOptions/getComments/:postId", getComments);

export default router;
