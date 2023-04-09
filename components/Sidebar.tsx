import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ChatList from "./ChatList";

interface SidebarProps {
  selectedChatId: string | null;
  onChatSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedChatId, onChatSelect }) => {
  return (
    <div className="w-1/5 md:w-2/12 border-r border-gray-300 h-full flex flex-col">
      <div className="flex flex-row p-3 md:p-5 items-center w-full h-14 md:h-16 lg:h-20 border-b border-gray-300">
        <img className="h-full w-auto" src="logo.png" alt="" />
        <div className="p-2 md:p-4 hidden sm:inline sm:text-xs md:text-sm lg:text-lg xl:text-xl font-semibold text-gray-500">Make-It-All</div>
      </div>
      <div className="flex-grow flex flex-col h-full">
        <div className="flex-grow overflow-y-auto">
          <ChatList selectedChatId={selectedChatId} onChatSelect={onChatSelect} />
        </div>
        <div className="min-h-16 border-t border-gray-300 py-3 px-4 flex items-center">
          <img
            src="https://via.placeholder.com/40" // Replace with the actual profile image URL
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="text-sm mr-auto">
            <div className="font-semibold">Full Name</div>
            <div className="text-gray-600">@username</div>
          </div>
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faHome} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            <FontAwesomeIcon icon={faCog} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
