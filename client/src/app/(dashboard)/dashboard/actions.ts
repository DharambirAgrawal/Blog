"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  //checking if token is present
  if (!token) {
    return redirect("/auth/login");
  }
  //deleting token
  cookieStore.delete("token");
  await fetch(`${process.env.MAIN_URL}/api/auth/logout`, {
    headers: {
      Cookie: `token=${token.value}`,
    },
  });
  return redirect("/auth/login");
}

export const getUserData = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return redirect("/auth/login");
  }
  const res = await fetch(`${process.env.MAIN_URL}/api/auth/verify`, {
    headers: {
      Cookie: `token=${token.value}`,
    },
  });
  if (!res.ok) {
    cookieStore.delete("token");
    return redirect("/auth/login");
  }
  const data = await res.json();
  console.log(data);
  return data;
});
