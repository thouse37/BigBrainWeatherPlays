import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  fetchWeekListApi,
  fetchCurrentWeek,
} from "../../services/apiNflPage.js";

function WeekDropDown({ onWeekChange, selectedWeek }) {
  const {
    data: weekList,
    isLoading: isWeekListLoading,
    error: weekListError,
  } = useQuery({
    queryKey: ["weekList"],
    queryFn: fetchWeekListApi,
  });

  const { data: currentWeekData, error: currentWeekError } = useQuery({
    queryKey: ["currentWeek"],
    queryFn: fetchCurrentWeek,
    enabled: !!weekList, // Only run after weekList is fetched
  });

  // Error handling
  if (weekListError || currentWeekError) {
    const errorMessage = weekListError?.message || currentWeekError?.message;
    toast.error(errorMessage || "An error occurred during weeks list loading");
  }

  const formatWeekName = (week) => {
    const weekParts = week.replace(".json", "").split("-");
    // Check if it's a playoff week
    if (weekParts[0] === "Playoff") {
      return `Playoff Week ${weekParts[2]}`;
    }
    // For regular weeks
    return `Week ${weekParts[1]}`;
  };

  return (
    <div className="pb-6 ml-8">
      <select
        value={selectedWeek}
        onChange={(event) => onWeekChange(event.target.value)}
        className="bg-blue-900 text-blue-300 text-center py-2 px-4 border border-blue-400 rounded shadow"
      >
        {weekList?.map((week, index) => {
          const weekFormatted = formatWeekName(week);
          return (
            <option key={index} value={weekFormatted}>
              {weekFormatted}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default WeekDropDown;
