import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import upload from "../middlewares/multer.js";
import createGroup from "../controllers/group/createGroup.js";
import getGroupNames from "../controllers/group/getGroupNames.js";

const router = express.Router();
router.post(
  "/createGroup",
  [verifyJWT, upload.single("backgroundImage")],
  createGroup
);
router.get("/groupNames", verifyJWT, getGroupNames);

export default router;
