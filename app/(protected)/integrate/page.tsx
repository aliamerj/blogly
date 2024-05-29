import { generateApiKey } from "@/actions/integration/generateApiKey";
import { auth } from "@/auth";
import { ApiGenerator } from "@/components/apiGenerator/ApiGenerator";
import { ApiUseExample } from "@/components/apiUseExample/ApiUseExample";
import { Navbar } from "@/components/navbar/Navbar";
import { databaseDrizzle } from "@/db/database";
import { apiDecrypt } from "@/lib/api_key";
import { notFound } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: { showKey: string };
}) {
  const sesstion = await auth();
  if (!sesstion?.user?.id) return notFound();
  let apiKey;
  const keyStored = await databaseDrizzle.query.users.findFirst({
    where: (u, o) => o.eq(u.id, sesstion.user?.id!),
  });

  if (keyStored?.apiKey) {
    const [ivHex, cryptedData] = keyStored.apiKey.split("|/:/|");
    apiKey = apiDecrypt(cryptedData, ivHex);
  } else {
    apiKey = await generateApiKey(sesstion.user.id);
  }

  return (
    <>
      <Navbar withSearch={false} session={sesstion} />
      <main className="flex flex-col items-center justify-center p-3">
        <ApiGenerator
          showKey={searchParams.showKey === "true"}
          apiKey={apiKey}
          userId={sesstion.user.id}
        />
        <ApiUseExample
          apiKey={searchParams.showKey === "true" ? apiKey : undefined}
        />
      </main>
    </>
  );
}
