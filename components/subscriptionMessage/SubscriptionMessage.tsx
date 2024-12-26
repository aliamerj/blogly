"use client"
import { Session } from "next-auth";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Flame } from "lucide-react";
import CalculateRemainingTime from "../ui/calculateRemainingTime";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function SubscriptionMessage({ session, upgradeBtn, plan }: { session?: Session | null, upgradeBtn: boolean, plan: string }) {
  if (!session?.user?.createdAt || plan === 'PRO') return null;
  return (
    <Alert variant='sub' className="flex justify-between items-center">
      <div className="flex gap-2">
        <Flame color="red" />
        <div>
          <AlertTitle >Upgrade your plan</AlertTitle>
          <AlertDescription>
            <CalculateRemainingTime created={session.user.createdAt!} />
          </AlertDescription>
        </div>
      </div>

      {upgradeBtn && <Button variant='destructive'>
        <Link href="/pricing" className="font-bold text-lg text-white">
          Upgrade your plan
        </Link>
      </Button>}
    </Alert>
  );

}

