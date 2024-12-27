import { databaseDrizzle } from "@/db/database";
import { blogs } from "@/db/schemas/blogs";
import { apiKeys, users } from "@/db/schemas/users";
import { hashApiKey } from "@/lib/api_key";
import { hasAuthority } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = request.headers.get("Authorization");
  if (!auth || !auth.split("Bearer ")[1])
    return NextResponse.json(
      {
        code: "unauthorized",
        message: "The requested resource was not found.",
      },
      { status: 401 },
    );
  const keyHashed = hashApiKey(auth.split("Bearer ")[1]);
  const key = await databaseDrizzle
    .select({ userId: apiKeys.userId })
    .from(apiKeys)
    .where(eq(apiKeys.apiKey, keyHashed))
    .limit(1);
  if (!key[0]?.userId) {
    return NextResponse.json(
      {
        code: "forbidden",
        message: "The requested resource was not found.",
      },
      { status: 403 },
    );
  }

  const user = await databaseDrizzle
    .select({ createAt: users.createdAt, plan: users.plan })
    .from(users)
    .where(eq(users.id, key[0].userId)).limit(1).then(u => u[0])
  if (!user) return NextResponse.json(
    {
      code: "forbidden",
      message: "The requested resource was not found.",
    },
    { status: 403 },
  )

  if (!hasAuthority(user.plan, new Date(user.createAt))) return NextResponse.json(
    {
      code: "plan_expired",
      message: "Your free plan has expired. Upgrade to continue enjoying our services.",
      details: {
        nextSteps: "Visit your account settings to subscribe to a premium plan.",
        support: "Contact support if you believe this is a mistake.",
      },
    },
    { status: 403 },
  );

  try {
    const allBlogs = await databaseDrizzle
      .select({
        id: blogs.id,
        title: blogs.title,
        image: blogs.image,
        content: blogs.content,
        author: blogs.author,
        description: blogs.description,
      })
      .from(blogs)
      .where(
        and(
          eq(blogs.userId, key[0].userId),
          eq(blogs.visibility, "public"),
          eq(blogs.status, "published"),
          eq(blogs.id, params.id),
        ),
      )
      .limit(1);
    return NextResponse.json(allBlogs[0], { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { code: "internal_server_error", message: error.message },
      { status: 500 },
    );
  }
}
