import Button from "../ui/Button.jsx";
import Container from "../ui/Container.jsx";

function Homepage() {
  return (
    <Container>
      <div className="lg:mx-48 mx-16 mb-32 mt-16 text-blue-200">
        <h1 className="text-4xl font-bold text-center mb-16">
          Welcome to Big Brain Weather Plays
        </h1>
        <p className="text-xl my-8 text-center font-raleway">
          Your ultimate companion for making informed fantasy sports and betting
          decisions based on comprehensive weather data.
        </p>
        <h2 className="text-2xl font-semibold my-8 text-center">
          Why Sign Up? - It's Free!
        </h2>
        <p className="text-lg my-6 text-center font-raleway">
          Unlock the full potential of Big Brain Weather Plays by signing up.
          Create custom teams and get precise weather forecasts for each player
          on all your fantasy teams. All for free!
        </p>
        <h3 className="text-xl font-semibold mt-12 text-center">
          Empower Your Decisions
        </h3>
        <p className="text-lg my-6 text-center font-raleway">
          Weather plays a crucial role in sports outcomes. Our app provides
          insights into how weather conditions like rain, wind, and temperature
          can impact player performance in football, baseball, and more.
        </p>
        <p className="text-lg my-1 text-center font-raleway">
          From affecting quarterback throws and receiver catches in rainy
          football games to influencing home runs and pitching in baseball based
          on wind direction and wind strength, Big Brain Weather Plays offers
          the data you need to make strategic lineup decisions.
        </p>
        <h3 className="text-xl font-semibold mt-12 text-center">
          Future Insights
        </h3>
        <p className="text-lg my-6 text-center font-raleway">
          Stay ahead of the game with our upcoming features. We're working on
          providing evidence-based decision-making tools that analyze historical
          weather data and its impact on player performance and game outcomes.
        </p>
        <div className="my-4 text-center mt-8">
          <Button to="/register" type="primary">
            Register Now
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Homepage;
