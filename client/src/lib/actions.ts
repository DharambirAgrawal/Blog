"use server";

export async function subscribeEmail(prevState: any, formData: FormData) {
  console.log(Object.fromEntries(formData));
  await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    return {
      type: "success",
      content: "Subscription successful",
    };
  } catch {
    return {
      type: "error",
      content: "Subscription failed",
    };
  }

  // redirect('/dashboard')
}
