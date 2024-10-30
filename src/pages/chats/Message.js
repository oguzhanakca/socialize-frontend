import React from "react";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Message.module.css";
import { axiosReq } from "../../api/axiosDefaults";

const Message = ({ message, owner, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/messages/${message.id}/`);
      onDelete(message.id);
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  // console.log(message);

  return (
    <div>
      <div className={`d-flex ${owner ? "flex-row-reverse" : "flex-row"} my-1`}>
        <div>
          <Avatar src={message.owner_image_url} height={45} id={message.id} />
        </div>
        <div
          className={`${owner ? styles.Owner : styles.Other}
          `}
        >
          <p className={`${styles.Head} d-flex gap-1`}>
            {message.owner}{" "}
            <span className={styles.Dot}>
              <i className="fa-solid fa-circle"></i>
            </span>{" "}
            {message.timestamp}
          </p>

          <p className={`${styles.Content}`}>{message.content}</p>
        </div>
        <div className="d-flex align-items-center me-2">
          {owner && (
            <i
              className="fa-solid fa-trash-can text-danger ms-2 fs-3"
              role="button"
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
