import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import upload from "../middlewares/multer.js";
import createGroup from "../controllers/group/createGroup.js";
import getGroupNames from "../controllers/group/getGroupNames.js";
import deleteGroup from "../controllers/group/deleteGroup.js";
import addOrRemove from "../controllers/group/addOrRemove.js";
import editGroup from "../controllers/group/editGroup.js";

const router = express.Router();
router.post(
  "/createGroup",
  [verifyJWT, upload.single("backgroundImage")],
  createGroup
);
router.put(
  "/editGroup",
  [verifyJWT, upload.single("backgroundImage")],
  editGroup
);
router.get("/groupNames", verifyJWT, getGroupNames);
router.put("/addOrRemove", verifyJWT, addOrRemove);
router.delete("/deleteGroup/:groupId", verifyJWT, deleteGroup);

export default router;
