import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import upload from "../middlewares/multer.js";
import createStory from "../controllers/createStory.js";
import getYourStories from "../controllers/getYourStories.js";

const router = express.Router();

router.get("/getYourStories", verifyJWT, getYourStories);
router.post(
  "/createStory",
  [verifyJWT, upload.single("backgroundImage")],
  createStory
);

export default router;
