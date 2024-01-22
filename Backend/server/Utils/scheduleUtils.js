import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(
  __dirname,
  "..",
  "..",
  "src",
  "data",
  "nfl-data",
  "NFL-Schedule"
);

export const getAllSchedules = async () => {
  try {
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
    return allSchedules;
  } catch (error) {
    console.error("Error in getAllSchedules:", error);
    throw error;
  }
};

export const getCurrentWeekSchedule = (allSchedules) => {
  const currentDate = new Date();
  let currentWeek = null;

  // Sort schedules by date
  const sortedSchedules = allSchedules.sort(
    (a, b) => new Date(a.Date) - new Date(b.Date)
  );

  for (let i = 0; i < sortedSchedules.length - 1; i++) {
    const endDate = new Date(sortedSchedules[i].Date);
    const startDate = new Date(sortedSchedules[i + 1].Date);

    // If current date is after the end date of the current week and before the start date of the next week
    if (currentDate > endDate && currentDate < startDate) {
      currentWeek = sortedSchedules[i + 1]; // Next week's schedule
      break;
    }
  }

  // If no current week is found and current date is after the last game in the schedule
  if (
    !currentWeek &&
    currentDate > new Date(sortedSchedules[sortedSchedules.length - 1].Date)
  ) {
    currentWeek = sortedSchedules[sortedSchedules.length - 1]; // Last week's schedule
  }

  // If still no current week is found and current date is before the first game in the schedule
  if (!currentWeek) {
    currentWeek = sortedSchedules[0]; // First week's schedule
  }

  return currentWeek
    ? { weekFile: currentWeek.weekFile, games: currentWeek.schedule }
    : null;
};

export { dirPath };
