import { BlogForm } from "@/components/blogForm/BlogForm";
import { Navbar } from "@/components/navbar/Navbar";

export default function page() {
  return (
    <>
      <Navbar withSearch={false} />
      <BlogForm />
    </>
  );
}
