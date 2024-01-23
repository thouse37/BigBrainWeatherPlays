import { useState, useEffect, useContext } from "react";
import GameCard from "../features/NFL-Games/GameCard.jsx";
import WeekDropDown from "../features/NFL-Games/WeekDropDown.jsx";
import SortDropDown from "../features/NFL-Games/SortDropDown.jsx";
import Container from "../ui/Container.jsx";
import Loader from "../ui/Loader.jsx";
import { getTeamLogoPath } from "../utils/getTeamLogoPath.js";
import { NflContext } from "../contexts/NflContext.jsx";

function Nfl() {
  const [sortCriteria, setSortCriteria] = useState("all");

  const {
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
  } = useContext(NflContext);

  useEffect(() => {
    if (currentWeek && currentWeek.weekFile) {
      // Extract the week parts from the file name
      const weekParts = currentWeek.weekFile.split("-");
      // Check if it's a playoff week
      let formattedWeek;
      if (weekParts[0] === "Playoff") {
        formattedWeek = `Playoff Week ${weekParts[2].split(".")[0]}`;
      } else {
        // For regular weeks
        formattedWeek = `Week ${weekParts[1].split(".")[0]}`;
      }
      setSelectedWeek(formattedWeek);
      refetchWeekSchedule(); // Refetch the week schedule for the newly set week
    }
  }, [currentWeek, refetchWeekSchedule]);

  const handleWeekChange = (newWeekIdentifier) => {
    setSelectedWeek(newWeekIdentifier);
    refetchWeekSchedule();
  };

  if (isStadiumDataLoading || isCurrentWeekLoading || isWeekScheduleLoading)
    return (
      <Container>
        <h1 className="text-4xl font-bold text-center my-12">NFL Games</h1>
        <div className="flex justify-between items-center w-full">
          <WeekDropDown
            selectedWeek={selectedWeek}
            onWeekChange={handleWeekChange}
          />
          <SortDropDown />
        </div>
        <div className="flex justify-center items-center mt-32">
          <p className="mr-8">Loading...</p>
          <Loader />
        </div>
      </Container>
    );

  const sortedWeekSchedule = weekSchedule
    ? [...weekSchedule].sort((a, b) => {
        switch (sortCriteria) {
          case "highTemperature":
            return b.weather.Temperature - a.weather.Temperature;
          case "lowTemperature":
            return a.weather.Temperature - b.weather.Temperature;
          case "windy":
            return b.weather.WindSpeed - a.weather.WindSpeed;
          case "rainy":
            return (
              b.weather.PrecipitationProbability -
              a.weather.PrecipitationProbability
            );
          default:
            return 0;
        }
      })
    : [];

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  if (stadiumDataError || currentWeekError || weekScheduleError)
    return <div>Error loading data</div>;

  return (
    <Container>
      <div className="m-8 text-blue-200">
        <h1 className="text-4xl font-bold text-center my-12">NFL Games</h1>
        <div className="flex justify-between items-center w-full">
          <WeekDropDown
            selectedWeek={selectedWeek}
            onWeekChange={handleWeekChange}
          />
          <SortDropDown onSortChange={handleSortChange} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {sortedWeekSchedule &&
            sortedWeekSchedule.map((game) => {
              // Generate the paths for the logos
              const homeLogo = getTeamLogoPath(game.HomeTeam);
              const awayLogo = getTeamLogoPath(game.AwayTeam);

              // Fetch the weather data
              const weatherData = game.weather; // Assuming weather data is fetched and available

              return (
                <GameCard
                  key={`${game.HomeTeam}-${game.AwayTeam}`}
                  gameData={game}
                  weatherData={weatherData}
                  homeLogo={homeLogo}
                  awayLogo={awayLogo}
                  stadiumData={stadiumData}
                />
              );
            })}
        </div>
      </div>
    </Container>
  );
}

export default Nfl;
