import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function UserAvatar({
  session,
  plan
}: {
  session?: Session | null;
  plan: string
}) {
  let currentSession;
  if (!session) {
    currentSession = await getServerSession(authOptions);
  } else {
    currentSession = session;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7">
          <AvatarImage
            src={currentSession?.user?.image ?? undefined}
            alt="user"
          />
          <AvatarFallback>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/support"> Support</Link>
        </DropdownMenuItem>
        {plan === 'PRO' && <DropdownMenuItem asChild>
          <Link href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}> Billing Portal</Link>
        </DropdownMenuItem>}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="w-full" href="/api/auth/signout">
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
