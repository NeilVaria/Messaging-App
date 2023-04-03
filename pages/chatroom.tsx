import { useEffect, useState, FormEvent } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  const username = session?.user.username;
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Array<{ username: string; message: string }>>([]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (socket) {
      socket.emit("chat message", { username, message });
      setMessages((prevMessages) => [...prevMessages, { username: username!, message }]);
    }

    // Clear the form fields after submitting
    setMessage("");
  };

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

    const newSocket = io("http://localhost:3000", { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("connected");
    });

    newSocket.on("chat message", (data) => {
      console.log(`[${data.username}]: ${data.message}`);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // disconnect socket and abort fetch when component unmounts
      newSocket.disconnect();
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col w-screen h-screen">
        <div className="flex flex-row justify-between items-center bg-gray-200 p-2">
          <div>Chatroom</div>
          <div>Current user: {username}</div>
        </div>
        <div className="flex flex-col items-start overflow-y-auto flex-grow">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 ${msg.username === username ? "justify-end" : ""}`} style={{ display: "flex", width: "100%" }}>
              <strong>{msg.username === username ? "You" : msg.username}: </strong>
              {msg.message}
            </div>
          ))}
        </div>
        <div className="fixed inset-x-0 bottom-0">
          <div className="">
            <form className="w-full flex flex-row p-2" id="form" onSubmit={onSubmit}>
              <input
                className="rounded-sm border border-gray-400 px-1 basis-4/5"
                id="message"
                type="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Your message..."
              />
              <button className="bg-blue-500 hover:bg-blue-700 mx-2 basis-1/5 text-white font-bold py-2 px-4 rounded">Send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
