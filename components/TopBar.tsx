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
        <div className="flex flex-row justify-between w-full h-20">
          <div>
            <div className="flex flex-row">
              <div className="flex flex-col items-start mr-3">
                <div className="relative w-16 h-16">
                  <img src={selectedChatData.imageUrl} alt={selectedChatData.name} className="w-full h-full rounded-full" />
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex flex-col justify-between w-full">
                  <div className="flex flex-row justify-center items-center">
                    <div className="flex items-center justify-center font-semibold text-2xl line-clamp-1">{selectedChatData.name}</div>

                    {!selectedChatData.isGroup && (
                      <>
                        <div className={`flex items-center ml-5 px-2 h-6 rounded-3xl ${selectedChatData.isOnline ? "bg-green-50" : "bg-gray-100"}`}>
                          <div className={`w-3 h-3 rounded-full border border-white ${selectedChatData.isOnline ? "bg-green-500" : "bg-gray-500"}`}></div>
                          <div className="ml-1 text-sm">{selectedChatData.isOnline ? "Online" : "Offline"}</div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-gray-600 text-md flex items-center">{selectedChatData.username}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {selectedChatData.isGroup && (
              <Button className="mr-4">
                <FontAwesomeIcon size="lg" icon={faUsers} className="mr-2" />
                View Members
              </Button>
            )}
            <Button onClick={handleCloseChat}>
              <FontAwesomeIcon size="lg" icon={faTimes} className="mr-2" />
              Close Chat
            </Button>
          </div>
        </div>
      );
    } else {
      // Render default content
      return (
        <div className="font-semibold text-2xl flex flex-row justify-between w-full">
          <div className="justify-center items-center flex">Make-It-All Internal Messaging System</div>
          <div>
            <Button onClick={() => onOpenNewChat()}>New Chat</Button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="border-b border-gray-300 py-3 px-4 h-16 md:h-20 lg:h-24 flex items-center w-full">
      <div className="flex justify-between w-full">{renderContent()}</div>
    </div>
  );
};

export default TopBar;
