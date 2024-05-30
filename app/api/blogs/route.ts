import { databaseDrizzle } from "@/db/database";
import { blogs } from "@/db/schemas/blogs";
import { apiKeys } from "@/db/schemas/users";
import { hashApiKey } from "@/lib/api_key";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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
        ),
      );
    return NextResponse.json(allBlogs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { code: "internal_server_error", message: error.message },
      { status: 500 },
    );
  }
}
