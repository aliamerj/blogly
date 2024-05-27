"use server";

import { databaseDrizzle } from "@/db/database";
import { blogs } from "@/db/schemas/blogs";
import { blogSchema } from "@/schema/blog";
import { z } from "zod";

export async function postBlog(data: z.infer<typeof blogSchema>) {
  const validate = blogSchema.safeParse(data);
  if (!validate.success) throw new Error("Invalid data provided");
  const { title, description, content, image, author, status, visibility } =
    validate.data;

  const blogValue: typeof blogs.$inferInsert = {
    title,
    description,
    author,
    status,
    image,
    visibility,
    content,
    publishTime: status === "published" ? new Date() : undefined,
  };

  const blogId = await databaseDrizzle
    .insert(blogs)
    .values(blogValue)
    .returning({ id: blogs.id })
    .then((res) => res[0].id);
  return blogId;
}
