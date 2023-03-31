import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | undefined;

const Home = () => {
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
  };

  return null;
};

export default Home;
