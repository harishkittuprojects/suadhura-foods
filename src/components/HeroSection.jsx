import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Leaf, 
  ShoppingBag,
  Sparkles,
  Plus
} from 'lucide-react';

export const HeroSection = () => {
  const { navigateTo, addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart({
      id: "prod-1",
      name: "Traditional Avakaya Mango Pickle",
      price: 249,
      weight: "500g",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    }, 1, "500g");
  };

  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Background with subtle gradient & overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1920&q=80" 
          alt="Traditional fresh spices, grains and wholesome food"
          className="w-full h-full object-cover opacity-15 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6" data-aos="fade-up" data-aos-duration="600">
            
            {/* Top Pill - Single line on mobile */}
            <div className="inline-flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-neutral-300 backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="truncate">100% Pure • Morning Delivery by 7 AM</span>
            </div>

            {/* Main Headline - Tighter and cleaner */}
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Welcome to <br className="hidden sm:inline" />
              <span className="text-white relative inline-block">
                Sumadhura Foods
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-600 rounded-full opacity-60"></span>
              </span>
            </h1>

            {/* Description - Compact on mobile */}
            <p className="text-xs sm:text-base text-neutral-300 max-w-xl font-normal leading-relaxed">
              Experience the authentic taste of tradition. We deliver lab-tested, stone-ground flours, pure cow ghee sweets, and heirloom pickles straight to your doorstep.
            </p>

            {/* Action Buttons - Clean side-by-side row on mobile */}
            <div className="flex items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={() => navigateTo('categories')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-white text-neutral-950 hover:bg-neutral-200 text-xs sm:text-sm font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-150 shadow-md active:scale-95 whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4 text-neutral-950 flex-shrink-0" />
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigateTo('categories')}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 text-xs sm:text-sm font-semibold px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-150 backdrop-blur-sm active:scale-95 whitespace-nowrap"
              >
                <span>Categories</span>
              </button>
            </div>

            {/* Trust points bar - Compact 3-col on mobile */}
            <div className="pt-3 sm:pt-5 border-t border-neutral-800/80 flex items-center justify-between text-[11px] sm:text-xs text-neutral-400 gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                <span>50+ Lab Tests</span>
              </div>
              <span className="text-neutral-700">•</span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Clock className="w-3.5 h-3.5 text-neutral-300" />
                <span>7:00 AM Delivery</span>
              </div>
              <span className="text-neutral-700">•</span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Leaf className="w-3.5 h-3.5 text-neutral-300" />
                <span>Zero Palm Oil</span>
              </div>
            </div>

          </div>

          {/* Right Hero Showcase Card (Appetizing visual visible on both mobile and desktop) */}
          <div className="lg:col-span-5 mt-2 lg:mt-0" data-aos="fade-up" data-aos-delay="100">
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-neutral-900/90 border border-neutral-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xl">
              
              {/* Product Visual Container */}
              <div className="relative aspect-[16/9] sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 mb-3 sm:mb-4 border border-neutral-800">
                <img 
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80" 
                  alt="Traditional Avakaya Mango Pickle Spotlight" 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-2.5 left-2.5 bg-neutral-950/90 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-neutral-700">
                  Daily Fresh Batch
                </div>
                
                <div className="absolute bottom-2.5 right-2.5 bg-white text-neutral-950 font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-md">
                  ★ 4.9 Rating
                </div>
              </div>

              {/* Spotlight Info */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px]">
                    Heritage Special
                  </span>
                  <span className="text-neutral-300 font-mono text-[11px]">500g Jar</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    Traditional Avakaya Mango Pickle
                  </h3>
                </div>

                <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-1">
                  Mustard, Guntur chillies and pure cold-pressed sesame oil.
                </p>

                {/* Price and Action Row */}
                <div className="pt-2 sm:pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-base sm:text-xl font-extrabold text-white">₹249</span>
                    <span className="text-xs text-neutral-500 line-through ml-1.5">₹299</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleQuickAdd}
                      className="bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold px-3 py-1.5 rounded-lg sm:rounded-xl transition-colors shadow-sm flex items-center gap-1"
                    >
                      <span>ADD</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigateTo('categories', 'pickles')}
                      className="text-neutral-400 hover:text-white text-xs underline underline-offset-2 px-1 py-1"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
