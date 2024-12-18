"use client";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">BlogIO</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium transition"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium transition"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium transition"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium transition"
            >
              Contact
            </a>

            {/* Login Button */}
            <a
              href="#"
              className="ml-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-4 pt-4 pb-4 space-y-3">
          <a
            href="#"
            className="block text-gray-700 hover:text-gray-900 font-medium px-3 py-2 rounded-md hover:bg-gray-50"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-gray-700 hover:text-gray-900 font-medium px-3 py-2 rounded-md hover:bg-gray-50"
          >
            Blog
          </a>
          <a
            href="#"
            className="block text-gray-700 hover:text-gray-900 font-medium px-3 py-2 rounded-md hover:bg-gray-50"
          >
            About
          </a>
          <a
            href="#"
            className="block text-gray-700 hover:text-gray-900 font-medium px-3 py-2 rounded-md hover:bg-gray-50"
          >
            Contact
          </a>
          <a
            href="#"
            className="block text-center text-white bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded-lg transition"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
