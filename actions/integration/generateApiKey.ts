"use server";
import { databaseDrizzle } from "@/db/database";
import { users } from "@/db/schemas/users";
import { apiEncrypt } from "@/lib/api_key";

import { eq } from "drizzle-orm";

export async function generateApiKey(userId: string) {
  const apiKey = `blogly_${Math.random().toString(36).substring(2, 16) + userId.split("-")[0]}`;
  const { iv, encryptedData } = apiEncrypt(apiKey);
  await databaseDrizzle
    .update(users)
    .set({ apiKey: iv + "|/:/|" + encryptedData })
    .where(eq(users.id, userId));
  return apiKey;
}
