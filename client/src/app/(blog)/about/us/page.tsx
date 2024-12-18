import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};
const UsPage = () => {
  return (
    <div className="max-w-4xl mx-auto sm:p-6 space-y-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mt-8">
        About cursolog
      </h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            What is cursolog?
          </h2>
          <p className="text-gray-600 mt-2">
            We create simplified and interactive learning experiences. Learning
            web development should be easy to understand and available for
            everyone, everywhere! Cursolog is a platform for web developers,
            covering all aspects of web development:
          </p>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-lg font-medium text-gray-700 cursor-pointer hover:text-blue-600 hover:underline">
                HTML Tutorial
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg font-medium text-gray-700 cursor-pointer hover:text-blue-600 hover:underline">
                Python Tutorial
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg font-medium text-gray-700 cursor-pointer hover:text-blue-600 hover:underline">
                And Much More
              </span>
            </li>
          </ul>
        </div>

        <p className="text-gray-600">
          Cursolog was created in 2024, and derives its name from the
          something...
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Key Features</h2>

        <div className="space-y-6">
          {[
            {
              title: "Easy Learning",
              description: `Cursolog provides simplified and easy-to-understand learning resources, making web development 
              accessible to learners of all levels. Our tutorials and guides are crafted to demystify complex concepts.`,
            },
            {
              title: "Try it Yourself",
              description: `Practice is key to mastering web development. With our "Try it Yourself" feature, you can experiment 
              with code directly on the platform. Apply what you've learned in a hands-on environment.`,
            },
            {
              title: "Cursolog is Free",
              description: `We believe in providing quality education for free. Cursolog offers a wealth of tutorials, guides, 
              and resources without any cost. Learn and grow your skills without breaking the bank.`,
            },
            {
              title: "ChatGPT",
              description: `Interact with ChatGPT, a powerful language model, to get instant assistance and answers to your queries 
              related to web development. Enhance your learning experience with ChatGPT's knowledge and insights.`,
            },
            {
              title: "You Can Help",
              description: `Contribute to the learning community by sharing your knowledge. Cursolog encourages users to contribute 
              articles, tutorials, and insights. Your expertise can help others on their learning journey.`,
            },
          ].map((feature, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-medium text-blue-600 hover:underline cursor-pointer">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsPage;
