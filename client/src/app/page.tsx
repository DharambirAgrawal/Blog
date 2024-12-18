import Image from "next/image";
import Navigation from "@/components/main/Navigation";
import { PostCard, EnhancedPostCard } from "@/components/landingPage/PostCard";
import Subscribe from "@/components/main/Subscribe";
import PopularCategories from "@/components/landingPage/PopularCategories";
import ReadingProgress from "@/components/main/ReadingProgress";
import TrendingTopics from "@/components/landingPage/TrendingTopics";
import AuthorSpotlight from "@/components/landingPage/AuthorSpotlight";
import Footer from "@/components/main/Footer";

// Main Landing Page Component
const BlogLandingPage = () => {
  const featuredPosts = [
    {
      title: "Getting Started with Next.js",
      description:
        "Learn how to build modern web applications with Next.js and React",
      imageUrl: "/api/placeholder/400/300",
    },
    {
      title: "Mastering Tailwind CSS",
      description:
        "Deep dive into utility-first CSS framework and best practices",
      imageUrl: "/api/placeholder/400/300",
    },
    {
      title: "Web Performance Optimization",
      description: "Essential techniques to improve your website's performance",
      imageUrl: "/api/placeholder/400/300",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to BlogIO
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Discover insightful articles about web development, programming,
                and technology.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Reading
              </button>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Featured Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <PostCard key={index} {...post} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96">
                <Image
                  src="/api/placeholder/600/600"
                  alt="About BlogIO"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">About BlogIO</h2>
                <p className="text-gray-600 text-lg mb-6">
                  We're passionate about sharing knowledge and helping
                  developers grow. Our blog features in-depth tutorials, best
                  practices, and industry insights to help you stay ahead in the
                  ever-evolving world of web development.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Learn More About Us
                </button>
              </div>
            </div>
          </div>
        </section>
        <PopularCategories />
        <ReadingProgress />
        <TrendingTopics />

        <EnhancedPostCard />
        <AuthorSpotlight />
        <Subscribe />

        {/* Social Media Links */}
        <Footer />
      </div>
    </>
  );
};

export default BlogLandingPage;
