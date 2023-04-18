import React from "react";
import ChatCard from "./ChatCard";

type ChatItem = {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTimestamp: string;
  hasNotification: boolean;
  users: string[];
  isGroup: boolean;
};

interface ChatData {
  id: string;
  imageUrl: string;
  name: string;
  username: string;
  isGroup: boolean;
  users: string[];
  isOnline: boolean;
}

interface ChatListProps {
  chatsData: ChatItem[];
  selectedChatData: ChatData | null;
  onChatSelect: (selectedChatData: ChatData) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chatsData, selectedChatData, onChatSelect }) => {
  return (
    <div className="flex-grow w-full">
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
          isSelected={chat.id.toString() === selectedChatData?.id}
          onSelect={onChatSelect}
          users={chat.users}
          isGroup={chat.isGroup}
        />
      ))}
    </div>
  );
};

export default ChatList;
