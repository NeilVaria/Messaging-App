// pages/api/taskData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

import prisma from "../../lib/prismadb";

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
