import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  XIcon,
  InstagramIcon,
  PhoneIcon,
  MailIcon,
} from "@/assets/icons/icons";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* About Us */}
          <div>
            <h5 className="text-lg font-semibold mb-4">About Us</h5>
            <p className="text-sm text-gray-600 mb-4">
              cursolog is optimized for learning and training. Examples might be
              simplified to improve reading and learning. Tutorials, references,
              and examples are constantly reviewed to avoid errors, but we
              cannot warrant full correctness of all content.
            </p>
            <div className="flex gap-4">
              <FacebookIcon className="h-6 w-6 text-gray-700 hover:text-blue-600 transition" />
              <XIcon className="h-6 w-6 text-gray-700 hover:text-blue-400 transition" />
              <InstagramIcon className="h-6 w-6 text-gray-700 hover:text-pink-500 transition" />
            </div>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-gray-700">
              <li>
                <Link href="/about/terms" className="hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/about/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about/cursolog" className="hover:underline">
                  Help
                </Link>
              </li>
              <li>
                <Link href="/about/cursolog" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Learn</h5>
            <ul className="space-y-2 text-gray-700">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-gray-500" />
                <span>+977 9824944441</span>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="h-5 w-5 text-gray-500" />
                <span className="break-words">dev.dharambir@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-4">
          <p className="text-center text-sm text-gray-600">
            &copy; 2024 cursolog, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
