import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import styles from "../../styles/CreateEditForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostEditForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image_url: "",
  });
  const { title, content, image_url } = postData;
  const [initialData, setInitialData] = useState(null);

  const imageInput = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  // const [securedImage, setSecuredImage] = useState();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}`);

        const { title, content, image_url, is_owner } = data;
        if (is_owner) {
          setPostData({ title, content, image_url });
          setInitialData({ title, content, image_url });
        } else {
          navigate("/");
        }
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [navigate, id]);

  const hasChanges = () => {
    if (!initialData) return false;
    return (
      title !== initialData.title ||
      content !== initialData.content ||
      image_url !== initialData.image_url
    );
  };

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image_url);
      setPostData({
        ...postData,
        image_url: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}`, formData);
      // console.log(formData);

      navigate(`/posts/${id}`, {
        state: { message: "The post has been edited successfully." },
      });
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
        <h3 className={styles.Label}>Post Title</h3>
        <Form.Control
          aria-label="post-title"
          type="text"
          name="title"
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
        <h3 className={styles.Label}>Post Content</h3>
        <Form.Control
          aria-label="post-content"
          as="textarea"
          rows={6}
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
      <Button
        className={styles.Button}
        variant="danger"
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
      <Button
        className={styles.Button}
        variant="success"
        type="submit"
        disabled={!hasChanges()}
      >
        Edit
      </Button>
    </div>
  );

  return (
    <Container>
      <div>
        <h2 className={styles.Header}>Edit Post</h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className={styles.Form}>
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container className={`d-flex flex-column justify-content-center`}>
              <Form.Group className="text-center">
                <figure>
                  <Image src={image_url} rounded fluid alt="post-image" />
                </figure>
                <div>
                  <Form.Label className="btn" htmlFor="image-upload">
                    Change the image
                  </Form.Label>
                </div>

                <Form.Control
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
              </Form.Group>
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
          <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
            <Container>{textFields}</Container>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default PostEditForm;
