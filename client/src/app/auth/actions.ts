"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function loginUser(prevState: any, formData: FormData) {
  const { email, password } = Object.fromEntries(formData);
  const res = await fetch(`${process.env.MAIN_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    return {
      type: "error",
      content: "Error logging in",
    };
  }
  //Setting cookie
  const cookieStore = await cookies();
  const cookie_string = res.headers.get("set-cookie") + "";
  const token = cookie_string.split("token=")[1].split(";")[0];
  cookieStore.set({
    name: "token",
    value: token + "",
    httpOnly: true,
    path: "/",
    secure: true,
    domain: process.env.MAIN_URL,
    sameSite: "strict",
  });
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  redirect("/dashboard");
  return {
    type: "success",
    content: "Login successful",
  };
}
