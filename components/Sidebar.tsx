import React, { useState } from "react";
import ChatList from "./ChatList";
import { signOut, useSession } from "next-auth/react";
import router from "next/router";
import Head from "next/head";
import { ThemeProvider, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog, faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

interface ChatData {
  id: string;
  imageUrl: string;
  name: string;
  username: string;
  isGroup: boolean;
  isOnline: boolean;
  users: string[];
}

type ChatItem = {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTimestamp: string;
  hasNotification: boolean;
  isGroup: boolean;
  users: string[];
};

interface SidebarProps {
  chatsData: any[];
  selectedChatData: ChatData | null;
  onChatSelect: (chatData: ChatData) => void;
}

const sortByTimestampDesc = (a: ChatItem, b: ChatItem) => {
  const dateA = a.lastMessageTimestamp ? new Date(a.lastMessageTimestamp) : new Date(0);
  const dateB = b.lastMessageTimestamp ? new Date(b.lastMessageTimestamp) : new Date(0);

  return dateB.getTime() - dateA.getTime();
};

const Sidebar: React.FC<SidebarProps> = ({ chatsData, selectedChatData, onChatSelect }) => {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredChats = chatsData.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase())).sort(sortByTimestampDesc);
  return (
    <>
      <ThemeProvider>
        <div
          className={`${
            selectedChatData ? "hidden sm:block md:block" : "w-full sm:w-1/5 md:w-2/12"
          } fixed left-0 border-r border-gray-300 h-full flex flex-col`}
        >
          <div className="w-full">
            <div className="p-2 my-3 h-12 flex items-center justify-center fixed left-0 w-full sm:w-1/5 md:w-2/12 ">
              <Input
                type="text"
                icon={<FontAwesomeIcon icon={faSearch} className="text-gray-400" />}
                label="Find a conversation"
                className="w-full px-3 py-2 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none "
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          <div
            className={`${
              selectedChatData ? "hidden sm:block md:block" : "w-full sm:w-1/5 md:w-2/12"
            } flex-grow border-gray-300 bottom-16 md:border-none md:z-0 -z-10 border flex flex-col fixed overflow-y-auto w-1/5 md:w-2/12 md:h-[calc(100vh-13.75rem)] h-[calc(100vh-12.75rem)]`}
          >
            <ChatList chatsData={filteredChats} selectedChatData={selectedChatData} onChatSelect={onChatSelect} />
          </div>
          <div className=" sm:w-1/5 md:w-2/12 h-16 border border-gray-300 py-3 px-4 flex w-full items-center fixed bottom-0 left-0">
            <img
              src={session?.user.image || "default-avatar.svg"} // Replace with the actual profile image URL
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="text-sm mr-auto">
              <div className="font-semibold">{session?.user.name}</div>
              <div className="text-gray-600">@{session?.user.username}</div>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faHome} onClick={() => router.push("/")} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <FontAwesomeIcon icon={faCog} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
              <FontAwesomeIcon icon={faSignOutAlt} onClick={() => signOut()} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Sidebar;
