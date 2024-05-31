import type { Metadata } from "next";
import { Inter, Acme } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
const faqs = [
  {
    question: "What is Blogly?",
    answer: "Blogly is a SaaS platform designed to simplify blog management and boost SEO for Next.js and React applications. It provides an easy-to-use dashboard for writing, editing, and managing blog posts.",
  },
  {
    question: "Is Blogly free to use?",
    answer: "Yes, Blogly is currently free to use. Enjoy full access to all features without any cost.",
  },
  {
    question: "How do I integrate Blogly with my existing app?",
    answer: "Integrating Blogly with your existing app is simple. You can use our API endpoints to fetch and display blog posts seamlessly. Check out the API usage examples for more details.",
  },
  {
    question: "Will there be premium features in the future?",
    answer: "Yes, as we grow, we plan to introduce premium features and plans. Stay tuned for updates!",
  },
  {
    question: "How can I get support?",
    answer: "If you need support, you can use our support page to send us a message. We're here to help!",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};
const inter = Inter({ subsets: ["latin"] });
const acme = Acme({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-acme",
  display: "block",
});
export const metadata: Metadata = {
  title: "Blogly - Simplify Blog Management and Boost SEO",
    metadataBase: new URL('https://blogly.co'),
  description: "Blogly is a powerful platform that simplifies blog management and enhances SEO for Next.js and React applications. Effortlessly integrate and manage your blogs with our user-friendly dashboard.",
  openGraph: {
    title: "Blogly - Simplify Blog Management and Boost SEO",
    description: "Blogly is a powerful platform that simplifies blog management and enhances SEO for Next.js and React applications. Effortlessly integrate and manage your blogs with our user-friendly dashboard.",
    url: "https://blogly.co",
    siteName: "Blogly", 
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogly - Simplify Blog Management and Boost SEO",
    description: "Blogly is a powerful platform that simplifies blog management and enhances SEO for Next.js and React applications. Effortlessly integrate and manage your blogs with our user-friendly dashboard.",

  },
  keywords: [
    "blog management",
    "SEO",
    "Next.js",
    "React",
    "Blogly",
    "blog platform",
    "blog dashboard",
    "SEO optimization",
    "integrate blogs",
    "manage blogs",
  ],
  other: {
    jsonLd: JSON.stringify(structuredData),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${acme.variable} ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
