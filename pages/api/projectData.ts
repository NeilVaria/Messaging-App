// pages/api/projectData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User, Tasks } from "@prisma/client";

import prisma from "../../lib/prismadb";

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
}

interface TasksWithMembers extends Tasks {
  members: User[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  const totalManhours = tasks.reduce((sum, task) => sum + task.manhours, 0);
  const manhoursCompleted = tasks.reduce((sum, task) => {
    if (task.completed && task.completionDate) {
      return sum + task.manhours;
    } else {
      return sum;
    }
  }, 0);
  return { manhoursCompleted, totalManhours };
}
