"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export const SearchField = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for Blog..."
        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
        onChange={(e) => {
          e.preventDefault();
          if (e.target.value === "") {
            router.replace("?", { scroll: false });
            return;
          }
          router.replace(`?search=${e.target.value}`, { scroll: false });
        }}
      />
    </div>
  );
};
