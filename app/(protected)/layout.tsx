import type { Metadata } from "next";
import { Sidbar } from "@/components/sidebar/Sidebar";
export const metadata: Metadata = {
  title: "Simplify Blog Management in Your tool",
  description: "Free and open-source blog management tool. it simplifies content creation with an easy-to-use dashboard for creating and editing posts. It seamlessly integrates with your web apps, so you can focus on building your app while we handle your blog management.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <section className="hidden border-r bg-muted/40 md:block">
        <Sidbar />
      </section>
      <section className="flex flex-col">{children}</section>
    </main>
  );
}
