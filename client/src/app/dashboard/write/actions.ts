"use server";

import { revalidatePath } from "next/cache"; // For revalidating the page or component

let serverState = ""; // Simulating server-side state

export async function updateStateOnServer(newState: string) {
  serverState = newState;
  // Revalidate the page to trigger a fresh fetch of the updated data
  revalidatePath("/dashboard/write"); // This will refresh the current page
}

export async function getServerState() {
  return serverState; // Return the current state
}
