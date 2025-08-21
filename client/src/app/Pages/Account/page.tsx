"use client";

import React, { useState, useEffect } from "react";
import { FaHome, FaUser, FaBoxOpen, FaHeart } from "react-icons/fa";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
}



export default function AccountPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [user, setUser] = useState<User | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData((prev) => ({
        ...prev,
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        email: parsed.email || "",
        address: parsed.address || "",
      }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    // Optional: Reset to original user data
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);

        // Clear password fields
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        toast.error(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update failed:", error);
     
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-6 py-4 border-b border-gray-200 gap-2 bg-white shadow-sm">
        <div className="flex items-center text-sm text-gray-600">
          <FaHome className="mr-2" />
          <Link href="/" className="hover:text-red-500 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">My Account</span>
        </div>

        <div className="text-sm">
          <span className="text-black">Welcome! </span>
          <span className="text-red-500">
            {user?.firstName || "User"}
          </span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full md:w-64 p-4 md:p-6 bg-white shadow-md"
        >
          <div className="mb-8">
            <h3 className="text-base font-semibold text-black mb-4">
              Manage My Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-2 p-2 rounded hover:bg-red-50 transition-colors text-sm font-medium text-gray-700 hover:text-red-500"
                >
                  <FaUser className="text-red-500" /> My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/Pages/Orders"
                  className="flex items-center gap-2 p-2 rounded hover:bg-red-50 transition-colors text-sm font-medium text-gray-700 hover:text-red-500"
                >
                  <FaBoxOpen className="text-red-500" /> My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/Pages/Wishlist"
                  className="flex items-center gap-2 p-2 rounded hover:bg-red-50 transition-colors text-sm font-medium text-gray-700 hover:text-red-500"
                >
                  <FaHeart className="text-red-500" /> My Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-4 sm:p-6"
        >
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-red-500 mb-8">
              Edit Your Profile
            </h2>

            <div className="space-y-6">
              {/* Name Inputs */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm hover:shadow-md transition-shadow"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm hover:shadow-md transition-shadow"
                  />
                </div>
              </div>

              {/* Email & Address */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm hover:shadow-md transition-shadow"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm hover:shadow-md transition-shadow"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-black mb-4">
                  Password Changes
                </h3>
                <div className="flex flex-col gap-4">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border rounded text-sm text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm hover:shadow-md transition-shadow"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border rounded text-sm text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm hover:shadow-md transition-shadow"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-100 border rounded text-sm text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm hover:shadow-md transition-shadow"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 text-sm text-black hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-8 py-3 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors shadow hover:shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
