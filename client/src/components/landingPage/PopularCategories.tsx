// Popular Categories Component with hover effects
const PopularCategories = () => {
  const categories = [
    { name: "Technology", count: 42, color: "bg-blue-100 hover:bg-blue-200" },
    {
      name: "Programming",
      count: 38,
      color: "bg-green-100 hover:bg-green-200",
    },
    { name: "Design", count: 25, color: "bg-purple-100 hover:bg-purple-200" },
    { name: "Tutorial", count: 31, color: "bg-yellow-100 hover:bg-yellow-200" },
    { name: "News", count: 28, color: "bg-red-100 hover:bg-red-200" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`${category.color} rounded-lg p-4 cursor-pointer transition-all duration-300 transform hover:scale-105`}
            >
              <div className="text-lg font-semibold mb-2">{category.name}</div>
              <div className="text-gray-600">{category.count} posts</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PopularCategories;
