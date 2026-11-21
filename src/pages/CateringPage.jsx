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
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
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
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
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
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
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

  // Verified customer reviews for desktop multi-column display
  const customerReviews = [
    {
      id: 1,
      name: 'Madhu',
      location: 'Madhapur, Hyderabad',
      badge: 'Family Gathering (20 Guests)',
      initial: 'M',
      text: 'The Biryani by kg and party boxes were freshly delivered for our 20-member family gathering. Packaging, piping hot delivery, and pure ghee taste were outstanding!'
    },
    {
      id: 2,
      name: 'Divya Teja',
      location: 'Hitec City, Hyderabad',
      badge: 'Corporate Lunch (60 Boxes)',
      initial: 'DT',
      text: 'We ordered 60 meal boxes for an office workshop at Hitec City. Everything was warm, neat, individually sealed with cutlery, and delivered right on time.'
    },
    {
      id: 3,
      name: 'Ramesh Varma',
      location: 'Jubilee Hills, Hyderabad',
      badge: 'Housewarming Catering (150 Guests)',
      initial: 'RV',
      text: 'Sumadhura Caterers handled our traditional housewarming banquet. The live counter jalebis, banana leaf setup, and courteous staff made the function memorable.'
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
    <div className="min-h-screen bg-[#FAF5EC]/30 text-slate-900 pb-28 w-full overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1. HERO TOP SECTION: 100% FULL WIDTH COVER (EDGE-TO-EDGE) */}
      {/* ========================================================= */}
      <section className="w-full bg-gradient-to-b from-[#2B0307] via-[#3E040B] to-[#55060E] text-white py-6 sm:py-8 lg:py-12 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        {/* Subtle Decorative Golden Ambient Lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-rose-900/30 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 relative z-10">
          {/* Top Bar: Location, Tier Badge & Support Desk (Screenshot 1 & 2) */}
          <div className="flex items-center justify-between gap-3 pb-4 lg:pb-6 border-b border-white/10">
            {/* User Avatar + Location */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-amber-200 shadow-xs">
                <Users className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <button
                type="button"
                onClick={() => setIsLocationModalOpen?.(true)}
                className="text-left cursor-pointer group"
              >
                <div className="flex items-center gap-1 text-xs sm:text-sm lg:text-base font-black text-white group-hover:text-amber-300">
                  <span>Balapur</span>
                  <ChevronDown className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <div className="text-[10px] sm:text-xs text-amber-200/80 font-medium">Hyderabad</div>
              </button>
            </div>

            {/* Right: Tier Badge + Headphone Support Icon */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[10px] sm:text-xs font-black shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span>0 Tier</span>
                <Lock className="w-2.5 h-2.5 text-amber-300 ml-0.5" />
              </div>

              <a
                href="tel:+919121288450"
                title="Call Catering Desk"
                className="flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer text-[10px] sm:text-xs font-bold shadow-xs active:scale-95"
              >
                <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                <span className="hidden sm:inline">Catering Desk</span>
              </a>
            </div>
          </div>

          {/* ======================================================= */}
          {/* HERO SLIDE 1: 3 CATEGORY CARDS (Screenshot 1)           */}
          {/* ======================================================= */}
          {heroSlide === 0 && (
            <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-300">
              {/* Headline */}
              <div className="text-center space-y-1 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-[#F5A623] tracking-tight font-serif drop-shadow-sm">
                  Hyderabad’s favourite
                </h2>
                <div className="relative inline-block">
                  <p className="text-base sm:text-2xl lg:text-3xl font-extrabold text-white">
                    bulk food delivery app!
                  </p>
                  {/* Curved yellow underline */}
                  <svg
                    className="w-44 sm:w-60 lg:w-72 h-2.5 sm:h-3.5 text-[#F5A623] mx-auto mt-0.5"
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

              {/* 3 Cards in a row (Screenshot 1) - Generous Desktop Spacing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-8 pt-2">
                {packages.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleOpenEventModal(cat)}
                    className="group rounded-3xl bg-[#3B040B]/90 hover:bg-[#4D060E] border border-amber-400/25 hover:border-amber-400/60 p-4 sm:p-5 lg:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm sm:text-base lg:text-lg font-black tracking-wide text-white leading-tight">
                          {cat.title}
                        </h3>
                        <p className="text-xs sm:text-sm italic font-serif text-amber-200/85 leading-tight mt-0.5">
                          {cat.subtitle}
                        </p>
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] lg:text-xs font-bold text-amber-300">
                          {cat.tag}
                        </span>
                      </div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#7D0A14] group-hover:bg-[#F5A623] group-hover:text-[#3D040A] flex items-center justify-center shrink-0 shadow-md transition-colors">
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 font-bold" />
                      </div>
                    </div>

                    {/* Dish in oval cream background (Proportioned for mobile & desktop) */}
                    <div className="my-4 sm:my-5 lg:my-6 flex items-center justify-center">
                      <div className="w-44 h-28 sm:w-48 sm:h-32 lg:w-64 lg:h-40 rounded-[50%_/_40%] bg-gradient-to-b from-[#FDFBF7] to-[#F5ECE1] p-1.5 sm:p-2.5 flex items-center justify-center overflow-hidden border-2 border-amber-200/60 shadow-inner group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover rounded-[50%_/_40%] drop-shadow-md"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-center">
                      <span className="text-xs sm:text-sm text-amber-100/70 font-medium">Starting from</span>
                      <span className="text-xs sm:text-base font-black text-amber-300">
                        ₹{cat.price} <span className="text-[10px] text-white/70 font-normal">/ guest</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots indicator [ —  • ] */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setHeroSlide(0)}
                  className="w-8 h-2 rounded-full bg-[#F5A623] cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setHeroSlide(1)}
                  className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 cursor-pointer transition-colors"
                />
              </div>

              {/* Bottom Strip: "Min. 10 guests | Live in Hyderabad" */}
              <div className="text-center pt-1">
                <span className="text-xs sm:text-sm lg:text-base font-bold text-amber-200/90 tracking-wide px-5 py-1.5 rounded-full bg-black/40 border border-white/10 inline-block backdrop-blur-xs">
                  Min. 10 guests <span className="text-white/40 mx-2.5">|</span> Live in Hyderabad
                </span>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* HERO SLIDE 2: ORDER ITEMS BY KG (Screenshot 2)          */}
          {/* ======================================================= */}
          {heroSlide === 1 && (
            <div className="py-4 lg:py-6 space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-12 max-w-5xl mx-auto">
                {/* Left Text */}
                <div className="space-y-3 lg:space-y-4 md:max-w-[55%] text-center md:text-left">
                  <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] lg:text-xs font-black uppercase tracking-wider border border-amber-400/30 inline-block">
                    NEW FEATURE
                  </span>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-serif leading-tight">
                    Order <span className="text-[#F5A623]">Items by Kg</span>
                  </h2>
                  <p className="text-xs sm:text-base lg:text-lg text-amber-100/90 font-medium leading-relaxed">
                    Pick individual bulk items, authentic curries, pulavs & sweets in the exact kg quantity you need for your celebration.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleOpenEventModal(packages[0])}
                    className="mt-2 px-6 py-3 rounded-full bg-[#F5A623] hover:bg-[#E09215] text-[#3D040A] text-sm sm:text-base font-black shadow-xl inline-flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                  >
                    <span>Explore Item by Kg</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Right Biryani Handi with "2 kg Biryani" floating badge (Screenshot 2) */}
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="absolute -top-3 right-3 px-3.5 py-1.5 bg-white text-[#7D0A14] text-xs sm:text-sm font-black rounded-xl shadow-xl border border-amber-200 z-10">
                    2 kg Biryani
                  </div>
                  <div className="w-48 h-40 sm:w-64 sm:h-52 lg:w-80 lg:h-64 rounded-full overflow-hidden border-4 border-amber-300/60 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
                      alt="Biryani by Kg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Dots indicator [ •  — ] */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setHeroSlide(0)}
                  className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 cursor-pointer transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setHeroSlide(1)}
                  className="w-8 h-2 rounded-full bg-[#F5A623] cursor-pointer"
                />
              </div>

              {/* Bottom Strip: "Min. 5 guests | Live in Hyderabad" */}
              <div className="text-center pt-1">
                <span className="text-xs sm:text-sm lg:text-base font-bold text-amber-200/90 tracking-wide px-5 py-1.5 rounded-full bg-black/40 border border-white/10 inline-block backdrop-blur-xs">
                  Min. 5 guests <span className="text-white/40 mx-2.5">|</span> Live in Hyderabad
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. "START HERE" SEPARATOR & BROWSE ALL MENUS (FULL WIDTH) */}
      {/* ========================================================= */}
      <section className="w-full bg-[#FAF5EC]/50 py-6 sm:py-8 lg:py-10 px-4 sm:px-8 border-b border-[#EDE1D1]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="relative flex items-center justify-center max-w-xl mx-auto">
            <div className="border-t border-[#E8DDCF] w-full" />
            <div className="absolute bg-[#FAF5EC] px-4 text-xs sm:text-sm font-black text-slate-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Start here</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            </div>
          </div>

          {/* Browse all menus Button (Screenshot 1 & 2) */}
          <div className="max-w-md lg:max-w-lg mx-auto pt-2">
            <button
              type="button"
              onClick={() => handleOpenEventModal()}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-white via-[#FAF5EC] to-white hover:from-white hover:to-white border-2 border-rose-200/80 hover:border-[#7D0A14] text-[#7D0A14] font-black text-sm sm:text-base lg:text-lg shadow-sm hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-98"
            >
              <span>Browse all menus</span>
              <div className="w-7 h-7 rounded-full bg-[#7D0A14] text-white flex items-center justify-center group-hover:translate-x-1.5 transition-transform shadow-xs">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SOCIAL PROOF & STATS BANNER (FULL WIDTH)               */}
      {/* ========================================================= */}
      <section className="w-full bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-8 border-b border-[#EDE1D1] text-center">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          {/* Golden Laurel Wreath with 2,70,000 Guests Served */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-8 h-10 sm:w-11 sm:h-14 text-amber-500" viewBox="0 0 36 48" fill="currentColor">
                <path d="M18 4C14 10 8 16 3 20C10 21 16 19 18 16C15 22 10 27 3 31C10 31 16 29 18 26C15 32 10 38 4 41C12 40 18 36 20 32C19 37 15 43 10 46C18 45 23 39 25 34C24 40 21 45 17 48C25 46 29 39 31 32C30 38 28 43 24 47C32 43 35 34 36 26C32 28 28 29 25 28C29 22 31 14 30 7C26 12 21 15 18 16C21 10 22 4 20 0C17 5 15 10 13 15C15 9 15 4 13 0C11 5 9 10 8 15C11 10 12 5 11 1C8 6 6 12 6 18C10 16 14 13 18 4Z" />
              </svg>

              <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#A66F17] font-serif tracking-tight">
                2,70,000
              </div>

              <svg className="w-8 h-10 sm:w-11 sm:h-14 text-amber-500 -scale-x-100" viewBox="0 0 36 48" fill="currentColor">
                <path d="M18 4C14 10 8 16 3 20C10 21 16 19 18 16C15 22 10 27 3 31C10 31 16 29 18 26C15 32 10 38 4 41C12 40 18 36 20 32C19 37 15 43 10 46C18 45 23 39 25 34C24 40 21 45 17 48C25 46 29 39 31 32C30 38 28 43 24 47C32 43 35 34 36 26C32 28 28 29 25 28C29 22 31 14 30 7C26 12 21 15 18 16C21 10 22 4 20 0C17 5 15 10 13 15C15 9 15 4 13 0C11 5 9 10 8 15C11 10 12 5 11 1C8 6 6 12 6 18C10 16 14 13 18 4Z" />
              </svg>
            </div>
            <div className="text-xs sm:text-sm lg:text-base font-bold text-slate-500 mt-1 uppercase tracking-wider">
              Guests served in Hyderabad
            </div>
          </div>

          {/* 3 Metric Columns: 7000+ | 4.3 | 85% (Screenshot 1 & 2) */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 border-t border-slate-100 max-w-2xl mx-auto">
            <div>
              <div className="text-xl sm:text-3xl lg:text-4xl font-black text-[#3D040A]">7000+</div>
              <div className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Events catered</div>
            </div>
            <div className="border-x border-slate-100 px-3">
              <div className="text-xl sm:text-3xl lg:text-4xl font-black text-[#7D0A14] flex items-center justify-center gap-1">
                <span>4.3</span>
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400 inline" />
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Rated on Google</div>
            </div>
            <div>
              <div className="text-xl sm:text-3xl lg:text-4xl font-black text-emerald-700">85%</div>
              <div className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Satisfied customers</div>
            </div>
          </div>

          {/* 3 Trust Pills in a row with purple/maroon arrow button (Screenshot 1 & 2) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-3 max-w-lg mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold border border-slate-200 shadow-2xs">
              100% hygiene
            </span>
            <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold border border-slate-200 shadow-2xs">
              Quality Checked
            </span>
            <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold border border-slate-200 shadow-2xs">
              Quantity Assured
            </span>
            <button
              type="button"
              onClick={() => handleOpenEventModal()}
              className="w-8 h-8 rounded-full bg-[#7D0A14] text-white flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#60060E] transition-colors shadow-xs"
            >
              <ChevronRight className="w-4 h-4 font-bold" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. CUSTOMER REVIEWS: 3-COLUMN GRID ON DESKTOP (FULL WIDTH)*/}
      {/* ========================================================= */}
      <section className="w-full bg-[#FAF5EC]/30 py-8 sm:py-12 lg:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-4xl font-serif text-[#7D0A14]/30 leading-none">“</span>
              <h3 className="text-base sm:text-xl lg:text-2xl font-black text-slate-900">
                Hear what our customers are saying
              </h3>
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#7D0A14] hidden sm:inline">
              Verified Hyderabad Hosts
            </span>
          </div>

          {/* Multi-column grid on desktop! */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
            {customerReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 lg:p-6 rounded-3xl border border-[#EDE1D1] shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#7D0A14] text-amber-200 text-xs font-black flex items-center justify-center shadow-xs">
                        {rev.initial}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-black text-slate-800">{rev.name}</div>
                        <div className="text-[11px] text-slate-400">{rev.location}</div>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-100 text-xs font-bold text-amber-800">
                  {rev.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* 5. FLOATING CART BAR (Matches Screenshot 1 & 2)             */}
      {/* =========================================================== */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 px-4 pointer-events-none">
          <div className="max-w-md sm:max-w-xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-2xl flex items-center justify-between gap-3 pointer-events-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-2xs">
                <img
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=150&q=80"
                  alt="Platter"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-800">
                  {totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'} in cart
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-semibold">
                  Review &amp; Checkout
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('cart')}
              className="px-5 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md transition-colors cursor-pointer active:scale-95"
            >
              <span>Go to cart</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================== */}
      {/* 6. "TELL US ABOUT YOUR EVENT" MODAL (Screenshot 3!)         */}
      {/* =========================================================== */}
      {isEventModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 p-0 sm:p-4"
          onClick={() => setIsEventModalOpen(false)}
        >
          <div
            className="bg-white rounded-t-[32px] sm:rounded-3xl max-w-md sm:max-w-lg w-full px-5 pt-3 pb-8 sm:p-7 space-y-4 shadow-2xl border border-slate-200 relative animate-in slide-in-from-bottom duration-250 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Sheet Drag Handle Pill */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto sm:hidden my-1" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Tell us about your event
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Step {eventStep} of 2 • Custom catering quote in 10 seconds
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ======================================================= */}
            {/* STEP 1: MEAL TIME & PREFERENCE (Matches Screenshot 3)   */}
            {/* ======================================================= */}
            {eventStep === 1 && (
              <div className="space-y-5 pt-1">
                {/* Select Meal Time */}
                <div>
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider block mb-2.5">
                    Select Meal Time
                  </label>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {mealTimes.map((m) => {
                      const isSelected = selectedMealTime === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setSelectedMealTime(m.id)}
                          className={`p-2 sm:p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FFF9F2] border-[#7D0A14] text-[#7D0A14] shadow-sm ring-1.5 ring-[#7D0A14] scale-[1.02]'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-2xl transition-transform ${
                            isSelected ? 'scale-110 bg-white shadow-2xs' : 'bg-slate-50'
                          }`}>
                            {m.icon}
                          </div>
                          <span className={`text-[11px] sm:text-xs font-bold leading-tight ${isSelected ? 'text-[#7D0A14]' : 'text-slate-700'}`}>
                            {m.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preference: Veg / Non-Veg */}
                <div>
                  <label className="text-xs font-black uppercase text-slate-500 tracking-wider block mb-2.5">
                    Preference
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPreference('Veg')}
                      className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2.5 cursor-pointer transition-all ${
                        selectedPreference === 'Veg'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-black ring-1.5 ring-emerald-500 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 font-bold hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-xs border-2 border-emerald-600 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      </span>
                      <span className="text-xs sm:text-sm font-black">Veg</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPreference('Non-Veg')}
                      className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2.5 cursor-pointer transition-all ${
                        selectedPreference === 'Non-Veg'
                          ? 'bg-rose-50 border-rose-600 text-rose-950 font-black ring-1.5 ring-rose-500 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 font-bold hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-xs border-2 border-rose-600 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-rose-600" />
                      </span>
                      <span className="text-xs sm:text-sm font-black">Non-Veg</span>
                    </button>
                  </div>
                </div>

                {/* Big Prominent Next Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setEventStep(2)}
                    className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-sm sm:text-base font-black shadow-lg shadow-red-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* STEP 2: GUEST COUNT & WHATSAPP CONFIRMATION             */}
            {/* ======================================================= */}
            {eventStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200 pt-1">
                {/* Selected Package Badge & Quick Back */}
                <div className="flex items-center justify-between pb-1">
                  <button
                    type="button"
                    onClick={() => setEventStep(1)}
                    className="flex items-center gap-1 text-xs font-bold text-[#7D0A14] hover:underline cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Meal Time</span>
                  </button>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-black text-amber-800">
                    {selectedMealTime} • {selectedPreference}
                  </span>
                </div>

                {/* Guest Count Slider & Quick Presets */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-700">
                    <span>Number of Guests:</span>
                    <span className="text-[#7D0A14] font-black text-sm sm:text-base bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                      {guestCount} Guests
                    </span>
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

                  {/* Quick Preset Buttons */}
                  <div className="flex items-center justify-between gap-1.5 pt-1">
                    {[15, 25, 50, 100, 250].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setGuestCount(preset)}
                        className={`flex-1 py-1 text-[10px] sm:text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          guestCount === preset
                            ? 'bg-[#7D0A14] text-white border-[#7D0A14]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Date */}
                <div>
                  <label className="text-[11px] sm:text-xs font-bold text-slate-700 block mb-1">
                    Target Event Date:
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 bg-[#FAF5EC] focus:outline-none focus:ring-1 focus:ring-[#7D0A14]"
                  />
                </div>

                {/* Summary Quote Box */}
                <div className="p-3.5 sm:p-4 bg-[#FAF5EC] rounded-2xl border border-[#EDE1D1] flex items-center justify-between text-xs sm:text-sm">
                  <div>
                    <div className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-500">
                      Estimated Cost ({selectedMealTime} • {selectedPreference})
                    </div>
                    <div className="text-lg sm:text-xl font-black text-[#7D0A14]">
                      ₹{((selectedPackage?.price || 249) * guestCount).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium">
                      ₹{selectedPackage?.price || 249} / guest × {guestCount} guests
                    </div>
                  </div>
                  <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <span>Confirm & Book on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEventStep(1)}
                    className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    ← Edit Meal Time & Preference
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
