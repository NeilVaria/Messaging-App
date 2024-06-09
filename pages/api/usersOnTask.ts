// pages/api/usersOnTask.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
/**
 * @swagger
 * /api/usersOnTask:
 *   get:
 *     tags:
 *       - Tasks
 *     description: Retrieves a list of members assigned to a specific task
 *     parameters:
 *       - in: query
 *         name: taskID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task
 *     responses:
 *       200:
 *         description: Successfully retrieved task members data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 members:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       username:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Error retrieving task data
 */

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
