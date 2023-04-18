import React from "react";

interface ChatData {
  id: string;
  imageUrl: string;
  name: string;
  username: string;
  isGroup: boolean;
  isOnline: boolean;
  users: string[];
}

interface ChatCardProps {
  id: string;
  imageUrl: string;
  name: string;
  username: string;
  isGroup: boolean;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTimestamp: string;
  hasNotification: boolean;
  isSelected: boolean;
  users: string[];
  onSelect: (ChatData: ChatData) => void;
}

const ChatCard: React.FC<ChatCardProps> = ({
  id,
  imageUrl,
  name,
  username,
  isGroup,
  isOnline,
  lastMessage,
  lastMessageTimestamp,
  hasNotification,
  isSelected,
  users,
  onSelect,
}) => {
  const timeAgo = (date: string) => {
    // Calculate time ago based on the given date
    if (date === "null") {
      return "";
    } else {
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
    }
  };

  const chatData: ChatData = {
    id,
    imageUrl,
    name,
    username,
    isGroup,
    isOnline,
    users,
  };

  const cardClass = isSelected ? "bg-blue-50 border-blue-500 border-l-8 pl-0.5 w-full" : "md:pl-2.5 bg-white border-gray-300 border md:hover:bg-blue-50";

  return (
    <div className={`relative flex p-3 cursor-pointer  ${cardClass}`} onClick={() => onSelect(chatData)}>
      <div className="flex flex-row w-full">
        <div className="flex items-center mr-2">
          <div className="w-3 h-3 mb-3">{hasNotification && <div className="bg-blue-500 w-full h-full rounded-full"></div>}</div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row">
            <div className="flex flex-col items-start mr-3">
              <div className="relative w-12 h-12">
                <img src={imageUrl} alt={name} className="w-full h-full rounded-full" />
                {!isGroup && (
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-white ${isOnline ? "bg-green-500" : "bg-gray-500"}`}></div>
                )}
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-row justify-between w-full">
                  <div className="flex items-center justify-center line-clamp-1">{name}</div>
                  <div className="text-gray-600 text-xs flex items-center justify-center">{timeAgo(lastMessageTimestamp)}</div>
                </div>
                <div className="text-gray-600 text-sm flex items-center">{username}</div>
              </div>
            </div>
          </div>
          <div className=" mt-3">
            <div className="text-gray-800 text-sm line-clamp-2 italic">{lastMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
