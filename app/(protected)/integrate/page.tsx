import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ApiIntegrationCard from "@/components/ApiIntegrationCard/ApiIntegrationCard";
import { ApiGenerator } from "@/components/apiGenerator/ApiGenerator";
import { KeysList } from "@/components/keysList/keysList";
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
      <main className="container mx-auto p-6 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ApiGenerator />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <KeysList />
          </div>
        </section>
        <section className="w-full flex justify-center">
          <ApiIntegrationCard />
        </section>
      </main>
    </>
  );
}
