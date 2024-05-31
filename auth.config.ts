import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import github,{GitHubProfile} from "next-auth/providers/github";

export const authConfig = {
  providers: [github({
    profile(profile: GitHubProfile){
      return {
        id: profile.id.toString(),
        name: profile.name,
        email:profile.email,
        image:profile.avatar_url
      }
    }
  })],
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
