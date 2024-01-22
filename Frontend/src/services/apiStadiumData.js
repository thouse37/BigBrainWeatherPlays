export const fetchStadiumData = async () => {
  const response = await fetch("/src/data/nfl-data/Stadium-Data.json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
