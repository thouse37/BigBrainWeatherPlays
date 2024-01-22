import { useContext, useEffect, useState } from "react";
import GameCard from "../features/NFL-Games/GameCard.jsx";
import Container from "../ui/Container.jsx";
import { getTeamLogoPath } from "../utils/getTeamLogoPath.js";
import { NflContext } from "../contexts/NflContext.jsx";
import Loader from "../ui/Loader.jsx";

function FavoriteTeamsGames({ favoriteTeams }) {
  const [favoriteGames, setFavoriteGames] = useState([]);
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
    console.log("Current week:", currentWeek); // Log the current week
    console.log("Week Schedule:", weekSchedule); // Log the week schedule

    if (
      !isWeekScheduleLoading &&
      weekSchedule &&
      !weekScheduleError &&
      currentWeek
    ) {
      // Log the favorite teams passed to this component
      console.log("Favorite Teams:", favoriteTeams);

      // Filter the week's games based on the favorite teams
      const filteredGames = weekSchedule.filter(
        (game) =>
          favoriteTeams.includes(game.HomeTeam) ||
          favoriteTeams.includes(game.AwayTeam)
      );

      console.log("Filtered Games:", filteredGames); // Log the filtered games
      setFavoriteGames(filteredGames);
    }
  }, [
    weekSchedule,
    favoriteTeams,
    isWeekScheduleLoading,
    weekScheduleError,
    currentWeek,
  ]);

  useEffect(() => {
    console.log("Stadium Data:", stadiumData);
  }, [stadiumData]);

  return (
    <div className="m-8">
      <div className="grid grid-cols-1 gap-4">
        {isWeekScheduleLoading ? (
          // Display the Loader component when data is loading
          <div className="flex justify-center items-center mt-32">
            <p className="mr-8">Loading...</p>
            <Loader />
          </div>
        ) : favoriteGames.length > 0 ? (
          favoriteGames.map((game) => {
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
            No games scheduled for your favorite teams.
          </p>
        )}
      </div>
    </div>
  );
}

export default FavoriteTeamsGames;
