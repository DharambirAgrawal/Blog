"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const getAllImages = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  //checking if token is present
  if (!token) {
    return redirect("/auth/login");
  }
  const res = await fetch(`${process.env.MAIN_URL}/api/post/images/get`, {
    method: "GET",
    headers: {
      Cookie: `token=${token.value}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export const handleUploadImage = async (formData: FormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  //checking if token is present
  if (!token) {
    return redirect("/auth/login");
  }
  try {
    const response = await fetch(
      `${process.env.MAIN_URL}/api/post/upload/image`,
      {
        method: "POST",
        body: formData,
        headers: {
          Cookie: `token=${token.value}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("Upload successful", result);
    } else {
      console.error("Upload failed", response.statusText);
    }
  } catch (error) {
    console.log("Error during upload", error);
  }
  revalidatePath("/dashboard/media", "layout");
  return {
    success: true,
  };
};
