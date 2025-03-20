import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add id
      email: string; // Ensure email is required
      name?: string | null; // Keep name optional
    } & DefaultSession["user"]; // Merge with default properties
  }

  interface User {
    id: string;
    email: string;
    username?: string; // Match what you return from authorize
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username?: string;
  }
}