import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  getFavoriteTeams,
  saveFavoriteTeams,
} from "../controllers/customsController.js";

const router = express.Router();

router.get("/favorite-teams", authenticateToken, getFavoriteTeams);
router.post("/favorite-teams", authenticateToken, saveFavoriteTeams);

export default router;
