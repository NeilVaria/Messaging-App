// pages/api/usersOnTask.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  try {
    const taskId = req.query.taskID as string;

    const task = await prisma.tasks.findUnique({
      where: {
        id: taskId,
      },
      include: {
        members: true,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const members = task.members;
    
    res.status(200).json({ members });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving task data" });
  }
}
