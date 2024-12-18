import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};
const UsPage = () => {
  return (
    <div className=" space-y-4">
      <h1 className="h2-semibold mb-6 pt-5">About cursolog</h1>
      <div className=" space-y-4">
        <span className="h4-bold">What is cursolog?</span>
        <p>
          We create simplified and interactive learning experiences. Learning
          web development should be easy to understand and available for
          everyone, everywhere! W3Schools is a school for web developers,
          covering all the aspects of web development:
        </p>
        <div className="w-full flex flex-col">
          <span className="underline w-full border-b-2 border-b-black py-2">
            HTML Tutorial
          </span>
          <span className="underline w-full border-b-2 border-b-black py-2">
            Python Tutorial
          </span>
          <span className="underline w-full border-b-2 border-b-black py-2">
            And Much more
          </span>
        </div>
        <p>
          cursolog was created in 2024, and derives its name from the
          something....
        </p>
      </div>

      <div className=" space-y-4">
        <span className="h3-bold">Key Features</span>
        <br />
        <div className="flex flex-col space-y-4">
          <div>
            <span className="text-blue-600 hover:underline cursor-pointer h5-bold">
              Easy Learning
            </span>
            <p className="text-gray-600">
              cursolog provides simplified and easy-to-understand learning
              resources, making web development accessible to learners of all
              levels. Our tutorials and guides are crafted to demystify complex
              concepts.
            </p>
          </div>
        </div>

        <div>
          <span className="text-blue-600 hover:underline cursor-pointer h5-bold">
            Try it Yourself
          </span>
          <p className="text-gray-600">
            Practice is key to mastering web development. With our &quot;Try it
            Yourself&quot; feature, you can experiment with code directly on the
            platform. Apply what you&apos;ve learned in a hands-on environment.
          </p>
        </div>

        <div>
          <span className="text-blue-600 hover:underline cursor-pointer h5-bold">
            cursolog is Free
          </span>
          <p className="text-gray-600">
            We believe in providing quality education for free. cursolog offers
            a wealth of tutorials, guides, and resources without any cost. Learn
            and grow your skills without breaking the bank.
          </p>
        </div>

        <div>
          <span className="text-blue-600 hover:underline cursor-pointer h5-bold">
            ChatGPT
          </span>
          <p className="text-gray-600">
            Interact with ChatGPT, a powerful language model, to get instant
            assistance and answers to your queries related to web development.
            Enhance your learning experience with ChatGPT&apos;s knowledge and
            insights.
          </p>
        </div>

        <div>
          <span className="text-blue-600 hover:underline cursor-pointer h5-bold">
            You Can Help
          </span>
          <p className="text-gray-600">
            Contribute to the learning community by sharing your knowledge.
            cursolog encourages users to contribute articles, tutorials, and
            insights. Your expertise can help others on their learning journey.
          </p>
        </div>
      </div>

      <div className="h-40" />
    </div>
  );
};

export default UsPage;
