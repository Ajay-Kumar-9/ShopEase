"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import {
  FaRegHeart,
  FaRegUser,
  FaListAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useRouter } from "next/navigation";

// Redux imports
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

export default function Navbar() {
  const Router = useRouter();

  const handeLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout successfull");
    setTimeout(() => {
      Router.push("/auth/login");
    });
  };

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  // Redux store counts
  const cartItems = useSelector((state: RootState) => state.cart.items.length);
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  // Dropdown toggle
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Search input state
  const [searchTerm, setSearchTerm] = useState("");

  // Navigation handlers
  const handleNav = () => Router.push("/");
  const handleCart = () => Router.push("/Pages/Cart");
  const handleWishList = () => Router.push("/Pages/Wishlist");
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Handle Enter key on search input
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      Router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Badge component
  const Badge = ({ count }: { count: number }) => {
    if (!count) return null;
    return (
      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1 py-0.5 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full min-w-[14px] min-h-[14px]">
        {count}
      </span>
    );
  };

  return (
    <nav className="bg-white text-black shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center flex-shrink-0 cursor-pointer"
          onClick={handleNav}
        >
          <Image
            src="/Images/shopEase.png"
            alt="Main Logo"
            height={80}
            width={80}
            className="h-[80px] w-[80px] hover:scale-110 transition-transform duration-300 ease-in-out"
            priority
          />
        </div>

        {/* Mobile Layout */}
        <div className="flex items-center md:hidden w-full gap-4">
          <div className="relative flex-grow">
            <input
              key="mobile-search"
              type="text"
              placeholder="Search"
              className="w-full h-[35px] rounded-[10px] p-2 bg-darkGray text-sm placeholder-black border border-lightGray focus:ring-2 focus:ring-mutedCyanBlue shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none px-8"
              autoComplete="off"
              suppressHydrationWarning
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <IoSearchOutline
              size={18}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-lightGray"
            />
          </div>

          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <FaRegHeart
                size={20}
                className="text-lightGray hover:text-mutedCyanBlue hover:scale-105 transition duration-300 cursor-pointer"
                onClick={handleWishList}
              />
              <Badge count={wishlistItems} />
            </div>

            <div className="relative">
              <TiShoppingCart
                size={20}
                className="text-lightGray hover:text-mutedCyanBlue hover:scale-105 transition duration-300 cursor-pointer"
                onClick={handleCart}
              />
              <Badge count={cartItems} />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center flex-grow justify-between">
          <div className="flex gap-6 text-sm text-black items-center justify-center flex-grow">
            {[
              { label: "Home", path: "/" },
              { label: "Contact", path: "/Pages/Contact" },
              { label: "Login", path: "/auth/login" },
              { label: "Signup", path: "/auth/signup" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className="hover:text-mutedCyanBlue hover:underline transition-all duration-300 ease-in-out"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 min-w-[250px] relative">
            <div className="relative flex-shrink-0 w-full max-w-[250px]">
              <input
                key="desktop-search"
                type="text"
                placeholder="What are you looking for ?"
                className="w-full h-[35px] rounded-[10px] p-2 pr-10 pl-3 bg-darkGray text-sm placeholder-black border border-lightGray focus:ring-2 focus:ring-mutedCyanBlue shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
                autoComplete="off"
                suppressHydrationWarning
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
              <IoSearchOutline
                size={20}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lightGray pointer-events-none"
              />
            </div>

            <div className="relative">
              <FaRegHeart
                size={20}
                className="text-lightGray hover:text-mutedCyanBlue hover:scale-105 transition duration-300 cursor-pointer"
                onClick={handleWishList}
              />
              <Badge count={wishlistItems} />
            </div>

            <div className="relative">
              <TiShoppingCart
                size={25}
                className="text-lightGray hover:text-mutedCyanBlue hover:scale-105 transition duration-300 cursor-pointer"
                onClick={handleCart}
              />
              <Badge count={cartItems} />
            </div>

            {/* Avatar + Dropdown */}
            <div className="relative">
              {user ? (
                <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm font-semibold uppercase ">
                  <button onClick={toggleDropdown} className="hover:cursor-pointer">
                    {user.firstName.charAt(0).toUpperCase()}
                    {user.lastName.charAt(0).toUpperCase()}
                  </button>
                </div>
              ) : (
                <button
                  onClick={toggleDropdown}
                  className="focus:outline-none pr-0"
                >
                  <FaUserCircle
                    size={35}
                    className="text-lightGray hover:text-mutedCyanBlue hover:scale-105 transition duration-300 cursor-pointer"
                  />
                </button>
              )}

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-md shadow-xl backdrop-blur-lg bg-white/30 border border-white/40 z-50">
                  <ul className="py-2 text-sm text-gray-800">
                    <li>
                    {
                      user ? (                      <Link
                        href="/Pages/Account"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/40 rounded transition"
                      >
                        <FaRegUser />
                        Manage My Account
                      </Link>) : ('')
                    }
                    </li>
                    <li>
                      <Link
                        href="/Pages/Orders"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/40 rounded transition"
                      >
                        <FaListAlt />
                        My Orders
                      </Link>
                    </li>

                    <li>
                      {user ? (
                        <button
                          className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-white/40 rounded transition"
                          onClick={handeLogout}
                        >
                          <FaSignOutAlt />
                          Logout
                        </button>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
