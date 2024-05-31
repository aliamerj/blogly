import FaqSection from "@/components/FaqSection/FaqSection";
import Footer from "@/components/Footer/Footer";
import { ApiUseExample } from "@/components/apiUseExample/ApiUseExample";
import ContactUs from "@/components/contactUs/contactUs";
import { LandNavbar } from "@/components/landNavbar/LandNavbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <LandNavbar />
      <main>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white pt-14 h-[50vh]">
          <div className="container mx-auto px-4 text-center md:px-14 lg:px-52">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Simplify Your Blog Management in Your App
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Effortlessly integrate and manage blogs in your Next.js or React
              app. Focus on building, let us handle the SEO.
            </p>
            <Button size="lg">
              <Link href={"/register"}>Get Started</Link>
            </Button>
          </div>
        </div>
        <div className="relative w-full flex justify-center p-5 lg:pt-10">
          <div className="absolute w-full max-w-4xl mx-auto transform -translate-y-1/2">
            <Image
              src="/images/dashboard-screenshot.png"
              alt="Writing Blog Dashboard"
              priority
              width={1200}
              height={800}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <section className="pt-60 px-5 md:px-10 lg:px-20" id="features">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Discover the Power of Blogly
            </h2>
            <p className="text-lg md:text-xl mb-12">
              Effortlessly integrate and manage blogs in your Next.js or React
              app. Boost your SEO and streamline your workflow with our powerful
              features.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <Card className="w-full max-w-xs p-4">
                <CardHeader>
                  <Shield className="w-12 h-12 mx-auto text-blue-600" />
                  <CardTitle className="mt-4">Secure & Reliable</CardTitle>
                  <CardDescription>
                    Our platform ensures your data is secure and always
                    available.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="w-full max-w-xs p-4">
                <CardHeader>
                  <Zap className="w-12 h-12 mx-auto text-green-600" />
                  <CardTitle className="mt-4">Fast Integration</CardTitle>
                  <CardDescription>
                    Quickly integrate with your existing setup with minimal
                    effort.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="w-full max-w-xs p-4">
                <CardHeader>
                  <Code className="w-12 h-12 mx-auto text-purple-600" />
                  <CardTitle className="mt-4">Developer Friendly</CardTitle>
                  <CardDescription>
                    Built with developers in mind, our API is intuitive and easy
                    to use.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <ApiUseExample />

            <div className="mt-12 mb-10">
              <Button
                className="px-8 py-4 font-semibold rounded-md shadow-md transition"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </section>
        <section className="py-12 bg-secondary" id="pricing">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Simple and Transparent Pricing
            </h2>
            <p className="text-lg md:text-xl mb-12">
              Currently, Blogly is completely free to use. Enjoy all features
              without any cost!
            </p>

            <div
              className="flex flex-wrap justify-center gap-8 mb-12"
              id="price"
            >
              <Card className="w-full max-w-sm p-6 bg-primary">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-primary-foreground">
                    Free Plan
                  </CardTitle>
                  <CardDescription className="text-primary-foreground">
                    All Features Included
                  </CardDescription>
                </CardHeader>
                <CardContent className="my-4 text-primary-foreground">
                  <ul className="text-left space-y-2">
                    <li>✅ Full access to Blogly features</li>
                    <li>✅ Unlimited blog posts</li>
                    <li>✅ Easy integration</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button className="px-8 py-4 font-semibold" variant="outline">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <p className="text-lg md:text-xl">
              As we grow, premium features and plans will be introduced. Stay
              tuned!
            </p>
          </div>
        </section>
        <section id="support">
          <ContactUs />
        </section>
        <section className="py-12 bg-gray-100 dark:bg-gray-900" id="faq">
          <FaqSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
