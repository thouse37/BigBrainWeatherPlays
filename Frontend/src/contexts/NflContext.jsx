import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchWeekSchedule,
  fetchCurrentWeek,
  fetchWeatherData,
} from "../services/apiNflPage.js";
import { useStadiumData } from "../hooks/useStadiumData.js";
import { parse, format } from "date-fns";

// Create the context
export const NflContext = createContext();

export const NflProvider = ({ children }) => {
  const [selectedWeek, setSelectedWeek] = useState("");

  // Logic from the original component
  const {
    data: stadiumData,
    isLoading: isStadiumDataLoading,
    error: stadiumDataError,
  } = useStadiumData();

  // Current week query
  const {
    data: currentWeek,
    isLoading: isCurrentWeekLoading,
    error: currentWeekError,
  } = useQuery({
    queryKey: ["currentWeek"],
    queryFn: fetchCurrentWeek,
    onSuccess: (currentWeekData) => {
      const formattedWeek = `Week ${
        currentWeekData.weekFile.split("-")[1].split(".")[0]
      }`;
      setSelectedWeek(formattedWeek);
    },
  });

  // Week schedule query
  const {
    data: weekSchedule,
    isLoading: isWeekScheduleLoading,
    error: weekScheduleError,
    refetch: refetchWeekSchedule,
  } = useQuery({
    queryKey: ["weekSchedule", selectedWeek, stadiumData],
    queryFn: () => fetchScheduleAndWeather(selectedWeek, stadiumData),
    enabled: !!selectedWeek && !!stadiumData,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Function to fetch schedule and weather
  async function fetchScheduleAndWeather(weekIdentifier, stadiumData) {
    // Ensure weekIdentifier is valid before fetching
    if (!weekIdentifier) {
      throw new Error("No week identifier provided for schedule fetch.");
    }
    // Fetch the game schedule for the selected week
    const schedule = await fetchWeekSchedule(weekIdentifier);

    // Process data for weather fetching
    const paramsData = schedule.map((game) => {
      const dateParsed = parse(game.Date, "MMMM d, yyyy", new Date());
      const date = format(dateParsed, "yyyy-MM-dd");

      const stadiumName = game.Stadium;
      const stadium = stadiumData.find((s) => s.Stadium === stadiumName);

      return {
        Date: date,
        Latitude: stadium ? stadium.Latitude : null,
        Longitude: stadium ? stadium.Longitude : null,
      };
    });

    // Fetch weather data
    const weatherData = await fetchWeatherData(paramsData);

    function startHour(Time) {
      const hour = Time.split(":")[0];
      const period = Time.split(" ")[1];
      let hourValue = parseInt(hour, 10);
      if (period === "PM" && hourValue !== 12) {
        hourValue += 12;
      }
      return hourValue;
    }

    const hourValues = schedule.map((game) => {
      return startHour(game.Time);
    });

    // Gather data pertaining to each game
    const gameWeatherData = [];
    for (let i = 0; i < weatherData.length; i++) {
      const data = weatherData[i];
      const hour = hourValues[i];
      const gameData = {
        Temperature: data.hourly.temperature_2m[hour],
        PrecipitationProbability: data.hourly.precipitation_probability[hour],
        Precipitation: data.hourly.precipitation[hour],
        WindSpeed: data.hourly.windspeed_10m[hour],
        WindDirection: data.hourly.winddirection_10m[hour],
        WindGusts: data.hourly.windgusts_10m[hour],
      };
      gameWeatherData.push(gameData);
    }

    // Combine schedule with weather data
    const combinedData = schedule.map((game, index) => ({
      ...game,
      weather: gameWeatherData[index],
    }));

    return combinedData;
  }

  // Exposing state and functions
  const value = {
    selectedWeek,
    setSelectedWeek,
    stadiumData,
    currentWeek,
    weekSchedule,
    isStadiumDataLoading,
    isCurrentWeekLoading,
    isWeekScheduleLoading,
    stadiumDataError,
    currentWeekError,
    weekScheduleError,
    refetchWeekSchedule,
  };

  return <NflContext.Provider value={value}>{children}</NflContext.Provider>;
};
