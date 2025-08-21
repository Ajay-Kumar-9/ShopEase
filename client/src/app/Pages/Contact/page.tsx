"use client";

import { useState } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      const e = err as Error
      toast.error(e.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow px-4 pt-28 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <nav className="text-sm text-gray-500">
              <span className="hover:text-red-500 transition">Home</span>
              <span className="mx-2">/</span>
              <span className="text-black">Contact</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="p-6 rounded-lg shadow-md bg-white border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <FiPhone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-black">Call To Us</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>Phone: <span className="text-black font-medium">+8801611112222</span></p>
                </div>
              </div>

              <div className="p-6 rounded-lg shadow-md bg-white border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-black">Write To Us</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Fill out our form and we will contact you within 24 hours.</p>
                  <p>Email: <span className="text-black font-medium">customer@exclusive.com</span></p>
                  <p>Email: <span className="text-black font-medium">support@exclusive.com</span></p>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-6 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email *"
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone *"
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={8}
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500 resize-none"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
