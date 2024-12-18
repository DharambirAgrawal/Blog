// Trending Topics Carousel
"use client";
import { useState } from "react";
import { Eye, TrendingUp } from "lucide-react";

const TrendingTopics = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const topics = [
    {
      title: "The Future of AI in Web Development",
      views: "2.5k",
      category: "Technology",
    },
    {
      title: "Master React Hooks in 10 Minutes",
      views: "1.8k",
      category: "Programming",
    },
    {
      title: "UX Design Principles for Developers",
      views: "3.2k",
      category: "Design",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <TrendingUp className="w-6 h-6 text-red-500 mr-3" />
          <h2 className="text-3xl font-bold">Trending Topics</h2>
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {topics.map((topic, index) => (
              <div key={index} className="min-w-full p-4">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-sm text-blue-600 mb-2">
                    {topic.category}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{topic.title}</h3>
                  <div className="flex items-center text-gray-600">
                    <Eye className="w-4 h-4 mr-2" />
                    {topic.views} views
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {topics.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default TrendingTopics;
