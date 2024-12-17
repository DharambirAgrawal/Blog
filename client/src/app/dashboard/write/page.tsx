import { CompileMDX } from "@/components/CompileMDX";
import MDXEditor from "@/app/dashboard/write/MDXEditor";
import { getServerState } from "@/app/dashboard/write/actions";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import MDXError from "./MDXError";

export default async function Write() {
  const state = await getServerState(); // Fetch the current state
  return (
    <>
      <ErrorBoundary errorComponent={MDXError}>
        <CompileMDX source={state} />
      </ErrorBoundary>
      <MDXEditor />
    </>
  );
}
