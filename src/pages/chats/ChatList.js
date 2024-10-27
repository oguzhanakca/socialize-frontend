import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import ChatItem from "./ChatItem";

const ChatList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axiosReq.get("/chats/");
        setChats(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChats();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      {chats?.length ? (
        chats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
      ) : (
        <p>No chats available.</p>
      )}
    </div>
  );
};

export default ChatList;
