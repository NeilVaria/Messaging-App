import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
import { getSession } from "next-auth/react";

/**
 * @swagger
 * /api/seenStatus:
 *   post:
 *     tags:
 *       - Messages
 *     description: Updates the seen status of messages in a room for a specific user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roomId
 *               - userId
 *             properties:
 *               roomId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Seen status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedMessageIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *       401:
 *         description: Unauthorized
 *       405:
 *         description: Method not allowed
 *       500:
 *         description: Error updating seen status
 */


export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") {
    const { roomId, userId } = req.body;

    try {
      // First, fetch the IDs of the records that will be updated
      const messagesToBeUpdated = await prisma.messageSeen.findMany({
        where: { roomId, userId, seen: false },
        select: { messageId: true }, // Only select the ID
      });

      const messageIdsToBeUpdated = messagesToBeUpdated.map(m => m.messageId);

      // Then, update those records
      await prisma.messageSeen.updateMany({
        where: { roomId, userId, seen: false },
        data: { seen: true },
      });

      // Finally, return the IDs of the updated records
      res.status(200).json({ message: "Seen status updated successfully", updatedMessageIds: messageIdsToBeUpdated });
    } catch (error) {
      res.status(500).json({ error: "Error updating seen status" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
