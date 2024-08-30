import { axiosInstance } from "@/utils/axiosInstance";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axiosInstance.post("/signup", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        console.log("Successfully signed up");
        setMessage("Successfully signed up! Redirecting to login...");
        setTimeout(() => {
          router.push("/signin");
        }, 1500);
      }
    } catch (error: any) {
      console.log(
        "Error while signing up:",
        error.response ? error.response.data : error.message
      );
      setMessage("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Sign Up
        </h2>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
