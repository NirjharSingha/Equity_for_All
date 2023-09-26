import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import getFriendList from "../controllers/getFriendList.js";
import getFriendSuggession from "../controllers/getFriendSuggessions.js";
import countMutualFriends from "../controllers/countMutualFriends.js";
import updateFriends from "../controllers/updateFriends.js";
import checkBlocked from "../controllers/checkBlocked.js";
import birthdays from "../controllers/birthdays.js";

const router = express.Router();

router.get("/getFriends", verifyJWT, getFriendList);
router.get("/getFriendSuggessions", verifyJWT, getFriendSuggession);
router.get("/countMutualFriends", verifyJWT, countMutualFriends);
router.put("/updateFriends", verifyJWT, updateFriends);
router.get("/isBlocked", verifyJWT, checkBlocked);
router.get("/friendBirthdays", verifyJWT, birthdays);

export default router;
