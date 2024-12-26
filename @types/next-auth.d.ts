import "next-auth";

// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      createdAt?: Date,
    };
  }
  interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    createdAt?: Date,

  }
  interface JWT {
    id?: string;
    createdAt?: Date,
  }

}
