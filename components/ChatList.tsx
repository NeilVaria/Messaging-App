import React from "react";
import ChatCard from "./ChatCard";
import chatsData from "./chats.json";

interface ChatListProps {
  selectedChatId: string | null;
  onChatSelect: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ selectedChatId, onChatSelect }) => {
  return (
    <div className="flex-grow overflow-y-auto">
      {chatsData.map((chat) => (
        <ChatCard
          key={chat.id}
          id={chat.id.toString()}
          imageUrl={chat.imageUrl}
          name={chat.name}
          username={chat.username}
          isOnline={chat.isOnline}
          lastMessage={chat.lastMessage}
          lastMessageTimestamp={chat.lastMessageTimestamp}
          hasNotification={chat.hasNotification}
          isSelected={chat.id.toString() === selectedChatId}
          onSelect={onChatSelect}
        />
      ))}
    </div>
  );
};

export default ChatList;
