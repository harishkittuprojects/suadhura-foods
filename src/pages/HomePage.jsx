import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { categories, products, servicesList, customerTestimonials } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Heart,
  BadgePercent,
  Milk,
  Carrot,
  ShoppingBasket,
  Wheat,
  Droplet,
  Coffee,
  Check,
  MousePointerClick,
  Zap,
  Lock,
  Layers,
  Headphones,
  Bike,
  Utensils,
  Package,
  Grid3X3,
  Flame,
  Apple,
  Search,
  Leaf,
  Drumstick,
  ConciergeBell
} from 'lucide-react';

// Samosa Icon SVG for Snacks
const SamosaIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.5L2.5 19.5C2.5 20.3 3.2 21 4 21H20C20.8 21 21.5 20.3 21.5 19.5L12 2.5ZM12 6.8L18.2 18.2H5.8L12 6.8Z" />
  </svg>
);

// Sweets Laddu / Dessert Bowl Icon SVG
const SweetsIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C9.5 2 7.5 3.5 7.5 5.5C7.5 6.2 7.8 6.9 8.3 7.5C6.4 8.2 5 10 5 12.2C5 14.8 7 17 9.5 17.4V19H7V21H17V19H14.5V17.4C17 17 19 14.8 19 12.2C19 10 17.6 8.2 15.7 7.5C16.2 6.9 16.5 6.2 16.5 5.5C16.5 3.5 14.5 2 12 2ZM12 4C13.1 4 14.5 4.7 14.5 5.5C14.5 6.3 13.1 7 12 7C10.9 7 9.5 6.3 9.5 5.5C9.5 4.7 10.9 4 12 4Z" />
  </svg>
);

