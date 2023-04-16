import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
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
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ isOpen, onClose, onCreate, onUpdateChatsData }) => {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SelectUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SelectUser[]>([]);

  const fetchUsers = async (searchTerm: string) => {
    // Retrieve the user ID from your authentication system, e.g., cookies or local storage
    const currentUserId = session?.user.id;
    console.log("currentUserId:", currentUserId);

    const res = await fetch(`/api/user?&userId=${currentUserId}`);
    const data = await res.json();
    setSearchResults(data);
  };

  useEffect(() => {
    fetchUsers(searchTerm);
  }, [searchTerm, session]);

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
          console.log("Created new room:", room);
        } else {
          console.error("Error creating room:", await res.json());
        }
      } catch (error) {
        console.error("Error creating room:", error);
      }
    };

    await handleCreateRoom(selectedUsers);
    onUpdateChatsData();
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
        <Dialog.Overlay />
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded shadow max-w-md mx-auto p-6 space-y-4">
            <Dialog.Title className="text-2xl font-bold">Create a new chat room</Dialog.Title>
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
              <Button color="gray" onClick={onClose} className="mr-4">
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateRoomModal;
