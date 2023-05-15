import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

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
