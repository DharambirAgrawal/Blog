import React from "react";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content Column */}
        <div className="lg:col-span-2">
          {/* Featured Image */}
          <div className="rounded-lg overflow-hidden mb-8 aspect-[16/9] relative">
            <img
              src="/api/placeholder/1200/675"
              alt="Featured"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Traveller Visiting Ice Cave With Amazing eye catching view with
              nature
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <img
                  src="/api/placeholder/40/40"
                  alt="Author"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <span className="text-gray-700 font-medium">Adrio Devid</span>
                </div>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">Aug 24 2023</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">12 min read</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold mb-4">
              Introduction: Finding Bliss in Simplicity
            </h2>
            <p className="text-gray-700 mb-6">
              In a world filled with constant noise and distractions, the allure
              of a simpler lifestyle beckons like a soothing whisper. As we
              navigate the complexities of modern living, there's an increasing
              desire to strip away the unnecessary and embrace a life of
              authenticity, intention, and balance.
            </p>
            {/* Rest of the content would go here */}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Recent Posts */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">Recent Posts</h2>
            <div className="space-y-6">
              {[
                {
                  title: "Wellness Unveiled: Empowering Your ...",
                  author: "Adrio Devid",
                  date: "Aug 24 2023",
                  image: "/api/placeholder/80/80",
                },
                {
                  title: "Culinary Expeditions: Tasting the ...",
                  author: "Adrio Devid",
                  date: "Aug 24 2023",
                  image: "/api/placeholder/80/80",
                },
                {
                  title: "Begin here to obtain a brief summa ...",
                  author: "Adrio Devid",
                  date: "Aug 24 2023",
                  image: "/api/placeholder/80/80",
                },
              ].map((post, index) => (
                <div key={index} className="flex gap-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explore Topics */}
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">Explore Topics</h2>
            <div className="space-y-3">
              {[
                { name: "health", count: "03" },
                { name: "lifestyle", count: "01" },
                { name: "travel", count: "03" },
                { name: "technology", count: "02" },
                { name: "culture", count: "01" },
              ].map((topic, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-gray-700 capitalize">{topic.name}</span>
                  <span className="text-gray-500">{topic.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <p className="text-gray-600 mb-4">Join 70,000 subscribers!</p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Subscribe Now
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              By signing up, you agree to our Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
