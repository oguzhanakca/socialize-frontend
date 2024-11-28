import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      console.log(data);

      setComments((prevComments) => ({
        ...prevComments,
        results: [{ ...data, like_id: null }, ...prevComments?.results],
      }));
      console.log("Comment error");

      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      console.log("Post error");

      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto">
      <Form className="d-flex p-2" onSubmit={handleSubmit}>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profileImage} id={profile_id} />
        </Link>
        <Form.Group className="flex-grow-1">
          <InputGroup>
            <Form.Control
              className={`${styles.Form}`}
              placeholder="Add your comment"
              as="textarea"
              aria-label="comment"
              value={content}
              onChange={handleChange}
              rows={2}
            />
          </InputGroup>
        </Form.Group>
        <button
          className={`${styles.Button}`}
          disabled={!content.trim()}
          type="submit"
        >
          Post
        </button>
      </Form>
    </div>
  );
}

export default CommentCreateForm;
