import React, { useState } from "react";
import Link from "next/link";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("jwt", token);
        console.log("Successfully signed in");
        setMessage("Successfully signed in! Redirecting to home page...");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error: any) {
      console.log(
        "Error while signing in:",
        error.response ? error.response.data : error.message
      );
      setMessage("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Login
        </h2>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full text-black px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600 flex flex-col gap-2">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
