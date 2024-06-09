import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import prisma from "../../lib/prismadb";
import { getSession } from "next-auth/react";

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - Users
 *     description: Retrieves a list of all users excluding the current user
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the current user
 *     responses:
 *       200:
 *         description: Successfully retrieved users data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       405:
 *         description: Method not allowed
 *       500:
 *         description: Error fetching users
 */


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
