import { Router } from "express";
import {
  sendMessageToActiveChat,
  offCurrentChat,
  startNewChat,
  getUserAllChats,
} from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/send-message", verifyJWT, sendMessageToActiveChat);
router.post("/initiate-new-chat", verifyJWT, startNewChat);
router.route("/end-current-chat").post(verifyJWT, offCurrentChat);
router.route("/get-all-chats").get(verifyJWT,getUserAllChats)
export default router;
