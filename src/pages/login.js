import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  // const [freezeLogin, setFreezeLogin] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    console.log("here");

    const fingerprintError =
      "We detected multiple log in attempts for this user, but we didn't perform the login action";

    axios
      .post("http://localhost:5000/api/login", {
        username,
        password,
      })
      .then((result) => {
        console.log("here3");
        console.log(result);
        setLogin(true);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.error);
        setLoginError(error.response.data.error);
        if (error.message === fingerprintError) {
          // setFreezeLogin(true);
        }
      });

    console.log("here2");
  };

  return (
    <>
      <h2>Login</h2>
      <Form>
        {/* email */}
        <Form.Group controlId="formUsername">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>

        {loginError ? <p className="text-success">{loginError}</p> : null}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </Form>
    </>
  );
}
