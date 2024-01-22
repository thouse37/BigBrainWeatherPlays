import { useAuth } from "../contexts/AuthContext.jsx";
import Container from "../ui/Container.jsx";
import PleaseLogin from "../ui/PleaseLogin.jsx";

function CustomTeams() {
  const auth = useAuth();
  if (!auth.token) {
    return <PleaseLogin />;
  }
  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-12">
        Custom Teams not yet here - Come Back Soon!
      </h1>
    </Container>
  );
}

export default CustomTeams;
