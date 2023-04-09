import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ChatList from "@/components/ChatList";

const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleChatSelect = (id: string) => {
    setSelectedChatId(id);
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-grow">
        <TopBar selectedChatId={selectedChatId} />
        <div className="p-4 font-light text-gray-600">Select an existing conversation or select “New Chat” to begin.</div>
      </div>
    </div>
  );
};

export default ChatPage;
