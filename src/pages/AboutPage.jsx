import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Truck, 
  Leaf, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      
      {/* Hero Banner */}
      <div className="bg-neutral-50 rounded-3xl p-6 sm:p-14 border border-neutral-200">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            About Sumadhura Foods
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 mt-2 tracking-tight leading-tight">
            Restoring Authentic Purity to Every Indian Household
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-4 leading-relaxed">
            Sumadhura Foods was established with a singular mission: to provide customers with the highest quality, authentic, and unadulterated food products through a seamless online shopping experience. We bridge the gap between traditional generational cooking practices and modern doorstep delivery.
          </p>
        </div>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-6 space-y-5" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-xs font-bold text-neutral-800">
            <span>Our Foundation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Traditional Recipes, Zero Artificial Shortcuts
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            In an era of industrial shortcuts, refined palm oils, artificial essences, and chemical preservatives, genuine taste has become increasingly rare. Sumadhura Foods returns to the fundamentals:
          </p>

          <div className="space-y-3 pt-2 text-xs text-neutral-700">
            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-neutral-900 block">Stone-Ground & Cold-Pressed</span>
                <span className="text-neutral-500">Our flours and spice blends are stone-ground at controlled low temperatures to retain heat-sensitive natural oils and dietary fiber.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-neutral-900 block">Pure Desi Cow Ghee & Cold-Pressed Sesame Oils</span>
                <span className="text-neutral-500">Every sweet and pickle is prepared strictly using genuine cow ghee and wood-pressed seed oils. We enforce a 100% zero palm-oil and zero hydrogenated fat policy.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-neutral-900 block">Batch Prepared Daily</span>
                <span className="text-neutral-500">Rather than sitting in warehouses for months, our products are made in small batches and dispatched in temperature-controlled vans.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6" data-aos="fade-up">
          <div className="relative rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xl aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80" 
              alt="Authentic traditional spices and grains selection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="text-xs uppercase tracking-widest text-neutral-300 font-semibold block">Quality Assurance</span>
                <h3 className="text-lg font-bold">50+ Rigorous Laboratory Tests on Every Batch</h3>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Core Principles (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-7 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mx-auto shadow-sm">
            <Leaf className="w-6 h-6 text-neutral-200" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900">Direct Farm Sourcing</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            We partner with generational farmers across Andhra Pradesh, Karnataka, Telangana, and Maharashtra to source single-origin turmeric, Sharbati wheat, and fresh mangoes.
          </p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-7 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-6 h-6 text-neutral-200" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900">FSSAI Certified Facilities</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Our packing facilities operate under stringent pharmaceutical-grade hygiene standards, stainless steel machinery, and double vacuum sealed food packaging.
          </p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-7 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mx-auto shadow-sm">
            <Clock className="w-6 h-6 text-neutral-200" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900">Guaranteed Fresh Delivery</h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Our daily logistics network ensures your batter, breads, snacks and pantry staples arrive before 7:00 AM so your family's morning routine is always supported.
          </p>
        </div>
      </div>

      {/* Final CTA Banner */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-neutral-800">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ready to Taste the Difference?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
          Explore our collection of authentic pickles, pure ghee sweets, and freshly ground flours.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('categories')}
            className="bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs sm:text-sm px-7 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 mx-auto"
          >
            <ShoppingBag className="w-4 h-4 text-neutral-950" />
            <span>Shop Sumadhura Foods</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
