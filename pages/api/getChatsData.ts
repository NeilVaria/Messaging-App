// pages/api/getChatsData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

import prisma from "../../lib/prismadb";

const sortByTimestampWithNullFirst = (a: any, b: any) => {
  if (a.lastMessageTimestamp === "null" && b.lastMessageTimestamp === "null") {
    return 0;
  } else if (a.lastMessageTimestamp === "null") {
    return -1;
  } else if (b.lastMessageTimestamp === "null") {
    return 1;
  }

  const dateA = new Date(a.lastMessageTimestamp);
  const dateB = new Date(b.lastMessageTimestamp);

  return dateB.getTime() - dateA.getTime();
};

const getChatsData = async (userId: string, activeUsers: any[]) => {
  // Fetch all rooms where the current user is a member
  const rooms = await prisma.room.findMany({
    where: {
      members: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
      messages: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          seenBy: true,
        },
      },
    },
  });

  // Format the fetched data to match the expected structure
  const chatsData = rooms.map((room) => {
    const otherMembers = room.members.filter((member) => member.userId !== userId);
    const lastMessage = room.messages[0];
    const hasNotification = lastMessage ? lastMessage.seenBy.some((seen) => seen.userId === userId && seen.seen === false) : false;

    if (otherMembers.length > 1) {
      return {
        id: room.id,
        imageUrl: room.image || "default-group-avatar.svg", // Replace with the actual path to your default image
        name: room.name || otherMembers.map((member) => member.user.name).join(", "),
        username: otherMembers.length + 1 + " members",
        isOnline: false, // You can replace this with the actual online status logic
        lastMessage: lastMessage ? lastMessage.content : "New Conversation, say hi!",
        lastMessageTimestamp: lastMessage ? lastMessage.createdAt.toISOString() : "null",
        hasNotification: hasNotification, // You can replace this with the actual notification logic
        users: otherMembers.map((member) => member.user),
        isGroup: true,
      };
    } else {
      return {
        id: room.id,
        imageUrl: room.image || "default-avatar.svg", // Replace with the actual path to your default image
        name: otherMembers[0].user.name,
        username: "@" + otherMembers[0].user.username,
        isOnline: activeUsers.includes(otherMembers[0].user.username),
        lastMessage: lastMessage ? lastMessage.content : "New Conversation, say hi!",
        lastMessageTimestamp: lastMessage ? lastMessage.createdAt.toISOString() : "null",
        hasNotification: hasNotification, // You can replace this with the actual notification logic
        users: otherMembers.map((member) => member.user),
        isGroup: false,
      };
    }
  });

  const sortedChatsData = chatsData.sort(sortByTimestampWithNullFirst);

  return sortedChatsData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userId = req.query.userId as string;
    const activeUsers = req.body;

    if (!userId) {
      res.status(400).json({ error: "User ID is required." });
      return;
    }

    try {
      const chatsData = await getChatsData(userId, activeUsers);
      res.status(200).json(chatsData);
    } catch (error) {
      console.error("Error fetching chats data:", error);
      res.status(500).json({ error: "Error fetching chats data." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
