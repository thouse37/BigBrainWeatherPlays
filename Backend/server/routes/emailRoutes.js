import express from "express";
import {
  contactUs,
  getNotificationSettings,
  saveNotificationSettings,
} from "../controllers/emailController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  getEmailSubscriptions,
  saveEmailSubscription,
} from "../controllers/emailController.js";

const router = express.Router();

router.post("/contact-us", contactUs);
router.get("/email-subscriptions", authenticateToken, getEmailSubscriptions);
router.post("/email-subscriptions", authenticateToken, saveEmailSubscription);
router.get(
  "/notification-settings",
  authenticateToken,
  getNotificationSettings
);
router.post(
  "/notification-settings",
  authenticateToken,
  saveNotificationSettings
);

export default router;
