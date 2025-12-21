import { createContext, useContext, useState, useEffect } from "react";
import api from "../components/api/api";
import socket from "../socket";
// axios instance

const MessageContext = createContext();
export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  // State ამატებს ყველა მესიჯს მიმდინარე chat-ისთვის
  const [messages, setMessages] = useState([]);
  // ამ state-ში ინახება ახლა არჩეული chat
  const [currentChatId, setCurrentChatId] = useState(null);

  //  ფუნქცია chat-ს არჩევისთვის
  const selectChat = (chatId) => {
    setCurrentChatId(chatId);
    fetchMessages(chatId); // ამავე დროს წაიღოს მესიჯები ამ ჩატისთვის
  };

  useEffect(() => {
    if (!currentChatId) return;

    socket.emit("joinChat", currentChatId);

    return () => {
      socket.emit("leaveChat", currentChatId);
    };
  }, [currentChatId]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      if (message.chat.toString() === currentChatId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [currentChatId]);

  //  მესიჯების წამოღება კონკრეტული chatId-სთვის
  const fetchMessages = async (chatId) => {
    try {
      const res = await api.get(`/messages/${chatId}`);
      setMessages(res.data.messages); // ახალი მესიჯები state-ში
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // ესიჯის გაგზავნა
  const sendMessage = async (text) => {
    if (!currentChatId) return alert("Please select a chat first");

    try {
      await api.post("/messages", {
        chatId: currentChatId,
        text,
      });
      // ნუ ამატებ აქ მესიჯს, socket უკვე დაამატებს
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        currentChatId,
        selectChat,
        fetchMessages,
        sendMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};