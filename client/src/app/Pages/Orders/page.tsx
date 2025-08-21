"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";

interface OrderItem {
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  items: OrderItem[];
  date: string;
}

export default function OrdersPage() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }

    // ✅ clear cart on order page load
    dispatch(clearCart());
  }, [dispatch]);

  const calculateSubtotal = (price: number, qty: number) => {
    return price * qty;
  };

  const cancelOrder = (id: number) => {
    const updated = orders.filter((order) => order.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    toast.error("Order Canceled");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow lg:px-16 md:px-8 sm:px-6 px-4 pt-24 pb-12">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Your Orders
        </h1>

        {orders.length > 0 ? (
          <div>
            {orders
              .slice()
              .reverse()
              .map((order) => {
                const total = order.items.reduce(
                  (acc, item) =>
                    acc + calculateSubtotal(item.price, item.quantity),
                  0
                );

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-md p-5 mb-6 relative w-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500 text-2xl" />
                        <div>
                          <h2 className="font-semibold text-lg text-green-700">
                            Order Placed Successfully
                          </h2>
                          <p className="text-sm text-gray-500">
                            Order Date: {order.date}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        Cancel Order
                      </button>
                    </div>

                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border-b py-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 relative">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className=" rounded"
                            />
                          </div>
                          <div>
                            <p className="text-gray-800 font-medium">
                              {item.title}
                            </p>
                            <p className="text-gray-500 text-sm">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-800 font-medium">
                          ${calculateSubtotal(item.price, item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}

                    <div className="mt-3 flex justify-between font-semibold text-gray-800">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No orders found. Place an order to see it here.
          </p>
        )}

        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
