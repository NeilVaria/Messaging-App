import type { Server as HTTPServer } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import { Server, Socket as IOSocket } from "socket.io";

interface SocketServer extends HTTPServer {
  io?: Server | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const io = new Server({ transports: ["websocket"] });
// Map containg socket id and username
const activeUsers = new Map<string, String>();

io.on("connection", (socket: IOSocket) => {
  const username = socket.handshake.query.username as string;
  console.log("User:", username, "connected with socket id:", socket.id);
  activeUsers.set(socket.id, username);
  io.emit("active users", Array.from(activeUsers.values()));

  socket.on("chat message", ({ username, message }) => {
    console.log(`[${username}]: ${message}`);
    socket.broadcast.emit("chat message", { username, message });
  });

  socket.on("disconnect", () => {
    const user = activeUsers.get(socket.id);
    console.log("User:", user, "disconnected with socket id:", socket.id);
    activeUsers.delete(socket.id);
    io.emit("active users", Array.from(activeUsers.values()));
  });
});

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    res.socket.server.io = io;
    io.attach(res.socket.server);
  }
  res.end();
};

export default SocketHandler;
