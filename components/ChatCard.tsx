import React from "react";

interface ChatCardProps {
  id: string;
  imageUrl: string;
  name: string;
  username: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTimestamp: string;
  hasNotification: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ChatCard: React.FC<ChatCardProps> = ({
  id,
  imageUrl,
  name,
  username,
  isOnline,
  lastMessage,
  lastMessageTimestamp,
  hasNotification,
  isSelected,
  onSelect,
}) => {
  const timeAgo = (date: string) => {
    // Calculate time ago based on the given date
    const timeAgo = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (timeAgo < 60) {
      return `${timeAgo} seconds ago`;
    }
    if (timeAgo < 3600) {
      return `${Math.floor(timeAgo / 60)} minutes ago`;
    }
    if (timeAgo < 86400) {
      return `${Math.floor(timeAgo / 3600)} hours ago`;
    }
    if (timeAgo < 604800) {
      return `${Math.floor(timeAgo / 86400)} days ago`;
    }
    if (timeAgo < 2592000) {
      return `${Math.floor(timeAgo / 604800)} weeks ago`;
    }
    if (timeAgo < 31536000) {
      return `${Math.floor(timeAgo / 2592000)} months ago`;
    }
    return `${Math.floor(timeAgo / 31536000)} years ago`;
  };

  const cardClass = isSelected ? "bg-blue-100 border-l-4 border-blue-500" : "bg-white";

  return (
    <div className={`relative p-4 border-b border-gray-300 cursor-pointer ${cardClass}`} onClick={() => onSelect(id)}>
      <div className="flex items-center p-3 bg-white border-b border-gray-300">
        <div className="w-3 h-3 mr-3">{hasNotification && <div className="bg-blue-500 w-full h-full rounded-full"></div>}</div>
        <div className="relative w-12 h-12 mr-3">
          <img src={imageUrl} alt={name} className="w-12 h-12 rounded-full" />
          <div className={`absolute bottom-0 left-1 w-3 h-3 rounded-full border border-white ${isOnline ? "bg-green-500" : "bg-gray-500"}`}></div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold">{name}</div>
              <div className="text-gray-600 text-sm">@{username}</div>
            </div>
            <div className="text-gray-600 text-xs">{timeAgo(lastMessageTimestamp)}</div>
          </div>
          <div className="text-gray-800 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">{lastMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
