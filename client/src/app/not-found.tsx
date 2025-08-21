"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MdErrorOutline } from "react-icons/md";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white mt-24">
      {/* Navbar at top */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-6 pl-6">
        <nav className="text-sm text-gray-600">
          <Link href="/" className="hover:underline text-blue-600 transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-500">404 Error</span>
        </nav>
      </div>

      {/* Main Content - flex-grow to push footer to bottom */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-500 mb-6"
        >
          <MdErrorOutline className="w-16 h-16 sm:w-28 sm:h-28" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-3"
        >
          404 - Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-sm max-w-md mb-8"
        >
          Sorry, we couldn’t find the page you were looking for.
        </motion.p>

        {/* Back Button */}
        <Link href="/" className="pb-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md"
          >
            Go to Homepage
          </motion.button>
        </Link>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
