import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name } = req.body;

    const newRoom = await prisma.room.create({
      data: {
        name,
      },
    });

    res.status(201).json(newRoom);
    prisma.$disconnect();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
