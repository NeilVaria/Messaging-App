// pages/api/tasksOnProject.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

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
