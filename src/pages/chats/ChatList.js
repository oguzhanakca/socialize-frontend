import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import ChatItem from "./ChatItem";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const ChatList = ({ user }) => {
  const [chats, setChats] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      const handleMount = async () => {
        try {
          const { data } = await axiosReq.get("/chats/");
          setChats(data);
          setHasLoaded(true);
        } catch (err) {
          // console.log(err);
        }
      };
      handleMount();
    }
  }, [navigate, user]);


  return (
    <div>
      <h2 className="text-center">Messages</h2>
      {hasLoaded ? (
        chats?.results.length ? (
          <InfiniteScroll
            children={chats?.results.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
            dataLength={chats?.results.length}
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
