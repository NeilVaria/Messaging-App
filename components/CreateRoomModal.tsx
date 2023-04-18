import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

interface SelectUser {
  id: string;
  username: string;
}

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (selectedUsers: SelectUser[]) => void;
  onUpdateChatsData: () => void;
  chatsData: ChatData[];
  setSelectedChatID: (id: string) => void;
}

interface ChatUser {
  id: string;
  username: string;
}

interface ChatData {
  id: string;
  imageUrl: string;
  name: string;
  username: string;
  isGroup: boolean;
  isOnline: boolean;
  users: ChatUser[];
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose, onCreate, onUpdateChatsData, chatsData, setSelectedChatID }) => {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SelectUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SelectUser[]>([]);
  const [existingChatUsers, setExistingChatUsers] = useState<{ [key: string]: String[] }>({});

  const fetchUsers = async (searchTerm: string) => {
    const currentUserId = session?.user.id;
    console.log("currentUserId:", currentUserId);

    const res = await fetch(`/api/user?&userId=${currentUserId}`);
    const data = await res.json();
    setSearchResults(data);
  };

  useEffect(() => {
    if (session) {
      const currentUserId = session.user.id;
      const newExistingChatUsers = chatsData.reduce<{ [key: string]: String[] }>((acc, chat) => {
        acc[chat.id] = chat.users.map((user) => user.id).concat(currentUserId);
        return acc;
      }, {});
      setExistingChatUsers(newExistingChatUsers);
    }
  }, [chatsData, session]);

  useEffect(() => {
    fetchUsers(searchTerm);
  }, [searchTerm, session]);

  function arraysEqual(arr1: String[], arr2: String[]) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < arr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }
    return true;
  }

  function checkIfUserExistsInChat(selectedUsers: String[]) {
    for (const roomID in existingChatUsers) {
      if (arraysEqual(existingChatUsers[roomID], selectedUsers)) {
        return roomID;
      }
    }
    return false;
  }

  const handleSubmit = async () => {
    console.log(selectedUsers);
    if (session) {
      selectedUsers.push({ id: session?.user.id, username: session?.user.username });
    }

    const handleCreateRoom = async (selectedUsers: SelectUser[]) => {
      try {
        const res = await fetch("/api/createRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedUsers }),
        });

        if (res.ok) {
          const { room } = await res.json();
          console.log("Created new room:", room.id);
          setSelectedChatID(room.id);
        } else {
          console.error("Error creating room:", await res.json());
        }
      } catch (error) {
        console.error("Error creating room:", error);
      }
    };

    console.log("check if user exists", checkIfUserExistsInChat(selectedUsers.map((user) => user.id)));
    const roomID = checkIfUserExistsInChat(selectedUsers.map((user) => user.id));
    if (roomID) {
      console.log("room exists");
      setSelectedChatID(roomID);
    } else {
      await handleCreateRoom(selectedUsers);
      onUpdateChatsData();
    }
    onClose();
  };

  const handleCLose = () => {
    setSelectedUsers([]);
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
        <Dialog.Overlay />
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded border border-gray-200 shadow-md max-w-md mx-auto p-6 space-y-4">
            <Dialog.Title className="md:text-2xl text-base font-bold">Find or start a new conversation</Dialog.Title>
            <Select
              components={animatedComponents}
              placeholder="Select Users..."
              isMulti
              options={searchResults.map((user) => ({ value: user.id, label: user.username }))}
              onChange={(selected) =>
                setSelectedUsers(
                  (selected as { value: string; label: string }[]).map((item) => ({
                    id: item.value,
                    username: item.label,
                  }))
                )
              }
              className="mt-4"
            />
            <div className="flex justify-between py-2">
              <Button color="gray" onClick={handleCLose} className="mr-4">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={selectedUsers.length === 0}>
                Create
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateRoomModal;
