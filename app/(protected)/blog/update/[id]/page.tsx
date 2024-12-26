import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BlogForm } from "@/components/blogForm/BlogForm";
import { Navbar } from "@/components/navbar/Navbar";
import { databaseDrizzle } from "@/db/database";
import { blogSchema } from "@/schema/blog";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { z } from "zod";
const SubscriptionMessage = dynamic(() => import('@/components/subscriptionMessage/SubscriptionMessage'), { ssr: false })


export default async function page({ params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions);
  if (!session) return notFound()


  const data = await databaseDrizzle.query.users.findFirst({
    where: (u, opt) => opt.eq(u.id, session.user.id!),
    columns: {
      plan: true,
    },
    with: {
      blogs: {
        where: (b, opt) => opt.eq(b.id, params.id),
        limit: 1
      }
    }
  })

  if (!data) return notFound();

  const blog = data.blogs[0];
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
      <SubscriptionMessage session={session} plan={data.plan} upgradeBtn={true} />
      <Navbar withSearch={false} />
      <BlogForm blogData={parseBLogData} blogId={blog.id} />
    </>
  );
}
