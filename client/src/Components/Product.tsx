'use client';

import { useState, useEffect } from "react";
import {
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";

export default function Product() {
  const [timeLeft, setTimeLeft] = useState({
    days: 23,
    hours: 5,
    minutes: 59,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      id: 1,
      name: "Mixer Grinder",
      currentPrice: 260,
      originalPrice: 360,
      rating: 5,
      reviews: 65,
      image: "/Images/mixer.webp",
    },
    {
      id: 2,
      name: "Chair",
      currentPrice: 960,
      originalPrice: 1160,
      rating: 4.5,
      reviews: 65,
      image: "/Images/chair.webp",
    },
    {
      id: 3,
      name: "Ipad",
      currentPrice: 160,
      originalPrice: 170,
      rating: 4.5,
      reviews: 65,
      image: "/Images/ipad.jpeg",
    },
    {
      id: 4,
      name: "Charger",
      currentPrice: 360,
      originalPrice: null,
      rating: 5,
      reviews: 65,
      image: "/Images/charger.webp",
    },
  ];

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(rating)) {
        return <AiFillStar key={i} className="w-4 h-4 text-yellow-400" />;
      } else if (i < rating) {
        return (
          <AiFillStar
            key={i}
            className="w-4 h-4 text-yellow-400 opacity-50"
          />
        );
      } else {
        return <AiOutlineStar key={i} className="w-4 h-4 text-gray-300" />;
      }
    });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 bg-red-500 rounded-sm"></div>
            <div>
              <p className="text-red-500 font-semibold">This Month</p>
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Best Selling Products
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-lg shadow-md hover:shadow-lg transition w-full max-w-[280px]"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-t-lg bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-contain p-4"
              />

            </div>

            {/* Details */}
            <div className="p-4 space-y-2">
              <h3 className="font-medium text-black truncate">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-semibold text-sm">
                  ₹{product.currentPrice}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="text-gray-400 text-sm">
                  ({product.reviews})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="bg-black rounded-lg p-6 sm:p-10 mt-20">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
          {/* Text */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <p className="text-green-500 font-semibold">Categories</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Enhance Your
              <br />
              Music Experience
            </h2>

            {/* Timer */}
            <div className="flex justify-center lg:justify-start gap-4">
              {["days", "hours", "minutes", "seconds"].map((unit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center"
                >
                  <div className="text-black font-bold text-lg">
                    {String(timeLeft[unit as keyof typeof timeLeft]).padStart(
                      2,
                      "0"
                    )}
                  </div>
                  <div className="text-black text-xs capitalize">{unit}</div>
                </div>
              ))}
            </div>

            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg rounded transition mx-auto lg:mx-0">
              Buy Now!
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/Images/sony.jpg"
              alt="Sony Speaker"
              width={400}
              height={400}
              className="w-full max-w-xs sm:max-w-md object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
