"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { RootState } from "@/redux/store";
import { addToCart, CartItem } from "@/redux/cartSlice";
import { removeFromWishlist } from "@/redux/wishListSlice";
import { toast } from "react-hot-toast";
import RecommendProduct from "@/Components/RecommendProduct";
import Image from "next/image";

interface Product {
  id: string;  // changed to string
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  salePercentage?: number;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  showDeleteIcon?: boolean;
  showRating?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showDeleteIcon = false,
  showRating = false,
}) => {
  const dispatch = useDispatch();

  const {
    id,
    name,
    price,
    originalPrice,
    image,
    salePercentage,
    rating,
    reviewCount,
    isNew,
  } = product;

  // Handler for Add to Cart
  const handleAddToCart = () => {
    if (!id) {
      toast.error("Product ID is missing.");
      return;
    }
    const cartItem: CartItem = {
      _id: id.toString(),
      title: name,
      price: price,
      image,
      quantity: 1,
      rating: rating ?? 0,
    };
    dispatch(addToCart(cartItem));
    toast.success(`${name} added to cart`);
  };

  // Handler for Remove from Wishlist
  const handleDelete = () => {
    dispatch(removeFromWishlist(id));
    toast.success(`${name} removed from wishlist`);
  };

  return (
    <div className="group relative bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.03] my-16">
      <div className="relative bg-gray-100 rounded-t-md mb-2 overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="w-full h-36 "
          loading="lazy"
          height={100}
          width={100}
        />
        {salePercentage && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-sm font-semibold">
            -{salePercentage}%
          </div>
        )}
        {isNew && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-sm font-semibold">
            NEW
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {showDeleteIcon && (
            <button
              onClick={handleDelete}
              aria-label="Delete product"
              className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50 transition"
            >
              <svg
                className="w-3 h-3 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6
                     m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        {/* Add To Cart button shown on hover */}
        <div className=" mt-2 px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-1 text-sm font-semibold rounded-[5px]"
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div className="space-y-1 px-3 pb-3">
        <h3 className="font-medium text-gray-900 line-clamp-2 text-xs sm:text-sm">
          {name}
        </h3>
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <span className="text-red-600 font-semibold">${price}</span>
          {originalPrice && (
            <span className="text-gray-400 line-through">${originalPrice}</span>
          )}
        </div>
        {showRating && typeof rating === "number" && (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < rating ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
            {reviewCount && <span>({reviewCount})</span>}
          </div>
        )}
      </div>
    </div>
  );
};



const WishlistPage: React.FC = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-6 mt-20">
        {/* Wishlist Section */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Wishlist ({wishlistItems.length})
            </h1>
          </div>

          {wishlistItems.length === 0 ? (
            <p className="text-center text-gray-600">No items in wishlist.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {wishlistItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  showDeleteIcon
                  showRating={false}
                />
              ))}
            </div>
          )}
        </section>

        {/* Recommended Section */}
        <section >
          <h2 className="mb-6 text-4xl font-semibold text-gray-900">
            Recommended for you
          </h2>
            <RecommendProduct/>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
