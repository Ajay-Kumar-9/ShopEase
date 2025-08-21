"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useRouter } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { removeFromCart, updateQuantity, CartItem } from "@/redux/cartSlice";

export default function CartPage() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/Pages/Checkout");
  };

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  console.log("[CartPage] cartItems:", cartItems);

  // Remove item handler
  const handleRemove = (_id?: string) => {
    if (_id) dispatch(removeFromCart(_id));
  };

  // Update quantity handler
  const handleQuantityChange = (item: CartItem, qty: number) => {
    if (qty < 1) return; // Prevent invalid quantities
    dispatch(updateQuantity({ _id: item._id, quantity: qty }));
  };

  // Calculate subtotal for each item and total
  const calculateSubtotal = (item: CartItem) => {
    const priceNum = item.price; // strip $ and parse
    return priceNum * item.quantity;
  };

  const total = cartItems.reduce(
    (acc, item) => acc + calculateSubtotal(item),
    0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="w-full shadow-sm">
        <Navbar />
      </div>

      {/* Cart Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-24">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-black">Cart</span>
          </div>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {/* Header Row */}
            <div className="hidden lg:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 mb-6">
              <div className="col-span-5 text-sm font-medium text-gray-900">
                Product
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-900">
                Price
              </div>
              <div className="col-span-3 text-sm font-medium text-gray-900">
                Quantity
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-900 text-right">
                Subtotal
              </div>
              <div className="col-span-12"></div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={item._id ?? idx}
                    className="flex flex-col lg:grid grid-cols-12 gap-4 items-center bg-white p-4 rounded-md shadow hover:shadow-md transition relative"
                  >
                    <div className="col-span-5 flex items-center space-x-3 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="rounded shadow-sm object-cover"
                      />
                      <span className="text-sm text-gray-900">
                        {item.title}
                      </span>
                    </div>

                    <div className="col-span-2 text-sm text-gray-900 w-full lg:text-left">
                      {item.price}
                    </div>

                    <div className="col-span-3 w-full">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item, Number(e.target.value))
                        }
                        className="w-full max-w-[5rem] h-10 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        {[...Array(10).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1 < 10 ? `0${i + 1}` : i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2 text-sm text-gray-900 text-right w-full">
                      ${calculateSubtotal(item).toFixed(2)}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
                      aria-label={`Remove ${item.title}`}
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
              <Link href="/">
                <button className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-500">
                  Return To Shop
                </button>
              </Link>
            </div>

            {/* Coupon Code */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500">
                Apply Coupon
              </button>
            </div>
          </div>

          {/* Cart Total Section */}
          <div className="w-full lg:max-w-sm">
            <div className="border border-gray-200 rounded-lg shadow hover:shadow-md transition">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Cart Total
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-gray-200 pb-4">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-gray-900">Free</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>

                  <button
                    className="w-full bg-red-500 hover:bg-red-600 text-white mt-6 px-6 py-2 rounded-md text-sm font-medium transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={handleCheckout}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full shadow-sm">
        <Footer />
      </div>
    </div>
  );
}
