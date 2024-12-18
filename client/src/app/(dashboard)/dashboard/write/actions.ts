"use server";

import { revalidatePath } from "next/cache"; // For revalidating the page or component

let mdxText = ""; // Simulating server-side state

export async function updateMdxText(newState: string) {
  mdxText = newState;
  // Revalidate the page to trigger a fresh fetch of the updated data
  revalidatePath("/dashboard/write"); // This will refresh the current page
}

export async function getMdxText() {
  return mdxText; // Return the current state
}
