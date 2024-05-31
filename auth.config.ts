import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import google from "next-auth/providers/google";

export const authConfig = {
  trustHost: true,
  providers: [google],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);
