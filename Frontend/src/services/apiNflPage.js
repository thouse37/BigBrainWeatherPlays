const apiUrl = import.meta.env.VITE_API_URL;

export const fetchWeekListApi = async () => {
  const response = await fetch(`${apiUrl}/nfl/list-weeks`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch week list");
  }

  return await response.json();
};

export const fetchCurrentWeek = async () => {
  const response = await fetch(`${apiUrl}/nfl/current-week`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Failed to fetch current week's schedule"
    );
  }

  return await response.json();
};

export const fetchWeekSchedule = async (weekIdentifier) => {
  const response = await fetch(
    `${apiUrl}/nfl/schedule/${encodeURIComponent(weekIdentifier)}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || `Failed to fetch schedule for ${weekIdentifier}`
    );
  }

  return await response.json();
};

export const fetchWeatherData = async (paramsData) => {
  try {
    const weatherData = await Promise.all(
      paramsData.map(async (game) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${game.Latitude}&longitude=${game.Longitude}&hourly=temperature_2m,precipitation_probability,precipitation,windspeed_10m,winddirection_10m,windgusts_10m&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&start_date=${game.Date}&end_date=${game.Date}`;
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return await response.json();
      })
    );
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
