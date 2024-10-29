import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useNavigate, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import styles from "../../styles/CreateEditForm.module.css";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Username ve password state'leri
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      if (currentUser.profile_id.toString() !== id) {
        navigate("/");
      }
      setUsername(currentUser.username);
    } else {
    }
  }, [currentUser, navigate, id]);

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", { username });
      setCurrentUser((prevUser) => ({ ...prevUser, username }));
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handlePasswordChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="mx-auto my-2 text-center" md={6}>
        <Container>
          <Row className={`${styles.Form} mb-2 p-2`}>
            <Form onSubmit={handleUsernameSubmit}>
              <Form.Group>
                <h2 className={styles.Label}>Change username</h2>
                <Form.Control
                  placeholder="Username"
                  type="text"
                  className="text-center"
                  aria-label="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              {errors?.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              <div className="mt-3 mb-2">
                <Button className="btn btn-warning" type="submit">
                  Change Username
                </Button>
              </div>
            </Form>
          </Row>

          <Row className={`${styles.Form} p-2`}>
            <Form onSubmit={handlePasswordSubmit}>
              <Form.Group>
                <h2 className={styles.Label}>New password</h2>
                <Form.Control
                  placeholder="New Password"
                  type="password"
                  className="text-center"
                  aria-label="password1"
                  value={new_password1}
                  onChange={handlePasswordChange}
                  name="new_password1"
                />
              </Form.Group>
              {errors?.new_password1?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              <Form.Group>
                <h2 className={styles.Label}>Confirm password</h2>
                <Form.Control
                  placeholder="Confirm New Password"
                  type="password"
                  className="text-center"
                  aria-label="password2"
                  value={new_password2}
                  onChange={handlePasswordChange}
                  name="new_password2"
                />
              </Form.Group>
              {errors?.new_password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              <div className="mt-3 mb-2">
                <Button type="submit" className="btn btn-success">
                  Change Password
                </Button>
              </div>
            </Form>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default ProfileSettings;
