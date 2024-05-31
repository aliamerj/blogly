import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { databaseDrizzle } from "./db/database";
import { authConfig } from "./auth.config";
import GitHubProvider, { GitHubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

import {
  users,
  sessions,
  accounts,
  verificationTokens,
} from "./db/schemas/users";
import { signInSchema } from "./schema/user";

const providers: Provider[] = [
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
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(databaseDrizzle, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers,
});
