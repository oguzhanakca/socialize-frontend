import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import axios from "axios";
import CommentEditForm from "./CommentEditForm";

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

  return (
    <div>
      <hr />
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <div className="d-flex flex-column ml-2 justify-content-between">
            <div>
              <span className={styles.Owner}>{owner}</span>
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
              <p>{content}</p>
            )}
          </div>
        </div>
        <div>
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
