import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import prisma from "../../lib/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      const currentUserId = query.userId as string;

      try {
        const users = await prisma.user.findMany({
          where: {
            id: {
              not: currentUserId,
            },
          },
          select: {
            id: true,
            username: true,
          },
        });

        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: "Error fetching users." });
      }

      break;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
