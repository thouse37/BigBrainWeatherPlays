import express from "express";
import {
  listWeeks,
  getCurrentWeek,
  getWeekSchedule,
} from "../controllers/nflController.js";

const router = express.Router();

router.get("/list-weeks", listWeeks);
router.get("/current-week", getCurrentWeek);
router.get("/schedule/:weekIdentifier", getWeekSchedule);
// router.get("/custom-teams", getCustomTeams);

export default router;
