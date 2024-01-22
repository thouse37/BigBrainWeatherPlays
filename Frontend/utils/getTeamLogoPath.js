// Helper function to generate logo path
export const getTeamLogoPath = (teamName) => {
  const logoName = teamName.split(" ").join("-");
  return `/nfl-data/team-logos/${logoName}.png`; // Adjusted path for public folder
};
