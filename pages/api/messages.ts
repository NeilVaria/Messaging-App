// /pages/api/messages.ts

import { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../lib/prismadb";
import { getSession } from 'next-auth/react';

/**
 * @swagger
 * /api/messages:
 *   post:
 *     tags:
 *       - Messages
 *     description: Stores the message in the database and updates MessageSeen for all users apart from the author
 *     requestBody:
 *       description: Message details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *               username:
 *                 type: string
 *               message:
 *                 type: string
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Returns the id of the newly created message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messageId:
 *                   type: string
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized, user is not logged in
 *       405:
 *         description: Method not allowed
*/


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
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
