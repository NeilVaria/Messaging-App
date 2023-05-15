// /pages/api/messages.ts

import { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../lib/prismadb";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { roomId, username, message, timestamp } = req.body;

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

    res.json({ messageId: newMessage.id });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}
