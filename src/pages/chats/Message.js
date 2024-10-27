import React from "react";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Message.module.css";

const Message = ({ message, owner }) => {
  return (
    <div>
      <div className={`d-flex ${owner ? "flex-row-reverse" : "flex-row"} my-1`}>
        <div>
          <Avatar src={message.owner_image_url} height={45} />
        </div>
        <div
          className={`${owner ? styles.Owner : styles.Other}
          `}
        >
          <p className={`${styles.Head} d-flex gap-1`}>
            {message.owner}{" "}
            <span className={styles.Dot}>
              <i class="fa-solid fa-circle"></i>
            </span>{" "}
            {"Date"}
          </p>
          <p className={`${styles.Content}`}>{message.content}</p>
        </div>

        {/* <span>{new Date(message.timestamp).toLocaleString()}</span> */}
      </div>
    </div>
  );
};

export default Message;
