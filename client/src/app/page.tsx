import { TextEditor } from "@/components/Dashboard/TextEditor"
import {RichTextEditor} from "@/components/Dashboard/test"
export default function Home() {
  return (
    <>
    <TextEditor
      // h1 now renders with `large-text` className
      source={
        `
        # Hello World
        **This8** is from Server Components!
        `}
        />
    <RichTextEditor />
        </>
  )
}