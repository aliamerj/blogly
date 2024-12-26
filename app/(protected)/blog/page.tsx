import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BlogCard } from "@/components/blogCard/BlogCard";
import { Navbar } from "@/components/navbar/Navbar";
import { databaseDrizzle } from "@/db/database";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
const SubscriptionMessage = dynamic(() => import('@/components/subscriptionMessage/SubscriptionMessage'), { ssr: false })


export default async function page({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return notFound();

  const search = searchParams.search;
  const data = await databaseDrizzle.query.users.findFirst({
    where: (u, opt) => opt.eq(u.id, session?.user.id!),
    columns: {
      plan: true,
    },
    with: {
      blogs: {
        where: (b, o) =>
          o.and(
            o.eq(b.userId, session.user?.id!),
            o
              .or(
                o.ilike(b.title, `%${search}%`),
                o.ilike(b.description, `%${search}%`),
              )
              ?.if(search),
          ),
      }
    }
  })
  if (!data) return notFound();

  return (
    <>
      <SubscriptionMessage session={session} plan={data.plan} upgradeBtn={true} />
      <Navbar withSearch={true} session={session} plan={data.plan} />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">My Blogs</h1>
        </div>
        <div className="h-full border border-dashed">
          {data.blogs.length === 0 ? (
            <div className="flex h-full w-full justify-center items-center flex-wrap gap-4 p-4">
              <h3 className="text-2xl font-bold tracking-tight">
                No Blog Found
              </h3>
            </div>
          ) : (
            <div className="flex flex-wrap justify-start gap-4 p-4 md:gap-6">
              {data.blogs.map((blog) => (
                <Link
                  href={"/blog/update/" + blog.id}
                  key={blog.id}
                  className="p-2 flex-1 basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <BlogCard blog={blog} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
