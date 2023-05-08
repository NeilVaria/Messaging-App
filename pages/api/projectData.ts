// pages/api/projectData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

import prisma from "../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Retrieve all tasks and include their associated projects and members
      const project = await prisma.projects.findMany({
        include: {
          tasks: true,
        },
      });

      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving task data" });
    }
  }