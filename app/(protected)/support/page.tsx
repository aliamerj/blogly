import ContactUs from "@/components/contactUs/contactUs";
import { Navbar } from "@/components/navbar/Navbar";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Blogly: Reach Out and Connect",
  description:
    "Have questions or want to get in touch with the Blogly team? Our contact page makes it easy. Fill out the form, and we promise to get back to you promptly. Your feedback and inquiries matter to us.",
};
export default function page() {
  return (
    <>
      <Navbar withSearch={false} />
      <main className="flex flex-col items-center justify-center p-3">
        <ContactUs />
      </main>
    </>
  );
}
