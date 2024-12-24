"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Menu, X } from "lucide-react";
import { menuItems } from "./data";
import { getUserData } from "./actions";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState("USER"); // Default role
  const pathname = usePathname();

  useEffect(() => {
    const getSidebarMenu = async () => {
      const { role } = await getUserData();
      setUserRole(role);
    };
    getSidebarMenu();
  }, []);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Filter the menu items based on the user role
  const filteredMenuItems = menuItems.filter((item) => {
    if (userRole === "ADMIN") {
      return true; // Admin has access to all menu items
    }
    if (userRole === "USER") {
      if (item.role === "USER") {
        return true;
      }
      return false;
    }
    // Users have access to only specific menu items
    if (item.href === "/dashboard" || item.href === "/find-posts") {
      return true;
    }
    return false;
  });

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed p-2 m-2 rounded-md bg-gray-800 text-white z-20"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-10 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-200 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full w-64 bg-gray-800">
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white text-2xl font-semibold">Dashboard</span>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-2">
            {filteredMenuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
