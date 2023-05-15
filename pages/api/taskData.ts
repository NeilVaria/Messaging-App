// pages/api/taskData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

import prisma from "../../lib/prismadb";
import { getSession } from "next-auth/react";

export interface TaskData {
  id: string;
  name: string;
  description: string;
  IncompleteCount: number;
  CompleteCount: number; 
  OverdueCount: number; 
  deadline: string;
  completeionDate?: string;
  completed?: boolean;
  member: String;
  progress: number;
  overdue: String
}

/**
 * @swagger
 * /api/taskData:
 *   get:
 *     tags:
 *       - Tasks
 *     description: Retrieves task data
 *     responses:
 *       200:
 *         description: Successfully retrieved task data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   IncompleteCount:
 *                     type: integer
 *                   CompleteCount:
 *                     type: integer
 *                   OverdueCount:
 *                     type: integer
 *                   deadline:
 *                     type: string
 *                   completionDate:
 *                     type: string
 *                     nullable: true
 *                   completed:
 *                     type: boolean
 *                     nullable: true
 *                   member:
 *                     type: string
 *                   progress:
 *                     type: integer
 *                   overdue:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       405:
 *         description: Method not allowed
 *       500:
 *         description: Error retrieving task data
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
    try {
      // Retrieve all tasks and include their associated projects and members
      const tasks = await prisma.tasks.findMany({
        include: {
          project: true,
          members: true,
        },
      });

      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving task data" });
    }
  }
