"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  //checking if token is present
  if (!token) {
    return redirect("/auth/login");
  }
  //deleting token
  cookieStore.delete("token");
  const res = await fetch(`${process.env.MAIN_URL}/api/auth/logout`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  return redirect("/auth/login");
}
