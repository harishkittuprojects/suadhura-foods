import React from 'react';
import { useCart } from '../context/CartContext';
import { HeroSection } from '../components/HeroSection';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, PRODUCTS, PURITY_PILLARS, TESTIMONIALS } from '../data/foodData';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Star, 
  ShoppingBag,
  HeartHandshake
} from 'lucide-react';

export const HomePage = () => {
  const { navigateTo } = useCart();

  // Top popular categories (12 prominent for homepage)
  const popularCategories = CATEGORIES.slice(0, 12);

  // Featured products & Bestsellers
  const bestsellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 8);
  const newArrivals = PRODUCTS.filter(p => p.isNew || !p.isBestseller).slice(0, 4);

  return (
    <div className="space-y-8 sm:space-y-20 pb-16">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* Country Delight Style Daily Purity Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-subtle">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              The Sumadhura Promise
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              Food As Pure As It Was Meant To Be
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Like traditional village food, we prepare everything with time-honored methods, zero chemical preservatives, and daily morning delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PURITY_PILLARS.map((pillar, index) => (
              <div 
                key={pillar.title} 
                className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-5 h-5 text-neutral-200" />
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 mb-1.5">{pillar.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Popular Food Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <Sparkles className="w-4 h-4 text-neutral-800" />
              <span>Browse By Food Types</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              Explore Our Categories
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Find authentic South & North Indian culinary essentials handcrafted fresh.
            </p>
          </div>

          <button
            onClick={() => navigateTo('categories')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-900 hover:text-black border-b-2 border-neutral-900 pb-0.5 transition-all group"
          >
            <span>View All 16 Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {popularCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 3. Featured Bestsellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <Award className="w-4 h-4 text-neutral-800" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              Popular Daily Bestsellers
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Every item made in small batches, delivered fresh to your door.
            </p>
          </div>

          <button
            onClick={() => navigateTo('categories')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-900 hover:text-black border-b-2 border-neutral-900 pb-0.5 transition-all group"
          >
            <span>Explore Entire Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Value Combo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white p-8 sm:p-12 border border-neutral-800 shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-full text-xs font-bold text-neutral-300">
                <span>Value Combo Offer • Save up to 25%</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Monthly Pantry Staples & Breakfast Hamper
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 max-w-xl">
                Get our stone-ground Chakki Atta (5kg), Avakaya Mango Pickle (500g), Sambar Masala (200g), and Jumbo California Almonds (250g) bundled together with complimentary morning delivery.
              </p>
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-extrabold text-white">₹999</span>
                <span className="text-base text-neutral-400 line-through">₹1,299</span>
                <span className="bg-white text-neutral-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Save ₹300
                </span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('categories', 'combo-packs')}
                  className="bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Pantry Combo Now</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-700 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" 
                  alt="Sumadhura Grocery Combo Pack"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (5 Core Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            Uncompromising Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
            Why Choose Sumadhura Foods?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            Built on honesty, heritage recipes, and strict quality benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              title: "Quality Food",
              desc: "Carefully sourced raw ingredients, 100% natural spices, and single-origin flours.",
              icon: Award
            },
            {
              title: "Fresh Products",
              desc: "Prepared in small batches daily. Zero stale stock and zero artificial preservatives.",
              icon: Sparkles
            },
            {
              title: "Affordable Prices",
              desc: "Direct farm-to-table supply chain eliminates middlemen markups for fair pricing.",
              icon: ShoppingBag
            },
            {
              title: "Fast Delivery",
              desc: "Morning doorstep drops before 7:00 AM so your breakfast is never delayed.",
              icon: Clock
            },
            {
              title: "Customer Satisfaction",
              desc: "Friendly toll-free support and 100% replacement guarantee if you are not delighted.",
              icon: HeartHandshake
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-2xl p-5 transition-all text-center flex flex-col items-center justify-between"
                data-aos="fade-up"
                data-aos-delay={idx * 80}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-4 shadow-sm">
                    <Icon className="w-6 h-6 text-neutral-200" />
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Fresh New Batches / Healthy Additions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <Sparkles className="w-4 h-4 text-neutral-800" />
              <span>Fresh Off The Grinder</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              New Batches & Health Staples
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Wild forest honey, roasted cashews, fresh batter and artisanal savories.
            </p>
          </div>

          <button
            onClick={() => navigateTo('categories')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-900 hover:text-black border-b-2 border-neutral-900 pb-0.5 transition-all"
          >
            <span>See All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Customer Love
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              Loved by Over 50,000+ Families
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Read how authentic taste and genuine ingredients transformed everyday meals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                key={t.id} 
                className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between"
                data-aos="fade-up"
              >
                <div>
                  <div className="flex items-center gap-1 text-neutral-900 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-neutral-900 text-neutral-900" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic mb-4">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100">
                  <h4 className="font-bold text-xs text-neutral-900">{t.name}</h4>
                  <p className="text-[11px] text-neutral-500">{t.location}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Call To Action Footer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 border border-neutral-800 shadow-xl">
          <span className="inline-block bg-neutral-800 text-neutral-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-neutral-700">
            Morning Delivery by 7:00 AM • Free Delivery Above ₹499
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
            Bring Pure & Traditional Food to Your Kitchen Today
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Order before 10:00 PM tonight and receive your freshly batched pickles, stone-ground flours, and pure ghee sweets right at your doorstep before you wake up tomorrow morning.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('categories')}
              className="bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-sm sm:text-base px-8 py-3.5 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-neutral-950" />
              <span>Shop All Products Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('services')}
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-2xl border border-neutral-700 transition-colors"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
