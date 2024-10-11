import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const { profile_id, profile_image, owner, updated_at, content } = props;

  return (
    <div>
      <hr />
      <div className="d-flex">
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <div className="d-flex flex-column ml-2">
          <div>
            <span className={styles.Owner}>{owner}</span>
            <span className={styles.Date}>{updated_at}</span>
          </div>

          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
