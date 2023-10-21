import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import upload from "../middlewares/multer.js";
import createGroup from "../controllers/createGroup.js";

const router = express.Router();
router.post(
  "/createGroup",
  [verifyJWT, upload.single("backgroundImage")],
  createGroup
);

export default router;
