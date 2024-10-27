import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import ChatItem from "./ChatItem";
import Asset from "../../components/Asset";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axiosReq.get("/chats/");
        setChats(data.results);

        setHasLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChats();
  }, []);

  return (
    <div>
      <h2 className="text-center">Messages</h2>
      {hasLoaded ? (
        chats?.length ? (
          chats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
        ) : (
          <p>No chats available.</p>
        )
      ) : (
        <Asset spinner />
      )}
    </div>
  );
};

export default ChatList;
