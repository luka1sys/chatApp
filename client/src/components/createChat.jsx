import { useState } from "react";
import { useChat } from "../context/chatContext";
import { useAuth } from "../context/authContext";

const CreateChat = () => {
  const { createChat } = useChat();
  const { users } = useAuth();

  const [title, setTitle] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUsers.length === 0) return alert("Please select at least one user");

    await createChat({
      title,
      members: selectedUsers,
    });

    setTitle("");
    setSelectedUsers([]);
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 shadow-lg backdrop-blur-sm">
      <div className="border-b border-neutral-800 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-white">Start New Conversation</h2>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
              Chat Name
            </label>
            <input
              type="text"
              placeholder="e.g. Project Team"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-neutral-500">
              Add Members
            </label>
            <div className="max-h-[160px] overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-950 p-2 scrollbar-thin scrollbar-thumb-neutral-800">
              {users.map((user) => (
                <label 
                  key={user._id} 
                  className={`group flex cursor-pointer items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-neutral-900 ${
                    selectedUsers.includes(user._id) ? "bg-emerald-900/10" : ""
                  }`}
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      value={user._id}
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleCheckboxChange(user._id)}
                      className="peer h-4 w-4 cursor-pointer rounded border-neutral-700 bg-neutral-900 text-emerald-600 focus:ring-emerald-600/20"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-medium transition-colors ${selectedUsers.includes(user._id) ? "text-emerald-400" : "text-neutral-300 group-hover:text-white"}`}>
                        {user.fullname}
                    </span>
                    <span className="text-xs text-neutral-500">{user.email}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all hover:from-emerald-500 hover:to-emerald-400 hover:shadow-emerald-900/40 active:scale-[0.98]"
          >
            Create Chat
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChat;