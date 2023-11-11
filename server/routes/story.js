import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import upload from "../middlewares/multer.js";
import createStory from "../controllers/story/createStory.js";
import getYourStories from "../controllers/story/getYourStories.js";
import getOtherStories from "../controllers/story/getOtherStories.js";
import editStory from "../controllers/story/editStory.js";
import deleteStory from "../controllers/story/deleteStory.js";

const router = express.Router();

router.get("/getYourStories", verifyJWT, getYourStories);
router.get("/getOtherStories", verifyJWT, getOtherStories);
router.post(
  "/createStory",
  [verifyJWT, upload.single("backgroundImage")],
  createStory
);
router.put(
  "/editStory",
  [verifyJWT, upload.single("backgroundImage")],
  editStory
);
router.delete("/deleteStory/:storyId", verifyJWT, deleteStory);

export default router;
