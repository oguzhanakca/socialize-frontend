import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col md={10} lg={8} className="my-auto mx-auto">
        <Container className="p-4">
          <h1 className={styles.Header}>sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                aria-label="username"
                className={styles.Input}
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((msg, index) => (
              <Alert variant="warning" key={index} className={styles.Alert}>
                {msg}
              </Alert>
            ))}
            <Form.Group className="mb-3" controlId="password1">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                aria-label="password1"
                className={styles.Input}
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((msg, index) => (
              <Alert variant="warning" key={index} className={styles.Alert}>
                {msg}
              </Alert>
            ))}
            <Form.Group className="mb-3" controlId="password2">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                aria-label="password2"
                className={styles.Input}
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((msg, index) => (
              <Alert variant="warning" key={index} className={styles.Alert}>
                {msg}
              </Alert>
            ))}
            <Col className="text-center">
              <Button type="submit" className={`${styles.Button}`}>
                Sign Up
              </Button>
            </Col>
            <Col>
              {errors.non_field_errors?.map((msg, index) => (
                <Alert key={index} variant="warning" className="mt-3">
                  {msg}
                </Alert>
              ))}
            </Col>
          </Form>
        </Container>
        <Container>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
