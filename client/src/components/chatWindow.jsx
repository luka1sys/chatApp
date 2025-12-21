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

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl sm:flex-row">
            {/* Chat list sidebar */}
            <div className="flex w-full flex-col border-b border-neutral-800 bg-neutral-900/50 sm:w-72 sm:border-b-0 sm:border-r">
                <div className="bg-neutral-900/80 px-5 py-4 backdrop-blur-sm">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Conversations</h3>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800">
                    {chats.length === 0 ? (
                        <div className="p-6 text-center text-xs text-neutral-500">No active chats</div>
                    ) : (
                        <div className="space-y-0.5 p-2">
                            {chats.map((chat) => (
                                <div
                                    key={chat._id}
                                    onClick={() => selectChat(chat._id)}
                                    className={`group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition-all ${
                                        chat._id === currentChatId 
                                            ? 'bg-neutral-800 shadow-inner' 
                                            : 'hover:bg-neutral-800/50'
                                    }`}
                                >
                                    <div className={`flex h-2 w-2 rounded-full ${chat._id === currentChatId ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-neutral-700'}`} />
                                    <div className="min-w-0 flex-1">
                                        <p className={`truncate text-sm font-medium ${
                                            chat._id === currentChatId ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                                        }`}>
                                            {chat.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Messages window */}
            <div className="flex flex-1 flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/30 via-neutral-900 to-neutral-950">
                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-neutral-800">
                    {messages.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-4 opacity-50">
                            <div className="rounded-full bg-neutral-800/50 p-4 ring-1 ring-neutral-700">
                                <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-neutral-400">Select a chat to start messaging</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((msg) => {
                                const isOutgoing = user && msg.sender._id === user._id;
                                return (
                                    <div 
                                        key={msg._id} 
                                        className={`flex w-full ${isOutgoing ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex max-w-[85%] flex-col gap-1 sm:max-w-[70%] ${isOutgoing ? 'items-end' : 'items-start'}`}>
                                            <div className={`relative px-4 py-2.5 shadow-sm ${
                                                isOutgoing 
                                                    ? 'rounded-2xl rounded-tr-sm bg-emerald-600 text-white shadow-emerald-900/10' 
                                                    : 'rounded-2xl rounded-tl-sm bg-neutral-800 text-neutral-200 border border-neutral-700/50'
                                            }`}>
                                                <div className="mb-1 flex items-center justify-between gap-4">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                                        isOutgoing ? 'text-emerald-200' : 'text-emerald-500'
                                                    }`}>
                                                        {isOutgoing ? 'You' : msg.sender.fullname}
                                                    </span>
                                                </div>
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Input area */}
                <div className="border-t border-neutral-800 bg-neutral-900/90 p-4 backdrop-blur-md">
                    <form onSubmit={handleSend} className="relative flex items-center gap-3">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3.5 text-sm text-neutral-200 placeholder-neutral-600 shadow-inner outline-none transition-all focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                        />
                        <button 
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="group flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-3.5 font-medium text-white transition-all hover:bg-emerald-500 active:scale-95 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500 disabled:active:scale-100"
                        >
                            <span className="hidden sm:inline mr-2">Send</span>
                            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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