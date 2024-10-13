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

  // Hata state'leri
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Username güncellenmesi için state
  useEffect(() => {
    if (currentUser) {
      if (currentUser.profile_id.toString() !== id) {
        navigate("/");
      }
      setUsername(currentUser.username);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [currentUser, navigate, id]);

  // Username güncelleme işlemi
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

  // Şifre değişikliği için veri işleme
  const handlePasswordChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  // Şifre güncelleme işlemi
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      navigate(-1);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container>
          {/* Username Form */}
          <Form onSubmit={handleUsernameSubmit} className="my-2">
            <Form.Group>
              <Form.Label>Change username</Form.Label>
              <Form.Control
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button className="btn btn-warning" onClick={() => navigate(-1)}>
              cancel
            </Button>
            <Button className="btn btn-primary" type="submit">
              save username
            </Button>
          </Form>

          {/* Password Form */}
          <Form onSubmit={handlePasswordSubmit} className="my-2">
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
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
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
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
            <Button className="btn btn-warning" onClick={() => navigate(-1)}>
              cancel
            </Button>
            <Button type="submit" className="btn btn-primary">
              save password
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default ProfileSettings;
