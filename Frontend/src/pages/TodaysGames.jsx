import { useContext, useEffect, useState } from "react";
import GameCard from "../features/NFL-Games/GameCard.jsx";
import Container from "../ui/Container.jsx";
import { isToday, parse } from "date-fns";
import { getTeamLogoPath } from "../utils/getTeamLogoPath.js";
import { NflContext } from "../contexts/NflContext.jsx";
import Loader from "../ui/Loader.jsx";

function TodaysGames() {
  const [todaysGames, setTodaysGames] = useState([]);
  const {
    selectedWeek,
    setSelectedWeek,
    currentWeek,
    weekSchedule,
    isWeekScheduleLoading,
    weekScheduleError,
    refetchWeekSchedule,
    stadiumData,
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

  useEffect(() => {
    if (!isWeekScheduleLoading && weekSchedule && !weekScheduleError) {
      const filteredGames = weekSchedule.filter((game) =>
        isToday(parse(game.Date, "MMMM d, yyyy", new Date()))
      );
      setTodaysGames(filteredGames);
    }
  }, [weekSchedule, isWeekScheduleLoading, weekScheduleError]);

  return (
    <Container>
      <div className="m-8">
        <h1 className="text-4xl font-bold text-center my-12">
          Today's NFL Games
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {isWeekScheduleLoading ? (
            // Display the Loader component when data is loading
            <div className="flex justify-center items-center mt-32">
              <p className="mr-8">Loading...</p>
              <Loader />
            </div>
          ) : todaysGames.length > 0 ? (
            todaysGames.map((game) => {
              const homeLogo = getTeamLogoPath(game.HomeTeam);
              const awayLogo = getTeamLogoPath(game.AwayTeam);

              return (
                <GameCard
                  key={`${game.HomeTeam}-${game.AwayTeam}`}
                  gameData={game}
                  weatherData={game.weather}
                  homeLogo={homeLogo}
                  awayLogo={awayLogo}
                  stadiumData={stadiumData}
                />
              );
            })
          ) : (
            <p className="text-xl my-8 text-center">
              No games scheduled for today.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default TodaysGames;
