"use client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useActionState } from "react";
import { loginUser } from "../actions";

const initialState = {
  type: "",
  content: "",
};
const LoginPage = () => {
  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form action={formAction}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full mt-2 px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-2 px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          >
            {isPending ? <>logging...</> : <>Login</>}
          </button>
        </form>
        <div className="flex items-center mb-4 justify-center m-2">
          <label className="ml-2 text-sm text-gray-700">
            I agree to the{" "}
            <Link href="#" className="text-blue-600 hover:underline">
              Terms and Conditions
            </Link>
          </label>
        </div>
        {state?.content &&
          (state?.type === "error" ? (
            <div className="mb-4 text-red-500 text-sm text-center">
              <p>{state.content}</p>
            </div>
          ) : (
            <div className="mb-4 text-green-500 text-sm text-center">
              <p>{state.content}</p>
            </div>
          ))}
        {/* dont have an account asking */}
        {/* <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Sign up
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
