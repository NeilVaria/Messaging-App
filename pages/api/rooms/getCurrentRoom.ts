import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (!id) {
        res.status(400).json({ message: "Id is required" });
        return;
      }

      const room = await prisma.room.findUnique({
        where: {
          id: id as string,
        },
      });

      if (!room) {
        res.status(404).json({ message: "Room not found" });
        return;
      }

      res.status(200).json(room);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
