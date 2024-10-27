import React from "react";

const Message = ({ message }) => {
  return (
    <div>
      <strong>{message.owner.username}</strong>: {message.content}
      <span>{new Date(message.timestamp).toLocaleString()}</span>
    </div>
  );
};

export default Message;
