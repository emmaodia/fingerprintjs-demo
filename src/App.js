import { Container, Row } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <Container>
      <Row>
        <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
          <Link to="/signup">Create Account</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
        <Outlet />
      </Row>
    </Container>
  );
}

export default App;
