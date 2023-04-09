import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const rooms = await prisma.room.findMany();

    res.status(200).json(rooms);
    prisma.$disconnect();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
