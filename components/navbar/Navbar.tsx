import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { BookMarked, Menu, NotebookPen, Unplug } from "lucide-react";
import Link from "next/link";
import { Logo } from "../logo/Logo";
import { ModeToggle } from "../modeToggle/ModeToggle";
import UserAvatar from "../userAvatar/UserAvatar";
import { SearchField } from "../searchField/SearchField";
import { Session } from "next-auth";
export const Navbar = ({
  withSearch,
  session,
}: {
  withSearch: boolean;
  session?: Session | null;
}) => {
  return (
    <div className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo />
          </div>{" "}
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/blog"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <BookMarked className="h-4 w-4" />
              Blogs
            </Link>
            <Link
              href="/blog/write"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <NotebookPen className="h-4 w-4" />
              Write New Blog
            </Link>
            <Link
              href="/integrate"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Unplug className="h-4 w-4" />
              Integrations
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">{withSearch && <SearchField />}</div>
      <UserAvatar session={session} />
      <div className="ml-auto h-8 w-8">
        <ModeToggle />
      </div>
    </div>
  );
};
