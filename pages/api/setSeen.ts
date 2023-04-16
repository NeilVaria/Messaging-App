import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { roomId, userId } = req.body;

    try {
      await prisma.messageSeen.updateMany({
        where: { roomId, userId, seen: false },
        data: { seen: true },
      });

      res.status(200).json({ message: "Seen status updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error updating seen status" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
