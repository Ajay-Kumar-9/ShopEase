"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/cartSlice";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};



type OrderItem = {
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  id: number;
  items: OrderItem[];
  date: string;
};

export default function CheckoutPage() {


  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");
  const paramQty = searchParams.get("qty");

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [billingData, setBillingData] = useState({
    firstName: "",
    streetAddress: "",
    town_city: "",
    phone: "",
    email: "",
  });

  const isFormValid = Object.values(billingData).every((val) => val.trim() !== "");

  useEffect(() => {
    if (paramId && paramQty) {
      setQuantity(Number(paramQty));
      (async () => {
        try {
          const res = await fetch(`https://dummyjson.com/products/${paramId}`);
          const data = await res.json();
          setProduct(data);
        } catch (err) {
          console.error("Failed to fetch product", err);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [paramId, paramQty]);

const handlePlaceOrder = async () => {
  const user = localStorage.getItem("user");

  if (!user) {
    toast.error("You need to login first.");
    router.push("/auth/login"); // Optional: redirect to login
    return;
  }

  if (!isFormValid) {
    toast.error("Please fill all billing fields.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billingData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Submission failed.");
    }

    const date = new Date().toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

    const items: OrderItem[] = [];

    if (product && paramId && paramQty) {
      items.push({
        title: product.title,
        price: product.price,
        quantity,
        image: product.images[0] ?? "",
      });
    }

    cartItems.forEach((item) => {
      items.push({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      });
    });

    const newOrder: Order = { id: Date.now(), items, date };
    const existing = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existing, newOrder]));

    dispatch(clearCart());
    toast.success("Order placed successfully!");
    router.push("/Pages/Orders");

  } catch (err) {
    const e = err as Error;
    toast.error(e.message || "Something went wrong.");
  }
};


  const total = product && paramId && paramQty
    ? product.price * quantity + cartItems.reduce((acc, ci) => acc + ci.price * ci.quantity, 0)
    : cartItems.reduce((acc, ci) => acc + ci.price * ci.quantity, 0);

  const billingFields = [
    { name: "firstName", label: "First Name", placeholder: "Enter your first name" },
    { name: "streetAddress", label: "Street Address", placeholder: "123 Main St" },
    { name: "town_city", label: "Town/City", placeholder: "Enter your city" },
    { name: "phone", label: "Phone Number", placeholder: "+91 9876543210" },
    { name: "email", label: "Email Address", placeholder: "you@example.com" },
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex items-center justify-center text-gray-500">Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 pt-24">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center text-sm text-gray-500 mb-8">
            <span>Account</span>
            <FaChevronRight className="mx-2 text-xs" />
            <span>Checkout</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Billing Form */}
            <div className="bg-white p-6 rounded-md shadow">
              <h2 className="text-2xl font-medium mb-8">Billing Details</h2>
              <form className="space-y-6">
                {billingFields.map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm mb-2 text-gray-600">
                      {field.label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={billingData[field.name as keyof typeof billingData]}
                      onChange={(e) =>
                        setBillingData({
                          ...billingData,
                          [field.name]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                ))}
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-md shadow space-y-6 h-auto">
              {(product || cartItems.length > 0) ? (
                <>
                  {product && (
                    <div className="flex justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <Image src={product.images[0]} alt={product.title} width={48} height={48} />
                        <span>{product.title} × {quantity}</span>
                      </div>
                      <span>${(product.price * quantity).toFixed(2)}</span>
                    </div>
                  )}

                  {cartItems.map((ci, idx) => (
                    <div key={idx} className="flex justify-between">
                      <div className="flex items-center gap-4">
                        <Image src={ci.image} alt={ci.title} width={48} height={48} />
                        <span>{ci.title} × {ci.quantity}</span>
                      </div>
                      <span>${(ci.price * ci.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <label className="font-medium">Payment Method</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="cash"
                          checked={paymentMethod === "cash"}
                          onChange={() => setPaymentMethod("cash")}
                        />
                        Cash on Delivery
                      </label>
                      <label className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                        <input type="radio" disabled /> Bank (Disabled)
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={!isFormValid}
                    className={`w-full py-4 rounded font-semibold ${
                      isFormValid
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Place Order
                  </button>
                </>
              ) : (
                <p className="text-center text-gray-500">No items to checkout.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
