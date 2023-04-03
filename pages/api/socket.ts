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

io.on("connection", (socket: IOSocket) => {
  console.log("a user connected");

  socket.on("chat message", ({ username, message }) => {
    console.log(`[${username}]: ${message}`);
    socket.broadcast.emit("chat message", { username, message });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
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
