"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/Images/iphone.png",
  "/Images/camera.png",
  "/Images/headphone.png",
  "/Images/laptop.png",
];

export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    if (index < 0) index = images.length - 1;
    else if (index >= images.length) index = 0;
    setCurrentIndex(index);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto lg:py-10 md:py-10 sm:py-10 py-0">
      {/* Image Slider Container */}
      <div className="relative w-full mx-auto overflow-hidden rounded-xl shadow-lg bg-gray-100">
        {/* Image wrapper with fixed height */}
        <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev & Next Buttons */}
        <button
          onClick={() => goToSlide(currentIndex - 1)}
          aria-label="Previous Slide"
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 shadow-md transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => goToSlide(currentIndex + 1)}
          aria-label="Next Slide"
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 shadow-md transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 gap-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              currentIndex === index
                ? "bg-blue-600 border-blue-600 scale-110"
                : "bg-gray-300 border-gray-400 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
