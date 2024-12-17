import { CompileMDX } from "@/components/CompileMDX";
import { template2 } from "@/lib/templates";
export default function Home() {
  return (
    <>
      <CompileMDX source={template2} />
    </>
  );
}