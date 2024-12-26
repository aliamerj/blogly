"use server";
import bcrypt from "bcrypt";
import { databaseDrizzle } from "@/db/database";
import { users } from "@/db/schemas/users";
import { RegisterSchema } from "@/schema/user";
import { z } from "zod";
export async function addNewUser(data: z.infer<typeof RegisterSchema>) {
  const validate = RegisterSchema.safeParse(data);
  if (!validate.success) throw new Error("Invalid data provided");
  const { firstName, lastName, password, email } = validate.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  await databaseDrizzle.insert(users).values({
    name: `${firstName} ${lastName}`,
    email,
    hashedPassword,
    plan: 'FREE'
  });
}
