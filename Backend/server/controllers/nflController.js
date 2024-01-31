import path from "path";
import fsp from "fs/promises";
import {
  getAllSchedules,
  getCurrentWeekSchedule,
  dirPath,
} from "../utils/scheduleUtils.js";

export const listWeeks = async (req, res) => {
  try {
    const files = await fsp.readdir(dirPath);
    const jsonFiles = files
      .filter((file) => file.endsWith(".json"))
      .sort((a, b) => {
        const weekNumberA = parseInt(a.match(/(\d+)/)[0], 10);
        const weekNumberB = parseInt(b.match(/(\d+)/)[0], 10);
        return weekNumberA - weekNumberB;
      });
    res.json(jsonFiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentWeek = async (req, res) => {
  try {
    const allSchedules = await getAllSchedules(dirPath);
    const currentWeekSchedule = getCurrentWeekSchedule(allSchedules);
    res.json(currentWeekSchedule);
  } catch (error) {
    console.error("Error fetching current week schedule:", error);
    res
      .status(500)
      .send("Server error occurred while fetching current week schedule.");
  }
};

export const getWeekSchedule = async (req, res) => {
  try {
    let weekIdentifier = req.params.weekIdentifier;

    if (weekIdentifier.includes("Playoff Week")) {
      weekIdentifier = weekIdentifier.replace("Playoff Week ", "Playoff-week-");
    } else {
      weekIdentifier = weekIdentifier.replace("Week ", "week-");
    }
    const filePath = path.join(dirPath, `${weekIdentifier}.json`);

    try {
      const weekScheduleData = await fsp.readFile(filePath, "utf8");
      res.json(JSON.parse(weekScheduleData));
    } catch (fileError) {
      res.status(404).send("Week schedule not found");
    }
  } catch (error) {
    console.error("Error fetching week schedule:", error);
    res.status(500).send("Server error occurred while fetching week schedule.");
  }
};
