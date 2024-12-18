import { compileMDX } from "next-mdx-remote/rsc";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";
interface PropsType {
  source: string;
}

const components = {
  h1: (props: any) => (
    <h1 {...props} className="text-3xl font-bold my-4 text-center">
      {props.children}
    </h1>
  ),
  strong: (props: any) => (
    <strong
      {...props}
      className="font-semibold text-accent"
      id={props.children}
    >
      {props.children}
    </strong>
  ),
  a: (props: any) => (
    <Link
      href={props.href}
      title={props.title}
      className="text-blue-500 hover:underline"
    >
      {props.children}
    </Link>
  ),
  img: (props: any) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
      className="rounded-lg shadow-lg my-4"
    />
  ),
  figure: (props: any) => (
    <figure className="w-full flex justify-center my-4">
      <code
        {...props}
        className="bg-gray-100 text-sm p-4 rounded-md shadow-md overflow-auto"
      >
        {props.children}
      </code>
    </figure>
  ),
  script: () => null,
};

const rehypePrettyCodePlugin: any = rehypePrettyCode;

export async function CompileMDX(props: PropsType) {
  const { content } = await compileMDX<{ title: string }>({
    source: props.source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCodePlugin]],
      },
    },
    components,
  });

  return <> {content}</>;
}

// Tailwind CSS classes applied:
// - `prose`: Makes the typography look elegant.
// - `prose-lg`: Adjusts the font size for larger screens.
// - `prose-code`: Specific styling for inline and block code.
// - `prose-blockquote`: Customizes blockquote appearance.
// - `flex`, `items-center`: Centers content.
// - `max-w-4xl`: Restricts maximum width to make the blog visually appealing.
// - `rounded-md`, `shadow-md`: Enhances elements like code blocks and images.
{
  /* <div className="flex flex-col items-center px-4 md:px-10 w-full">
<article className="prose prose-lg prose-headings:font-bold prose-code:bg-gray-100 prose-code:rounded-md prose-code:p-2 prose-code:text-sm prose-blockquote:bg-gray-50 prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:italic prose-blockquote:px-4 w-full max-w-4xl">
  {content}
</article>
</div> */
}
