"use client";

import React from "react";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#1C1C1E] text-[#FFFFFF] py-12 px-4 border-t border-[#E5E5E5]/20 shadow-footer"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Title/Tagline */}
          <p className="text-[#FFFFFF]/80 mb-6 text-[14px]">
            Style, comfort, and deals—all in one place
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6 text-[#4A90E2] mb-6">
            <Link
              href="https://www.linkedin.com/in/ajay-kumar036/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="h-8 w-8 hover:text-[#3E92CC] transition-colors duration-300" />
            </Link>
            <Link
              href="https://github.com/Ajay-Kumar-9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-8 w-8 hover:text-[#3E92CC] transition-colors duration-300" />
            </Link>
            <Link
              href="https://ajay-kumar-eight.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe className="h-8 w-8 hover:text-[#3E92CC] transition-colors duration-300" />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-[#FFFFFF]/70 text-sm">
            <p>&copy; 2025 Ajay Kumar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
