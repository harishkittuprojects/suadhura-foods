import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useShop } from '../context/ShopContext';
import { products as defaultProducts } from '../data/products';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Bell,
  Sparkles,
  Zap,
  Mic,
  Package,
  Utensils,
  ShoppingBag,
  LogOut,
  Check,
  Calendar,
  Building2,
  Lock,
  ArrowRight
} from 'lucide-react';

// Illustrated Sumadhura Caterers Cottage Logo (Matches exact reference logo)
export const SumadhuraCaterersLogo = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Chimney with warm steam */}
    <rect x="68" y="14" width="7" height="18" fill="#7D0A14" rx="2" />
    <path d="M71 12C72 9 68 7 71 4" stroke="#E59934" strokeWidth="2.5" strokeLinecap="round" />
    {/* Cottage Roof with golden slopes */}
    <path d="M50 16L14 43H86L50 16Z" fill="#F4B436" stroke="#C97F12" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M50 20L22 41H78L50 20Z" fill="#FCE39E" />
    {/* Cottage Base / Signboard */}
    <rect x="22" y="41" width="56" height="42" rx="6" fill="#7D0A14" stroke="#DCA241" strokeWidth="2" />
    {/* Heart in bowl medallion */}
    <circle cx="50" cy="34" r="9" fill="#F5A623" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M50 31.5C48 29.5 45.5 30.5 45.5 32.5C45.5 35 50 37.5 50 37.5C50 37.5 54.5 35 54.5 32.5C54.5 30.5 52 29.5 50 31.5Z" fill="#7D0A14" />
    {/* Banner text */}
    <text x="50" y="56" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900" fontFamily="sans-serif">Sumadhura</text>
    <text x="50" y="66" textAnchor="middle" fill="#FCE39E" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Caterers</text>
    <path d="M30 72C40 73.5 60 73.5 70 72" stroke="#F4B436" strokeWidth="1" strokeLinecap="round" />
    <text x="50" y="78" textAnchor="middle" fill="#FCE39E" fontSize="4.5" fontStyle="italic" fontFamily="serif">Food Crafted with Love</text>
  </svg>
);

