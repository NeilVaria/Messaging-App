import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        // Look up the user with the given email address
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        // If there's no user with the given email, reject the login attempt
        if (!user) {
          return null;
        }

        // Compare the password hash stored in the database with the password provided by the user
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If the passwords don't match, reject the login attempt
        if (!passwordMatch) {
          return null;
        }

        // If the email and password are valid, return the user object
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // If - if you have multiple providers, because they return different user objects
      // and you need to check for undefined because sometimes jwt runs multiple times in a row, and in the second one the user data gets lost, or will overwrite what you have with undefined
      if (user !== undefined) {
        token.user = user;
      }

      return token;
    },
    session({ session, token, user }) {
      // for credentials
      if (token.user !== undefined) {
        session.user = token.user;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
