import { databaseDrizzle } from "@/db/database";
import { signInSchema } from "@/schema/user";
import { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { env } from "process";


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(databaseDrizzle) as Omit<Adapter, "id">,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session) {
        session.user.id = token.id as string;
        session.user.createdAt = token.createdAt as Date;
      }
      return session;
    },
   jwt: async ({ user, token }) => {
      if (user) {
        token.id = user.id;
        token.createdAt = user.createdAt;
      } else if (!token.createdAt) {
        const dbUser = await databaseDrizzle.query.users.findFirst({
          where: (u, opt) => opt.eq(u.id, token.id as string),
        });
        if (dbUser) {
          token.createdAt = dbUser.createdAt;
        }
      }
      return token;
    },
  },  providers: [
    CredentialsProvider({
      name: "Sign in With...",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          const user = await databaseDrizzle.query.users.findFirst({
            where: (u, opt) => opt.eq(u.email, email),
          });
          if (!user) {
            throw new Error("User not found.");
          }

          if (!user || !user.hashedPassword) return null;
          const passwordMatch = await bcrypt.compare(
            password,
            user.hashedPassword,
          );
          return passwordMatch ? user : null;
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: env.AUTH_GOOGLE_ID!,
      clientSecret: env.AUTH_GOOGLE_SECRET!,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ]

}

