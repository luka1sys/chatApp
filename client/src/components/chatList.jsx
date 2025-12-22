import { useAuth } from "../context/authContext";
import { useChat } from "../context/chatContext";
import { useMessage } from "../context/messageContext";

const ChatList = () => {
    const { user } = useAuth();
    const { chats } = useChat();
    const { selectChat } = useMessage();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 text-center backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-neutral-500">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 className="text-sm font-medium text-neutral-200">Authentication Required</h3>
                <p className="mt-1 text-xs text-neutral-500">Please login to view your conversations</p>
            </div>
        )
    }

    if (chats.length === 0) return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 text-center backdrop-blur-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800/50 text-emerald-500 ring-1 ring-emerald-500/20">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </div>
            <h2 className="text-sm font-semibold text-neutral-200">No chats yet</h2>
            <p className="mt-2 text-xs text-neutral-500">Create a new chat to get started</p>
        </div>
    )

    return (
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 shadow-2xl backdrop-blur-sm">
            <div className="border-b border-neutral-800 bg-neutral-900/80 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-neutral-100">Inbox</h2>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500 border border-emerald-500/20">
                        {chats.length} Active
                    </span>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                <div className="space-y-1">
                    {chats.map((chat) => (
                        <div 
                            key={chat._id}
                            onClick={() => selectChat(chat._id)}
                            className="group relative cursor-pointer rounded-xl p-3 transition-all duration-200 hover:bg-neutral-800 hover:shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 text-sm font-medium text-neutral-300 ring-1 ring-neutral-700 group-hover:ring-emerald-500/30">
                                    {chat.title.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-medium text-neutral-200 group-hover:text-emerald-400 transition-colors">
                                            {chat.title}
                                        </p>
                                    </div>
                                    <div className="mt-0.5 flex items-center gap-1.5">
                                        <svg className="h-3 w-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <p className="truncate text-xs text-neutral-500 group-hover:text-neutral-400">
                                            {chat.members.length} members
                                        </p>
                                    </div>
                                </div>
                                <svg className="h-4 w-4 text-neutral-600 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-emerald-500 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatList