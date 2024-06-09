import type { Server as HTTPServer } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import { Server, Socket as IOSocket } from "socket.io";

import prisma from "../../lib/prismadb";
import { Message, MessageSeen, User } from "@prisma/client";

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

  socket.on("join room", (roomId: string) => {
    socket.join(roomId);
    console.log(`User ${username} joined room ${roomId}`);
  });

  socket.on("chat message", async (message: Message & {author:User, seenBy: (MessageSeen & {user: User;})[]}) => {
    console.log(`[${message.author.username}]: ${message.content}`);
    socket.to(message.roomId).emit("chat message", message);
  });

  socket.on("message seen", async ({roomID, messageId, userId }) => {
    console.log(`User ${userId} has seen message ${messageId}`);
    
    // Update the seen status in the database
    await prisma.messageSeen.updateMany({
      where: {
        messageId: messageId,
        userId: userId,
      },
      data: {
        seen: true,
      },
    });
  
    // Fetch the updated MessageSeen information
    const updatedMessageSeen = await prisma.messageSeen.findFirst({
      where: {
        messageId: messageId,
        userId: userId,
      },
      include: {
        user: true, // Include the related User information
      },
    });
  
    // Emit the updated MessageSeen information
    socket.in(roomID).emit("message seen", updatedMessageSeen);
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
