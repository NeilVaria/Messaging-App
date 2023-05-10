// pages/api/usersOnProject.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract the project ID from the query parameters
    const projectId = req.query.projectId ? String(req.query.projectId) : null;

    // Retrieve the users for the project, if the project ID is provided
    const users = projectId
      ? await prisma.user.findMany({
          where: { tasks: { some: { project: { id: projectId } } } },
        })
      : null;

    // Return the users or null as JSON
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user data" });
  }
}


