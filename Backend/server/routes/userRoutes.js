import express from "express";
import {
  register,
  login,
  updateUserProfile,
  getUserProfile,
  updateUserContact,
  updateUserUsername,
  updateUserPassword,
  updateUserAvatar,
  forgotPassword,
  resetPassword,
  getUserAvatar,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { loginLimiter } from "../middleware/rateLimit.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.post("/user/profile", authenticateToken, updateUserProfile);
router.get("/user/profile", authenticateToken, getUserProfile);
router.post("/user/email", authenticateToken, updateUserContact);
router.post("/user/username", authenticateToken, updateUserUsername);
router.post("/user/password", authenticateToken, updateUserPassword);
router.get("/user/avatar/:filename", authenticateToken, getUserAvatar);
router.post(
  "/user/avatar",
  authenticateToken,
  upload.single("avatar"),
  updateUserAvatar
);
router.post("/forgot-password", forgotPassword);
router.post("/password-reset/:token", resetPassword);

export default router;
