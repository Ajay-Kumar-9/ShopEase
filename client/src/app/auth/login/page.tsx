"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

import Image from "next/image";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong!");
        return;
      }
      

       localStorage.setItem("user", JSON.stringify(data.user));

       console.log('checking data user' , data.user);

      toast.success(data.message || "Login successful!");


      setTimeout(() => {
        Router.push("/");
      }, 1000);
    } catch (error) {
      const e = error as Error;
      toast.error(e.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex flex-1 flex-wrap py-30">
        {/* Left side - Illustration */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-b from-pink-50 to-red-50 p-8">
          <Image
            src="/Images/cart.png"
            alt="Shopping Cart"
            width={600}
            height={600}
            className="drop-shadow-lg rounded-2xl"
          />
        </div>

        {/* Right side - Modern Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md rounded-2xl shadow-2xl p-8 bg-white">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 mt-1">
                Log in to{" "}
                <span className="text-red-500 font-semibold">ShopEasy</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-400 focus:outline-none bg-gray-50"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-400 focus:outline-none bg-gray-50"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-medium bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all"
              >
                Sign In
              </button>
            </form>

            {/* Sign Up */}
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Don&apos;t have an account?
                <Link
                  href="/auth/signup"
                  className="text-red-500 hover:underline font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
