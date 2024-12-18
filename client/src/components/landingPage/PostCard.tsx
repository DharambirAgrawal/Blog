// Featured Post Card Component
"use client";
import Image from "next/image";
import { useState } from "react";
import { Calendar, Clock, ThumbsUp, Share2, Bookmark } from "lucide-react";

const PostCard = ({ title, description, imageUrl }) => (
  <article className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-48">
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL="/api/placeholder/400/300"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
        Read More →
      </a>
    </div>
  </article>
);

const EnhancedPostCard = () => {
  const posts = [
    {
      title: "Understanding React Hooks",
      imageUrl: "/images/posts/react-hooks.jpg", // Example image URL
      date: "December 18, 2024",
      readTime: 7,
      excerpt:
        "An introduction to React hooks and how they can simplify state management in functional components.",
      likes: 150,
      tags: ["React", "JavaScript", "Frontend", "Web Development"],
    },
    {
      title: "CSS Grid vs Flexbox: Which One to Use?",
      imageUrl: "/images/posts/css-grid-vs-flexbox.jpg", // Example image URL
      date: "December 12, 2024",
      readTime: 5,
      excerpt:
        "A comprehensive comparison between CSS Grid and Flexbox to help you decide which one to use for your next layout.",
      likes: 215,
      tags: ["CSS", "Web Design", "Frontend", "UX"],
    },
    {
      title: "A Guide to Next.js Performance Optimization",
      imageUrl: "/images/posts/nextjs-optimization.jpg", // Example image URL
      date: "December 8, 2024",
      readTime: 9,
      excerpt:
        "Learn various techniques to optimize the performance of your Next.js applications.",
      likes: 320,
      tags: ["Next.js", "React", "Performance", "Web Development"],
    },
    {
      title: "Mastering JavaScript Asynchronous Programming",
      imageUrl: "/images/posts/js-async.jpg", // Example image URL
      date: "December 5, 2024",
      readTime: 8,
      excerpt:
        "An in-depth guide on asynchronous programming in JavaScript, including promises, async/await, and more.",
      likes: 178,
      tags: ["JavaScript", "Async", "Programming", "Backend"],
    },
    {
      title: "The Future of AI in Web Development",
      imageUrl: "/images/posts/ai-web-dev.jpg", // Example image URL
      date: "December 1, 2024",
      readTime: 6,
      excerpt:
        "Exploring the impact of artificial intelligence on the future of web development and its applications.",
      likes: 98,
      tags: ["AI", "Web Development", "Future Tech", "Machine Learning"],
    },
  ];

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(posts[0].likes);

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
      <div className="relative">
        <Image
          src={posts[0].imageUrl}
          alt={posts[0].title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <Bookmark
              className={`w-5 h-5 ${
                isBookmarked ? "text-blue-600 fill-current" : "text-gray-600"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-4 text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{posts[0].date}</span>
          <Clock className="w-4 h-4 ml-4 mr-2" />
          <span>{posts[0].readTime} min read</span>
        </div>

        <h3 className="text-xl font-semibold mb-3">{posts[0].title}</h3>
        <p className="text-gray-600 mb-4">{posts[0].excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLikes(likes + 1)}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ThumbsUp className="w-5 h-5 mr-1" />
              <span>{likes}</span>
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <Share2 className="w-5 h-5 mr-1" />
              <span>Share</span>
            </button>
          </div>

          <div className="flex items-center">
            {posts[0].tags.map((tag, index) => (
              <span
                key={index}
                className="ml-2 px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export { PostCard, EnhancedPostCard };
