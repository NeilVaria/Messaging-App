import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prismadb";

const getRoomMessages = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { roomId } = req.body;

  try {
    const messages = await prisma.message.findMany({
      where: { roomId },
      include: { author: true },
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room messages", error });
  }
};

export default getRoomMessages;
