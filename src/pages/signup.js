import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);

  const { error, data } = useVisitorData();

  if (error) {
    // perform some logic based on the visitor data
    console.log(error.message);
  }

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    console.log(username, password);
    console.log("here");
    // alert("Submited");

    if (data) {
      // perform some logic based on the visitor data
      console.log(data.visitorFound, data.visitorId);
      const visitorId = data.visitorId;

      axios
        .post("http://localhost:5000/api/signup", {
          username,
          password,
          visitorId,
        })
        .then((result) => {
          console.log("here3");
          console.log(result);
          setSignup(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return null;
    }

    console.log("here2");
  };

  return (
    <>
      <h2>Register</h2>
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

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
        {/* {signup ? (
          <p className="text-success">SignUp Successful!</p>
        ) : (
          <p className="text-danger">Signup Failed.</p>
        )} */}
      </Form>
    </>
  );
}