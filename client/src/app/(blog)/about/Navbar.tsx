"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "About Us",
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
    <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200 my-6 max-w-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">About Us</h2>
      <ul className="space-y-3">
        {links.map((item, index) => {
          const isActive = pathname === item.link;
          return (
            <li key={index}>
              <Link
                href={item.link}
                className={`block px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
