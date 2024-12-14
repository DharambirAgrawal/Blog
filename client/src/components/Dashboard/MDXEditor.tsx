import { compileMDX } from 'next-mdx-remote/rsc'
import Image, { ImageProps } from 'next/image'
import CopyCode from '../ui/CopyCode';
import Link from 'next/link';
import rehypePrettyCode from "rehype-pretty-code";

  const components = {
    h1: (props: any) => {
      console.log(props);
      return (
        <h1 {...props} className="">
          {props.children}
        </h1>
      );
    },
    strong: (props: any) => {
      return (
        <strong {...props} className="" id={props.children}>
          {props.children}
        </strong>
      );
    },
    a: (props: any) => (
      <Link href={props.href} title={props.title} className="">
        {props.children}
      </Link>
    ),
    img: (props: any) => {
    //   return <Image alt={props.alt} src={props.src} width={100} height={100} />;
    return  <Image
    sizes="100vw"
    style={{ width: '100%', height: 'auto' }}
    {...(props as ImageProps)}
  />
    },
    figure: (props: any) => {
      return (
        <div className=" w-60">
          <code {...props} className=" ">
            {props.children}
          </code>
        </div>
      );
    },
    script: (props: any) => {
      return <></>;
    },
    Code: CopyCode,
  };
  const rehypePrettyCodePlugin: any = rehypePrettyCode;
export async function TextEditor(props) {
    const { content, frontmatter } = await compileMDX<{ title: string }>({
        source: props.source,
        options: { parseFrontmatter: true, 
            mdxOptions: {
                rehypePlugins: [[rehypePrettyCodePlugin]],
              },
        },
        components:components
      })
  return (
    <div>
        {content}
    </div>                                                                                                                                                                                                                             
  )
}









import { TextEditor } from "@/components/Dashboard/TextEditor"

export default function Home() {
  return (
    <TextEditor
      // h1 now renders with `large-text` className
      source={
    `
    # Hello World
    **This8** is from Server Components!
    `}
    />
  )
}