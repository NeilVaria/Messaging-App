import { Button } from "@material-tailwind/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUsers } from "@fortawesome/free-solid-svg-icons";

interface TopBarProps {
  selectedChatData: ChatData | null;
  onCloseChat: () => void;
  onOpenNewChat: () => void;
}

interface ChatData {
  id: string;
  imageUrl: string;
  name: string;
  username: string;
  isGroup: boolean;
  isOnline: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ selectedChatData, onCloseChat, onOpenNewChat }) => {
  const handleCloseChat = () => {
    onCloseChat();
  };

  const renderContent = () => {
    if (selectedChatData) {
      // Render content for the selected chat
      return (
        <div className="flex flex-row justify-between w-full">
          <div className="flex justify-center items-center">
            <div className="flex flex-row">
              <div className="flex flex-col items-start mr-3">
                <div className="relative w-10 h-10 md:w-16  md:h-16">
                  <img src={selectedChatData.imageUrl} alt={selectedChatData.name} className="w-full h-full rounded-full" />
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex flex-col justify-between w-full">
                  <div className="flex flex-row justify-center items-center">
                    <div className="flex items-center justify-center font-semibold md:text-2xl line-clamp-1">{selectedChatData.name}</div>

                    {!selectedChatData.isGroup && (
                      <>
                        <div className={`flex items-center ml-5 px-2 h-6 rounded-3xl ${selectedChatData.isOnline ? "bg-green-50" : "bg-gray-100"}`}>
                          <div className={`w-3 h-3 rounded-full border border-white ${selectedChatData.isOnline ? "bg-green-500" : "bg-gray-500"}`}></div>
                          <div className="ml-1 text-xs md:text-sm">{selectedChatData.isOnline ? "Online" : "Offline"}</div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-gray-600 text-xs md:text-base flex items-center">{selectedChatData.username}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {selectedChatData.isGroup && (
              <Button className="flex justify-center items-center w-16 h-12 md:w-36 md:h-16 mr-4 md:text-sm text-[0.625rem]">
                <div className="hidden md:flex">
                  <FontAwesomeIcon size="lg" icon={faUsers} className="mr-2" />
                </div>
                View Members
              </Button>
            )}
            <Button className="flex justify-center items-center w-16 h-12 md:w-32 md:h-16 p-2 md:text-sm text-[0.625rem]" onClick={handleCloseChat}>
              <div className="hidden md:flex">
                <FontAwesomeIcon size="lg" icon={faTimes} className="mr-2" />
              </div>
              Close Chat
            </Button>
          </div>
        </div>
      );
    } else {
      // Render default content
      return (
        <div className="font-semibold text-s md:text-2xl flex flex-row w-full justify-between">
          <div className="justify-center items-center flex">Chirp Messaging System</div>
          <div className="px-2">
            <Button className="flex justify-center items-center w-16 h-12 md:w-32 md:h-16 md:text-sm text-[0.625rem]" onClick={() => onOpenNewChat()}>
              New Chat
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="border-b border-gray-300 h-16 md:h-20 lg:h-24 flex items-center w-full">
      <div className="hidden sm:flex sm:w-[325px] md:w-[375px] border-r">
        <div className="flex flex-row p-3 md:p-5 items-center w-full h-14 md:h-16 lg:h-20">
          <img className="h-full w-auto" src="logo.png" alt="" />
          <div className="p-2 md:p-4 hidden sm:inline sm:text-xs md:text-sm lg:text-lg xl:text-xl font-semibold text-blue-900">Chirp</div>
        </div>
      </div>
      <div className="flex w-full sm:w-[calc(100vw-325px)] md:w-[calc(100vw-375px)] px-4 py-2">
        <div className="flex justify-between w-full">{renderContent()}</div>
      </div>
    </div>
  );
};

export default TopBar;
