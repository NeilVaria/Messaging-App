import type { Server as HTTPServer } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import { Server, Socket as IOSocket } from "socket.io";

import prisma from "../../lib/prismadb";

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

  socket.on("chat message", async ({ roomId, username, message, timestamp }) => {
    console.log(`[${username}]: ${message}`);
    socket.to(roomId).emit("chat message", { username, message, timestamp });

    // Find the user who sent the message
    const author = await prisma.user.findUnique({ where: { username } });

    if (author) {
      // Store the message in the database
      const newMessage = await prisma.message.create({
        data: {
          content: message,
          createdAt: new Date(timestamp),
          authorId: author.id,
          roomId,
        },
      });

      // Get all room members excluding the author
      const roomMembers = await prisma.roomMember.findMany({
        where: {
          roomId,
          userId: {
            not: author.id,
          },
        },
      });

      // Update MessageSeen for all users apart from the author
      for (const member of roomMembers) {
        await prisma.messageSeen.create({
          data: {
            messageId: newMessage.id,
            userId: member.userId,
            roomId,
            seen: false,
          },
        });
      }
    }
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
