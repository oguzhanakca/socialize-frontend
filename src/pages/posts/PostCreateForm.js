import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import styles from "../../styles/CreateEditForm.module.css";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { title, content, image } = postData;

  const imageInput = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      navigate(`/posts/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label className={styles.Label}>Post Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          aria-label="post-title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((msg, index) => (
        <Alert className={styles.Alert} variant="warning" key={index}>
          {msg}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label className={styles.Label}>Post Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          aria-label="post-content"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((msg, index) => (
        <Alert className={styles.Alert} variant="warning" key={index}>
          {msg}
        </Alert>
      ))}
      <Button className={styles.Button} variant="success" type="submit">
        Post
      </Button>
    </div>
  );

  return (
    <Container>
      <div>
        <h1 className={styles.Header}>Create A Post</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className={styles.Form}>
          <Col className="py-2 p-0 p-md-2 d-flex" lg={8}>
            <Container className="d-flex flex-column justify-content-center">
              <Form.Group className="text-center">
                {image ? (
                  <>
                    <figure>
                      <Image src={image} rounded fluid />
                    </figure>
                    <div>
                      <Form.Label
                        className={styles.ChangeButton}
                        htmlFor="image-upload"
                      >
                        Change the image
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <Asset
                      src="https://res.cloudinary.com/dyvzhzaak/image/upload/v1728620430/upload_qxrzen.png"
                      message="Upload image"
                      alt="upload-picture"
                    />
                  </Form.Label>
                )}

                <Form.Control
                  className="d-none"
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
                {errors?.image?.map((msg, index) => (
                  <Alert className={styles.Alert} variant="warning" key={index}>
                    {msg}
                  </Alert>
                ))}
              </Form.Group>

              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
          <Col lg={4} className="d-none d-md-block p-0 p-md-2 m-auto">
            <Container>{textFields}</Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default PostCreateForm;
