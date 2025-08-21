"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch(
        "https://shopease-3it8.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong!");
        return;
      }

      toast.success("Account created successfully!");

      // Redirect to login page
      window.location.href = "/auth/login";
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex flex-wrap flex-1 py-20">
        {/* Left side - Illustration */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-red-50 opacity-80 rounded-2xl"></div>
          <Image
            src="/Images/cart.png"
            alt="Shopping Signup Illustration"
            width={600}
            height={600}
            className="drop-shadow-lg rounded-2xl relative z-10"
          />
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md rounded-2xl shadow-2xl p-8 bg-white">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Create Your Account
              </h2>
              <p className="text-gray-500 mt-1">
                Join{" "}
                <span className="text-red-500 font-semibold">ShopEasy</span>{" "}
                today
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-400 bg-gray-50"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-400 bg-gray-50"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-400 bg-gray-50"
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
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-400 bg-gray-50"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-medium bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all"
              >
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Already have an account?
                <Link
                  href="/auth/login"
                  className="text-red-500 hover:underline font-medium"
                >
                  Log in
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
