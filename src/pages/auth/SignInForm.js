import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/login/", signInData);
      navigate("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col md={10} lg={8} className="my-auto mx-auto">
        <Container className="p-4">
          <h1 className={styles.Header}>sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
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
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="d-none">password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className={styles.Input}
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((msg, index) => (
              <Alert variant="warning" key={index} className={styles.Alert}>
                {msg}
              </Alert>
            ))}
            <Col className="text-center">
              <Button type="submit" className={`${styles.Button}`}>
                Sign In
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
          <Link className={styles.Link} to="/signup">
            Don't have an account yet? <span>Sign up</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignInForm;
