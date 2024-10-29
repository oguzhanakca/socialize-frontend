import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import axios from "axios";
import CommentEditForm from "./CommentEditForm";
import { axiosRes } from "../../api/axiosDefaults";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
    commentlikes_count,
    like_id,
  } = props;
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/comments/${id}`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/commentlikes/", { comment: id });

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                commentlikes_count: comment.commentlikes_count + 1,
                like_id: data.id,
              }
            : comment;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/commentlikes/${like_id}`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                commentlikes_count: comment.commentlikes_count - 1,
                like_id: null,
              }
            : comment;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.Comment}>
      <hr />
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} id={owner} />
          </Link>
          <div className="d-flex flex-column ml-2 justify-content-between">
            <div className="d-flex align-items-center gap-1">
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Dot}>
                <i class="fa-solid fa-circle"></i>
              </span>
              <span className={styles.Date}>{updated_at}</span>
            </div>
            {showEditForm ? (
              <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <div>
                <p className="my-0">{content}</p>
                <span className="fs-4">
                  {is_owner ? (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={<Tooltip>You can't like your own post!</Tooltip>}
                    >
                      <i className="far fa-heart" />
                    </OverlayTrigger>
                  ) : like_id ? (
                    <span onClick={handleUnlike}>
                      <i className={`fas fa-heart ${styles.Heart}`} />
                    </span>
                  ) : currentUser ? (
                    <span onClick={handleLike}>
                      <i className={`far fa-heart ${styles.HeartOutline}`} />
                    </span>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Log in to like posts!</Tooltip>}
                    >
                      <i className="far fa-heart" />
                    </OverlayTrigger>
                  )}
                  {commentlikes_count}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="pe-3">
          {is_owner && !showEditForm && (
            <MoreDropdown
              handleDelete={handleDelete}
              handleEdit={() => setShowEditForm(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
