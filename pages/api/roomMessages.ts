import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
import { getSession } from "next-auth/react";

/**
 * @swagger
 * /api/roomMessages:
 *   post:
 *     tags:
 *       - Messages
 *     description: Retrieves all messages for a specific room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *             properties:
 *               roomId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a list of messages with seen data for the specified room
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MessageWithSeenData'
 *       401:
 *         description: Unauthorized
 *       405:
 *         description: Method not allowed
 *       500:
 *         description: Error fetching room messages
 * components:
 *   schemas:
 *     MessageWithSeenData:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         authorId:
 *           type: string
 *         roomId:
 *           type: string
 *         author:
 *           $ref: '#/components/schemas/User'
 *         seenBy:
 *           type: array
 *           items:
 *             type: array
 *             items:
 *               type: string
 *         seen:
 *           type: array
 *           items:
 *             type: array
 *             items:
 *               oneOf:
 *                 - type: string
 *                 - type: integer
 *                 - type: boolean
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         role:
 *           type: string
 *         email:
 *           type: string
 *         image:
 *           type: string
 *         password:
 *           type: string
 */


const getRoomMessages = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { roomId } = req.body;

  try {
    const messages = await prisma.message.findMany({
      where: { roomId },
      include: { 
        author: true,
        seenBy: {
          include: {
            user: true
          }
        } 
      },
    });

    const messagesWithSeenData = messages.map((message) => ({
      ...message,
      seen: message.seenBy.map(({ user, seen }) => [user.id, message.id, seen])
    }));

    res.status(200).json(messagesWithSeenData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room messages", error });
  }
};

export default getRoomMessages;
