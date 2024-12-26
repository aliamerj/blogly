import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { databaseDrizzle } from "@/db/database";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { env } from "process";

const SubscriptionMessage = dynamic(() => import('@/components/subscriptionMessage/SubscriptionMessage'), { ssr: false })

export default async function Pricing() {
  const session = await getServerSession(authOptions)
  const data = await databaseDrizzle.query.users.findFirst({
    where: (u, opt) => opt.eq(u.id, session?.user.id!),
    columns: {
      plan: true,
    }
  });

  if (!data) return notFound();

  if (data.plan === "PRO") return redirect("/login");
  const monthly = env.STRIPE_MONTHLY_PLAN_LINK as string;
  const yearly = env.STRIPE_YEARLY_PLAN_LINK as string;

  return (
    <>
      <SubscriptionMessage session={session} plan={data.plan} upgradeBtn={false} />
      <div className="h-full flex justify-center items-center bg-secondary pt-10">
        <div className="container mx-auto px-4 text-center items-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-primary">
            Pricing Made Simple
          </h2>
          <p className="text-lg md:text-xl mb-12 text-muted-foreground">
            Flexible plans designed to grow with you. Choose what fits you best.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {/* Monthly Plan */}
            <div className="relative bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 rounded-lg shadow-lg p-6 text-left text-secondary-foreground transition-transform transform hover:scale-105">
              <h3 className="text-3xl font-bold mb-4">Monthly Plan</h3>
              <p className="text-lg mb-6">For flexible usage. Upgrade anytime.</p>
              <ul className="space-y-3 text-sm">
                <li>✅ Full access to all features</li>
                <li>✅ Unlimited blog posts</li>
                <li>✅ Effortless integration</li>
              </ul>
              <div className="mt-6">
                <p className="text-4xl font-bold mb-2">
                  $10<span className="text-lg font-medium">/month</span>
                </p>
                <Button size="lg" variant="secondary" className="w-full mt-4">
                  <Link href={monthly} className="font-bold text-lg text-secondary-foreground">
                    Get Started
                  </Link>
                </Button>
              </div>
              <div className="absolute top-2 right-2 bg-white text-black font-bold text-xs px-3 py-1 rounded-full">
                Most Flexible
              </div>
            </div>

            {/* Yearly Plan */}
            <div className="relative bg-gradient-to-tr from-green-500 via-teal-500 to-blue-500 rounded-lg shadow-lg p-6 text-left text-secondary-foreground transition-transform transform hover:scale-105">
              <h3 className="text-3xl font-bold mb-4">Yearly Plan</h3>
              <p className="text-lg mb-6">Best value. Save $20 every year!</p>
              <ul className="space-y-3 text-sm">
                <li>✅ Full access to all features</li>
                <li>✅ Unlimited blog posts</li>
                <li>✅ Effortless integration</li>
              </ul>
              <div className="mt-6">
                <p className="text-4xl font-bold mb-2">
                  $100<span className="text-lg font-medium">/year</span>
                </p>
                <Button size="lg" variant="secondary" className="w-full mt-4">
                  <Link href={yearly} className="font-bold text-lg text-secondary-foreground">
                    Get Started
                  </Link>
                </Button>
              </div>
              <div className="absolute top-2 right-2 bg-white text-black font-bold text-xs px-3 py-1 rounded-full">
                Best Value
              </div>
            </div>
          </div>

          <p className="text-lg md:text-xl mt-12 text-muted-foreground">
            Your support keeps Blogly alive and improving. Thanks for being part
            of the journey! 🚀
          </p>
        </div>
      </div>
    </>
  );
}
