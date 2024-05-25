import Link from "next/link";
import React from "react";
import { PencilLine } from "lucide-react";
export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-semibold text-3xl font-acm"
    >
      <PencilLine size={30} />
      <span className="font-acme">Blogly</span>
    </Link>
  );
};
