import ApiIntegrationCard from "@/components/ApiIntegrationCard/ApiIntegrationCard";
import { ApiGenerator } from "@/components/apiGenerator/ApiGenerator";
import { KeysList } from "@/components/keysList/keysList";
import { Navbar } from "@/components/navbar/Navbar";

export default async function page() {
  return (
    <>
      <Navbar withSearch={false} />
      <main className="container mx-auto p-6 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ApiGenerator />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <KeysList />
          </div>
        </section>
        <section className="w-full flex justify-center">
          <ApiIntegrationCard />
        </section>
      </main>
    </>
  );
}
