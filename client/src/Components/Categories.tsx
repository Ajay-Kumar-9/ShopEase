'use client';

import { useState } from 'react';
import {
  MdLaptop,
  MdHeadset,
  MdSmartphone,
} from 'react-icons/md';
import {
  GiClothes,
  GiDress,
  GiRunningShoe,
} from 'react-icons/gi';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const categories = [
  { name: 'Laptops', icon: MdLaptop, slug: 'laptops' },
  { name: 'Men’s Shirts', icon: GiClothes, slug: 'mens-shirts' },
  { name: 'Mobile Accessories', icon: MdHeadset, slug: 'mobile-accessories' },
  { name: 'Smartphones', icon: MdSmartphone, slug: 'smartphones' },
  { name: 'Women’s Dresses', icon: GiDress, slug: 'womens-dresses' },
  { name: 'Sports Accessories', icon: GiRunningShoe, slug: 'sports-accessories' },
];

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleClick = (index: number) => {
    setActiveIndex(index);
    const slug = categories[index].slug;
    router.push(`/categories?name=${encodeURIComponent(slug)}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-[5px] h-[50px] bg-red-500 rounded-sm" />
        <span className="text-red-500 font-medium">Categories</span>
      </div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse By Category</h1>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition">
            <IoChevronBack className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition">
            <IoChevronForward className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`cursor-pointer rounded-lg border transition-all duration-200 flex flex-col items-center justify-center p-6 min-h-[120px] ${
                isActive
                  ? 'bg-red-500 text-white border-red-500 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className={`text-3xl mb-3 ${isActive ? 'text-white' : 'text-gray-600'}`} />
              <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
                {category.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
