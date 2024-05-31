import RegisterPage from "@/components/Register/Register";
import { Suspense } from "react";
export default function page() {
  return (
    <Suspense>
      <RegisterPage />
    </Suspense>
  );
}
