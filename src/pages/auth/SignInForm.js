import React from "react";
import useState from "react";
import Link from "react-router-dom";
import useNavigate from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import Form from "react-bootstrap";
import Button from "react-bootstrap";
import Col from "react-bootstrap";
import Row from "react-bootstrap";
import Container from "react-bootstrap";
import Alert from "react-bootstrap";
import axios from "axios";
import useSetCurrentUser from "../../contexts/CurrentUserContext";
import useRedirect from "../../hooks/useRedirect";
import setTokenTimestamp from "../../utils/utils";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");
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
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      navigate(-1);
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
              <Form.Control
                type="text"
                placeholder="Username"
                aria-label="username"
                name="username"
                className={styles.Input}
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.username?.map((msg, index) => (
              <Alert variant="warning" key={index} className={styles.Alert}>
                {msg}
              </Alert>
            ))}
            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                aria-label="password"
                name="password"
                className={styles.Input}
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors?.password?.map((msg, index) => (
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
              {errors?.non_field_errors?.map((msg, index) => (
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
