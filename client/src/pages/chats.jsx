import ChatList from "../components/chatList"
import ChatWindow from "../components/chatWindow"
import CreateChat from "../components/createChat"

const Chats = () => {
    return (
        <div className="container mx-auto max-w-[1600px] p-4 lg:p-6 h-[calc(100vh-73px)]">
            <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Sidebar Column */}
                <div className="flex h-full flex-col gap-6 lg:col-span-4 xl:col-span-3 overflow-hidden">
                    <div className="shrink-0">
                        <CreateChat/>
                    </div>
                    <div className="min-h-0 flex-1 overflow-hidden flex flex-col">
                        <ChatList />
                    </div>
                </div>

                {/* Chat Window Column */}
                <div className="hidden h-full lg:col-span-8 lg:block xl:col-span-9">
                    <ChatWindow/>
                </div>
                
                {/* Mobile View Adjustment - This ensures ChatWindow appears correctly on mobile if logic permits, 
                    though based on your component structure usually router handles view switching or css hiding.
                    For this specific layout code: */}
                <div className="block h-[600px] lg:hidden">
                     <ChatWindow/>
                </div>
            </div>
        </div>
    )
}

export default Chats