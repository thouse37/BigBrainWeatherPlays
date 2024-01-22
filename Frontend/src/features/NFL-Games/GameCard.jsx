import { useState } from "react";
import WeatherInfo from "./WeatherInfo.jsx";
import StadiumImage from "./StadiumImage.jsx";

function GameCard({ gameData, weatherData, homeLogo, awayLogo, stadiumData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getStadiumRoofType = (stadiumName) => {
    const stadium = stadiumData.find(
      (stadium) => stadium.Stadium === stadiumName
    );
    return stadium ? stadium.Roof : "Unknown";
  };

  const cardStyle =
    "p-8 m-2 bg-blue-950 text-white border-2 border-blue-400 rounded shadow-lg transform transition-all flex flex-col xl:flex-row justify-between";

  return (
    <div onClick={toggleExpand} className={cardStyle}>
      <div className="flex-grow">
        <div className="mb-4 flex items-center">
          <img
            src={awayLogo}
            alt={`${gameData.AwayTeam} logo`}
            className="h-8 w-8 mr-2"
          />
          <h3 className="text-lg font-bold py-2 mx-1">{gameData.AwayTeam}</h3>
          <h3 className="text-lg font-bold py-2 mx-2 ">vs</h3>
          <img
            src={homeLogo}
            alt={`${gameData.HomeTeam} logo`}
            className="h-8 w-8 mx-2 ml-1"
          />
          <h3 className="text-lg font-bold py-2">{gameData.HomeTeam}</h3>
        </div>
        <div className="mb-4">
          <p className="text-sm mb-2">
            {gameData.Day}, {gameData.Date} at {gameData.Time}
          </p>
          <p className="text-sm mb-2">{gameData.Location}</p>
          <p className="text-sm mb-2">{gameData.Stadium}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm mb-2">
            Roof: {getStadiumRoofType(gameData.Stadium)}
          </p>
        </div>
        <div className="mb-4">
          <WeatherInfo weatherData={weatherData}></WeatherInfo>
        </div>
      </div>
      <StadiumImage
        weatherData={weatherData}
        gameData={gameData}
        stadiumData={stadiumData}
      />
    </div>
  );
}

export default GameCard;