export const Navbar = () => {
  const {
    activeTab,
    navigateTo,
    totalCartCount,
    cartTotal,
    wishlist,
    user,
    logout,
    setIsCartOpen,
    setIsLocationModalOpen,
    setIsAuthModalOpen,
    setAuthModalTab,
    selectedAddress,
    setQuickViewProduct,
    isOneMember,
    toggleOneMember,
    activeOrder,
    setIsLiveTrackingOpen,
    serviceMode,
    setServiceMode,
    setIsSubscriptionModalOpen,
    activeSubscription,
    searchQuery,
    setSearchQuery,
    setSelectedCategoryFilter,
    pricingMode,
    setPricingMode,
    togglePricingMode,
    products: shopProducts
  } = useShop();

  const products = shopProducts || defaultProducts;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Animated search query placeholders
  const searchPlaceholders = [
    'Search groceries, dairy & staples',
    'Search for "A2 Cow Ghee"',
    'Search for "Farm Fresh Milk"',
    'Search for "Organic Pulses"',
    'Search for "Cold Pressed Oils"',
    'Search for "Fresh Vegetables"'
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const searchRef = useRef(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products based on search
  const filteredProducts = searchInput.trim()
    ? products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.subCategory?.toLowerCase().includes(searchInput.toLowerCase())
    )
    : [];

  const handleSelectProduct = (prod) => {
    setQuickViewProduct(prod);
    setShowSearchDropdown(false);
    setSearchInput('');
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery?.(searchInput.trim());
      setSelectedCategoryFilter?.('All');
      navigateTo('categories');
      setShowSearchDropdown(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'categories', label: 'Categories' },
    { id: 'services', label: 'Our Services' },
    { id: 'wishlist', label: 'Wishlist', badge: wishlist.length },
    { id: 'cart', label: 'Cart', badge: totalCartCount }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EC]/95 backdrop-blur-md border-b border-[#E8DDCF] shadow-sm transition-all duration-200 w-full overflow-visible">
      {/* 1. Top Ribbon: Services & VIP Membership */}
      <div className="bg-[#4D060D] text-white text-xs py-1 sm:py-1.5 px-2.5 sm:px-4 font-medium border-b border-[#3D040A]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* 10-15 Min Express Delivery Badge */}
          <div className="flex items-center gap-1.5 text-slate-300 text-[11px] sm:text-xs font-medium shrink-0">
            <span className="flex items-center gap-1 text-amber-300 font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>10-15 Min Express Delivery</span>
            </span>
            <span className="text-amber-500/50 hidden md:inline">•</span>
            <span className="text-amber-100 hidden md:inline">Free delivery above ₹99</span>
          </div>

          {/* B2B Wholesale Rate Status / Subscription Order */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Show B2B Wholesale badge ONLY when a B2B customer is logged in - No Retail Switch */}
            {user?.isBusiness && (
              <div className="flex items-center gap-1.5 bg-[#F5A623] text-[#3D040A] px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black shadow-xs shrink-0">
                <Building2 className="w-3 h-3 text-[#3D040A] shrink-0" />
                <span>B2B Wholesale</span>
                {user.gstin && (
                  <span className="bg-[#7D0A14] text-white text-[8.5px] px-1 py-0.2 rounded hidden sm:inline font-mono">
                    GST
                  </span>
                )}
              </div>
            )}

            <button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                activeSubscription
                  ? 'bg-[#F5A623] text-[#3D040A] shadow-sm ring-2 ring-amber-300/60 font-black'
                  : 'bg-gradient-to-r from-[#D98207] to-[#F5A623] text-[#3D040A] hover:brightness-105 shadow-sm active:scale-95'
              }`}
              title="Set up daily morning milk & grocery subscription"
            >
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#3D040A] shrink-0" />
              <span className="hidden sm:inline">{activeSubscription ? 'Daily Subscription (Active)' : 'Subscription Order'}</span>
              <span className="sm:hidden">{activeSubscription ? 'Subscribed' : 'Subscription'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar: Address, Search, Actions */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-1.5 sm:gap-4 lg:gap-6 w-full">
          {/* Logo & Address Selector */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:text-[#7D0A14] hover:bg-[#FAF5EC] rounded-lg flex-shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo & Title (Matching Sumadhura Caterers Reference) */}
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 group text-left flex-shrink-0"
            >
              <SumadhuraCaterersLogo className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-[#680811] leading-none">
                  Sumadhura
                </span>
                <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-[#680811] leading-tight">
                  Caterers
                </span>
              </div>
            </button>

            {/* Address / Location Selector Badge (📍 Hyderabad ∨) */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border border-[#D5C2AC] bg-white hover:bg-[#FAF5EC] text-[#7D0A14] text-xs font-extrabold shadow-2xs transition-all duration-150 text-left flex-shrink-0 ml-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#7D0A14] fill-[#7D0A14]/15 flex-shrink-0" />
              <span className="truncate max-w-[85px] sm:max-w-[130px]">{selectedAddress?.tag || 'Hyderabad'}</span>
              <ChevronDown className="w-3 h-3 text-[#7D0A14] flex-shrink-0" />
            </button>
          </div>

          {/* Search Bar with Animated Placeholder & Autocomplete (Desktop) */}
          <div ref={searchRef} className="relative flex-1 max-w-xl mx-2 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder={searchPlaceholders[placeholderIndex]}
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit(e);
                }}
                className="w-full pl-11 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-[#E8DDCF] rounded-full focus:outline-none focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:border-transparent transition-all placeholder:text-slate-400 text-slate-800 font-medium shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchInput ? (
                  <button
                    onClick={() => setSearchInput('')}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <Mic className="w-4 h-4 text-[#7D0A14] opacity-70 cursor-pointer" />
                )}
              </div>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {showSearchDropdown && searchInput.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3">
                  <span>Found {filteredProducts.length} items</span>
                  <span className="text-[#7D0A14] font-bold">10-15 Min Delivery</span>
                </div>
                {filteredProducts.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p)}
                        className="p-3 hover:bg-[#FAF5EC]/70 flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-white" />
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                              {p.name}
                            </h4>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {p.unit} • <strong className="text-[#7D0A14]">{p.deliveryTime || '10 mins'}</strong>
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-bold text-slate-900">₹{p.price}</span>
                          <span className="block text-[11px] text-slate-400 line-through">
                            ₹{p.originalPrice}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No items found matching "{searchInput}".
                  </div>
                )}
                {filteredProducts.length > 0 && (
                  <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs font-bold text-[#7D0A14] hover:text-[#680811] flex items-center justify-center gap-1 w-full py-1 hover:underline cursor-pointer"
                    >
                      <span>View all {filteredProducts.length} matching products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2.5 flex-shrink-0">
            {/* Notification Bell (Matching Reference with red badge '2') */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 text-[#7D0A14] hover:bg-[#FAF5EC] rounded-full transition-colors relative flex items-center justify-center flex-shrink-0"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-[#7D0A14]" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#7D0A14] text-white text-[9px] font-black rounded-full ring-2 ring-[#FAF5EC] flex items-center justify-center">
                  2
                </span>
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-xl border border-[#EDE1D1] p-4 z-50 text-xs">
                  <div className="font-bold text-[#7D0A14] mb-2 flex items-center justify-between">
                    <span>Notifications</span>
                    <span className="text-[10px] text-[#7D0A14] font-semibold cursor-pointer">
                      Mark read
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-2 bg-[#FAF5EC] rounded-xl text-[#3D040A]">
                      <strong>🎉 Welcome Offer:</strong> Flat 20% off on your first grocery & daily essentials order!
                    </div>
                    <div className="p-2 bg-[#FAF5EC] rounded-xl text-[#3D040A]">
                      <strong>⚡ Express Delivery:</strong> Farm fresh milk & veggies delivered before 7:00 AM!
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button (Matching Reference with red badge '1') */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#7D0A14] hover:bg-[#FAF5EC] rounded-full transition-all flex items-center justify-center flex-shrink-0"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-[#7D0A14]" />
              <span className="absolute top-0.5 right-0.5 bg-[#7D0A14] text-white text-[9px] font-black rounded-full min-w-4 h-4 px-1 flex items-center justify-center ring-2 ring-[#FAF5EC]">
                {totalCartCount > 0 ? totalCartCount : 1}
              </span>
            </button>

            {/* User Profile */}
            {user ? (
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 sm:px-3 sm:py-1.5 rounded-full border border-[#EDE1D1] hover:border-[#7D0A14] text-slate-700 text-xs font-semibold bg-[#FAF5EC]/80 transition-colors cursor-pointer"
                  aria-label="User Account"
                >
                  <div className="w-6 h-6 sm:w-6 sm:h-6 rounded-full bg-[#7D0A14] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden md:inline">{user?.name ? user.name.split(' ')[0] : 'Profile'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 text-xs">
                    <div className="p-2 border-b border-slate-100">
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-slate-500 text-[11px] truncate">
                        {user.email || user.phone}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        navigateTo('b2b');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left p-2 hover:bg-amber-50 text-[#7D0A14] font-bold rounded-lg flex items-center gap-2"
                    >
                      <Building2 className="w-4 h-4 text-[#7D0A14]" /> B2B Wholesale Desk
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('wishlist');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left p-2 hover:bg-slate-50 rounded-lg flex items-center gap-2 text-slate-700"
                    >
                      <Heart className="w-4 h-4 text-slate-400" /> My Wishlist
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left p-2 hover:bg-rose-50 text-rose-600 rounded-lg flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-[#7D0A14] text-[#7D0A14] hover:bg-[#FAF5EC] text-xs font-bold transition-colors flex-shrink-0 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search input bar with dropdown */}
        <div className="mt-2.5 sm:hidden relative">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholders[placeholderIndex]}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchSubmit(e);
              }}
              className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-[#EDE1D1] rounded-full focus:outline-none focus:ring-2 focus:ring-[#7D0A14] text-slate-800 font-medium shadow-2xs"
            />
            <Search className="w-4 h-4 text-[#7D0A14] absolute left-3 top-1/2 -translate-y-1/2" />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                className="text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Live Search Suggestions Dropdown */}
          {showSearchDropdown && searchInput.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3">
                <span>Found {filteredProducts.length} items</span>
                <span className="text-[#7D0A14] font-bold">10-15 Min Delivery</span>
              </div>
              {filteredProducts.length > 0 ? (
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="p-2.5 hover:bg-[#FAF5EC]/70 flex items-center gap-2.5 cursor-pointer transition-colors"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-slate-800 truncate">
                          {p.name}
                        </h4>
                        <span className="text-[10px] text-slate-500">
                          {p.unit} • <strong className="text-[#7D0A14]">{p.deliveryTime || '10 mins'}</strong>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900">₹{p.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  No items found matching "{searchInput}".
                </div>
              )}
              {filteredProducts.length > 0 && (
                <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-bold text-[#7D0A14] hover:text-[#680811] flex items-center justify-center gap-1 w-full py-1 hover:underline cursor-pointer"
                  >
                    <span>View all {filteredProducts.length} matching products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Desktop Navigation Menu Bar */}
      <nav className="hidden lg:block border-t border-[#E8DDCF] bg-[#FAF5EC]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-8 py-2.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`relative py-1 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === link.id
                    ? 'text-[#7D0A14] font-bold'
                    : 'text-slate-700 hover:text-[#7D0A14]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#FEE2E2] text-[#7D0A14]">
                    {link.badge}
                  </span>
                )}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7D0A14] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <Zap className="w-3.5 h-3.5" /> Instant 10-15 Min Delivery
            </span>
            <span className="flex items-center gap-1">
              📞 Customer Support: 24/7 Helpline Active
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu (Rendered via Portal to avoid stacking context & clipping issues) */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="lg:hidden fixed inset-0 z-[100] flex">
          {/* 1. Dark Backdrop with Click-to-Dismiss */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-label="Close drawer"
          />

          {/* 2. Slide Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-[#FAF5EC] shadow-2xl h-full flex flex-col justify-between z-[101] border-r border-[#DECDBD] overflow-y-auto">
            {/* Top Content */}
            <div className="p-5">
              {/* Header with Sumadhura Caterers Branding & Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DDCF]">
                <div className="flex items-center gap-2">
                  <SumadhuraCaterersLogo className="w-9 h-9 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-[#680811] leading-none">Sumadhura</span>
                    <span className="text-sm font-black text-[#680811] leading-tight">Caterers</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-white border border-[#EDE1D1] text-slate-500 hover:text-[#7D0A14] hover:border-[#7D0A14] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery location selector */}
              <button
                onClick={() => {
                  setIsLocationModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-4 p-2.5 rounded-xl bg-white border border-[#DECDBD] text-slate-900 flex items-center gap-2.5 text-xs font-semibold text-left shadow-xs hover:border-[#7D0A14] transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#7D0A14] flex-shrink-0" />
                <div className="truncate flex-1">
                  <div className="font-bold text-slate-800">{selectedAddress.tag} Address</div>
                  <div className="text-[11px] text-slate-500 truncate">{selectedAddress.area}</div>
                </div>
              </button>

              {/* B2B Status (Mobile: Shown for B2B users - strictly Wholesale) */}
              {user?.isBusiness && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-[#DECDBD]">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5 text-[#7D0A14] font-black">
                      <Building2 className="w-4 h-4 text-[#7D0A14]" /> B2B Commercial Wholesale
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                    </span>
                  </div>
                  {user.gstin && (
                    <div className="mt-1 text-[11px] text-slate-500 font-mono">
                      GSTIN: {user.gstin}
                    </div>
                  )}
                </div>
              )}

              {/* Nav links */}
              <div className="mt-5 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo(link.id);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                      activeTab === link.id
                        ? 'bg-[#7D0A14] text-white shadow-sm'
                        : 'text-slate-700 hover:bg-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge > 0 && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          activeTab === link.id
                            ? 'bg-white text-[#7D0A14]'
                            : 'bg-[#FEE2E2] text-[#7D0A14]'
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </button>
                ))}

                {/* B2B Wholesale Desk Link */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('b2b');
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'b2b'
                      ? 'bg-[#7D0A14] text-white shadow-sm'
                      : 'text-[#7D0A14] hover:bg-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> B2B Wholesale Desk
                  </span>
                </button>
              </div>

              {/* Quick Subscription Order button in mobile menu */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSubscriptionModalOpen(true);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] text-white font-bold text-xs flex items-center justify-between shadow-sm active:scale-98 cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Calendar className="w-4 h-4 text-amber-300 flex-shrink-0" />
                    <span className="truncate">{activeSubscription ? 'Daily Subscription (Active)' : 'Daily Subscription Order'}</span>
                  </div>
                  <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-bold flex-shrink-0">6 AM DROP</span>
                </button>
              </div>
            </div>

            {/* Mobile Footer info */}
            <div className="p-4 border-t border-[#E8DDCF] bg-white text-xs">
              {user ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate flex-1">
                    <div className="font-bold text-slate-800 truncate">{user.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{user.email || user.phone}</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-rose-600 font-bold px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2.5 bg-[#7D0A14] hover:bg-[#680811] text-white rounded-xl font-bold text-center cursor-pointer transition-colors shadow-sm"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
