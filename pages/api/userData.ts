// pages/api/userData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

import prisma from "../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Retrieve all tasks and include their associated projects and members
      const user = await prisma.user.findMany({
        include: {
            tasks: true,
        },
      });

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving task data" });
    }
  }
