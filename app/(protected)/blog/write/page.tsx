import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BlogForm } from "@/components/blogForm/BlogForm";
import { Navbar } from "@/components/navbar/Navbar";
import { databaseDrizzle } from "@/db/database";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
const SubscriptionMessage = dynamic(() => import('@/components/subscriptionMessage/SubscriptionMessage'), { ssr: false })

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) return notFound()

  const data = await databaseDrizzle.query.users.findFirst({
    where: (u, opt) => opt.eq(u.id, session.user.id!),
    columns: {
      plan: true,
    },
  })

  if (!data) return notFound();

  return (
    <>
      <SubscriptionMessage session={session} plan={data.plan} upgradeBtn={true} />
      <Navbar withSearch={false} />
      <BlogForm />
    </>
  );
}
