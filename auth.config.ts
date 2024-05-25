import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import google from "next-auth/providers/google";

export const authConfig = {
  providers: [google],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);
