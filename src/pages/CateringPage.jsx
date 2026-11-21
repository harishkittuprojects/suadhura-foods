import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Headphones,
  ArrowRight,
  Check,
  Star,
  X,
  Sparkles,
  PhoneCall,
  Calendar,
  Users,
  Utensils,
  ShieldCheck,
  Lock,
  ArrowLeft,
  ShoppingCart
} from 'lucide-react';

export const CateringPage = () => {
  const { navigateTo, totalCartCount, cart, showToast, setIsLocationModalOpen } = useShop();

  // Hero carousel slide (0 = 3 Cards Delivery/Meal/Catering, 1 = Order Items by Kg)
  const [heroSlide, setHeroSlide] = useState(0);

  // Tell us about your event modal state
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventStep, setEventStep] = useState(1); // 1 = Meal Time & Preference, 2 = Guest Count & Package
  const [selectedMealTime, setSelectedMealTime] = useState('Lunch');
  const [selectedPreference, setSelectedPreference] = useState('Veg');
  const [guestCount, setGuestCount] = useState(25);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [eventDate, setEventDate] = useState('');

  // Auto slide hero carousel every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const mealTimes = [
    {
      id: 'Breakfast',
      label: 'Breakfast',
      time: '7 AM - 10 AM',
      icon: '🥞',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'Lunch',
      label: 'Lunch',
      time: '12 PM - 3 PM',
      icon: '🍛',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'Snacks',
      label: 'Snacks',
      time: '4 PM - 7 PM',
      icon: '☕',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'Dinner',
      label: 'Dinner',
      time: '7 PM - 11 PM',
      icon: '🍲',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const packages = [
    {
      id: 'delivery-box',
      title: 'DELIVERY BOX',
      subtitle: 'for party events',
      tag: '10 - 50 guests',
      price: 249,
      minGuests: 10,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80',
      items: [
        'Paneer Tikka / Veg Manchurian',
        'Special Hyderabadi Dum Biryani',
        'Mirchi Ka Salan & Cucumber Raita',
        'Tawa Butter Phulka (2 pcs)',
        'Paneer Butter Masala',
        'Hot Gulab Jamun (2 pcs)',
        'Plates, Spoons & Wet Wipes Included'
      ]
    },
    {
      id: 'meal-box',
      title: 'MEAL BOX',
      subtitle: 'for corporates',
      tag: 'Min. 15 boxes',
      price: 189,
      minGuests: 15,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80',
      items: [
        '2 Soft Ghee Phulkas / Rotis',
        'Fragrant Jeera / Steamed Rice',
        'Yellow Dal Tadka / Makhani',
        'Paneer Curry / Mix Veg',
        'Fresh Salad & Mango Pickle',
        'Mini Sweet Halwa / Gulab Jamun',
        'Packaged Drinking Water & Cutlery'
      ]
    },
    {
      id: 'catering',
      title: 'CATERING',
      subtitle: 'for large events',
      tag: '50 - 2000+ guests',
      price: 499,
      minGuests: 50,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=500&q=80',
      items: [
        'Welcome Drinks (Badam Milk & Tender Coconut)',
        '3 Live Tandoor Starters',
        'Live Chaat & Pani Puri Counter',
        'Live Naan & Roomali Roti Counter',
        '4 Premium Curries & Royal Dal Bukhara',
        'Hyderabadi Veg Biryani & Bagara Rice',
        'Assorted Dessert Platter & Ice Cream',
        'Uniformed Service Boys & Chafing Dishes'
      ]
    }
  ];

  const handleOpenEventModal = (preselected = null) => {
    if (preselected) {
      setSelectedPackage(preselected);
      setGuestCount(preselected.minGuests);
    } else {
      setSelectedPackage(packages[0]);
    }
    setEventStep(1);
    setIsEventModalOpen(true);
  };

  const handleWhatsAppInquiry = () => {
    const pkg = selectedPackage || packages[0];
    const total = pkg.price * guestCount;
    const msg = `Hello Sumadhura Caterers! 🍛\n\nI want to book catering in Hyderabad:\n- Event Type: ${pkg.title} (${pkg.subtitle})\n- Meal Time: ${selectedMealTime}\n- Preference: ${selectedPreference}\n- Guests: ${guestCount}\n- Date: ${eventDate || 'Upcoming Weekend'}\n- Estimated Budget: ₹${total.toLocaleString('en-IN')}\n\nPlease share the detailed menu and confirm availability!`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919121288450?text=${encoded}`, '_blank');
    showToast('Connecting with Sumadhura Catering Desk on WhatsApp!');
    setIsEventModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF5EC]/30 text-slate-900 pb-28">
      {/* Top Navigation Strip */}
      <div className="bg-white border-b border-[#EDE1D1] sticky top-0 z-30 px-3 sm:px-6 py-2">
        <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#7D0A14] hover:text-[#5A0710] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </button>
          <div className="flex items-center gap-1 text-[11px] font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Sumadhura Caterers</span>
          </div>
        </div>
      </div>

      {/* Main Centered App Container matching mobile screenshots */}
      <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto bg-white sm:shadow-xl sm:rounded-3xl overflow-hidden border border-[#EDE1D1] sm:my-3">
        {/* ========================================================= */}
        {/* 1. HERO TOP SECTION: DEEP ROYAL WINE BACKGROUND          */}
        {/* ========================================================= */}
        <div className="bg-gradient-to-b from-[#2B0307] via-[#3E040B] to-[#55060E] text-white p-4 sm:p-5 relative overflow-hidden">
          {/* Top Bar: Location, Tier Badge & Support Desk (Screenshot 1 & 2) */}
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10 relative z-10">
            {/* User Avatar + Location */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-amber-200">
                <Users className="w-4 h-4" />
              </div>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen?.(true)}
                className="text-left cursor-pointer group"
              >
                <div className="flex items-center gap-1 text-xs font-black text-white group-hover:text-amber-300">
                  <span>Balapur</span>
                  <ChevronDown className="w-3 h-3 text-amber-300" />
                </div>
                <div className="text-[10px] text-amber-200/80 font-medium">Hyderabad</div>
              </button>
            </div>

            {/* Right: Tier Badge + Headphone Support Icon */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[10px] font-black shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span>0 Tier</span>
                <Lock className="w-2.5 h-2.5 text-amber-300 ml-0.5" />
              </div>

              <a
                href="tel:+919121288450"
                title="Call Catering Desk"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-amber-300" />
              </a>
            </div>
          </div>

          {/* ======================================================= */}
          {/* HERO SLIDE 1: 3 CATEGORY CARDS (Screenshot 1)           */}
          {/* ======================================================= */}
          {heroSlide === 0 && (
            <div className="pt-4 pb-2 space-y-3.5 animate-in fade-in duration-300">
              {/* Headline */}
              <div className="text-center space-y-0.5">
                <h2 className="text-xl sm:text-2xl font-black text-[#F5A623] tracking-tight font-serif">
                  Hyderabad’s favourite
                </h2>
                <div className="relative inline-block">
                  <p className="text-sm sm:text-base font-extrabold text-white">
                    bulk food delivery app!
                  </p>
                  {/* Curved yellow underline */}
                  <svg
                    className="w-36 h-2 text-[#F5A623] mx-auto mt-0.5"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M3 9C60 2 140 2 197 9"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* 3 Cards in a row (Screenshot 1) */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {packages.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleOpenEventModal(cat)}
                    className="group rounded-2xl bg-[#3B040B]/90 hover:bg-[#4D060E] border border-amber-400/25 hover:border-amber-400/60 p-2.5 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-md hover:scale-102"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h3 className="text-[10px] sm:text-[11px] font-black tracking-wide text-white leading-tight">
                          {cat.title}
                        </h3>
                        <p className="text-[9px] italic font-serif text-amber-200/80 leading-tight">
                          {cat.subtitle}
                        </p>
                      </div>
                      <div className="w-4 h-4 rounded-full bg-white text-[#7D0A14] flex items-center justify-center shrink-0">
                        <ChevronRight className="w-3 h-3 font-bold" />
                      </div>
                    </div>

                    {/* Dish in oval cream background */}
                    <div className="my-2 flex items-center justify-center">
                      <div className="w-24 h-16 sm:w-28 sm:h-20 rounded-[50%_/_40%] bg-gradient-to-b from-[#FDFBF7] to-[#F5ECE1] p-1 flex items-center justify-center overflow-hidden border border-amber-200/60 shadow-xs">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover rounded-[50%_/_40%]"
                        />
                      </div>
                    </div>

                    <div className="text-[9px] text-amber-300 font-bold text-center">
                      ₹{cat.price}/head
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots indicator [ —  • ] */}
              <div className="flex items-center justify-center gap-1.5 pt-2">
                <button
                  type="button"
                  onClick={() => setHeroSlide(0)}
                  className="w-6 h-1.5 rounded-full bg-[#F5A623] cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setHeroSlide(1)}
                  className="w-1.5 h-1.5 rounded-full bg-white/40 cursor-pointer"
                />
              </div>

              {/* Bottom Strip: "Min. 10 guests | Live in Hyderabad" */}
              <div className="text-center pt-0.5">
                <span className="text-[11px] font-bold text-amber-200/90 tracking-wide">
                  Min. 10 guests <span className="text-white/40 mx-1.5">|</span> Live in Hyderabad
                </span>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* HERO SLIDE 2: ORDER ITEMS BY KG (Screenshot 2)          */}
          {/* ======================================================= */}
          {heroSlide === 1 && (
            <div className="pt-3 pb-2 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between gap-3">
                {/* Left Text */}
                <div className="space-y-1.5 max-w-[55%]">
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[9px] font-black uppercase tracking-wider border border-amber-400/30">
                    NEW
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-serif leading-tight">
                    Order <br />
                    <span className="text-[#F5A623]">Items by Kg</span>
                  </h2>
                  <p className="text-[11px] text-amber-100/90 font-medium leading-snug">
                    Pick individual items, in the quantity you need
                  </p>
                  <button
                    type="button"
                    onClick={() => handleOpenEventModal(packages[0])}
                    className="mt-2 px-3 py-1.5 rounded-full bg-[#F5A623] hover:bg-[#E09215] text-[#3D040A] text-[11px] font-black shadow-md flex items-center gap-1 cursor-pointer transition-transform active:scale-95"
                  >
                    <span>Explore Item by Kg</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Right Biryani Handi with "2 kg Biryani" floating badge (Screenshot 2) */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute -top-1.5 right-1 px-2 py-0.5 bg-white text-[#7D0A14] text-[9.5px] font-black rounded-lg shadow-md border border-amber-200 z-10">
                    2 kg Biryani
                  </div>
                  <div className="w-32 h-28 sm:w-36 sm:h-32 rounded-full overflow-hidden border-2 border-amber-300/60 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80"
                      alt="Biryani by Kg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Dots indicator [ •  — ] */}
              <div className="flex items-center justify-center gap-1.5 pt-2">
                <button
                  type="button"
                  onClick={() => setHeroSlide(0)}
                  className="w-1.5 h-1.5 rounded-full bg-white/40 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setHeroSlide(1)}
                  className="w-6 h-1.5 rounded-full bg-[#F5A623] cursor-pointer"
                />
              </div>

              {/* Bottom Strip: "Min. 5 guests | Live in Hyderabad" */}
              <div className="text-center pt-0.5">
                <span className="text-[11px] font-bold text-amber-200/90 tracking-wide">
                  Min. 5 guests <span className="text-white/40 mx-1.5">|</span> Live in Hyderabad
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 2. "START HERE" SEPARATOR & BROWSE ALL MENUS (Screenshot 1&2)*/}
        {/* ========================================================= */}
        <div className="p-4 sm:p-5 space-y-3 bg-[#FAF5EC]/40">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E8DDCF] w-full" />
            <div className="absolute bg-[#FDFBF7] px-3 text-[11px] font-black text-slate-700 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-rose-400" />
              <span>Start here</span>
              <span className="w-1 h-1 rounded-full bg-rose-400" />
            </div>
          </div>

          {/* Browse all menus Button (Screenshot 1 & 2) */}
          <button
            type="button"
            onClick={() => handleOpenEventModal()}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-white via-[#FAF5EC] to-white hover:from-white hover:to-white border border-rose-200/80 hover:border-[#7D0A14] text-[#7D0A14] font-black text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-98"
          >
            <span>Browse all menus</span>
            <div className="w-5 h-5 rounded-full bg-[#7D0A14] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* ========================================================= */}
        {/* 3. SOCIAL PROOF & STATS BANNER (Screenshot 1 & 2)         */}
        {/* ========================================================= */}
        <div className="px-4 py-5 sm:p-6 bg-white border-t border-[#EDE1D1] text-center space-y-4">
          {/* Golden Laurel Wreath with 2,70,000 Guests Served */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-6 h-8 text-amber-500" viewBox="0 0 36 48" fill="currentColor">
                <path d="M18 4C14 10 8 16 3 20C10 21 16 19 18 16C15 22 10 27 3 31C10 31 16 29 18 26C15 32 10 38 4 41C12 40 18 36 20 32C19 37 15 43 10 46C18 45 23 39 25 34C24 40 21 45 17 48C25 46 29 39 31 32C30 38 28 43 24 47C32 43 35 34 36 26C32 28 28 29 25 28C29 22 31 14 30 7C26 12 21 15 18 16C21 10 22 4 20 0C17 5 15 10 13 15C15 9 15 4 13 0C11 5 9 10 8 15C11 10 12 5 11 1C8 6 6 12 6 18C10 16 14 13 18 4Z" />
              </svg>

              <div className="text-2xl sm:text-3xl font-black text-[#A66F17] font-serif tracking-tight">
                2,70,000
              </div>

              <svg className="w-6 h-8 text-amber-500 -scale-x-100" viewBox="0 0 36 48" fill="currentColor">
                <path d="M18 4C14 10 8 16 3 20C10 21 16 19 18 16C15 22 10 27 3 31C10 31 16 29 18 26C15 32 10 38 4 41C12 40 18 36 20 32C19 37 15 43 10 46C18 45 23 39 25 34C24 40 21 45 17 48C25 46 29 39 31 32C30 38 28 43 24 47C32 43 35 34 36 26C32 28 28 29 25 28C29 22 31 14 30 7C26 12 21 15 18 16C21 10 22 4 20 0C17 5 15 10 13 15C15 9 15 4 13 0C11 5 9 10 8 15C11 10 12 5 11 1C8 6 6 12 6 18C10 16 14 13 18 4Z" />
              </svg>
            </div>
            <div className="text-[11px] font-bold text-slate-500 mt-0.5">
              Guests served in Hyderabad
            </div>
          </div>

          {/* 3 Metric Columns: 7000+ | 4.3 | 85% (Screenshot 1 & 2) */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
            <div>
              <div className="text-base sm:text-lg font-black text-[#3D040A]">7000+</div>
              <div className="text-[10px] text-slate-500 font-semibold">Events catered</div>
            </div>
            <div className="border-x border-slate-100 px-1">
              <div className="text-base sm:text-lg font-black text-[#7D0A14] flex items-center justify-center gap-0.5">
                <span>4.3</span>
              </div>
              <div className="text-[10px] text-slate-500 font-semibold">Rated</div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-black text-emerald-700">85%</div>
              <div className="text-[10px] text-slate-500 font-semibold">Satisfied customers</div>
            </div>
          </div>

          {/* 3 Trust Pills in a row with purple/maroon arrow button (Screenshot 1 & 2) */}
          <div className="flex items-center justify-between gap-1.5 pt-2">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
              100% hygiene
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
              Quality Checked
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
              Quantity Assured
            </span>
            <button
              type="button"
              onClick={() => handleOpenEventModal()}
              className="w-6 h-6 rounded-full bg-[#7D0A14] text-white flex items-center justify-center shrink-0 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 font-bold" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. CUSTOMER REVIEWS (Screenshot 1 & 2)                    */}
        {/* ========================================================= */}
        <div className="p-4 sm:p-5 bg-[#FAF5EC]/30 border-t border-[#EDE1D1] space-y-3">
          <div className="text-2xl font-serif text-[#7D0A14]/30 leading-none">“</div>
          <div className="space-y-2">
            <div className="bg-white p-3.5 rounded-2xl border border-[#EDE1D1] shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#7D0A14] text-amber-200 text-xs font-black flex items-center justify-center">
                  M
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800">Madhu</div>
                  <div className="text-[10px] text-slate-400">Hyderabad Host</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed italic">
                "The Biryani by kg and party boxes were freshly delivered for our 20-member family gathering. Packaging and pure ghee taste were outstanding!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================== */}
      {/* 5. FLOATING CART BAR (Screenshot 1 & 2)                     */}
      {/* =========================================================== */}
      <div className="fixed bottom-3 left-0 right-0 z-40 px-3">
        <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-slate-200 shadow-xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=150&q=80"
                alt="Platter"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-black text-slate-800">
                {totalCartCount > 0 ? `${totalCartCount} Items in cart` : '1 Platter'}
              </div>
              <div className="text-[10px] text-slate-500 font-semibold">
                {totalCartCount > 0 ? 'Review & Checkout' : 'In cart'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('cart')}
            className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1 shadow-md transition-colors cursor-pointer active:scale-95"
          >
            <span>Go to cart</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =========================================================== */}
      {/* 6. "TELL US ABOUT YOUR EVENT" MODAL (Screenshot 3!)         */}
      {/* =========================================================== */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200 relative animate-in slide-in-from-bottom duration-250">
            {/* Modal Close Button */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                Tell us about your event
              </h3>
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {eventStep === 1 && (
              <div className="space-y-4">
                {/* Step 1: Select Meal Time (Screenshot 3) */}
                <div>
                  <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider block mb-2">
                    Select Meal Time
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {mealTimes.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMealTime(m.id)}
                        className={`p-2 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                          selectedMealTime === m.id
                            ? 'bg-amber-50 border-[#7D0A14] text-[#7D0A14] shadow-xs scale-102 font-black'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-bold'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center text-lg">
                          {m.icon}
                        </div>
                        <span className="text-[10px] leading-tight">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Preference (Veg / Non-Veg) (Screenshot 3) */}
                <div>
                  <label className="text-[11px] font-black uppercase text-slate-500 tracking-wider block mb-2">
                    Preference
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPreference('Veg')}
                      className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        selectedPreference === 'Veg'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-black ring-1 ring-emerald-500'
                          : 'bg-white border-slate-200 text-slate-600 font-bold'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-sm border border-emerald-600 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      </span>
                      <span className="text-xs">Veg</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPreference('Non-Veg')}
                      className={`flex-1 py-2 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        selectedPreference === 'Non-Veg'
                          ? 'bg-rose-50 border-rose-600 text-rose-900 font-black ring-1 ring-rose-500'
                          : 'bg-white border-slate-200 text-slate-600 font-bold'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-sm border border-rose-600 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-rose-600" />
                      </span>
                      <span className="text-xs">Non-Veg</span>
                    </button>
                  </div>
                </div>

                {/* Next Button (Screenshot 3) */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setEventStep(2)}
                    className="w-full py-3 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {eventStep === 2 && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                {/* Guest Count Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                    <span>Number of Guests:</span>
                    <span className="text-[#7D0A14] font-black text-sm">{guestCount} Guests</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full accent-[#7D0A14] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>10 Min</span>
                    <span>100</span>
                    <span>250</span>
                    <span>500+</span>
                  </div>
                </div>

                {/* Target Date */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Target Event Date:
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-[#FAF5EC] focus:outline-none focus:ring-1 focus:ring-[#7D0A14]"
                  />
                </div>

                {/* Summary Quote Box */}
                <div className="p-3 bg-[#FAF5EC] rounded-2xl border border-[#EDE1D1] flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">
                      Estimated Cost ({selectedMealTime} • {selectedPreference})
                    </div>
                    <div className="text-lg font-black text-[#7D0A14]">
                      ₹{((selectedPackage?.price || 249) * guestCount).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      ₹{selectedPackage?.price || 249} / guest × {guestCount} guests
                    </div>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Confirm & Book on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEventStep(1)}
                    className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    ← Back to Meal Time
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
