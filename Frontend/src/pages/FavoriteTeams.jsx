import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext.jsx";
import Container from "../ui/Container.jsx";
import NflTeams from "../features/NflTeams.jsx";
import PleaseLogin from "../ui/PleaseLogin.jsx";
import { fetchSavedTeams } from "../services/apiSaveTeams.js";
import Loader from "../ui/Loader.jsx";
import FavoriteTeamsGames from "../features/FavoriteTeamsGames.jsx";

function FavoriteTeams() {
  const auth = useAuth();

  const {
    data: savedFavoriteTeamsData,
    isLoading: isSavedFavoriteTeamsLoading,
    error: savedFavoriteTeamsError,
  } = useQuery({
    queryKey: ["savedFavoriteTeams"],
    queryFn: () => fetchSavedTeams(auth.token, "/favorite-teams"),
  });
  // Transform the data into an array of team names
  const savedFavoriteTeams =
    savedFavoriteTeamsData?.map((team) => team.team_name) || [];

  if (!auth.token) {
    return <PleaseLogin />;
  }
  if (isSavedFavoriteTeamsLoading) {
    return (
      <Container>
        <h1 className="text-4xl font-bold text-center my-12">Favorite Teams</h1>

        <div className="flex justify-center items-center mt-32">
          <p className="mr-8">Loading...</p>
          <Loader />
        </div>
      </Container>
    );
  }

  if (savedFavoriteTeamsError) {
    return <div>Error: {savedFavoriteTeamsError.message}</div>;
  }
  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-12">Favorite Teams</h1>

      <NflTeams
        savedTeams={savedFavoriteTeams}
        token={auth.token}
        endpoint="/favorite-teams"
        queryKey="savedFavoriteTeams"
      />
      {!isSavedFavoriteTeamsLoading && !savedFavoriteTeamsError && (
        <FavoriteTeamsGames favoriteTeams={savedFavoriteTeams} />
      )}
    </Container>
  );
}

export default FavoriteTeams;
