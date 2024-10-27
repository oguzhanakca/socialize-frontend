import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Message from "./Message";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const ChatDetail = () => {
  const { chat_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axiosReq.get(`/chats/${chat_id}/messages/`);
        setMessages(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [chat_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageContent.trim()) {
      console.log("Empty");
      return;
    }
    try {
      console.log(currentUser);

      const { data } = await axiosReq.post(`/chats/${chat_id}/messages/`, {
        content: messageContent,
        chat: chat_id,
      });
      setMessages((prevMessages) => [...prevMessages, data]);
      setMessageContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>
        Chat with {messages.length ? messages[0].other_user_username : "..."}
      </h2>
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatDetail;
