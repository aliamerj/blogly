import { Facebook, Linkedin, Github } from "lucide-react";
import Link from "next/link";
import { Logo } from "../logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <Logo />
            <p className="mt-2 mr-4">
              Simplify your blog management and enhance your SEO with Blogly.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h5 className="text-lg font-semibold">Quick Links</h5>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <Link href="#support" className="hover:underline">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h5 className="text-lg font-semibold">Contact Us</h5>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:aliamer19ali@gmail.com"
                className="hover:underline"
              >
                aliamer19ali@gmail.com
              </a>
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61550300066538"
                target="_blank"
                className="transition-colors duration-300 hover:text-primary"
              >
                <Facebook />
              </a>
              <a
                href="https://linkedin.com/in/aliamer22"
                target="_blank"
                className="transition-colors duration-300 hover:text-primary"
              >
                <Linkedin />
              </a>

              <a
                href="https://github.com/aliamerj/blogly"
                target="_blank"
                className="transition-colors duration-300 hover:text-primary"
              >
                <Github />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center border-t border-gray-700 pt-4">
          <p>&copy; 2024 Blogly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
