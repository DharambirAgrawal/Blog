import React from "react";
import Link from "next/link";

export default function CategoryPage() {
  const posts = [
    {
      id: 1,
      title:
        "Traveller Visiting Ice Cave With Amazing eye catching view with nature",
      excerpt:
        "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper",
      author: {
        name: "Adrio Devid",
        avatar: "/api/placeholder/40/40",
      },
      date: "Aug 24 2023",
      image: "/api/placeholder/600/400",
      category: "Travel",
    },
    {
      id: 2,
      title:
        "Hidden Gems Unveiled: Off-the-Beaten-Path Adventures Around the Globe",
      excerpt:
        "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.",
      author: {
        name: "Ryna Kenter",
        avatar: "/api/placeholder/40/40",
      },
      date: "Aug 24 2023",
      image: "/api/placeholder/600/400",
      category: "Travel",
    },
    {
      id: 3,
      title:
        "Wanderlust Chronicles: Tales of Exploration and Discovery from Faraway Lands",
      excerpt:
        "In a world filled with constant noise and distractions, the allure of a simpler lifestyle beckons like a soothing whisper.",
      author: {
        name: "Ryna Kenter",
        avatar: "/api/placeholder/40/40",
      },
      date: "Aug 24 2023",
      image: "/api/placeholder/600/400",
      category: "Travel",
      memberOnly: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Travel</h1>
        <p className="text-gray-600">{posts.length} Posts</p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link
            href={`/post/${post.id}`}
            key={post.id}
            className="group relative flex flex-col rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              {post.memberOnly && (
                <div className="absolute top-4 left-4">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    Member Only
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-200">
                <span className="bg-left-bottom bg-gradient-to-r from-blue-600 to-blue-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500">
                  {post.title}
                </span>
              </h2>

              <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>

              {/* Author Info */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {post.author.name}
                    </p>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                </div>

                {/* Category Tag */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors duration-200">
                  {post.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
