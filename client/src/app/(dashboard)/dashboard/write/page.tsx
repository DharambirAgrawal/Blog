import { CompileMDX } from "@/components/CompileMDX";
import { getMdxText } from "./actions";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Link from "next/link";
import MDXError from "./MDXError";
import BlogPostForm from "./BlogPostForm";

const categories = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Travel" },
  // ...
];

const tags = [
  { id: "1", name: "JavaScript" },
  { id: "2", name: "React" },
  // ...
];
// const initialData = {
//   title: "hey bro",
//   description: "okay",
//   category: "no",
//   tags: [],
//   coverImage: "",
//   mdxText: "",
// };
export default async function Write() {
  const text = await getMdxText(); // Fetch the current mdxText
  return (
    <>
      <div className="container mx-auto py-8">
        <BlogPostForm
          // initialData={initialData}
          categories={categories}
          tags={tags}
          // onSubmit={handleSubmit}
        />
      </div>
      {/* preview here */}
      <ErrorBoundary errorComponent={MDXError}>
        <div className="flex flex-col items-center px-4 md:px-10 w-full bg-white my-10">
          <Link
            href="/dashboard/write/preview"
            target="_blank"
            className="bg-gray-200 rounded px-4 py-1 m-1"
          >
            {/* <Link href="/dashboard/write/preview"> */}
            Preview
          </Link>
          <article className="prose prose-lg prose-headings:font-bold prose-code:bg-gray-100 prose-code:rounded-md prose-code:p-2 prose-code:text-sm prose-blockquote:bg-gray-50 prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:italic prose-blockquote:px-4 w-full max-w-4xl h-[calc(100vh-100px)] overflow-y-auto">
            <CompileMDX source={text} />
          </article>
        </div>
      </ErrorBoundary>
    </>
  );
}
