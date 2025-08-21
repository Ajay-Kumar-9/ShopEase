"use client";

import React, { useEffect, useState } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import Sales from "./Sales";
import Categories from "./Categories";
import Product from "./Product";
import OurProduct from "./OurProduct";
import Featured from "./Fatured";
import Footer from "./Footer";
import ProductSlider from "./ProductSlider";

export default function Homepage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Get user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsOpen(false);
    router.push("/Login"); // Redirect to login page after logout
  };

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <div className="flex h-screen mt-[80px] relative bg-[#F4A261]">
      {/* Sidebar */}
      <aside
        className={`fixed top-[81px] left-0 h-full bg-white text-black p-4 transition-transform duration-300 ease-in-out z-50 shadow-2xl ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="mb-6 text-black hover:text-gray-600"
          aria-label="Close sidebar"
        >
          <RxCross2 size={24} />
        </button>

        <nav>
          <ul className="space-y-2">
            {user ? (
              <>
                <li
                  onClick={() => handleNavigation("/Pages/Orders")}
                  className="hover:text-mutedCyanBlue cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={() => handleNavigation("/Pages/Cart")}
                  className="hover:text-mutedCyanBlue cursor-pointer"
                >
                  My Cart
                </li>
                <li
                  onClick={() => handleNavigation("/Pages/Wishlist")}
                  className="hover:text-mutedCyanBlue cursor-pointer"
                >
                  My Wishlist
                </li>
                <li
                  onClick={handleLogout}
                  className="hover:text-mutedCyanBlue cursor-pointer"
                >
                  Logout
                </li>
              </>
            ) : (
              <li
                onClick={() => handleNavigation("http://localhost:3000/auth/login")}
                className="hover:text-mutedCyanBlue cursor-pointer"
              >
                Login
              </li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow w-full bg-white text-black">
        <div className="lg:px-16 md:px-8 sm:px-6 px-4">
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="my-4 text-black hover:text-gray-600 lg:hidden"
              aria-label="Open sidebar"
            >
              <RxHamburgerMenu size={25} />
            </button>
          )}

          <div className="lg:py-10 md:py-10 sm:py-10 py-0">
            <ProductSlider />
          </div>

          <Sales />
          <Categories />
          <Product />
          <OurProduct />
          <Featured />
        </div>

        <Footer />
      </div>
    </div>
  );
}
