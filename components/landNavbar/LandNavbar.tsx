import React from "react";
import { Logo } from "../logo/Logo";
import { Button } from "../ui/button";
import Link from "next/link";

export const LandNavbar = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center justify-around gap-4 border-b bg-background px-4 md:px-6 z-10">
      <Logo />
      <div className="flex gap-2">
        <Button className="hidden sm:flex" size={"lg"} variant="ghost" asChild>
          <Link href={"/login"}>Sign in</Link>
        </Button>
        <Button size={"lg"} asChild>
          <Link href={"/register"}>Get Started</Link>
        </Button>
      </div>
    </header>
  );
};
