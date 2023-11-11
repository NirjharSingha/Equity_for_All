import express from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import getFriendList from "../controllers/friend/getFriendList.js";
import getFriendSuggession from "../controllers/friend/getFriendSuggessions.js";
import countMutualFriends from "../controllers/friend/countMutualFriends.js";
import updateFriends from "../controllers/friend/updateFriends.js";
import checkBlocked from "../controllers/friend/checkBlocked.js";
import birthdays from "../controllers/friend/birthdays.js";

const router = express.Router();

router.get("/getFriends", verifyJWT, getFriendList);
router.get("/getFriendSuggessions", verifyJWT, getFriendSuggession);
router.get("/countMutualFriends", verifyJWT, countMutualFriends);
router.put("/updateFriends", verifyJWT, updateFriends);
router.get("/isBlocked", verifyJWT, checkBlocked);
router.get("/friendBirthdays", verifyJWT, birthdays);

export default router;
