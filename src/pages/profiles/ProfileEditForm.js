import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/CreateEditForm.module.css";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();
  const [securedImage, setSecuredImage] = useState();


  const [profileData, setProfileData] = useState({
    bio: "",
    image_url: "",
    is_private: false,
  });
  const { bio, image_url, is_private } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}`);
          const { bio, image_url, is_private } = data;
          setSecuredImage(image_url?.replace("http://", "https://"))
          setProfileData({ bio, image_url, is_private });
        } catch (err) {
          // console.log(err);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    handleMount();
  }, [currentUser, navigate, id]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      setProfileData({
        ...profileData,
        image_url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleChangePrivacy = (e) => {
    setProfileData({
      ...profileData,
      is_private: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("is_private", is_private);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image_url,
      }));
      navigate(-1);
    } catch (err) {
      // console.log([...formData]);

      // console.log(err.response?.data);
      setErrors(err.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <h3 className={`${styles.Label} fs-2`}>Bio</h3>
        <Form.Control
          as="textarea"
          value={bio}
          aria-label="bio"
          onChange={handleChange}
          name="bio"
          rows={7}
        />
      </Form.Group>

      {errors?.bio?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <h3 className={`${styles.Label} fs-2`}>Privacy</h3>
        <div className="d-flex align-items-baseline">
          <Form.Check
            className={`${styles.Privacy} my-2 align-items-start`}
            type="switch"
            id="privacy-switch"
            aria-label="privacy"
            checked={is_private}
            onChange={handleChangePrivacy}
          />
          <p className="ms-1">Make my profile private!</p>
        </div>
      </Form.Group>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is private profile?</Accordion.Header>
          <Accordion.Body>
            If you turn your profile private, only followers can view and search
            your posts.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button
        className={styles.Button}
        variant="danger"
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
      <Button className={styles.Button} variant="success" type="submit">
        Save
      </Button>
    </>
  );

  return (
    <Container>
      <div>
        <h2 className={styles.Header}>Edit Profile</h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className={styles.Form}>
          <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
            <Container className={`d-flex flex-column justify-content-center`}>
              <Form.Group className="text-center">
                {image_url && (
                  <figure>
                    <Image src={image_url} fluid rounded alt="upload" />
                  </figure>
                )}
                {errors?.image_url?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <div>
                  <Form.Label
                    className="btn btn-secondary"
                    htmlFor="image-upload"
                  >
                    Change profile picture
                  </Form.Label>
                </div>
                <Form.Control
                  type="file"
                  id="image-upload"
                  ref={imageFile}
                  accept="image/*"
                  onChange={handleChangeImage}
                />
              </Form.Group>
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
          <Col
            md={5}
            lg={6}
            className="d-none d-md-block p-0 p-md-2 text-center mx-auto"
          >
            <Container>{textFields}</Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProfileEditForm;
