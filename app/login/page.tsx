import LoginPage from "@/components/Login/Login";
import { Suspense } from "react";
export default function page() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}