export const HomePage = () => {
  const {
    navigateTo,
    activeOrder,
    setIsLiveTrackingOpen,
    isOneMember,
    toggleOneMember,
    isSubscriptionModalOpen,
    setIsSubscriptionModalOpen,
    activeSubscription,
    addToCart,
    setQuickViewProduct
  } = useShop();

  const [activeBestSellerTab, setActiveBestSellerTab] = useState('All');
  const [heroSlide, setHeroSlide] = useState(0);

  // 6 Reference Categories (Veg, Non-Veg, Breakfast, Lunch, Snacks, Sweets)
  const foodCategories = [
    { id: 'veg', label: 'Veg', icon: Leaf, categoryFilter: 'Vegetables' },
    { id: 'non-veg', label: 'Non-Veg', icon: Drumstick, categoryFilter: 'Groceries' },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee, categoryFilter: 'Dairy Products' },
    { id: 'lunch', label: 'Lunch', icon: ConciergeBell, categoryFilter: 'Groceries' },
    { id: 'snacks', label: 'Snacks', icon: SamosaIcon, categoryFilter: 'Munchies and Snacks' },
    { id: 'sweets', label: 'Sweets', icon: SweetsIcon, categoryFilter: 'Dairy Products' }
  ];


  // Grocery Aisles (2-Row Grid)
  const groceryAisles = [
    {
      id: 'fresh-veg',
      name: 'Fresh Vegetables',
      shortTitle: 'Vegetables',
      category: 'Vegetables',
      emoji: '🥬',
      badge: 'Farm Direct',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'fresh-fruits',
      name: 'Fresh Fruits',
      shortTitle: 'Fruits',
      category: 'Fresh Fruits',
      emoji: '🍎',
      badge: 'Naturally Sweet',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'dairy-products',
      name: 'Dairy Products',
      shortTitle: 'Dairy',
      category: 'Dairy Products',
      emoji: '🥛',
      badge: '100% Pure',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'rice-atta-dals',
      name: 'Rice, Atta and Dals',
      shortTitle: 'Rice & Atta',
      category: 'Groceries',
      emoji: '🌾',
      badge: 'Kitchen Staples',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'masalas-dry-fruits',
      name: 'Masalas and Dry Fruits',
      shortTitle: 'Masalas & Nuts',
      category: 'Groceries',
      emoji: '🌶️',
      badge: 'Aromatic & Premium',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'oils-ghee',
      name: 'Oils and Ghee',
      shortTitle: 'Oils & Ghee',
      category: 'Groceries',
      emoji: '🫒',
      badge: 'Cold Pressed',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'organic-pulses',
      name: 'Organic Pulses & Dals',
      shortTitle: 'Pulses & Dals',
      category: 'Groceries',
      emoji: '🫘',
      badge: 'Unpolished',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'munchies',
      name: 'Munchies and Snacks',
      shortTitle: 'Munchies',
      category: 'Groceries',
      emoji: '🍿',
      badge: 'Crispy & Light',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Category Quick Pill Icons with authentic real food photography
  const categoryPills = [
    {
      name: 'Dairy & Milk',
      categoryName: 'Dairy Products',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Fresh Veggies',
      categoryName: 'Fresh Vegetables',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Fresh Fruits',
      categoryName: 'Fresh Fruits',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Daily Groceries',
      categoryName: 'Rice, Atta and Dals',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Atta & Flours',
      categoryName: 'Rice, Atta and Dals',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Cold Pressed Oils',
      categoryName: 'Oils and Ghee',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Spices & Masalas',
      categoryName: 'Masalas and Dry Fruits',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Dry Fruits & Nuts',
      categoryName: 'Masalas and Dry Fruits',
      image: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Munchies & Snacks',
      categoryName: 'Munchies and Snacks',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=300&q=80'
    }
  ];

  // Category-specific product shelves for Home Page
  const dairyProducts = products.filter((p) => p.category === 'Dairy Products' && !p.name.toLowerCase().includes('egg') && !p.name.toLowerCase().includes('bread')).slice(0, 6);
  const vegetableProducts = products.filter((p) => p.aisles?.includes('fresh-veg')).slice(0, 6);
  const groceryProducts = products.filter((p) => p.aisles?.includes('rice-atta-dals')).slice(0, 6);

  // Popular products (first 6)
  const popularProducts = products.filter((p) => p.tags.includes('popular')).slice(0, 6);

  // Best seller products filtered by tab
  const bestSellers = products
    .filter((p) => p.tags.includes('bestseller'))
    .filter((p) => {
      if (activeBestSellerTab === 'All') return true;
      if (activeBestSellerTab === 'Vegetables') return p.aisles?.includes('fresh-veg');
      if (activeBestSellerTab === 'Fresh Fruits') return p.aisles?.includes('fresh-fruits') || p.category === 'Fresh Fruits';
      return p.category === activeBestSellerTab;
    });

  const categoryIconMap = {
    Milk: Milk,
    Carrot: Carrot,
    Apple: Apple,
    ShoppingBasket: ShoppingBasket
  };

  const serviceIconMap = {
    ShieldCheck: ShieldCheck,
    MousePointerClick: MousePointerClick,
    Zap: Zap,
    Lock: Lock,
    Layers: Layers,
    Headphones: Headphones
  };

  return (
    <div className="space-y-3.5 sm:space-y-6 lg:space-y-8 pb-12">
      {/* Active Order Live Tracking Banner (Swiggy Signature) */}
      {activeOrder && (
        <section className="max-w-7xl mx-auto px-3 sm:px-6 pt-2">
          <div
            onClick={() => setIsLiveTrackingOpen(true)}
            className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between cursor-pointer shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
                <Bike className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-xs sm:text-sm">Order #{activeOrder.id} is On The Way!</span>
                  <span className="bg-amber-400 text-slate-900 text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.2 rounded-full">
                    ⚡ 11 MINS
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-emerald-100">
                  Ramesh Kumar is approaching your gate with your fresh groceries.
                </p>
              </div>
            </div>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-emerald-800 font-extrabold text-[11px] sm:text-xs rounded-xl shadow-sm flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
              <span>Track on Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* 1. In-Page Top Search Bar (Matching Reference Screen) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 pt-1">
        <div
          onClick={() => navigateTo('categories')}
          className="w-full pl-4 pr-4 py-2.5 sm:py-3 rounded-full bg-white border border-[#EDE1D1] shadow-2xs hover:border-[#7D0A14] transition-all flex items-center gap-2.5 cursor-pointer"
        >
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-slate-400 font-medium select-none truncate">
            Search dishes, menus and packages
          </span>
        </div>
      </section>

      {/* 2. Top Category Icons Row: 6 Golden Cream Badges (Veg, Non-Veg, Breakfast, Lunch, Snacks, Sweets) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2.5 sm:gap-4 overflow-x-auto pb-1 hide-scrollbar">
          {foodCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => navigateTo('categories', cat.categoryFilter)}
                className="flex flex-col items-center gap-1.5 group flex-1 min-w-[56px] sm:min-w-[72px] cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-[#FCE8D0] border border-[#F5D8B6] flex items-center justify-center text-[#7D0A14] shadow-xs group-hover:scale-110 group-hover:bg-[#FADBB9] group-hover:border-[#7D0A14] transition-all duration-200">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#7D0A14]" />
                </div>
                <span className="text-[11px] sm:text-xs font-black text-[#680811] group-hover:text-[#7D0A14] tracking-tight">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Hero Curved Banner ("Food Crafted with Love") */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-[#60060E] via-[#7D0A14] to-[#91131E] text-white p-5 sm:p-8 flex items-center justify-between border border-[#8B121C]">
          {/* Left Text & CTA */}
          <div className="relative z-10 max-w-[58%] sm:max-w-md space-y-2.5 sm:space-y-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
              Food <br />
              Crafted with{' '}
              <span className="font-serif italic text-[#F8B62A] tracking-normal inline-flex items-center gap-1 font-bold">
                Love <Heart className="w-4 h-4 sm:w-6 sm:h-6 fill-[#F8B62A] text-[#F8B62A] inline" />
              </span>
            </h1>

            <button
              onClick={() => navigateTo('categories')}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#F5A623] hover:bg-[#E09215] active:scale-95 text-[#55070E] font-black text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-1.5"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 text-[#55070E]" />
            </button>
          </div>

          {/* Right Image: South Indian Feast Thali Platter framed by Golden Arc */}
          <div className="relative flex-shrink-0 -mr-2 sm:mr-0">
            <div className="w-36 h-36 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-[#F5A623]/80 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80"
                alt="Sumadhura Caterers Traditional Feast"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>




      {/* 2. Shop Daily Groceries (Arranged UP and DOWN in 2 rows, not in a straight line) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h2 className="text-base sm:text-xl font-black text-[#3D040A] tracking-tight">
            Shop Daily Groceries
          </h2>
          <button
            onClick={() => navigateTo('categories')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 sm:gap-1"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2-Row Grid: 4 items UP (Top row), 4 items DOWN (Bottom row) */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3.5">
          {groceryAisles.map((item) => (
            <div
              key={item.id}
              onClick={() => navigateTo('categories', item.name)}
              className="flex flex-col items-center cursor-pointer group text-center w-full focus:outline-none"
            >
              <div className="w-full aspect-square rounded-2xl p-1.5 sm:p-2.5 flex items-center justify-center overflow-hidden transition-all duration-200 bg-white hover:bg-[#FAF5EC] border border-[#E8DDCF] group-hover:border-blue-600 group-hover:shadow-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[10px] sm:text-xs mt-1 sm:mt-1.5 block leading-tight line-clamp-2 font-bold text-[#3D040A] group-hover:text-blue-600 transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Daily Morning Subscription Order Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] text-white shadow-md border border-[#8B121C] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-amber-300 flex items-center justify-center font-black text-2xl shadow-md flex-shrink-0">
              🥛
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg">Daily Morning Subscription Order</h3>
                <span className="bg-[#F5A623] text-[#3D040A] text-[10px] font-black px-2 py-0.5 rounded-full">
                  6:00 AM DAILY
                </span>
              </div>
              <p className="text-xs font-semibold text-amber-100/90">
                Fresh pure cow milk, curd, and handpicked farm vegetables delivered before 7:00 AM every morning. Pause or modify anytime.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSubscriptionModalOpen(true)}
            className="px-6 py-3 rounded-2xl bg-[#F5A623] hover:bg-[#E09215] text-[#3D040A] font-black text-xs shadow-md transition-all active:scale-95 flex-shrink-0 flex items-center gap-2"
          >
            <span>{activeSubscription ? 'Manage Subscription' : 'Set Up Subscription Order'}</span>
            <ArrowRight className="w-4 h-4 text-[#3D040A]" />
          </button>
        </div>
      </section>

      {/* 4. ⭐ SHOP BY CATEGORY: ALL STORE AISLES (Dairy, Vegetables, Fresh Fruits, Groceries) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 uppercase tracking-wider mb-1">
              <Grid3X3 className="w-4 h-4 text-blue-600" />
              <span>ALL STORE AISLES • DELIVERED IN 10-15 MINS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3D040A] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore all certified farm departments, fresh seasonal fruits, and everyday kitchen essentials.
            </p>
          </div>
          <button
            onClick={() => navigateTo('categories')}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View All Products in Store</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Card Category Grid with High-Res Imagery & Subcategories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = categoryIconMap[cat.icon] || ShoppingBasket;
            return (
              <div
                key={cat.id}
                onClick={() => navigateTo('categories', cat.name)}
                className={`group relative rounded-3xl overflow-hidden bg-white border border-[#E8DDCF] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${cat.cardBorder || 'hover:border-blue-600'}`}
              >
                {/* Image with Gradient Overlay */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                  {/* Delivery Time Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-slate-900 flex items-center gap-1 shadow-sm">
                    <Clock className="w-3 h-3 text-blue-600" />
                    <span>{cat.deliveryTime}</span>
                  </div>

                  {/* Items Count Badge */}
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-black text-white shadow-sm">
                    {cat.itemCount}
                  </div>

                  {/* Title & Icon on Image bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white border border-white/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white leading-tight group-hover:text-amber-300 transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-[11px] text-slate-300 font-medium line-clamp-1">
                        {cat.description}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subcategories tags & Action Footer */}
                <div className="p-4 bg-white flex flex-col justify-between flex-1 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subCategories?.map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200/60"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                    <span>Shop {cat.name}</span>
                    <div className="w-6 h-6 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Popular Products Section (Swiggy Instant Grocery Bestsellers) */}
      <section data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-black text-blue-600 uppercase tracking-wider mb-0.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> TOP BESTSELLERS
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#3D040A] tracking-tight">
              Popular Products Delivered in 10 Mins
            </h2>
          </div>
          <button
            onClick={() => navigateTo('categories')}
            className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            <span>See all items</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. 🥛 CATEGORY SHELF 1: Farm-Fresh Dairy Products */}
      <section data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-blue-50/70 to-white border border-blue-100/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md flex-shrink-0">
                <Milk className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase tracking-wider">
                    ⚡ 10-12 MIN DELIVERY • 100% PURE
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3D040A] tracking-tight mt-0.5">
                  Farm-Fresh Dairy, Milk & Paneer
                </h2>
                <p className="text-xs text-slate-500">
                  Pure A2 milk, artisanal malai paneer, thick curd, and farm butter delivered fresh twice daily.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('categories', 'Dairy Products')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-center"
            >
              <span>See All Dairy (18+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {dairyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. 🥬 CATEGORY SHELF 2: Crisp Farm Vegetables */}
      <section data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-emerald-50/70 to-white border border-emerald-100/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-md flex-shrink-0">
                <Carrot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                    ⚡ 10-15 MIN DELIVERY • DAILY HARVEST
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3D040A] tracking-tight mt-0.5">
                  Handpicked Farm-Fresh Vegetables
                </h2>
                <p className="text-xs text-slate-500">
                  Crisp greens, hydroponic salads, farm roots, and fresh curry leaves harvested at dawn.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('categories', 'Fresh Vegetables')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-center"
            >
              <span>See All Vegetables (8+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {vegetableProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. 🌾 CATEGORY SHELF 3: Daily Groceries & Kitchen Staples */}
      <section data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-amber-50/70 to-white border border-amber-100/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-black shadow-md flex-shrink-0">
                <ShoppingBasket className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider">
                    ⚡ 12-15 MIN DELIVERY • AUTHENTIC TASTE
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#3D040A] tracking-tight mt-0.5">
                  Daily Groceries, Atta, Grains & Oils
                </h2>
                <p className="text-xs text-slate-500">
                  Stone ground MP Sharbati wheat, aged Daawat basmati, cold-pressed wood churned oils & dals.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('categories', 'Rice, Atta and Dals')}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-center"
            >
              <span>See All Groceries (45+)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {groceryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Best Selling Products with Filter Tabs */}
      <section data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
          <div>
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block mb-0.5">
              Customer Favorites
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#3D040A] tracking-tight">
              Best Selling Products
            </h2>
          </div>

          {/* Category Filter Pills including all categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {['All', 'Dairy Products', 'Vegetables', 'Fresh Fruits', 'Groceries'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveBestSellerTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeBestSellerTab === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Why Choose Sumadhura Foods */}
      <section
        data-aos="fade-up"
        className="max-w-7xl mx-auto px-4 sm:px-6 bg-[#F5EFE3]/80 rounded-3xl p-6 sm:p-10 border border-[#E8DDCF]"
      >
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold uppercase text-blue-600 tracking-wider">
            Our Quality Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3D040A] mt-1">
            Why Choose Sumadhura Foods?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            We bridge the gap between conscientious local farmers and health-conscious families with complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-100 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">100% Quality Checked</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every dairy batch undergoes 3-stage lab testing for zero adulterants, urea, and preservatives.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-100 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">10-15 Min Delivery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hyper-local cold-chain dark stores keep milk at 4°C and veggies crisp during transit.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-100 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <BadgePercent className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Fair Farmer Prices</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              By removing middle agents, we pay dairy farmers 25% higher while offering you unbeatable prices.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-100 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Instant Refunds</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Not satisfied with any item's freshness? Immediate replacement or full refund credited in 15 mins.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Customer Benefits & Testimonials */}
      <section data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">
            Real Customer Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3D040A] mt-1">
            Loved By Over 70,000+ Families
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {customerTestimonials.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-2.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-5">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{review.name}</h4>
                  <span className="text-[11px] text-slate-400 block">{review.role} • {review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Footer Banner: Fresh Food, Better Living (Placed right above the footer as requested) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 pt-2 pb-2">
        <div
          data-aos="fade-up"
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-[#3D040A] via-[#5C0810] to-[#7D0A14] text-white flex items-center border border-[#680811]"
        >
          {/* Background Decorative Rings */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-60 h-60 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 p-5 sm:p-8 lg:p-10 w-full max-w-3xl space-y-3 sm:space-y-5">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Fresh Food, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8D166] via-[#F5A623] to-[#D98207]">
                Better Living
              </span>
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-amber-100/90 max-w-xl leading-relaxed">
              Shop fresh dairy products, vegetables and essential groceries at Sumadhura Foods.
              Harvested daily and delivered to your doorstep in 10-15 minutes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={() => navigateTo('categories')}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#F5A623] hover:bg-[#E09215] active:scale-95 text-[#3D040A] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <span>Order in 10 Mins</span>
                <ArrowRight className="w-4 h-4 text-[#3D040A]" />
              </button>

              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Daily Milk Subscription</span>
              </button>
            </div>

            {/* Trust Micro-Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 text-[11px] sm:text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" /> 100% Purity
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" /> 10-15 Min Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 flex-shrink-0" /> ₹0 Adulteration
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
