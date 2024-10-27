import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const ChatItem = ({ chat }) => {
  return (
    <div className="mt-3">
      <Link to={`/chats/${chat.id}`}>
        <Avatar src={chat.other_user_profile_image} height={50} />
        {chat.other_user_username}
      </Link>
    </div>
  );
};

export default ChatItem;
