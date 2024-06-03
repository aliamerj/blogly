import type { Metadata } from "next";
import { Inter, Acme } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalyticsScript } from "./GoogleAnalyticsScript";

const inter = Inter({ subsets: ["latin"] });
const acme = Acme({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-acme",
  display: "block",
});
export const metadata: Metadata = {
  title: "Blogly - Simplify Blog Management and Boost SEO",
  metadataBase: new URL("https://blogly.co"),
  description:
    "Blogly is a powerful platform that simplifies blog management and enhances SEO for Next.js and React applications. Effortlessly integrate and manage your blogs with our user-friendly dashboard.",
  openGraph: {
    title: "Blogly - Simplify Blog Management and Boost SEO",
    description:
      "Blogly is a powerful platform that simplifies blog management and enhances SEO for Next.js and React applications. Effortlessly integrate and manage your blogs with our user-friendly dashboard.",
    url: "https://blogly.co",
    siteName: "Blogly",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogly - Simplify Blog Management and Boost SEO",
    description:
      "Blogly is a powerful platform that simplifies blog management and enhances SEO for Next.js and React applications. Effortlessly integrate and manage your blogs with our user-friendly dashboard.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalyticsScript />
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
