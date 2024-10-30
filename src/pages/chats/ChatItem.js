import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/ChatItem.module.css";

const ChatItem = ({ chat, onDelete }) => {
  return (
    <div
      className={`${styles.Item} d-flex justify-content-between align-items-center`}
    >
      <div>
        <Link to={`/chats/${chat.id}`}>
          <Avatar
            src={chat.other_user_profile_image}
            height={50}
            id={`${chat.other_user_username}_${chat.id}`}
          />
          {chat.other_user_username}
        </Link>
      </div>
      <i
        className="fa-solid fa-trash-can text-danger ms-2 fs-3"
        role="button"
        onClick={() => onDelete(chat.id)}
        style={{ cursor: "pointer" }}
      ></i>
    </div>
  );
};

export default ChatItem;
