import express from "express";
import upload from "../middlewares/multer.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import createPost from "../controllers/post/createPost.js";
import getAllPosts from "../controllers/post/getAllPosts.js";
import handlePostLike from "../controllers/post/handlePostLike.js";
import createComment from "../controllers/post/createComment.js";
import getComments from "../controllers/post/getComments.js";
import handleCommentLike from "../controllers/post/handleCommentLike.js";
import editOrDeleteComment from "../controllers/post/editOrDeleteComment.js";
import editPost from "../controllers/post/editPost.js";
import deletePost from "../controllers/post/deletePost.js";
import getOtherPostIDs from "../controllers/post/otherPostIDs.js";
import yourPostIDs from "../controllers/post/yourPostIDs.js";
import getCommentIds from "../controllers/post/getCommentIds.js";
import getSharedPost from "../controllers/post/getSharedPost.js";

const router = express.Router();

router.post(
  "/createPost",
  [verifyJWT, upload.array("postAttachments")],
  createPost
);
router.put("/editPost", [verifyJWT, upload.array("postAttachments")], editPost);
router.get("/all", verifyJWT, getAllPosts);
router.put("/postOptions/postLike", verifyJWT, handlePostLike);
router.put("/postOptions/commentLike", verifyJWT, handleCommentLike);
router.put("/postOptions/createComment", verifyJWT, createComment);
router.put("/postOptions/editOrDeleteComment", verifyJWT, editOrDeleteComment);
router.get("/postOptions/getComments/:postId", verifyJWT, getComments);
router.get("/postOptions/getCommentIds/:postId", verifyJWT, getCommentIds);
router.delete("/deletePost/:postId", verifyJWT, deletePost);
router.get("/getOtherPostIDs", verifyJWT, getOtherPostIDs);
router.get("/getYourPostIDs", verifyJWT, yourPostIDs);
router.get("/getSharedPost/:postId", getSharedPost);

export default router;
