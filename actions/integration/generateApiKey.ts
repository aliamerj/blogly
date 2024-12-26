"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { databaseDrizzle } from "@/db/database";
import { apiKeys } from "@/db/schemas/users";
import { hashApiKey } from "@/lib/api_key";
import { fromErrorToFormState, toFormState } from "@/lib/zodErrorHandle";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const apiScheme = z.object({
  name: z.string().min(2),
});

type FormState = {
  message: string;
};
export async function generateApiKey(_: FormState, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("forbidden");
  // todo : check auth 
  try {
    const parse = apiScheme.parse({
      name: formData.get("name"),
    });
    const apiKey = `blogly_${Math.random().toString(36).substring(2, 16) + session.user.id.split("-")[0]}`;
    const hashedKey = hashApiKey(apiKey);

    await databaseDrizzle.insert(apiKeys).values({
      userId: session.user.id!,
      name: parse.name,
      generatedTime: new Date(),
      apiKey: hashedKey,
    });
    revalidatePath("/blog/integrate");
    return toFormState("SUCCESS", apiKey);
  } catch (e) {
    return fromErrorToFormState(e);
  }
}
