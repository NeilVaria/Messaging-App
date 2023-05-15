import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import prisma from "../../lib/prismadb";
import { getSession } from "next-auth/react";

/**
 * @swagger
 * /api/createRoom:
 *   post:
 *     tags:
 *       - Chat Rooms
 *     description: Creates a new chat room and adds selected users to it
 *     requestBody:
 *       description: List of selected users
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selectedUsers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *     responses:
 *       200:
 *         description: Returns the newly created chat room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 room:
 *                   $ref: '#/components/schemas/Room'
 *       500:
 *         description: Error in creating room
 *       401:
 *         description: Unauthorized, user is not logged in
 *       405:
 *         description: Method not allowed
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the room
 *         name:
 *           type: string
 *           nullable: true
 *           description: The name of the room
 *         image:
 *           type: string
 *           nullable: true
 *           description: The image URL of the room
 */



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
