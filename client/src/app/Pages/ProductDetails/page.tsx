"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiTruck, FiRotateCcw, FiMinus, FiPlus } from "react-icons/fi";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import RecommendProduct from "@/Components/RecommendProduct";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Product = {
  id: string;
  title: string;
  price: number;
  rating: number;
  images: string[];
  description?: string;
  stock?: number;
};

export default function ProductPage() {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Loading product details...
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-red-500">
          Product not found.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex-grow lg:px-16 md:px-8 sm:px-6 px-4">
        {/* Breadcrumb */}
        <div className="pt-28 pb-4 text-sm text-gray-500">
          <span>Account</span> / <span>Gaming</span> /{" "}
          <span className="text-black">{product.title}</span>
        </div>

        <main className="py-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="flex gap-4">
              {/* Thumbnail images */}
              <div className="flex flex-col gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 bg-gray-100 rounded border-2 overflow-hidden ${
                      selectedImageIndex === index
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                      height={1200}
                      width={1200}
                    />
                  </button>
                ))}
              </div>

              {/* Main Image Preview */}
              <div className="flex-1 bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={product.title}
                  className="max-w-full max-h-96 object-contain"
                  height={1200}
                      width={1200}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-black mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.rating) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(150 Reviews)</span>
                  <span className="text-sm text-green-500 ml-4">
                    {product.stock && product.stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>
                <div className="text-2xl font-medium text-black">
                  <div className="text-2xl font-medium text-black">
                    ${product.price * quantity}
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description ||
                    "No description available for this product."}
                </p>
              </div>

              {/* Quantity + Buy + Wishlist */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  className="bg-red-500 text-white px-8 py-2 rounded hover:bg-red-600 transition-colors"
                  onClick={() =>
                    Router.push(
                      `/Pages/Checkout?id=${product.id}&qty=${quantity}`
                    )
                  }
                >
                  Buy Now
                </button>
              </div>

              {/* Delivery Info */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center gap-4">
                  <FiTruck className="w-6 h-6" />
                  <div>
                    <div className="font-medium">Free Delivery</div>
                    <div className="text-sm text-gray-600">
                      Enter your postal code for Delivery Availability
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FiRotateCcw className="w-6 h-6" />
                  <div>
                    <div className="font-medium">Return Delivery</div>
                    <div className="text-sm text-gray-600">
                      Free 30 Days Delivery Returns. Details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Related Items */}
        <section className="py-12 bg-white max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <h2 className="text-4xl font-medium">Recommended for you</h2>
          </div>
          <div className="overflow-x-hidden">
            <RecommendProduct />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
