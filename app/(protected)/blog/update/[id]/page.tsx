import { BlogForm } from "@/components/blogForm/BlogForm";
import { Navbar } from "@/components/navbar/Navbar";
import { databaseDrizzle } from "@/db/database";
import { blogSchema } from "@/schema/blog";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function page({ params }: { params: { id: string } }) {
  const blog = await databaseDrizzle.query.blogs.findFirst({
    where: (b, opt) => opt.eq(b.id, params.id),
  });

  if (!blog) return notFound();

  const parseBLogData: z.infer<typeof blogSchema> = {
    title: blog.title,
    content: blog.content,
    visibility: blog.visibility,
    status: blog.status,
    description: blog.description,
    author: blog.author,
    image: blog.image ?? undefined,
    publishedTime: blog.publishTime ?? undefined,
  };

  return (
    <>
      <Navbar withSearch={false} />
      <BlogForm blogData={parseBLogData} blogId={blog.id} />
    </>
  );
}
