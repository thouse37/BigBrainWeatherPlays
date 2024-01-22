import RainAnimation from "../RainAnimation.jsx";
import WindAnimation from "../WindAnimation.jsx";

function StadiumImage({ stadiumData, gameData, weatherData }) {
  const teamStadium = stadiumData.find(
    (stadium) => stadium.Stadium === gameData.Stadium
  );
  const showRain = Number(weatherData?.PrecipitationProbability) > 29;
  const showWind =
    Number(weatherData?.WindSpeed) > 9.5 || Number(weatherData?.WindGusts) > 15;

  if (teamStadium) {
    return (
      <div className="relative rounded w-[320px] h-[350px] sm:w-[233px] sm:h-[175px] md:w-[400px] md:h-[420px] lg:w-[450px] lg:h-[480px] xl:w-[500px] xl:h-[530px]">
        <img
          src={`/public/${teamStadium.Image}`}
          alt={gameData?.Stadium}
          className="object-cover w-full h-full"
        />

        {showRain && <RainAnimation />}
        {showWind && <WindAnimation direction={weatherData?.WindDirection} />}
      </div>
    );
  } else {
    return <p>Stadium image not found.</p>;
  }
}

export default StadiumImage;
