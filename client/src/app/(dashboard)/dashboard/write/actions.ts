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

export async function submitBlogPost(prevState: any, formData: FormData) {
  // Submit the data to the server

  // console.log(Object.fromEntries(formData));
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(";;;;;;;;;;;;");
  return {
    type: "success",
    content: "Blog post submitted successfully",
  };
}

export const handlePublish = async (formData: FormData) => {
  // console.log(e);
  console.log("................");
  console.log(Object.fromEntries(formData));
  revalidatePath("/dashboard/write");
};
