import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import upload from "../middlewares/multer.js";
import createGroup from "../controllers/group/createGroup.js";
import getGroupNames from "../controllers/group/getGroupNames.js";
import deleteGroup from "../controllers/group/deleteGroup.js";
import addOrRemove from "../controllers/group/addOrRemove.js";
import editGroup from "../controllers/group/editGroup.js";
import allMembers from "../controllers/group/allMembers.js";
import allRequests from "../controllers/group/allRequests.js";
import groupFriends from "../controllers/group/groupFriends.js";
import findInviteList from "../controllers/group/findInviteList.js";
import getGroup from "../controllers/group/getGroup.js";

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
router.get("/inviteMember", verifyJWT, findInviteList);
router.put("/addOrRemove", verifyJWT, addOrRemove);
router.delete("/deleteGroup/:groupId", verifyJWT, deleteGroup);
router.get("/allMembers/:groupId", verifyJWT, allMembers);
router.get("/allRequests/:groupId", verifyJWT, allRequests);
router.get("/groupFriends/:groupId", verifyJWT, groupFriends);
router.get("/getGroup/:groupId", verifyJWT, getGroup);

export default router;
