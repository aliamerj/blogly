"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Key, Rocket } from "lucide-react";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { generateApiKey } from "@/actions/integration/generateApiKey";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useRef } from "react";
import { EMPTY_FORM_STATE } from "@/lib/zodErrorHandle";

export const GenerateKeyForm = ({plan}: {plan:string}) => {
  const ref = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(generateApiKey, EMPTY_FORM_STATE);
  return (
    <form
      className="flex-col flex gap-5"
      ref={ref}
      action={async (data) => {
        ref.current?.reset();
         data.set("plan", plan)
        formAction(data);
      }}
    >
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="my blog API"
          className={`${state.message && !state.message.startsWith("blogly_") ? "border-destructive" : ""}`}
        />
      </div>
      <GenerateBtn />
      {state.message && !state.message.startsWith("blogly_") ? (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : (
        state.message && (
          <Alert variant="default">
            <Rocket className="h-4 w-4" />
            <AlertTitle>API Key Created!</AlertTitle>
            <AlertDescription>
              {" "}
              For security reasons, we will only show you the key once. Please
              copy and store it somewhere safe.
            </AlertDescription>
            <AlertDescription className="text-green-500">
              Api Key : {state.message}
            </AlertDescription>
          </Alert>
        )
      )}
    </form>
  );
};

const GenerateBtn = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          {" "}
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        <>
          <Key className="mr-2 w-4 h-4" />
          Generate New Key
        </>
      )}
    </Button>
  );
};
