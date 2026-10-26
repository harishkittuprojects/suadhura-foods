import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowUpRight } from 'lucide-react';

export const CategoryCard = ({ category }) => {
  const { navigateTo } = useCart();

  return (
    <div
      onClick={() => navigateTo('categories', category.slug)}
      className="group relative bg-white border border-neutral-200 hover:border-neutral-900 rounded-2xl p-3 sm:p-4 transition-all duration-200 hover:shadow-subtle cursor-pointer flex flex-col justify-between"
      data-aos="fade-up"
    >
      <div>
        {/* Category Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-3">
          <img 
            src={category.image} 
            alt={category.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {category.badge && (
            <span className="absolute top-2 left-2 bg-neutral-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {category.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-black transition-colors leading-tight mb-1">
          {category.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-neutral-500 line-clamp-1">
          {category.description}
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-700 group-hover:text-neutral-950">
        <span>Explore Products</span>
        <div className="w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center transition-all">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
