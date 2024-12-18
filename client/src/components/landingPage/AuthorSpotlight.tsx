// Author Spotlight Component
import Image from "next/image";
const AuthorSpotlight = () => {
  const authors = [
    {
      name: "John Doe",
      avatar: "/images/authors/john-doe.jpg", // Example image URL
      role: "Senior Writer",
      postCount: 42,
      followers: 5234,
    },
    {
      name: "Jane Smith",
      avatar: "/images/authors/jane-smith.jpg", // Example image URL
      role: "Editor-in-Chief",
      postCount: 150,
      followers: 12456,
    },
    {
      name: "Emily Brown",
      avatar: "/images/authors/emily-brown.jpg", // Example image URL
      role: "Contributing Writer",
      postCount: 28,
      followers: 2890,
    },
    {
      name: "Michael Johnson",
      avatar: "/images/authors/michael-johnson.jpg", // Example image URL
      role: "Freelancer",
      postCount: 12,
      followers: 1543,
    },
    {
      name: "Sarah Williams",
      avatar: "/images/authors/sarah-williams.jpg", // Example image URL
      role: "Guest Blogger",
      postCount: 8,
      followers: 1120,
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Meet Our Authors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <div
              key={author.name}
              className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg"
            >
              <Image
                src={author.avatar}
                alt={author.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">{author.name}</h3>
                <p className="text-gray-600">{author.role}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500">
                    {author.postCount} posts
                  </span>
                  <span className="mx-2">·</span>
                  <span className="text-sm text-gray-500">
                    {author.followers} followers
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorSpotlight;
