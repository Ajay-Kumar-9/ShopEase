"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiHeart, FiEye } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart, CartItem } from "@/redux/cartSlice";
import { addToWishlist } from "@/redux/wishListSlice";
import { toast } from "react-hot-toast";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";

interface Product {
  _id?: string;
  image: string;
  title: string;
  price: number;
  rating: number;
}

interface RawProduct {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail?: string;
  images?: string[];
}


export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";
  const router = useRouter();
  const dispatch = useDispatch();

  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error("Failed to fetch search results");

        const data = await res.json();

        const mappedResults: Product[] = data.products.map((item: RawProduct) => ({
          _id: item.id.toString(),
          image: item.thumbnail || item.images?.[0] || "",
          title: item.title,
          price: `$${item.price}`,
          rating: Math.round(item.rating),
        }));

        setResults(mappedResults);
      } catch (err) {
        const e = err as Error;
        console.error(" Fetch error:", err);
        setError(e.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleNavigation = (item: Product) => {
    if (item._id) {
      router.push(`/Pages/ProductDetails?id=${item._id}`);
    } else {
      toast.error("Product ID not found");
    }
  };

  const handleAddToCart = (item: Product) => {
    const cartItem: CartItem = {
      ...item,
      _id: item._id ?? item.title,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));
    toast.success(`${item.title} added to cart`);
  };

  const handleAddToWishlist = (item: Product) => {
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

  const renderStars = (rating: number) => (
    <div className="flex gap-[1px] text-yellow-500">
      {[...Array(5)].map((_, i) =>
        i < rating ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12 min-h-[calc(100vh-144px)]">
        {!query ? (
          <p className="text-center text-lg mt-20">
            Please enter a search query.
          </p>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-8 text-center">
              Search Results for &quot;{query}&quot;
            </h1>

            {loading && <p className="text-center">Loading...</p>}
            {error && (
              <p className="text-center text-red-600">Error: {error}</p>
            )}
            {!loading && !error && results.length === 0 && (
              <p className="text-center text-red-600 text-4xl">
                No results found.
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {results.map((item, idx) => (
                <div
                  key={item._id ?? idx}
                  className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg p-4 relative flex flex-col"
                >
                  <div className="w-full h-48 relative mb-3 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain rounded-md"
                      height={1200}
                      width={1200}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end items-start p-2 gap-2">
                      <button
                        className="bg-white p-1 rounded-full text-black hover:bg-red-500 hover:text-white transition"
                        onClick={() => handleAddToWishlist(item)}
                        aria-label="Add to wishlist"
                      >
                        <FiHeart size={16} />
                      </button>
                      <button
                        className="bg-white p-1 rounded-full text-black hover:bg-blue-500 hover:text-white transition"
                        onClick={() => handleNavigation(item)}
                        aria-label="View product"
                      >
                        <FiEye size={16} />
                      </button>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold mb-1 truncate">
                    {item.title}
                  </h2>
                  <p className="text-red-500 font-bold mb-1">{item.price}</p>
                  {renderStars(item.rating)}

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="absolute bottom-4 left-4 right-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
