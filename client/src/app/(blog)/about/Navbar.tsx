"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "AboutUs",
    link: "/about/us",
  },
  {
    title: "Terms",
    link: "/about/terms",
  },
  {
    title: "Privacy",
    link: "/about/privacy",
  },
];
const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="">
        <h6 className="px-4 pb-6 pt-4 max-sm:hidden h4-semibold">About Us</h6>
        <div className="flex flex-col gap-3 sm:mx-2 max-sm:flex-row max-sm:border-y-2 max-sm:p-3 ">
          {links.map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={index}
                href={item.link}
                className={
                  isActive
                    ? " bg-blue-500 rounded-md"
                    : "hover:bg-blue-300 px-2 rounded-md"
                }
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
