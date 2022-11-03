import { Container, Col, Row } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

import SignUp from "./pages/signup";

function App() {
  return (
    <Container>
      <Row>
        <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
          <Link to="/signup">Create Account</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
        <Outlet />

        {/* <Col xs={12} sm={12} md={12} lg={12}>
          <SignUp />
        </Col> */}
      </Row>
    </Container>
  );
}

export default App;
