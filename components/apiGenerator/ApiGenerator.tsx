import { Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { generateApiKey } from "@/actions/integration/generateApiKey";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { RegenerateBtn } from "../regenerateBtn/RegenerateBtn";

export const ApiGenerator = async ({
  showKey,
  userId,
  apiKey,
}: {
  showKey: boolean;
  userId: string;
  apiKey: string;
}) => {
  return (
    <Card className="w-full max-w-xl mx-auto mt-5 p-4">
      <CardHeader>
        <CardTitle>Manage API Key</CardTitle>
        <CardDescription>Generate your API key securely.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="api-key">API Key</Label>
            <div className="relative flex items-center">
              <Input
                type={showKey ? "text" : "password"}
                value={apiKey}
                readOnly
                className="w-full pr-12"
              />
              <Button className="absolute right-0 p-2 " size="icon" asChild>
                {showKey ? (
                  <Link href={{ search: "showKey=false" }}>
                    <EyeOff className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link href={{ search: "showKey=true" }}>
                    <Eye className="w-5 h-5" />
                  </Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2 mt-4">
        <form
          action={async () => {
            "use server";
            await generateApiKey(userId);
            revalidatePath("/blog/integrate");
          }}
        >
          <RegenerateBtn />
        </form>
      </CardFooter>
    </Card>
  );
};
