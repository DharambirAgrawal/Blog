import { compileMDX } from 'next-mdx-remote/rsc'

export async function TextEditor(props) {
    const { content, frontmatter } = await compileMDX<{ title: string }>({
        source: props.source      
    })
    return (
        <div>
            {content}
        </div>
    )
}