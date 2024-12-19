"use server";

export async function loginUser(prevState: any, formData: FormData) {
  console.log(Object.fromEntries(formData));
  // console.log(Object.fromEntries(formData));
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return {
    type: "error",
    content: "Login successful",
  };
  // redirect('/dashboard')
}
