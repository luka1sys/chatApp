import { createContext, useContext, useEffect, useState } from "react";
import api from "../components/api/api";
import { useAuth } from "./authContext";

const ChatContext = createContext();
export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            fetchChats();
        } else {
            setChats([]); // logout-ისას გაწმენდა
        }
    }, [user]);

    const fetchChats = async () => {
        try {
            const res = await api.get('/chats');
            setChats(res.data.chats);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }

    }


    // create chat function
    const createChat = async ({ title, members }) => {
        try {
            const res = await api.post('/chats', { title, members });
            // state update 
            setChats((prev) => [...prev, res.data.chat]);


        } catch (error) {
            console.error('Error creating chat:', error);
        }
    }

    const addMember = async ({ chatId, userId }) => {
        try {
            const res = await api.patch(`/chats/${chatId}/add-member`, { userId });
            // ვუვლით მაპით თუახლანდელი აიდი ემთხვევა სთეითში არსებული ჩატის აიდს
            // მაშინ ვცვლით სხვა შემთხვევაში უცვლელს ვტოვებსთ 
            setChats((prev) => prev.map(chat => chat._id === chatId ? res.data.chat : chat));

        } catch (error) {
            console.error('Error adding member:', error);
        }


        console.log("Chats in context:", chats);


    }




    return (
        <ChatContext.Provider value={{
            chats,

            fetchChats,
            createChat,
            addMember
        }}>
            {children}
        </ChatContext.Provider>
    );
}



