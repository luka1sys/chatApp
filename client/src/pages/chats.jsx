import { useMessage } from "../context/messageContext";
import ChatList from "../components/chatList";
import ChatWindow from "../components/chatWindow";
import CreateChat from "../components/createChat";

const Chats = () => {
    const { currentChatId } = useMessage();

    return (
        <div className="container mx-auto max-w-[1600px] p-0 sm:p-4 lg:p-6 h-[calc(100dvh-73px)] overflow-hidden">
            <div className="grid h-full grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6">

                {/* Sidebar - მობილურზე ჩანს მხოლოდ მაშინ, როცა ჩატი არ არის არჩეული */}
                <div className={`${currentChatId ? 'hidden' : 'flex'} lg:flex h-full flex-col gap-6 lg:col-span-4 xl:col-span-3 overflow-hidden`}>
                    <div className="shrink-0 p-4 lg:p-0">
                        <CreateChat />
                    </div>
                    <div className="min-h-0 flex-1 overflow-hidden flex flex-col">
                        <ChatList />
                    </div>
                </div>

                {/* Chat Window - მობილურზე ჩანს მხოლოდ მაშინ, როცა ჩატი არჩეულია */}
                <div className={`${currentChatId ? 'flex' : 'hidden'} lg:flex h-full lg:col-span-8 xl:col-span-9 overflow-hidden`}>
                    <ChatWindow />
                </div>
            </div>
        </div>
    );
};

export default Chats;