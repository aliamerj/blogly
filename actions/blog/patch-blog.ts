"use server";

import { databaseDrizzle } from "@/db/database";
import { blogs } from "@/db/schemas/blogs";
import { updateBlogSchema } from "@/schema/blog";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function patchBlog(
  blogId: string,
  data: z.infer<typeof updateBlogSchema>,
) {
  const validate = updateBlogSchema.safeParse(data);
  if (!validate.success) throw new Error("Invalid data provided");
  const { title, description, content, image, author, status, visibility } =
    validate.data;

  const blogValue = {
    title,
    description,
    author,
    status,
    image,
    visibility,
    content,
    publishTime: status === "published" ? new Date() : undefined,
  };

  await databaseDrizzle
    .update(blogs)
    .set(blogValue)
    .where(eq(blogs.id, blogId));
}
