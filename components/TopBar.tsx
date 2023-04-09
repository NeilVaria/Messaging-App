import React from "react";

interface TopBarProps {
  selectedChatId: string | null;
}

const TopBar: React.FC<TopBarProps> = ({ selectedChatId }) => {
  const renderContent = () => {
    if (selectedChatId) {
      // Render content for the selected chat
      return <div>Content for chat with ID {selectedChatId}</div>;
    } else {
      // Render default content
      return <div className="font-semibold text-xl">Make-It-All Internal Messaging System</div>;
    }
  };

  return <div className="border-b border-gray-300 py-3 px-4">{renderContent()}</div>;
};

export default TopBar;
