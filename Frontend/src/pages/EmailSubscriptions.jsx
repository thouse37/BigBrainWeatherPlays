import Container from "../ui/Container.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import PleaseLogin from "../ui/PleaseLogin.jsx";
import NflTeams from "../features/NflTeams.jsx";
import { fetchSavedTeams } from "../services/apiSaveTeams.js";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader.jsx";
import GameEmailNotificationSettings from "../features/GameEmailNotificationSettings.jsx";

function EmailSubscriptions() {
  const auth = useAuth();

  const {
    data: savedEmailTeamsData,
    isLoading: isSavedEmailTeamsLoading,
    error: savedEmailTeamsError,
  } = useQuery({
    queryKey: ["savedEmailTeams"],
    queryFn: () => fetchSavedTeams(auth.token, "/email-subscriptions"),
  });

  const savedEmailTeams =
    savedEmailTeamsData?.map((team) => team.team_name) || [];

  if (!auth.token) {
    return <PleaseLogin />;
  }

  if (isSavedEmailTeamsLoading) {
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

  if (savedEmailTeamsError) {
    return <div>Error: {savedEmailTeamsError.message}</div>;
  }
  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-12">
        Email Subscriptions
      </h1>

      <NflTeams
        savedTeams={savedEmailTeams}
        token={auth.token}
        endpoint="/email-subscriptions"
        queryKey="savedEmailTeams"
      />
      <GameEmailNotificationSettings />
    </Container>
  );
}

export default EmailSubscriptions;
