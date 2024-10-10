import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <Row className={styles.Row}>
      <Col md={10} lg={8} className="my-auto mx-auto">
        <Container className="p-4">
          <h1 className={styles.Header}>sign up</h1>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className={styles.Input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="d-none">email</Form.Label>
              <Form.Control
                type="email"
                placeholder="E-mail"
                name="email"
                className={styles.Input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password1">
              <Form.Label className="d-none">password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                className={styles.Input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="d-none">confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password2"
                className={styles.Input}
              />
            </Form.Group>
            <Col className="text-center">
              <Button type="submit" className={`${styles.Button}`}>
                Sign Up
              </Button>
            </Col>
          </Form>
        </Container>
        <Container className={`${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
