import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Leaf, 
  ShoppingBag,
  Sparkles,
  Plus,
  Percent,
  ChevronRight
} from 'lucide-react';

export const HeroSection = () => {
  const { navigateTo, addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  const swiggyBanners = [
    {
      id: 1,
      badge: "FLAT 20% OFF",
      badgeColor: "bg-neutral-900 text-white",
      tagline: "GRANDMA'S HERITAGE RECIPE",
      title: "Traditional Avakaya Mango Pickle",
      desc: "Cold-pressed sesame oil & Guntur chillies",
      price: "₹249",
      origPrice: "₹299",
      categorySlug: "pickles",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
      cta: "Order Now"
    },
    {
      id: 2,
      badge: "PURE COW GHEE",
      badgeColor: "bg-neutral-900 text-white",
      tagline: "DAILY FRESH BATCH",
      title: "Pure Cow Ghee Besan Laddu",
      desc: "Slow roasted gram flour & crunchy cashews",
      price: "₹380",
      origPrice: "₹450",
      categorySlug: "sweets",
      image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80",
      cta: "Explore Sweets"
    },
    {
      id: 3,
      badge: "MORNING 7 AM DROP",
      badgeColor: "bg-neutral-900 text-white",
      tagline: "100% SHARBATI GRAINS",
      title: "Stone-Ground Chakki Atta",
      desc: "Cold milled to lock in fiber & natural aroma",
      price: "₹290",
      origPrice: "₹340",
      categorySlug: "flours",
      image: "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?auto=format&fit=crop&w=600&q=80",
      cta: "Shop Flours"
    }
  ];

  // Auto slide on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % swiggyBanners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [swiggyBanners.length]);

  const activeBanner = swiggyBanners[currentSlide];

  return (
    <section className="w-full max-w-full overflow-hidden bg-white">
      
      {/* ============================================================== */}
      {/* 1. MOBILE VIEW (SWIGGY APP STYLE HERO) */}
      {/* ============================================================== */}
      <div className="md:hidden px-3 pt-2 pb-4 space-y-3 bg-neutral-100/60">
        
        {/* Swiggy Instamart-Style Dynamic Banner Card */}
        <div 
          onClick={() => navigateTo('categories', activeBanner.categorySlug)}
          className="relative bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm overflow-hidden cursor-pointer"
        >
          {/* Subtle watermark food background */}
          <div className="absolute right-0 top-0 bottom-0 w-2/5 overflow-hidden rounded-r-2xl pointer-events-none">
            <img 
              src={activeBanner.image} 
              alt={activeBanner.title} 
              className="w-full h-full object-cover transform scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[65%] space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="bg-neutral-900 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                {activeBanner.badge}
              </span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider truncate">
                {activeBanner.tagline}
              </span>
            </div>

            <h2 className="text-base font-extrabold text-neutral-900 leading-tight">
              {activeBanner.title}
            </h2>

            <p className="text-[11px] text-neutral-500 line-clamp-1 leading-snug">
              {activeBanner.desc}
            </p>

            <div className="pt-1.5 flex items-center gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-neutral-950">{activeBanner.price}</span>
                <span className="text-xs text-neutral-400 line-through">{activeBanner.origPrice}</span>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('categories', activeBanner.categorySlug);
                }}
                className="bg-neutral-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm active:scale-95"
              >
                <span>{activeBanner.cta}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Swiggy Slide Dots Indicator */}
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          {swiggyBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-5 bg-neutral-900' : 'w-1.5 bg-neutral-300'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Swiggy Delivery & Purity Micro-Bar */}
        <div className="bg-white rounded-xl p-2.5 border border-neutral-200/80 flex items-center justify-between text-[11px] text-neutral-700 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-neutral-900" />
            <span>Morning 7 AM Delivery</span>
          </div>
          <span className="text-neutral-300">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>50+ Purity Lab Checks</span>
          </div>
          <span className="text-neutral-300">•</span>
          <div className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-neutral-900" />
            <span>Zero Preservatives</span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. DESKTOP VIEW (CLEAN WHITE/GREY COUNTRY DELIGHT STYLE HERO) */}
      {/* ============================================================== */}
      <div className="hidden md:block bg-gradient-to-b from-neutral-50 via-white to-neutral-50/50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-white border border-neutral-300 px-3.5 py-1.5 rounded-full text-xs font-bold text-neutral-800 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>100% Pure & Lab Tested • Delivered Daily by 7:00 AM</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
                Welcome to <br />
                <span className="relative inline-block text-neutral-900">
                  Sumadhura Foods
                  <span className="absolute bottom-1 left-0 right-0 h-2 bg-neutral-200 -z-10 rounded"></span>
                </span>
              </h1>

              <p className="text-base text-neutral-600 max-w-xl leading-relaxed">
                Experience authentic heritage flavor. We deliver stone-ground whole wheat flours, pure desi cow ghee sweets, and grandma's heirloom pickles straight to your kitchen table.
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('categories')}
                  className="flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm px-7 py-3.5 rounded-2xl transition-all shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('categories')}
                  className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-sm active:scale-95"
                >
                  <span>Explore 16 Categories</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-neutral-200 flex items-center gap-8 text-xs text-neutral-600 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-900" />
                  <span>50+ Lab Quality Checks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-900" />
                  <span>7:00 AM Morning Drop</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-neutral-900" />
                  <span>Zero Palm Oil or Chemicals</span>
                </div>
              </div>
            </div>

            {/* Right Card Spotlight */}
            <div className="col-span-5">
              <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-premium">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-4 border border-neutral-100">
                  <img 
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80" 
                    alt="Avakaya Mango Pickle"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-neutral-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Fresh Daily Batch
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white text-neutral-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    ★ 4.9 Rating
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-neutral-400">Featured Heritage Special</span>
                    <span className="text-neutral-500 font-mono">500g Glass Jar</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-neutral-900">Traditional Avakaya Mango Pickle</h3>
                  <p className="text-xs text-neutral-500 line-clamp-1">Stone-ground mustard & cold-pressed sesame oil.</p>

                  <div className="pt-2 flex justify-between items-center border-t border-neutral-100">
                    <div>
                      <span className="text-2xl font-black text-neutral-900">₹249</span>
                      <span className="text-xs text-neutral-400 line-through ml-2">₹299</span>
                    </div>

                    <button
                      onClick={() => addToCart({
                        id: "prod-1",
                        name: "Traditional Avakaya Mango Pickle",
                        price: 249,
                        weight: "500g",
                        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
                      }, 1, "500g")}
                      className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD TO CART</span>
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
