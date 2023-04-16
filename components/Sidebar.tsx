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
        <Head>
          <title>Chat Room</title>
        </Head>
        <div className="w-1/5 md:w-2/12 fixed left-0 border-r border-gray-300 h-full flex flex-col">
          <div className="flex flex-row p-3 md:p-5 items-center w-full h-14 md:h-16 lg:h-20">
            <img className="h-full w-auto" src="logo.png" alt="" />
            <div className="p-2 md:p-4 hidden sm:inline sm:text-xs md:text-sm lg:text-lg xl:text-xl font-semibold text-gray-500">Make-It-All</div>
          </div>
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <div className="flex-shrink mx-4 font-semibold text-black">Messages</div>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div>
            <div className="p-2  mb-3">
              <Input
                type="text"
                icon={<FontAwesomeIcon icon={faSearch} className="text-gray-400" />}
                label="Find or start a conversation"
                className="w-full px-3 py-2 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none "
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex-grow flex flex-col h-full overflow-y-auto h-[calc(100vh - 4rem)]">
            <ChatList chatsData={filteredChats} selectedChatData={selectedChatData} onChatSelect={onChatSelect} />
          </div>
          <div className="h-16 border-t border-gray-300 py-3 px-4 flex items-center">
            <img
              src="https://via.placeholder.com/40" // Replace with the actual profile image URL
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
