import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { GenerateKeyForm } from "../generateKeyForm/generatekeyForm";

export const ApiGenerator = async ({ plan }: { plan: string }) => {

  return (
    <Card className="w-full max-w-xl mx-auto mt-5 p-4">
      <CardHeader>
        <CardTitle className="text-xl">Create New API Key</CardTitle>
        <CardDescription className="text-lg">
          Enter a unique name for your API key to differentiate it from other
          keys.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GenerateKeyForm plan={plan} />
      </CardContent>
    </Card>
  );
};
