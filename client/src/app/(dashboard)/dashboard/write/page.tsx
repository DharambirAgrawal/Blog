import { CompileMDX } from "@/components/CompileMDX";
import MDXEditor from "./MDXEditor";
import { getMdxText } from "./actions";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Link from "next/link";
import MDXError from "./MDXError";

export default async function Write() {
  const text = await getMdxText(); // Fetch the current mdxText
  return (
    <>
      <MDXEditor />
      <ErrorBoundary errorComponent={MDXError}>
        <div className="flex flex-col items-center px-4 md:px-10 w-full bg-white my-10">
          <Link href="/dashboard/write/preview" target="_blank">
            {/* <Link href="/dashboard/write/preview"> */}
            Open in New Tab
          </Link>
          <button className="bg-gray-200 rounded px-4 py-1 m-1">Preview</button>
          <article className="prose prose-lg prose-headings:font-bold prose-code:bg-gray-100 prose-code:rounded-md prose-code:p-2 prose-code:text-sm prose-blockquote:bg-gray-50 prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:italic prose-blockquote:px-4 w-full max-w-4xl h-[calc(100vh-100px)] overflow-y-auto">
            <CompileMDX source={text} />
          </article>
        </div>
      </ErrorBoundary>
    </>
  );
}
