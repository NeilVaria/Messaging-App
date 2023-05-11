// pages/api/userData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';

interface Project {
  id: string;
  name: string;
}

interface Task {
  id: string;
  name: string;
  hours: number;
  completed: boolean;
  manhours: number;
}

interface User {
  name: string;
  projects: Project[];
  tasks: Task[];
  progress: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.user.findMany({
      include: {
        tasks: {
          include: {
            project: true,
          },
        },
      },
    });

    const userData: User[] = users.map((user) => {
      const projects = user.tasks.map((task) => task.project).filter(Boolean) as Project[];
      const totalHours = user.tasks.reduce((sum, task) => sum + task.hours, 0);
      const totalManhours = user.tasks.reduce((sum, task) => sum + task.manhours, 0);

      return {
        name: user.name,
        projects,
        tasks: user.tasks,
        progress: Math.round((totalManhours / totalHours) * 100),
        
      };
    });

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user data' });
  }
}
