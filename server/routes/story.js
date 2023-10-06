import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import upload from "../middlewares/multer.js";
import createStory from "../controllers/createStory.js";
import getYourStories from "../controllers/getYourStories.js";
import getOtherStories from "../controllers/getOtherStories.js";
import editStory from "../controllers/editStory.js";
import deleteStory from "../controllers/deleteStory.js";

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
