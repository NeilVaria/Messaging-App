// pages/api/tasksOnProject.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";
import { getSession } from "next-auth/react";

/**
 * @swagger
 * /api/tasksOnProject:
 *   get:
 *     tags:
 *       - Tasks
 *     description: Retrieves tasks associated with a specific project or all tasks if no project ID is provided
 *     parameters:
 *       - in: query
 *         name: projectID
 *         schema:
 *           type: string
 *         description: The ID of the project to filter tasks by
 *     responses:
 *       200:
 *         description: Successfully retrieved task data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       hours:
 *                         type: integer
 *                       projectsId:
 *                         type: string
 *                         nullable: true
 *                       dueDate:
 *                         type: string
 *                       completed:
 *                         type: boolean
 *                       completionDate:
 *                         type: string
 *                         nullable: true
 *                       manhours:
 *                         type: integer
 *                       project:
 *                         type: object
 *                       members:
 *                         type: array
 *                         items:
 *                           type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error retrieving task data
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract the project ID from the query parameters, if it exists
    const projectId = req.query.projectID ? String(req.query.projectID) : undefined;

    // Retrieve the tasks with or without filtering by project ID
    const tasks = projectId
      ? await prisma.tasks.findMany({
          where: { projectsId: projectId },
          include: { project: true, members: true },
        })
      : await prisma.tasks.findMany({ include: { project: true, members: true } });

    // Return the tasks as JSON
    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving task data" });
  }
}
