import { useEffect, useState, FormEvent, useRef } from "react";
import { io, Socket } from "socket.io-client";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import CreateRoomModal from "@/components/CreateRoomModal";
import { useSession } from "next-auth/react";
import router from "next/router";
import { BsCheckAll, BsCheck } from 'react-icons/bs';
import { Message, MessageSeen, User } from "@prisma/client";


type SelectUser = {
  id: string;
  username: string;
};

type ChatProps = {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
};

interface ChatData {
  id: string;
  imageUrl: string;
  name: string;
  username: string;
  isGroup: boolean;
  isOnline: boolean;
  users: string[];
}



const Chat = ({ socket, setSocket }: ChatProps) => {
  const [selectedChatData, setSelectedChatData] = useState<ChatData | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const username = session?.user.username;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<  (Message & {author:User, seenBy: (MessageSeen & {
    user: User;
})[]})[]>([]);

  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [chatsData, setChatsData] = useState<any[]>([]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChatSelect = async (chatData: ChatData) => {
    setSelectedChatId(chatData.id);
  };

  useEffect(() => {
    const updateSeenStatus = async (roomId: String, userId: String | undefined) => {
      if (!socket?.connected) return;
      try {
        const response = await fetch("/api/seenStatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomId, userId }),
        });
  
        const data = await response.json();
        const updatedMessageIds = data.updatedMessageIds;

        // loop through the updatedMessageIds and emit the message seen event
        updatedMessageIds.forEach((messageId: number) => {
          socket?.emit("message seen", {roomID: selectedChatId , messageId: messageId, userId: session?.user.id });
        });
        
        
      } catch (error) {
        console.error("Error updating seen status:", error);
      }
    };

    if (selectedChatId) {
      const chatData = chatsData.find((chat) => chat.id === selectedChatId);
      if (chatData) {
        setSelectedChatData(chatData);
        // Call the async function to update seen status
        updateSeenStatus(chatData.id, session?.user.id);
      }
    } else {
      setSelectedChatData(null);
    }
  }, [selectedChatId, chatsData, socket, session?.user.id]);

  const handleCloseChat = () => {
    setSelectedChatData(null);
    setSelectedChatId(null);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
  
    if (socket && selectedChatId) {
      const timestamp = new Date().toISOString();
      const tempMessage = {
        id: -1,
        content: message,
        createdAt: new Date(timestamp),
        authorId: session!.user.id,
        roomId: selectedChatId,
        author: session!.user as User,
        seenBy: [],
      };
      
      setMessages((prevMessages) => [...prevMessages, tempMessage]);
  
      // Call the API to store the message in the database
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roomId: selectedChatId, username, message, timestamp })
      });
      const data = await response.json();
  
      // Update the local state with the actual message ID
      setMessages((prevMessages) => {
        return prevMessages.map((m) => {
          if (m.id === -1 && m.createdAt === tempMessage.createdAt) {
            const updatedMessage = { ...m, id: data.messageId };
            // Emit the updated message with actual ID
            socket.emit("chat message", updatedMessage);
            return updatedMessage;
          }
          return m;
        });
      });
    }
  
    // Clear the form fields after submitting
    setMessage("");
  };
  
  

  useEffect(() => {
    if (selectedChatData) {
      // Get the chat data for the selected chat
      const selectedChat = chatsData.find((chat) => chat.id === selectedChatData.id);
      if (selectedChat) {
        setSelectedChatData(selectedChat);
      }
    }
  }, [chatsData, selectedChatData]);

  const timeAgo = (date: string) => {
    // Calculate time ago based on the given date
    if (date === "null") {
      return "";
    } else {
      const timeAgo = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
      if (timeAgo < 60) {
        return `Just now`;
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

  const fetchRoomMessages = async (roomId: string) => {
    try {
      const response = await fetch("/api/roomMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId }),
      });
      const messages: (Message & {author:User, seenBy: (MessageSeen & {
        user: User;
    })[]})[] = await response.json();
      setMessages(messages);
    } catch (error) {
      console.error("Error fetching room messages:", error);
    }
  };

  useEffect(() => {
    if (socket && selectedChatId) {
      socket.emit("join room", selectedChatId);
      fetchRoomMessages(selectedChatId);
    }
  }, [socket, selectedChatId]);

  const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        await fetch("/api/socket", { signal });
      } catch (error: any) {
        if (error.name === "AbortError") {
          // handles aborting fetch on react strict mode component remount
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchData();
    if (WEBSOCKET_URL !== undefined) {
      const newSocket = io(WEBSOCKET_URL, {
        transports: ["websocket"],
        query: { username },
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("connected");
      });

      newSocket.on("chat message", (data: Message & {author:User, seenBy: (MessageSeen & {user: User;})[]}) => {
        newSocket.emit('message seen', {roomID: selectedChatId , messageId: data.id, userId: session?.user.id });
        setMessages((prevMessages) => [...prevMessages, data]);
      });
      

      newSocket.on("active users", (users: string[]) => {
        setActiveUsers(users);
      });

      newSocket.on("message seen", (data: MessageSeen & {user: User}) => {
        // Update the message in messages where message id = data.messageId
        setMessages((prevMessages) => {
          return prevMessages.map((m) => {
            if (m.id === data.messageId) {
              const updatedMessage = { ...m, seenBy: [...m.seenBy, data] };
              return updatedMessage;
            }
            return m;
          });
        }
        );
      });
      

      return () => {
        // disconnect socket and abort fetch when component unmounts
        newSocket.disconnect();
        controller.abort();
      };
    }
  }, [username, setSocket, selectedChatId]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateRoom = (selectedUsers: SelectUser[]) => {
  };
  const fetchChatsData = async () => {
    try {
      const response = await fetch(`/api/chatsData?userId=${session?.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activeUsers),
      });
      const data = await response.json();
      setChatsData(data);
    } catch (error) {
      console.error("Error fetching chats data:", error);
    }
  };
  useEffect(() => {
    // Fetch the chats data for the current user
    if (session) {
      fetchChatsData();
    }
  }, [session, activeUsers]);

  useEffect(() => {
    if (session) {
      const interval = setInterval(() => {
        // Call the function to fetch chats data every second
        fetchChatsData();
      }, 1000); // Refresh every second

      // Clean up the interval when the component unmounts or the session changes
      return () => {
        clearInterval(interval);
      };
    }
  }, [session, fetchChatsData, isModalOpen]);

  const getWindowWidth = () => {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  };

  const adjustMessageListHeight = () => {
    let topbarHeight = 8.75; // Adjust this value according to your topbar height in rem
    const inputHeight = 4; // Adjust this value according to your input height in rem

    if (getWindowWidth() < 720) {
      // Change 640 to the breakpoint you need
      topbarHeight = 4; // Set the topBarHeight to 6 when the window width is less than the breakpoint
    }
    if (getWindowWidth() > 720) {
      // Change 640 to the breakpoint you need
      topbarHeight = 5; // Set the topBarHeight to 6 when the window width is less than the breakpoint
    }
    if (getWindowWidth() > 960) {
      // Change 640 to the breakpoint you need
      topbarHeight = 6; // Set the topBarHeight to 6 when the window width is less than the breakpoint
    }

    const messageListHeight = `calc(100vh - ${topbarHeight + inputHeight}rem)`;

    if (messageListContainerRef.current) {
      messageListContainerRef.current.style.height = messageListHeight;
    }
  };

  const messageListContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    adjustMessageListHeight();
    window.addEventListener("resize", adjustMessageListHeight);

    return () => {
      window.removeEventListener("resize", adjustMessageListHeight);
    };
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    router.push("/landingpage");
  } else {
    return (
      <div className="flex flex-col h-screen">
        <TopBar selectedChatData={selectedChatData} onCloseChat={handleCloseChat} onOpenNewChat={() => setIsModalOpen(true)} />
        <div className="flex h-full">
          <Sidebar chatsData={chatsData} selectedChatData={selectedChatData} onChatSelect={handleChatSelect} />
          <div
            className={`${
              selectedChatData ? "w-full sm:w-[calc(100vw-325px)] md:w-[calc(100vw-375px)]" : "hidden sm:block md:block"
            } flex flex-col flex-grow h-full fixed to-16 md:top-20 lg:top-24 right-0`}
          >
            {selectedChatData === null ? (
              <div className="w-full sm:w-[calc(100vw-325px)] md:w-[calc(100vw-375px)] fixed right-0 p-4 font-light text-gray-600">
                Select an existing conversation or select “New Chat” to begin.
              </div>
            ) : (
              <div
                ref={messageListContainerRef}
                className="flex flex-col sm:w-[calc(100vw-325px)] md:w-[calc(100vw-375px)] md:border-none border-b border-gray-500 overflow-y-auto md:z-0 -z-10 h-[calc(100vh-8.75rem)] md:h-[calc(100vh-9.5rem)]"
              >
                {(messages.map((msg, index) => {
                  const isCurrentUser = msg.authorId === session?.user.id;
                  const delivered = msg.id !== -1;

                  const seen = msg.seenBy.some((seenBy) => seenBy.userId);


                  return (
                    <div
                      key={index}
                      className={`p-1 mb-4 w-full flex flex-col justify-center ${isCurrentUser ? "items-end pr-4" : "items-start pl-2 md:pl-4"}`}
                    >
                      <div className="flex flex-row w-7/12">
                        <div>
                          {!isCurrentUser && <img src={selectedChatData?.imageUrl} alt="User profile" className="w-8 md:w-10 h-auto rounded-full mr-4" />}
                        </div>
                        <div className="w-full">
                          <div className={`flex items-center ${isCurrentUser ? `justify-end` : `justify-start`}`}>
                          <div className="flex">
                            <div className="text-xs md:text-base">{isCurrentUser ? "You" : msg.author.username}</div>
                          </div>
                          </div>
                          <div className={`flex items-center ${isCurrentUser ? `justify-end`: `justify-start`}`}>
                            <div className={`${isCurrentUser ? "bg-blue-500 text-white" : " bg-blue-gray-100"} rounded-lg p-3 `}>
                              <div className="flex justify-between items-end md:text-base text-sm h-full">
                                <div>{msg.content}</div>
                              </div>
                            </div>
                          </div>
                          <span className={`md:text-xs flex items-center text-[0.7rem] italic text-gray-600 ${isCurrentUser ? `justify-end`: `justify-start`}`}>
                            {timeAgo(msg.createdAt.toString())}
                            <div className={`flex flex-col h-full justify-center items-end pl-2 text-xl ${seen ? " text-blue-500" : " text-gray-500"} `}>{isCurrentUser ? (delivered ? <BsCheckAll/> : <BsCheck />) : null}</div>
                          </span>
                        </div>
                      </div>
                      <div ref={chatEndRef} />
                    </div>
                  );
                }))}
              </div>
            )}
            {selectedChatData !== null && (
              <div className={`${selectedChatData ? "w-full sm:w-[calc(100vw-325px)] md:w-[calc(100vw-375px)]" : "hidden sm:block md:block"} fixed bottom-0 right-0 flex h-16 px-1 md:px-3`}>
                <form className=" flex flex-row mb-2 w-full" id="form" onSubmit={onSubmit}>
                  <input
                    className="rounded-sm border border-gray-400 px-1 basis-11/12"
                    id="message"
                    type="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Your message..."
                  />
                  <button
                    disabled={message.length === 0}
                    className="bg-blue-500 hover:bg-blue-700 ml-0.5 md:mx-2 basis-1/12 text-white font-bold py-2 px-4 rounded"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
          <CreateRoomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreate={handleCreateRoom}
            onUpdateChatsData={fetchChatsData}
            chatsData={chatsData}
            setSelectedChatID={setSelectedChatId}
          />
        </div>
      </div>
    );
  }
};

export default Chat;
