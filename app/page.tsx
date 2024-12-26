import FaqSection from "@/components/FaqSection/FaqSection";
import Footer from "@/components/Footer/Footer";
import { ApiUseExample } from "@/components/apiUseExample/ApiUseExample";
import ContactUs from "@/components/contactUs/contactUs";
import { LandNavbar } from "@/components/landNavbar/LandNavbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Producthunt } from "./Producthunt";

export default function Home() {
  return (
    <>
      <LandNavbar />
      <main>
        {/* Header Section with Gradient */}
        <div className="relative h-auto w-full bg-[#222831] min-h-[60vh] overflow-hidden p-10 px-5 lg:px-20">
          <div className="absolute top-0 right-0 h-[30%] w-[30%] bg-gradient-to-tr from-emerald-200 to-emerald-500 blur-[130px]"></div>
          <div className="absolute bottom-0 left-0 h-[30%] w-[20%] bg-gradient-to-bl from-emerald-200 to-emerald-500 blur-[130px]"></div>
          <div className="container mx-auto px-4 text-center md:px-14 lg:px-52">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
              Simplify Your Blog Management in Your App
            </h1>
            <div className="flex justify-center items-center p-5">
              <Producthunt />
            </div>
            <p className="text-sm sm:text-lg md:text-2xl mb-8">
              Effortlessly integrate and manage blogs in your Next.js or React
              app. Focus on building, let us handle the SEO.
            </p>
            <Button size="lg">
              <Link href={"/register"} className="font-bold text-lg">
                Get Started
              </Link>
            </Button>

            {/* Image positioned at the bottom of the header section */}

            <Image
              src="/images/dashboard-screenshot.png"
              alt="Writing Blog Dashboard"
              priority
              width={1200}
              height={800}
              className="rounded-lg shadow-lg pt-10"
            />
          </div>
        </div>

        {/* Spacer to ensure the image does not overlap with the content below */}
        <div className="h-[160px]"></div>

        <section className="px-5 md:px-10 lg:px-20" id="features">
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
              <Button size="lg">
                <Link href={"/register"} className="font-bold text-lg">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="py-16 bg-secondary" id="pricing">
          <div className="container mx-auto px-4 text-center items-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
              Pricing Made Simple
            </h2>
            <p className="text-lg md:text-xl mb-12 text-muted-foreground">
              Flexible plans designed to grow with you. Choose what fits you best.
            </p>

           <div className="flex flex-wrap justify-center gap-8">
              {/* Monthly Plan */}
              <div className="relative bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 rounded-lg shadow-lg p-6 text-left text-white transition-transform transform hover:scale-105">
                <h3 className="text-3xl font-bold mb-4">Monthly Plan</h3>
                <p className="text-lg mb-6">For flexible usage. Upgrade anytime.</p>
                <ul className="space-y-3 text-sm">
                  <li>✅ Full access to Blogly features</li>
                  <li>✅ Unlimited blog posts</li>
                  <li>✅ Effortless integration</li>
                </ul>
                <div className="mt-6">
                  <p className="text-4xl font-bold mb-2">$10<span className="text-lg font-medium">/month</span></p>
                  <Button size="lg" variant='secondary' className="w-full mt-4">
                    <Link href={"/register"} className="font-bold text-lg text-white">
                      Get Started
                    </Link>
                  </Button>
                </div>
                <div className="absolute top-2 right-2 bg-white text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Most Flexible
                </div>
              </div>

              {/* Yearly Plan */}
              <div className="relative bg-gradient-to-tr from-green-500 via-teal-500 to-blue-500 rounded-lg shadow-lg p-6 text-left text-white transition-transform transform hover:scale-105">
                <h3 className="text-3xl font-bold mb-4">Yearly Plan</h3>
                <p className="text-lg mb-6">Best value. Save $20 every year!</p>
                <ul className="space-y-3 text-sm">
                  <li>✅ Full access to Blogly features</li>
                  <li>✅ Unlimited blog posts</li>
                  <li>✅ Effortless integration</li>
                </ul>
                <div className="mt-6">
                  <p className="text-4xl font-bold mb-2">$100<span className="text-lg font-medium">/year</span></p>
                  <Button size="lg" variant='secondary' className="w-full mt-4">
                    <Link href={"/register"} className="font-bold text-lg text-white">
                      Get Started
                    </Link>
                  </Button>
                </div>
                <div className="absolute top-2 right-2 bg-white text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Best Value
                </div>
              </div>
            </div>

            <p className="text-lg md:text-xl mt-12 text-muted-foreground">
              Your support keeps Blogly alive and improving. Thanks for being part of the journey! 🚀
            </p>
          </div>
        </section>

        <section id="support">
          <ContactUs />
        </section>

        <section className="py-12 bg-gray-100 dark:bg-gray-900" id="faq">
          <FaqSection />
        </section>
      </main>{" "}
      <Footer />{" "}
    </>
  );
}
