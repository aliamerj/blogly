"use server";
import { authOptions } from "@/auth";
import { databaseDrizzle } from "@/db/database";
import { apiKeys } from "@/db/schemas/users";
import { hashApiKey } from "@/lib/api_key";
import { hasAuthority } from "@/lib/utils";
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
  const plan = formData.get("plan");

  try {
    if (!session?.user?.id || !plan) throw new Error("forbidden");
    if (!hasAuthority(plan.toString(), new Date(session.user.createdAt!))) throw new Error("Your free plan has expired. Please subscribe to continue using the app.")

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
