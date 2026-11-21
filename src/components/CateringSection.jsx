import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  MapPin,
  Award,
  Headphones,
  ChevronRight,
  ArrowRight,
  Star,
  Users,
  Calendar,
  Sparkles,
  CheckCircle2,
  Utensils,
  Package,
  PhoneCall,
  MessageSquare,
  X,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const CateringSection = () => {
  const { navigateTo, showToast, setIsLocationModalOpen } = useShop();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [guestCount, setGuestCount] = useState(25);
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Birthday Party');

  // Catering Category Cards matching the screenshot
  const cateringCategories = [
    {
      id: 'delivery-box',
      title: 'DELIVERY BOX',
      subtitle: 'for party events',
      tag: '10 - 50 Guests',
      desc: 'Steaming hot party feast boxes delivered right to your doorstep with zero setup needed.',
      minGuests: 10,
      pricePerHead: 249,
      // High-resolution aromatic party feast image
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      alt: 'Sumadhura Party Delivery Box'
    },
    {
      id: 'meal-box',
      title: 'MEAL BOX',
      subtitle: 'for corporates',
      tag: 'Min. 15 Boxes',
      desc: 'Hygienic 4-compartment executive thali trays with disposable cutlery for offices & training.',
      minGuests: 15,
      pricePerHead: 189,
      // Executive 4-compartment Indian meal thali
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      alt: 'Sumadhura Corporate Meal Box'
    },
    {
      id: 'catering',
      title: 'CATERING',
      subtitle: 'for large events',
      tag: '50 - 2000+ Guests',
      desc: 'Grand live buffet counters, royal chafers, uniformed service staff & complete banquet setup.',
      minGuests: 50,
      pricePerHead: 499,
      // Grand catering buffet chafing dish setup
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
      alt: 'Sumadhura Full Service Catering'
    }
  ];

  // Curated Catering Packages for Modal
  const cateringPackages = [
    {
      id: 'pkg-party',
      name: 'Festive Hyderabadi Party Box',
      type: 'DELIVERY BOX',
      badge: 'Best for Parties',
      price: 249,
      minGuests: 10,
      items: [
        'Paneer Tikka / Veg Manchurian Starter',
        'Special Hyderabadi Dum Biryani',
        'Mirchi Ka Salan & Cucumber Raita',
        'Tawa Butter Phulka (2 pcs)',
        'Paneer Butter Masala',
        'Hot Gulab Jamun (2 pcs)',
        'Eco-friendly Plates, Spoons & Wet Wipes'
      ],
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pkg-corporate',
      name: 'Executive Corporate Meal Tray',
      type: 'MEAL BOX',
      badge: 'Most Popular for Offices',
      price: 189,
      minGuests: 15,
      items: [
        '2 Soft Ghee Phulkas / Rotis',
        'Jeera Rice / Fragrant Ghee Rice',
        'Yellow Dal Tadka / Dal Makhani',
        'Paneer Do Pyaza / Mixed Veg Curry',
        'Fresh Spiced Salad & Pickle',
        'Mini Sweet (Carrot Halwa / Jamun)',
        'Packaged Drinking Water & Cutlery'
      ],
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pkg-traditional',
      name: 'Traditional Banana Leaf Bhojanam',
      type: 'CATERING',
      badge: 'Housewarmings & Poojas',
      price: 389,
      minGuests: 30,
      items: [
        'Pure Desi Ghee & Gunpowder (Podi)',
        'Hot Sona Masoori Rice & Pulihora',
        'Gutti Vankaya / Gongura Pappu',
        'Medu Vada & Tomato Chutney',
        'Traditional Andhra Sambar & Miriyala Rasam',
        'Special Curd Rice with Pomegranate',
        'Semiyan Payasam / Bellam Parvannam',
        'Served on Fresh Green Plantain Leaves'
      ],
      image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pkg-buffet',
      name: 'Grand Royal Banquet Live Buffet',
      type: 'CATERING',
      badge: 'Weddings & Receptions',
      price: 599,
      minGuests: 50,
      items: [
        'Welcome Drink: Fresh Badam Milk / Tender Coconut Punch',
        '3 Live Starters: Hara Bhara Kabab, Babycorn Manchurian, Paneer Tikka',
        'Live Chaat Counter (Pani Puri, Sev Puri, Dahi Bhalla)',
        'Live Tandoor Naan & Roti Station',
        '4 Premium Curries & Royal Dal Bukhara',
        'Hyderabadi Veg Biryani & Bagara Rice',
        'Assorted Sweet Platter: Kaju Katli, Angoori Rasmalai & Jalebi Rabdi',
        'Live Pan Counter & Ice Cream Sundaes'
      ],
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Verified Customer Reviews matching screenshot
  const customerReviews = [
    {
      id: 1,
      quote:
        'We ordered 45 Corporate Meal Boxes for our tech team hackathon in Hitec City. Food was piping hot, packing was spill-proof, and the paneer curry tasted just like fine dining. Zero complaints!',
      author: 'Srinivas Rao',
      role: 'Engineering Director, Tech Mahindra',
      event: 'Corporate Lunch (45 Guests)',
      rating: 5,
      location: 'Hitec City, Hyderabad'
    },
    {
      id: 2,
      quote:
        'Sumadhura handled our housewarming catering for 140 guests in Jubilee Hills. The traditional banana leaf bhojanam, live hot jalebis and ghee podi rice were unforgettable. All elders praised the pure A2 ghee taste.',
      author: 'Kavitha Reddy',
      role: 'Host & Architect',
      event: 'Housewarming Pooja (140 Guests)',
      rating: 5,
      location: 'Jubilee Hills, Hyderabad'
    },
    {
      id: 3,
      quote:
        'The Delivery Boxes for our daughter’s first birthday in Gachibowli were a total lifesaver! Beautiful packaging, individual portions, and we didn’t have to wash a single dish. Very punctual 12:30 PM delivery.',
      author: 'Arun & Sneha Kumar',
      role: 'Family Event Hosts',
      event: 'Birthday Feast (35 Guests)',
      rating: 5,
      location: 'Gachibowli, Hyderabad'
    }
  ];

  const handleOpenCategory = (cat) => {
    const matched = cateringPackages.find((p) => p.type === cat.title) || cateringPackages[0];
    setSelectedPackage(matched);
    setGuestCount(cat.minGuests);
    setIsMenuModalOpen(true);
  };

  const handleWhatsAppBooking = (pkg, guests) => {
    const calculatedTotal = (pkg?.price || 249) * guests;
    const msg = `Hello Sumadhura Caterers! 🍛\n\nI want to book catering in Hyderabad:\n- Package: ${pkg?.name || 'Party Delivery Box'}\n- Number of Guests: ${guests}\n- Occasion: ${eventType}\n- Target Date: ${eventDate || 'Upcoming Weekend'}\n- Estimated Cost: ₹${calculatedTotal.toLocaleString('en-IN')}\n\nPlease share the detailed menu and confirm availability!`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919121288450?text=${encoded}`, '_blank');
    showToast('Connecting you with Sumadhura Catering Desk on WhatsApp!');
  };

  return (
    <section id="catering-section" className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO BANNER: SUMADHURA WEBSITE MAROON & GOLD THEME         */}
      {/* ------------------------------------------------------------- */}
      <div
        data-aos="fade-up"
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/25 bg-gradient-to-br from-[#2D0307] via-[#4D060D] to-[#7D0A14] text-white p-4 sm:p-7 md:p-9"
      >
        {/* Subtle Decorative Golden Glow Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-rose-900/30 blur-2xl pointer-events-none" />

        {/* Top Header Bar: Location, Tier Badge & Support Desk (matching screenshot) */}
        <div className="flex items-center justify-between gap-2 pb-5 border-b border-white/10 relative z-10">
          {/* Location Selector */}
          <button
            type="button"
            onClick={() => setIsLocationModalOpen?.(true)}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 group-hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-white group-hover:text-amber-200">
                <span>Madhapur, Hyderabad</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <span className="text-[10px] sm:text-xs text-amber-200/80 font-medium block">
                Serving all Hyderabad & Cyberabad
              </span>
            </div>
          </button>

          {/* Right actions: Tier status & Support icon */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* VIP Tier Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-[#F5A623] text-[#3D040A] text-[10px] sm:text-xs font-black shadow-md border border-amber-300">
              <Award className="w-3.5 h-3.5 text-[#3D040A]" />
              <span className="hidden sm:inline">Royal Host</span>
              <span>Tier 1</span>
            </div>

            {/* Support Desk Headphone button */}
            <a
              href="tel:+919121288450"
              title="Call Catering Desk"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </a>
          </div>
        </div>

        {/* Central Headline (matching screenshot styling in Website Colors) */}
        <div className="text-center py-3 sm:py-5 space-y-0.5 relative z-10 max-w-xl mx-auto">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-[#F5A623] tracking-tight drop-shadow-sm font-serif">
            Hyderabad’s favourite
          </h2>
          <div className="relative inline-block">
            <p className="text-sm sm:text-base md:text-xl font-extrabold text-white tracking-wide">
              bulk food delivery app!
            </p>
            {/* Artistic curved golden brush underline matching screenshot */}
            <svg
              className="w-32 sm:w-44 h-2 sm:h-2.5 text-[#F5A623] mx-auto mt-0.5"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9C60 2 140 2 197 9"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* THE 3 CATEGORY CARDS (DELIVERY BOX, MEAL BOX, CATERING)     */}
        {/* ----------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 relative z-10 pt-1">
          {cateringCategories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleOpenCategory(cat)}
              className="group relative rounded-3xl bg-[#52070E]/85 hover:bg-[#630911] border border-amber-400/30 hover:border-amber-400 p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Header: Title, Subtitle & Arrow Button */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-black tracking-wider text-white">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs italic font-serif text-amber-200/90 mt-0.5">
                    {cat.subtitle}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-white/10 text-[9.5px] font-bold text-amber-300 border border-white/10">
                    {cat.tag}
                  </span>
                </div>

                {/* Circular Arrow Action Button (matching screenshot) */}
                <button
                  type="button"
                  className="w-7 h-7 rounded-full bg-white text-[#7D0A14] group-hover:bg-[#F5A623] group-hover:text-[#3D040A] flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
                  title={`View ${cat.title} menus`}
                >
                  <ChevronRight className="w-4 h-4 font-bold" />
                </button>
              </div>

              {/* Dish Visual framed inside an elegant cream oval (matching screenshot shape) */}
              <div className="mt-4 pt-1 flex items-center justify-center relative">
                <div className="w-44 h-28 sm:w-48 sm:h-32 rounded-[50%_/_40%] bg-gradient-to-b from-[#FDFBF7] to-[#F5ECE1] p-1.5 shadow-inner flex items-center justify-center overflow-hidden border-2 border-amber-200/50 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={cat.image}
                    alt={cat.alt}
                    className="w-full h-full object-cover rounded-[50%_/_40%] drop-shadow-md"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Bottom Quick Price Info */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-amber-100/80 text-[11px] font-medium">Starting from</span>
                <span className="font-black text-amber-300 text-xs sm:text-sm">
                  ₹{cat.pricePerHead} <span className="text-[10px] text-white/70 font-normal">/ guest</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicator dots matching screenshot */}
        <div className="flex items-center justify-center gap-1.5 pt-5 pb-2">
          <span className="w-6 h-1.5 rounded-full bg-[#F5A623]" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>

        {/* Bottom Strip: "Min. 10 guests | Live in Hyderabad" matching screenshot */}
        <div className="mt-2 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-5 py-1.5 rounded-full bg-black/40 border border-white/15 text-xs sm:text-sm font-bold text-amber-200 backdrop-blur-xs">
            <span>Min. 10 guests</span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live in Hyderabad
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. "START HERE" SEPARATOR & BROWSE ALL MENUS BUTTON           */}
      {/* ------------------------------------------------------------- */}
      <div data-aos="fade-up" className="relative py-3">
        {/* Subtle Separator with "Start here" tag */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#E8DDCF] w-full" />
          <div className="absolute bg-[#FAF5EC] px-4 text-xs font-black uppercase tracking-wider text-[#7D0A14] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7D0A14]" />
            <span>Start here</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#7D0A14]" />
          </div>
        </div>

        {/* Prominent "Browse all menus ➔" Button (Matching screenshot) */}
        <div className="mt-4 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => {
              setSelectedPackage(cateringPackages[0]);
              setIsMenuModalOpen(true);
            }}
            className="w-full py-2.5 sm:py-3 px-5 rounded-2xl bg-gradient-to-r from-[#FFFDF9] via-[#FAF5EC] to-[#FFFDF9] hover:from-white hover:to-white border-2 border-[#7D0A14]/30 hover:border-[#7D0A14] text-[#7D0A14] font-black text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group active:scale-98"
          >
            <span>Browse all menus</span>
            <div className="w-6 h-6 rounded-full bg-[#7D0A14] group-hover:bg-[#60060E] text-white flex items-center justify-center transition-all group-hover:translate-x-1 shadow-xs">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. SOCIAL PROOF & STATS BANNER (Matching screenshot)          */}
      {/* ------------------------------------------------------------- */}
      <div
        data-aos="fade-up"
        className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE1D1] shadow-sm text-center relative overflow-hidden"
      >
        {/* Background Dot Grid */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#7D0A14 0.75px, transparent 0.75px)',
            backgroundSize: '16px 16px'
          }}
        />

        <div className="relative z-10 space-y-4">
          {/* Golden Laurel Wreath with 2,70,000 Guests Served */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2 sm:gap-2.5">
              {/* Left Laurel Branch */}
              <svg className="w-6 h-8 sm:w-8 sm:h-10 text-amber-500" viewBox="0 0 36 48" fill="currentColor">
                <path d="M18 4C14 10 8 16 3 20C10 21 16 19 18 16C15 22 10 27 3 31C10 31 16 29 18 26C15 32 10 38 4 41C12 40 18 36 20 32C19 37 15 43 10 46C18 45 23 39 25 34C24 40 21 45 17 48C25 46 29 39 31 32C30 38 28 43 24 47C32 43 35 34 36 26C32 28 28 29 25 28C29 22 31 14 30 7C26 12 21 15 18 16C21 10 22 4 20 0C17 5 15 10 13 15C15 9 15 4 13 0C11 5 9 10 8 15C11 10 12 5 11 1C8 6 6 12 6 18C10 16 14 13 18 4Z" opacity="0.85" />
              </svg>

              <div className="text-2xl sm:text-3xl font-black text-[#A66F17] tracking-tight font-serif">
                2,70,000
              </div>

              {/* Right Laurel Branch (flipped) */}
              <svg className="w-6 h-8 sm:w-8 sm:h-10 text-amber-500 -scale-x-100" viewBox="0 0 36 48" fill="currentColor">
                <path d="M18 4C14 10 8 16 3 20C10 21 16 19 18 16C15 22 10 27 3 31C10 31 16 29 18 26C15 32 10 38 4 41C12 40 18 36 20 32C19 37 15 43 10 46C18 45 23 39 25 34C24 40 21 45 17 48C25 46 29 39 31 32C30 38 28 43 24 47C32 43 35 34 36 26C32 28 28 29 25 28C29 22 31 14 30 7C26 12 21 15 18 16C21 10 22 4 20 0C17 5 15 10 13 15C15 9 15 4 13 0C11 5 9 10 8 15C11 10 12 5 11 1C8 6 6 12 6 18C10 16 14 13 18 4Z" opacity="0.85" />
              </svg>
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-slate-600 mt-0.5 uppercase tracking-wider">
              Guests served in Hyderabad
            </p>
          </div>

          {/* 3 Metric Columns (Matching screenshot) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2.5 border-t border-slate-100 max-w-lg mx-auto">
            {/* 1. Events Catered */}
            <div className="text-center">
              <div className="text-base sm:text-xl font-black text-[#3D040A]">7000+</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-0.5">
                Events catered
              </div>
            </div>

            {/* 2. Rating */}
            <div className="text-center border-x border-slate-100 px-2">
              <div className="text-base sm:text-xl font-black text-[#7D0A14] flex items-center justify-center gap-1">
                <span>4.9</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-0.5">
                Rated on Google
              </div>
            </div>

            {/* 3. Satisfied Customers */}
            <div className="text-center">
              <div className="text-base sm:text-xl font-black text-emerald-700">98%</div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-0.5">
                Satisfied hosts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. CUSTOMER REVIEWS: "Hear what our customers are saying"      */}
      {/* ------------------------------------------------------------- */}
      <div data-aos="fade-up" className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-[#3D040A] tracking-tight">
            Hear what our customers are saying
          </h3>
          <span className="text-[11px] font-bold text-[#7D0A14] hidden sm:inline">
            Verified Hyderabad Orders
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE1D1] shadow-2xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-3">
                {/* 5-Star Rating & Quote Symbol */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-3xl font-serif text-[#7D0A14]/20 leading-none">“</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author & Event Info */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-black text-[#3D040A] text-sm">{rev.author}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{rev.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 block">
                    {rev.event}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. INTERACTIVE CATERING PACKAGES & INSTANT QUOTE MODAL        */}
      {/* ------------------------------------------------------------- */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 space-y-5 border border-[#EDE1D1] shadow-2xl relative max-h-[92vh] flex flex-col overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#7D0A14] text-white flex items-center justify-center font-black shadow-xs">
                  <Utensils className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-2xl font-black text-[#3D040A]">
                      Sumadhura Catering & Bulk Menus
                    </h3>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      Live in Hyderabad
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Party delivery boxes, corporate meal trays & full-service event buffets
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMenuModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Package Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
              {cateringPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg)}
                  className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                    selectedPackage?.id === pkg.id
                      ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-md scale-102'
                      : 'bg-[#FAF5EC] hover:bg-[#F3EAD9] text-slate-800 border-[#EDE1D1]'
                  }`}
                >
                  <span
                    className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded block w-fit mb-1 ${
                      selectedPackage?.id === pkg.id
                        ? 'bg-amber-400 text-[#3D040A]'
                        : 'bg-white text-[#7D0A14] border border-[#7D0A14]/20'
                    }`}
                  >
                    {pkg.type}
                  </span>
                  <div className="text-xs font-black line-clamp-1">{pkg.name}</div>
                  <div
                    className={`text-xs font-extrabold mt-1 ${
                      selectedPackage?.id === pkg.id ? 'text-amber-300' : 'text-[#7D0A14]'
                    }`}
                  >
                    ₹{pkg.price}{' '}
                    <span className="text-[10px] font-normal opacity-80">/ person</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Package Details */}
            {selectedPackage && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#FAF5EC] rounded-3xl p-4 sm:p-5 border border-[#EDE1D1]">
                {/* Left: Food Visual & Inclusions */}
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden h-44 border border-amber-300/40 shadow-xs">
                    <img
                      src={selectedPackage.image}
                      alt={selectedPackage.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                      <div>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-[#3D040A]">
                          {selectedPackage.badge}
                        </span>
                        <h4 className="text-white font-black text-base sm:text-lg">
                          {selectedPackage.name}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Included Items */}
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-[#7D0A14] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Curated Menu Inclusions:</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded-2xl border border-[#EDE1D1]">
                      {selectedPackage.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Instant Estimator & Booking */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EDE1D1] space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h5 className="text-xs font-black uppercase text-[#3D040A] tracking-wider">
                      Instant Guest & Cost Estimator
                    </h5>

                    {/* Guest Count Selector */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                        <span>Expected Guests / Boxes:</span>
                        <span className="text-[#7D0A14] font-black text-sm">
                          {guestCount} Guests
                        </span>
                      </div>
                      <input
                        type="range"
                        min={selectedPackage.minGuests}
                        max="500"
                        step="5"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full accent-[#7D0A14] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-0.5">
                        <span>Min. {selectedPackage.minGuests}</span>
                        <span>100</span>
                        <span>250</span>
                        <span>500+</span>
                      </div>
                    </div>

                    {/* Occasion / Event Type */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Occasion Type:
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-[#FAF5EC] focus:outline-none focus:ring-2 focus:ring-[#7D0A14]/20"
                      >
                        <option value="Birthday Party">🎂 Birthday & Family Gathering</option>
                        <option value="Corporate Office Lunch">💼 Corporate Office Meeting / Training</option>
                        <option value="Housewarming (Gruhapravesam)">🏡 Housewarming (Gruhapravesam)</option>
                        <option value="Wedding / Reception">💍 Wedding / Engagement / Reception</option>
                        <option value="Pooja / Temple Function">🪔 Pooja / Religious Gathering</option>
                      </select>
                    </div>

                    {/* Target Event Date */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Target Event Date:
                      </label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-[#FAF5EC] focus:outline-none focus:ring-2 focus:ring-[#7D0A14]/20"
                      />
                    </div>

                    {/* Total Cost Calculation Box */}
                    <div className="p-3 bg-[#FAF5EC] rounded-2xl border border-[#EDE1D1] flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase text-slate-500">
                          Estimated Catering Total
                        </div>
                        <div className="text-xl sm:text-2xl font-black text-[#7D0A14]">
                          ₹{(selectedPackage.price * guestCount).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          ₹{selectedPackage.price} × {guestCount} guests (Inclusive of delivery)
                        </div>
                      </div>
                      <ShieldCheck className="w-8 h-8 text-emerald-600 opacity-80" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleWhatsAppBooking(selectedPackage, guestCount)}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirm & Book on WhatsApp Desk</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        showToast(
                          `Added ${guestCount}x ${selectedPackage.name} inquiry to your cart!`
                        );
                        setIsMenuModalOpen(false);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FAF5EC] hover:bg-[#F3EAD9] text-[#7D0A14] font-bold text-xs border border-[#EDE1D1] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>Add to Cart as Bulk Order (₹{(selectedPackage.price * guestCount).toLocaleString('en-IN')})</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
