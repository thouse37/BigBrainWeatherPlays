import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAllSchedules,
  getCurrentWeekSchedule,
  dirPath,
} from "./your-util-functions-file.js"; // Import your utility functions

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define a function to fetch games data
export const fetchGames = async () => {
  try {
    // Logic to read and process the game data

    // Step 1: List weeks
    const files = await fsp.readdir(dirPath);
    const schedulePromises = files.map((file) => {
      const filePath = path.join(dirPath, file);
      return fsp.readFile(filePath, "utf8").then((schedule) => {
        return { weekFile: file, schedule: JSON.parse(schedule) };
      });
    });

    const schedulesWithFiles = await Promise.all(schedulePromises);
    const allSchedules = schedulesWithFiles.flatMap((item) =>
      item.schedule.map((game) => ({ ...game, weekFile: item.weekFile }))
    );

    allSchedules.sort((a, b) => new Date(a.Date) - new Date(b.Date));

    // Step 2: Get the current week schedule
    const currentWeekSchedule = getCurrentWeekSchedule(allSchedules);

    // Combine and return the game data
    return {
      jsonFiles: files,
      currentWeekSchedule,
    };
  } catch (error) {
    console.error("Error fetching games data:", error);
    throw error; // You can handle or propagate the error as needed
  }
};

// Example usage of fetchGames
fetchGames()
  .then((gamesData) => {
    console.log("Games Data:", gamesData);
    // Use gamesData in your checkGameTimesAndSendNotifications function
  })
  .catch((error) => {
    console.error("Error fetching games data:", error);
  });
