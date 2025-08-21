'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { FiHeart, FiEye } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart, CartItem } from '@/redux/cartSlice';
import { addToWishlist } from '@/redux/wishListSlice';
import { toast } from 'react-hot-toast';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
};

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('name') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -250 : 250, behavior: 'smooth' });
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-[1px] text-yellow-500">
      {[...Array(5)].map((_, i) => (i < Math.round(rating) ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />))}
    </div>
  );

  const handleAddToCart = (item: Product) => {
    const cartItem: CartItem = {
      _id: item.id.toString(),
      image: item.thumbnail,
      title: item.title,
      price: item.price,
      rating: item.rating,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    toast.success(`${item.title} added to cart`);
  };

  const handleAddToWishlist = (item: Product) => {
    dispatch(addToWishlist({
      id: item.id.toString(),
      name: item.title,
      price: item.price,
      image: item.thumbnail,
    }));
    toast.success(`${item.title} added to wishlist`);
  };

  const handleNavigate = (item: Product) => {
    router.push(`/Pages/ProductDetails?id=${item.id}`);
  };

  const renderCard = (item: Product, idx: number) => (
    <div key={idx} className={`group bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg p-3 relative ${viewAll ? 'w-full sm:w-[200px]' : 'flex-shrink-0 w-[180px] '}`}>
      <div className="w-full h-36 relative mb-3 rounded-md overflow-hidden gap-4">
        <Image src={item.thumbnail} alt={item.title} fill className="rounded-md object-contain" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end items-start p-2 gap-2">
          <button onClick={() => handleAddToWishlist(item)} className="bg-white p-1 rounded-full hover:bg-red-500 hover:text-white transition">
            <FiHeart size={16} />
          </button>
          <button onClick={() => handleNavigate(item)} className="bg-white p-1 rounded-full hover:bg-blue-500 hover:text-white transition">
            <FiEye size={16} />
          </button>
        </div>
      </div>
      <h3 className="text-sm font-semibold mb-1 truncate">{item.title}</h3>
      <p className="text-red-500 font-bold mb-1">${item.price}</p>
      {renderStars(item.rating)}
      <button onClick={() => handleAddToCart(item)} className="absolute bottom-3 left-3 right-3 py-1 bg-black text-white text-xs rounded-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        Add to Cart
      </button>
    </div>
  );

  return (
    <div>
        <Navbar/>
    <div className="py-20 max-w-7xl mx-auto min-h-screen">
    
      <div className="flex gap-2 items-center mt-10">
        <div className="h-[40px] w-[4px] bg-red-500 rounded"></div>
        <p className="text-base sm:text-lg font-medium">{category.replace(/-/g, ' ')}</p>
      </div>
      <div className="flex justify-between my-4 items-center">
        <h2 className="text-xl sm:text-2xl font-semibold">Products</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <GoArrowLeft />
          </button>
          <button onClick={() => scroll('right')} className="h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <GoArrowRight />
          </button>
        </div>
      </div>
      {loading ? (
        <p className="text-center py-8 text-gray-500">Loading...</p>
      ) : viewAll ? (
        <div className="flex flex-wrap gap-4 justify-center">{products.map(renderCard)}</div>
      ) : (
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth">{products.slice(0, 10).map(renderCard)}</div>
      )}
      <div className="flex justify-center mt-8">
        <button onClick={() => setViewAll(!viewAll)} className="px-5 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition">
          {viewAll ? 'Collapse' : 'View all products'}
        </button>
      </div>
  
    </div>
        <Footer/>
    </div>
  );
}
