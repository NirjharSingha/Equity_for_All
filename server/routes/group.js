import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import upload from "../middlewares/multer.js";
import createGroup from "../controllers/createGroup.js";
import getGroupNames from "../controllers/getGroupNames.js";

const router = express.Router();
router.post(
  "/createGroup",
  [verifyJWT, upload.single("backgroundImage")],
  createGroup
);
router.get("/groupNames", verifyJWT, getGroupNames);

export default router;
