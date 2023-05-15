// pages/api/projectData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User, Tasks } from "@prisma/client";

import prisma from "../../lib/prismadb";
import { getSession } from "next-auth/react";

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  taskCount: number;
  deadline: string;
  completeionDate?: string;
  completed?: boolean;
  memberCount: number;
  progress: number;
  overdue: String
}

interface TasksWithMembers extends Tasks {
  members: User[];
}

/**
 * @swagger
 * /api/projectData:
 *   get:
 *     tags:
 *       - Projects
 *     description: Retrieves detailed project data including member count, progress, and status
 *     responses:
 *       200:
 *         description: Returns a list of project data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectData'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error retrieving project data
 *       405:
 *         description: Method not allowed
 * components:
 *   schemas:
 *     ProjectData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         taskCount:
 *           type: integer
 *         deadline:
 *           type: string
 *           format: date
 *         completionDate:
 *           type: string
 *           format: date
 *         completed:
 *           type: boolean
 *         memberCount:
 *           type: integer
 *         progress:
 *           type: integer
 *         overdue:
 *           type: string
 *         status:
 *           type: string
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const projects = await prisma.projects.findMany({
      include: {
        tasks: {
          include: {
            members: true,
          },
        },
      },
    });

    const projectData: ProjectData[] = projects.map((project) => {
      const taskCount = project.tasks.length;
      const deadline = project.deadline.toLocaleDateString();

      const memberCount = getMemberCount(project.tasks);

      const { manhoursCompleted, totalManhours } = calculateProgress(project.tasks);

      const progress = Math.round((manhoursCompleted / totalManhours) * 100);

      const overdue = isOverdue(project);

      const status = getStatus(project.completed, overdue);
      

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        taskCount,
        deadline,
        completeionDate: project.completionDate?.toLocaleDateString(),
        completed: project.completed,
        memberCount,
        progress,
        overdue,
        status,
      };
    });

    res.status(200).json(projectData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving project data" });
  }
}

function getMemberCount(tasks: TasksWithMembers[]) {
  const allMembers = tasks.flatMap((task) => task.members);
  const uniqueMembers = new Set(allMembers.map((member) => member.id));
  return uniqueMembers.size;
}

function calculateProgress(tasks: TasksWithMembers[]) {
  const totalManhours = tasks.reduce((sum, task) => sum + task.hours, 0);
  const manhoursCompleted = tasks.reduce((sum, task) => {
      return sum + task.manhours;
  }, 0);

  return { manhoursCompleted, totalManhours };
}

function isOverdue(project: any) {
  if (!project.completed) {
    const deadlineDate = new Date(project.deadline);
    const today = new Date();
    if (deadlineDate < today) {
      return "Overdue";
    }
  }
  return "";
}

function getStatus(completed?: boolean, overdue?: string) {
  if (completed) {
    return "Complete";
  } else if (overdue=="Overdue") {
    return "Overdue";
  } else {
    return "Incomplete";
  }
}



