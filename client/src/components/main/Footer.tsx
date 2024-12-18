import Image from "next/image";
import Link from "next/link";
// import {
//   email,
//   phone,
// } from "@/public/icon/index";
import { FacebookIcon, XIcon, InstagramIcon } from "@/assets/icons/icons";
import {} from "lucide-react"
"

const Footer = () => {
  return (
    <>
      <div className="grid grid-cols-5 py-8 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1 container mx-auto max-sm:px-2 max-[450px]:px-4">
        {/* About us */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <h5 className="h5-bold">About Us</h5>
          <p className="h7 ">
            cursolog is optimized for learning and training. Examples might be
            simplified to improve reading and learning. Tutorials, references,
            and examples are constantly reviewed to avoid errors, but we cannot
            warrant full correctness of all content.
          </p>
          <div className="flex flex-row gap-2">
          <FacebookIcon className="h-8 w-8 border-2"/>
          <XIcon className="h-8 w-8 border-2"/>
          <InstagramIcon className="h-8 w-8 border-2"/>            
            
          </div>
        </div>
        {/* Support  */}
        <div className="flex flex-col gap-4">
          <h5 className="h5-bold">Support</h5>
          <div className=" text-slate-900 flex flex-col">
            <Link href="/about/terms">Terms</Link>
            <Link href="/about/privacy">Privacy Policy</Link>
            <Link href="/about/cursolog">Help</Link>
            <Link href="/about/cursolog">Contact</Link>
          </div>
        </div>
        {/* Learn  */}
        <div className="flex flex-col gap-4">
          <h5 className="h5-bold">Learn</h5>
          <div className="text-slate-900 flex flex-col">
            <Link href="/blog">Blog</Link>
          </div>
        </div>
        {/* Contact us  */}
        <div className="flex flex-col gap-4">
          <h5 className="h5-bold">Contact Us</h5>
          <div className="flex flex-col gap-2">
            <span className="flex flex-row gap-2 items-center">
              <Image
                src={phone}
                alt="Picture of the author"
                width={60}
                height={60}
                className="h-7 w-7"
              />
              <p>+977 9824944441</p>
            </span>
            <span className="flex flex-row gap-2 items-center">
              <Image
                src={email}
                alt="Picture of the author"
                width={60}
                height={60}
                className="h-7 w-7"
              />
              <p className="break-all">dev.dharambir@gmail.com</p>
            </span>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-black flex justify-center py-3">
        <p className="text-center h7">
          Copyright &copy; 2024 cursolog, Inc. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;