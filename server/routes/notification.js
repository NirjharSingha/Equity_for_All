import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import newNotifications from "../controllers/notification/newNotifications.js";
import allNotifications from "../controllers/notification/allNotifications.js";
import deleteOne from "../controllers/notification/deleteOne.js";
import deleteAll from "../controllers/notification/deleteAll.js";
import countUnseen from "../controllers/notification/countUnseen.js";

const router = express.Router();

router.get("/new", verifyJWT, newNotifications);
router.get("/all", verifyJWT, allNotifications);
router.get("/countUnseen", verifyJWT, countUnseen);
router.delete("/deleteAll", verifyJWT, deleteAll);
router.delete("/deleteOne/:id", verifyJWT, deleteOne);

export default router;
