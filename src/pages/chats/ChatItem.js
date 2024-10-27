import React from "react";
import { Link } from "react-router-dom";

const ChatItem = ({ chat }) => {
  return (
    <div>
      <Link to={`/chats/${chat.id}`}>
        {chat.other_user_username}{" "}
        <img
          src={chat.other_user_profile_image}
          alt={chat.other_user_username}
        />
      </Link>
    </div>
  );
};

export default ChatItem;
