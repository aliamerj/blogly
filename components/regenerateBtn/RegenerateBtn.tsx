"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

export const RegenerateBtn = () => {
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
          <RefreshCw className="mr-2 w-4 h-4" /> Regenerate
        </>
      )}
    </Button>
  );
};
