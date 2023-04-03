import { PrismaClient, Prisma, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import toast from "react-hot-toast";

const prisma = new PrismaClient();

interface UserWithPassword extends Prisma.UserCreateInput {
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Don't have form data!" });

    const { email, name, role, username, password } = req.body;

    // Look up user with the given email
    const existingUser: User | null = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Check if a user with the given email already exists
    if (existingUser) {
      return res.status(409).json({ error: "Email address already in use" });
    }

    const existingUserByUsername: User | null = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUserByUsername) {
      return res.status(409).json({ error: "Username already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    // Create the new user in the database
    const newUser: User = await prisma.user.create({
      data: {
        email: email,
        name: name,
        role: role,
        username: username,
        password: hash,
      } as UserWithPassword,
    });

    // Send a success response back to the client
    return res.status(200).json({ message: "User created successfully" });
  } else {
    res.status(500).json({ message: "HTTP method not valid, only POST accepted" });
  }
}
