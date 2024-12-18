import { CompileMDX } from "@/components/CompileMDX";
import { getMdxText } from "@/app/(dashboard)/dashboard/write/actions";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import MDXError from "@/app/(dashboard)/dashboard/write/MDXError";
const Preview = async () => {
  const text = await getMdxText(); // Fetch the current mdxText
  // console.log(text);
  // console.log("........................");

  return (
    <div className="flex flex-col items-center px-4 md:px-10 w-full">
      <ErrorBoundary errorComponent={MDXError}>
        <article className="prose prose-lg prose-headings:font-bold prose-code:bg-gray-100 prose-code:rounded-md prose-code:p-2 prose-code:text-sm prose-blockquote:bg-gray-50 prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:italic prose-blockquote:px-4 w-full max-w-4xl">
          hello
          <CompileMDX source={text} />
        </article>
      </ErrorBoundary>
    </div>
  );
};

export default Preview;
