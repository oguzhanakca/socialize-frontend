import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image_url,
    updated_at,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Post}>
      <Card.Header className="d-flex align-items-center justify-content-between">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} height={55} />
          {owner}
        </Link>
        <div className="d-flex align-items-center">
          <span>{updated_at}</span>
          {is_owner && postPage && "..."}
        </div>
      </Card.Header>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image_url} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i class="fa-solid fa-heart"></i>
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => {}}>
              <i class="fa-solid fa-heart"></i>
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
              <i class="fa-regular fa-heart"></i>
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You must log in to like posts.</Tooltip>}
            >
              <i class="fa-regular fa-heart"></i>
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/posts/${id}`}>
            <i class="fa-regular fa-comment"></i>
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
