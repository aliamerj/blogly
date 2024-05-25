import { Navbar } from "@/components/navbar/Navbar";
import React from "react";

export default function page() {
  return (
    <>
      <Navbar withSearch={true} />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">My Blogs</h1>
        </div>
        <div className="h-full border border-dashed">
          <div className="flex flex-wrap gap-4 p-4">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no Blog yet
              </h3>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
