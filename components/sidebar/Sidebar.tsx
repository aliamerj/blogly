import { BookMarked, NotebookPen, Unplug } from "lucide-react";
import Link from "next/link";
import { Logo } from "../logo/Logo";

export const Sidbar = () => {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Logo />
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            href="/blog"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
      </div>
    </div>
  );
};
