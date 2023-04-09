import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const ChatPage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleChatSelect = (id: string) => {
    setSelectedChatId(id);
  };

  return (
    <div className="flex">
      <Sidebar selectedChatId={selectedChatId} onChatSelect={handleChatSelect} />
      <div className="w-full h-full flex flex-col">
        <TopBar selectedChatId={selectedChatId} />
      </div>
    </div>
  );
};

export default ChatPage;
