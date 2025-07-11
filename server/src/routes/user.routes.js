import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { getCurrentUser } from "../controllers/user.controller.js";

const router = Router();



router.route("/get-current-user").get(verifyJWT, getCurrentUser);

//for private route check (in frontend)
router.route("/verify-user").get(verifyJWT, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User is authenticated",
    isAuthenticated: true,
  });
});

export default router;
