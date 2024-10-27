import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";

const ChatsPage = () => {
  const [chats, setChats] = useState([]);
  const currentUser = useCurrentUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      if (currentUser) {
        try {
          const { data } = await axiosReq.get("/chats/");
          console.log(data);
          setChats(data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchChats();
  }, [currentUser]);

  const ChatItem = ({ chat }) => {
    const otherUser =
      chat.user1.id === currentUser.id ? chat.user2 : chat.user1;

    return (
      <div>
        <h4>
          Chat with <strong>{otherUser.username}</strong>
        </h4>
      </div>
    );
  };

  return (
    <div>
      <h2>Messages</h2>
      {loading ? (
        <Asset spinner />
      ) : chats?.length > 0 ? (
        chats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
      ) : (
        <p>You don't have a chat history.</p>
      )}
      {}
    </div>
  );
};

export default ChatsPage;
