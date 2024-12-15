import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import ResponsiveImage from "../../components/ResponsiveImage";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    postlikes_count,
    like_id,
    title,
    content,
    image_url,
    updated_at,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();
  const optimizedImageUrl = image_url
    ?.replace("http://", "https://")
    .replace("/upload/", "/upload/f_auto,q_auto/");
  const secured_profile_image = profile_image?.replace("http://", "https://");

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`posts/${id}`);
      navigate("/", { state: { message: "The post successfully deleted." } });
    } catch (err) {
      // console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/postlikes/", { post: id });
      setPosts((prevPosts) => {
        console.log(prevPosts);

        return {
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? {
                  ...post,
                  postlikes_count: post.postlikes_count + 1,
                  like_id: data.id,
                }
              : post;
          }),
        };
      });
    } catch (err) {
      // console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/postlikes/${like_id}`);
      setPosts((prevPosts) => {
        console.log(prevPosts);
        return {
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? {
                  ...post,
                  postlikes_count: post.postlikes_count - 1,
                  like_id: null,
                }
              : post;
          }),
        };
      });
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Header className="d-flex align-items-center justify-content-between">
        <div>
          <Link to={`/profiles/${profile_id}`} className={styles.Owner}>
            <Avatar src={secured_profile_image} height={55} id={id} />

            <span className="ms-1">{owner}</span>
          </Link>
          <span className={`${styles.Dot} mx-1`}>
            <i className="fa-solid fa-circle"></i>
          </span>
          <span className={styles.Date}>{updated_at}</span>
        </div>
        <div className="align-self-center">
          {is_owner && postPage && (
            <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </div>
      </Card.Header>
      <Card.Body>
        {title && (
          <Card.Title className={`${styles.Title} text-center`}>
            {title}
          </Card.Title>
        )}
        {content && <Card.Text className={styles.Content}>{content}</Card.Text>}
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <ResponsiveImage
          webpSrc={optimizedImageUrl}
          fallbackSrc={optimizedImageUrl}
          alt={title}
          style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
        />
      </Link>
      <div className={styles.PostBar}>
        <span>
          {is_owner ? (
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span>
              <span onClick={handleUnlike}>
                <i className={`fas fa-heart ${styles.Heart}`} />
              </span>
            </span>
          ) : currentUser ? (
            <span>
              <span onClick={handleLike}>
                <i className={`far fa-heart ${styles.HeartOutline}`} />
              </span>
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {postlikes_count}
        </span>
        <span>
          <i className="fa-regular fa-comment"></i>
          {comments_count}
        </span>
      </div>
    </Card>
  );
};

export default Post;
