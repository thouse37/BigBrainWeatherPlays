import { useState } from "react";
import nflTeams from "../data/nfl-data/nfl-teams.json";
import { getNavLinkClasses } from "../utils/getNavLinkClasses.js";

import FootballSVG from "../ui/FootballSVG.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { saveSelectedTeams } from "../services/apiSaveTeams.js";

function NflTeams({ savedTeams, token, endpoint, queryKey }) {
  const [selectedTeams, setSelectedTeams] = useState(savedTeams);
  const [showDivisions, setShowDivisions] = useState(false);

  const queryClient = useQueryClient();

  const handleTeamToggle = async (teamName) => {
    // Determine the new list of selected teams
    const updatedSelectedTeams = selectedTeams.includes(teamName)
      ? selectedTeams.filter((name) => name !== teamName)
      : [...selectedTeams, teamName];

    // Update the state synchronously
    setSelectedTeams(updatedSelectedTeams);

    try {
      // Perform the save operation and wait for it to complete
      await saveSelectedTeams(updatedSelectedTeams, token, endpoint);

      // Invalidate and refetch the queries after a successful save
      queryClient.invalidateQueries([queryKey]);
    } catch (error) {
      // Handle any errors here, for example, showing a notification to the user
      console.error("Failed to save selected teams", error);
    }
  };

  const handleLogoClick = (teamName) => {
    handleTeamToggle(teamName);
  };

  const toggleDivisionsVisibility = () => {
    setShowDivisions(!showDivisions);
  };

  // Group NFL teams by division
  const divisions = {};
  nflTeams.forEach((team) => {
    if (!divisions[team.division]) {
      divisions[team.division] = [];
    }
    divisions[team.division].push(team);
  });

  return (
    <div className="mx-16">
      <div className="w-52">
        <h2
          className={getNavLinkClasses(showDivisions)}
          onClick={toggleDivisionsVisibility}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleDivisionsVisibility()}
        >
          <FootballSVG />
          NFL Teams
        </h2>
      </div>

      {showDivisions && (
        <div className="flex flex-wrap justify-center">
          {Object.keys(divisions).map((division, index) => (
            <div
              key={division}
              className={`m-6 ${
                index >= 4 ? "lg:mt-10" : ""
              } lg:w-1/4 xl:w-1/5`}
            >
              <h3>{division}</h3>
              {divisions[division].map((team) => (
                <div
                  key={team.id}
                  className={`flex items-center m-2 rounded-md ${
                    selectedTeams.includes(team.name)
                      ? "bg-blue-400 text-blue-950"
                      : ""
                  }`}
                  onClick={() => handleLogoClick(team.name)}
                >
                  <input
                    type="checkbox"
                    id={team.name}
                    checked={selectedTeams.includes(team.name)}
                    onChange={() => handleTeamToggle(team.name)}
                    className="mr-2 cursor-pointer"
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleTeamToggle(team.name)
                    }
                  />
                  <img
                    src={`/nfl-data/team-logos/${team.logo}`}
                    alt={`${team.name} Logo`}
                    className="h-8 w-8 mr-2 cursor-pointer"
                  />
                  <label
                    htmlFor={`team-${team.id}`}
                    className="flex items-center cursor-pointer"
                  >
                    {team.name}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NflTeams;
