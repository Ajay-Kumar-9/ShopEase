"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiHeart, FiEye } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart, CartItem } from "@/redux/cartSlice";
import { addToWishlist } from "@/redux/wishListSlice";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";



type SaleItem = {
  _id?: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  quantity?: number;
};

interface RawProduct {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail?: string;
  images?: string[];
}

export default function Sales() {
  const Router = useRouter();

  // Updated: Pass product item to handleNavigation
  const handleNavigation = (item: SaleItem) => {
    if (item._id) {
      Router.push(`/Pages/ProductDetails?id=${item._id}`);
    } else {
      toast.error("Product ID not found");
    }
  };

  const [sale, setSale] = useState(false);
  const [salesData, setSalesData] = useState<SaleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products`);
        const data = await res.json();
        console.log("checking data", data);
        setSalesData(
          data.products.map((product: RawProduct) => ({
            _id: product.id?.toString(),
            image: product.thumbnail  || "", 
            title: product.title,
            price: `$${product.price}`,
            rating: product.rating,
          }))
        );
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

/*  */

  const renderStars = (rating: number) => (
    <div className="flex gap-[1px] text-yellow-500">
      {[...Array(5)].map((_, i) =>
        i < rating ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
      )}
    </div>
  );

  const handleAddToCart = (item: SaleItem) => {
    const cartItem: CartItem = {
      ...item,
      _id: item._id ?? item.title,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));
    toast.success(`${item.title} added to cart`);
  };

  const handleAddToWishlist = (item: SaleItem) => {
    dispatch(
      addToWishlist({
        id: item._id ?? Date.now().toString(),
        name: item.title,
        price: item.price,
        image: item.image,
      })
    );
    toast.success(`${item.title} added to wishlist`);
  };

  const renderCard = (item: SaleItem, index: number) => (
    <div
      key={index}
      className={`group bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg p-3 relative ${
        sale
          ? "lg:w-[200px] md:w-[200px] sm:w-[200px] w-full"
          : "w-[180px] sm:w-[200px] flex-shrink-0"
      }`}
    >
      <div className="w-full h-36 relative mb-3 rounded-md overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="rounded-md object-contain"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end items-start p-2 gap-2">
          <button
            className="bg-white p-1 rounded-full text-black hover:bg-red-500 hover:text-white transition"
            onClick={() => handleAddToWishlist(item)}
          >
            <FiHeart size={16} />
          </button>
          <button
            className="bg-white p-1 rounded-full text-black hover:bg-blue-500 hover:text-white transition"
            onClick={() => handleNavigation(item)}
          >
            <FiEye size={16} />
          </button>
        </div>
      </div>
      <h3 className="text-sm font-semibold mb-1 truncate">{item.title}</h3>
      <p className="text-red-500 font-bold mb-1">{item.price}</p>
      {renderStars(item.rating)}
      <button
        onClick={() => handleAddToCart(item)}
        className="absolute bottom-3 left-3 right-3 py-1 bg-black text-white text-xs rounded-md hover:bg-gray-800 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
      >
        Add to Cart
      </button>
    </div>
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">



      {loading ? (
        <p className="text-center w-full py-8 text-gray-500">Loading...</p>
      ) : sale ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {salesData.map(renderCard)}
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
        >
          {salesData.map(renderCard)}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setSale(!sale)}
          className="px-5 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
        >
          {sale ? "Collapse" : "View all products"}
        </button>
      </div>
    </div>
  );
}
