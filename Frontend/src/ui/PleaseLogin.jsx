import Button from "./Button.jsx";
import Container from "./Container.jsx";

function PleaseLogin() {
  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-12">
        Please log in to view this page.
      </h1>
      <div className="flex justify-center space-x-12">
        <Button type="primary" to="/login">
          Login
        </Button>

        <Button type="primary" to="/register">
          Register
        </Button>
      </div>
    </Container>
  );
}

export default PleaseLogin;
