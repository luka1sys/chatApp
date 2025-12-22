import { useState } from "react";
import { useChat } from "../context/chatContext";
import { useMessage } from "../context/messageContext";
import { useAuth } from "../context/authContext";

const ChatWindow = () => {
    const { chats } = useChat();
    const { currentChatId, selectChat, messages, sendMessage } = useMessage();
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        sendMessage(newMessage);
        setNewMessage("");
    };

    // თუ მობილურზე ჩატი არ არის არჩეული, საერთოდ არაფერი არ დავარენდეროთ ამ სვეტში
    if (!currentChatId) {
        return (
            <div className="hidden lg:flex h-full items-center justify-center bg-neutral-900/50 rounded-2xl border border-neutral-800">
                <p className="text-neutral-500">Select a conversation to start chatting</p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-none sm:rounded-2xl border-x-0 sm:border border-neutral-800 bg-neutral-900 shadow-2xl sm:flex-row">

            {/* Messages Window */}
            <div className="flex flex-1 flex-col min-h-0 bg-neutral-950 overflow-hidden">

                {/* Chat Header - აქ დავამატეთ უკან გამოსვლის ღილაკი */}
                <div className="flex items-center gap-3 border-b border-neutral-800 bg-neutral-900/50 p-4 shrink-0">
                    <button
                        onClick={() => selectChat(null)}
                        className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-sm font-bold text-white uppercase tracking-tight">
                            {chats.find(c => c._id === currentChatId)?.title || "Chat"}
                        </h2>
                        <p className="text-[10px] text-emerald-500 font-medium uppercase">Active Now</p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
                    <div className="space-y-4">
                        {messages.map((msg) => {
                            const isOutgoing = user && msg.sender._id === user._id;
                            return (
                                <div key={msg._id} className={`flex w-full ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex max-w-[85%] flex-col gap-1 sm:max-w-[70%] ${isOutgoing ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-2.5 shadow-sm ${isOutgoing ? 'rounded-2xl rounded-tr-sm bg-emerald-600 text-white' : 'rounded-2xl rounded-tl-sm bg-neutral-800 text-neutral-200'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Input Area */}
                <div className="shrink-0 border-t border-neutral-800 bg-neutral-900 p-4 pb-8 sm:pb-4">
                    <form onSubmit={handleSend} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-200 outline-none focus:border-emerald-500/50"
                        />
                        <button type="submit" disabled={!newMessage.trim()} className="bg-emerald-600 p-3 rounded-xl text-white disabled:opacity-50">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 12h14" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;