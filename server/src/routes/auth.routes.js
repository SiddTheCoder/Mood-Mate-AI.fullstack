import express from "express";
import { googleOAuth, logoutUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// normal auth --------
router.route("/logout-user").post(verifyJWT, logoutUser);

// OAuth ------
router.post("/google-auth", googleOAuth); // POST /api/auth/google

export default router;
