import ColdTempSVG from "../../ui/ColdTempSVG.jsx";
import RainSVG from "../../ui/RainSVG.jsx";
import WarmTempSVG from "../../ui/WarmTempSVG.jsx";
import WindSVG from "../../ui/WindSVG.jsx";

function WeatherInfo({ weatherData }) {
  const style = "h-16 w-14 mr-2";

  function getDirection(degrees) {
    if (
      (degrees >= 0 && degrees <= 22.5) ||
      (degrees > 337.5 && degrees <= 360)
    ) {
      return "N";
    } else if (degrees > 22.5 && degrees <= 67.5) {
      return "NE";
    } else if (degrees > 67.5 && degrees <= 112.5) {
      return "E";
    } else if (degrees > 112.5 && degrees <= 157.5) {
      return "SE";
    } else if (degrees > 157.5 && degrees <= 202.5) {
      return "S";
    } else if (degrees > 202.5 && degrees <= 247.5) {
      return "SW";
    } else if (degrees > 247.5 && degrees <= 292.5) {
      return "W";
    } else if (degrees > 292.5 && degrees <= 337.5) {
      return "NW";
    } else {
      return "Invalid degree";
    }
  }

  return (
    <div className="bg-blue-950 text-white rounded transform transition-all pt-4">
      <div className="grid grid-cols-2">
        <h3 className="text-lg font-bold py-2">Weather Details:</h3>
        <div className="flex items-center">
          {Number(weatherData?.Temperature) > 90 ? (
            <WarmTempSVG style={style} />
          ) : null}
          {Number(weatherData?.Temperature) < 41 ? (
            <ColdTempSVG style={style} />
          ) : null}
          {Number(weatherData?.PrecipitationProbability) > 29 ? (
            <RainSVG style={style} />
          ) : null}
          {Number(weatherData?.WindSpeed) > 9.5 ||
          Number(weatherData?.WindGusts) > 15 ? (
            <WindSVG style={style} />
          ) : null}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <p className="text-sm mb-2">
            Temperature: {weatherData?.Temperature}°F
          </p>
          <p className="text-sm mb-2">
            Precipitation Probability: {weatherData?.PrecipitationProbability}%
          </p>
          <p className="text-sm mb-2">
            Precipitation: {weatherData?.Precipitation} in
          </p>
        </div>
        <div className="flex-1 sm:ml-2">
          <p className="text-sm mb-2">
            Wind Speed: {weatherData?.WindSpeed} mph
          </p>

          <p className="text-sm mb-2">
            Wind Gusts: {weatherData?.WindGusts} mph
          </p>
          <p className="text-sm mb-2">
            Wind Direction: {getDirection(weatherData.WindDirection)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
