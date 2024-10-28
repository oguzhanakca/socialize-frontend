import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import ChatItem from "./ChatItem";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/chats/");
        setChats(data.results);

        setHasLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    handleMount();
  }, []);

  const handleDeleteChat = async (chatId) => {
    try {
      await axiosReq.delete(`/chats/${chatId}/`); // API isteği
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-center">Messages</h2>
      {hasLoaded ? (
        chats.length ? (
          <InfiniteScroll
            children={chats?.map((chat) => (
              <ChatItem key={chat.id} chat={chat} onDelete={handleDeleteChat} />
            ))}
            dataLength={chats.length}
            loader={<Asset spinner />}
            hasMore={!!chats.next}
            next={() => fetchMoreData(chats, setChats)}
          />
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
