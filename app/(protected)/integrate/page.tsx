import { ApiGenerator } from "@/components/apiGenerator/ApiGenerator";
import { KeysList } from "@/components/keysList/keysList";
import { Navbar } from "@/components/navbar/Navbar";

export default async function page() {
  return (
    <>
      <Navbar withSearch={false} />
      <main className="flex flex-col items-center justify-center p-3">
        <ApiGenerator />
        <KeysList />
      </main>
    </>
  );
}
