import LoginPage from "@/components/Login/Login";
import { Loader } from "@/components/loader/Loader";
import { Suspense } from "react";
export default function page() {
  return (
    <Suspense fallback={<Loader/>} >
      <LoginPage />
    </Suspense>
  );
}
