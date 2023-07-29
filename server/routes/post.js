import express from "express";
import upload from "../middlewares/multer.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import createPost from "../controllers/createPost.js";
import getAllPosts from "../controllers/getAllPosts.js";
import handlePostLike from "../controllers/handlePostLike.js";
import createComment from "../controllers/createComment.js";
import getComments from "../controllers/getComments.js";
import handleCommentLike from "../controllers/handleCommentLike.js";
import editOrDeleteComment from "../controllers/editOrDeleteComment.js";

const router = express.Router();

router.post(
  "/createPost",
  [verifyJWT, upload.array("postAttachments")],
  createPost
);
router.get("/all", verifyJWT, getAllPosts);
router.put("/postOptions/postLike", verifyJWT, handlePostLike);
router.put("/postOptions/commentLike", verifyJWT, handleCommentLike);
router.put("/postOptions/createComment", verifyJWT, createComment);
router.put("/postOptions/editOrDeleteComment", verifyJWT, editOrDeleteComment);
router.get("/postOptions/getComments/:postId", verifyJWT, getComments);

export default router;
