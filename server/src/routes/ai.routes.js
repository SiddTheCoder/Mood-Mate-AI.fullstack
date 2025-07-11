import { Router } from "express";
import {
  findOrCreateChatAndGetAllMessages,
  archiveChat,
  unArchiveChat,
} from "../controllers/chat.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

;

export default router;
