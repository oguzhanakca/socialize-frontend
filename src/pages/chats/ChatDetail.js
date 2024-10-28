import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Message from "./Message";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Container, Form, ListGroup, Row } from "react-bootstrap";
import styles from "../../styles/ChatDetail.module.css";
import Asset from "../../components/Asset";

const ChatDetail = (props) => {
  const { chat_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const currentUser = useCurrentUser();
  const [chat, setChat] = useState();
  const [hasLoaded, setHasLoaded] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axiosReq.get(`/chats/${chat_id}/messages/`);
        setMessages(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchChat = async () => {
      try {
        const { data } = await axiosReq.get(`/chats/${chat_id}/`);
        setChat(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
    fetchChat();
    setHasLoaded(true);
    scrollToBottom();
  }, [chat_id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosReq.post(`/chats/${chat_id}/messages/`, {
        content: messageContent,
        chat: chat_id,
      });

      setMessages((prevMessages) => [...prevMessages, data]);
      setMessageContent("");
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Container>
      {hasLoaded ? (
        <div className={`${styles.Background} d-flex flex-column`}>
          <h2 className="text-center">Chat with {chat?.other_user_username}</h2>
          <div className="mt-1 flex-grow-1 overflow-auto">
            <ListGroup className={`${styles.Messages} mt-2`}>
              {messages?.map((msg) => (
                <Message
                  key={msg.id}
                  message={msg}
                  owner={currentUser.username === msg.owner}
                  onDelete={handleDeleteMessage}
                />
              ))}
              <div ref={messagesEndRef} />
            </ListGroup>
          </div>
          <Row className="mt-auto mb-0">
            <Form onSubmit={handleSubmit} className="d-flex w-100">
              <div className="flex-grow-1 me-2">
                <Form.Group controlId="messageInput">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    required
                    style={{ resize: "none" }}
                  />
                </Form.Group>
              </div>
              <div>
                <Button variant="primary" type="submit" className="h-100">
                  Send
                </Button>
              </div>
            </Form>
          </Row>
        </div>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default ChatDetail;
