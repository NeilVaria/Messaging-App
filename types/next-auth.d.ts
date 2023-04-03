import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      role: string;
      email: string;
      image: string;
    };
  }
  interface User {
    id: string;
    name: string;
    username: string;
    role: string;
    email: string;
    password: string;
    image: string | null;
  }
}
