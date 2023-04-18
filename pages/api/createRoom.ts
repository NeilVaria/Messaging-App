import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import prisma from "../../lib/prismadb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { selectedUsers } = req.body;
    try {
      // Create the room
      const newRoom = await prisma.room.create({
        data: {},
      });

      // Add room members
      for (const user of selectedUsers) {
        await prisma.roomMember.create({
          data: {
            roomId: newRoom.id,
            userId: user.id,
          },
        });
      }

      res.status(200).json({ room: newRoom });
    } catch (error) {
      res.status(500).json({ error: "Error creating room" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
