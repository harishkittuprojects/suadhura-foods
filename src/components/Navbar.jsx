import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
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
  Bike,
  Utensils,
  ShoppingBag,
  LogOut,
  Check,
  Calendar,
  ArrowRight
} from 'lucide-react';

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
    setSelectedCategoryFilter
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Animated search query placeholders
  const searchPlaceholders = [
    'Search for "Farm Fresh Milk"',
    'Search for "Malai Paneer"',
    'Search for "Organic Tomatoes"',
    'Search for "A2 Cow Ghee"',
    'Search for "Aged Basmati Rice"',
    'Search for "Desi Ghee Dosa"'
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
    { id: 'cart', label: 'Cart', badge: totalCartCount },
    { id: 'login', label: user?.name ? user.name.split(' ')[0] : 'User Login' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm transition-all duration-200 w-full overflow-visible">
      {/* 1. Top Ribbon: Services & VIP Membership */}
      <div className="bg-slate-900 text-white text-xs py-1 sm:py-1.5 px-2.5 sm:px-4 font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar flex-nowrap">
          {/* 10-15 Min Express Delivery Badge */}
          <div className="flex items-center gap-1.5 text-slate-300 text-[11px] sm:text-xs font-medium flex-shrink-0">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>10-15 Min Express Delivery</span>
            </span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline">Free delivery above ₹99</span>
          </div>

          {/* VIP Toggle & Active Order Tracker */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {activeOrder && (
              <button
                onClick={() => setIsLiveTrackingOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] flex items-center gap-1 shadow-sm animate-pulse"
              >
                <Bike className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Track Order (11m)</span>
                <span className="sm:hidden">Track (11m)</span>
              </button>
            )}

            <button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                activeSubscription
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-sm active:scale-95'
              }`}
              title="Set up daily morning milk & grocery subscription"
            >
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
              <span className="hidden sm:inline">{activeSubscription ? 'Daily Subscription (Active)' : 'Subscription Order'}</span>
              <span className="sm:hidden">{activeSubscription ? 'Subscribed' : 'Subscription'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar: Address, Search, Actions */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* Logo & Address Selector */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-shrink">
            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg flex-shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo */}
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1.5 sm:gap-2 group text-left flex-shrink-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-black tracking-tight text-blue-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  SUMADHURA<span className="text-blue-600 font-extrabold ml-0.5 sm:ml-1">FOODS</span>
                </span>
              </div>
            </button>

            {/* Address Selector */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-2xl hover:bg-slate-100 border border-transparent hover:border-slate-200 text-slate-700 text-xs transition-colors duration-150 text-left max-w-[200px] lg:max-w-[240px]"
            >
              <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <div className="truncate">
                <div className="font-extrabold text-slate-900 flex items-center gap-1">
                  <span>{selectedAddress?.tag || 'Home'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {selectedAddress?.area || 'Koramangala, Bengaluru'}
                </div>
              </div>
            </button>
          </div>

          {/* Search Bar with Animated Placeholder & Autocomplete (Desktop) */}
          <div ref={searchRef} className="relative flex-1 max-w-xl mx-2 hidden sm:block">
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
                className="w-full pl-11 pr-10 py-2.5 text-xs sm:text-sm bg-slate-100/80 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white focus:border-transparent transition-all placeholder:text-slate-400 text-slate-800 font-medium"
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
                  <Mic className="w-4 h-4 text-blue-600 opacity-70 cursor-pointer" />
                )}
              </div>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {showSearchDropdown && searchInput.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 px-3">
                  <span>Found {filteredProducts.length} items</span>
                  <span className="text-blue-600 font-bold">10-15 Min Delivery</span>
                </div>
                {filteredProducts.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p)}
                        className="p-3 hover:bg-blue-50/70 flex items-center gap-3 cursor-pointer transition-colors"
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
                            {p.unit} • <strong className="text-blue-600">{p.deliveryTime || '10 mins'}</strong>
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
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 w-full py-1 hover:underline"
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
            {/* Live Order Tracker Button in Navbar */}
            {activeOrder && (
              <button
                onClick={() => setIsLiveTrackingOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
              >
                <Bike className="w-4 h-4 text-emerald-600 animate-bounce" />
                <span>Track Live</span>
              </button>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-1.5 sm:p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 text-xs">
                  <div className="font-bold text-slate-800 mb-2 flex items-center justify-between">
                    <span>Notifications</span>
                    <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">
                      Mark read
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-2 bg-blue-50 rounded-xl text-blue-900">
                      <strong>⚡ Instant Delivery:</strong> 10-15 min express delivery active!
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-xl text-emerald-900">
                      <strong>🎉 Coupon Alert:</strong> Use code <span className="font-bold">SUMADHURA50</span> for ₹50 off!
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <button
              onClick={() => navigateTo('wishlist')}
              className={`p-1.5 sm:p-2 rounded-full transition-colors relative ${activeTab === 'wishlist'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              aria-label="Wishlist"
              title="My Wishlist"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] sm:text-[10px] font-bold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button: compact on mobile, full width on tablet/desktop */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1.5 sm:px-3.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all duration-200 active:scale-95 flex items-center gap-1.5 sm:gap-2 flex-shrink-0"
              aria-label="Cart"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-900 text-[9px] font-black rounded-full min-w-3.5 h-3.5 px-0.5 flex items-center justify-center ring-1 ring-white">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {totalCartCount > 0 ? `₹${cartTotal}` : 'Cart'}
              </span>
            </button>

            {/* User Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-slate-200 hover:border-blue-400 text-slate-700 text-xs font-semibold bg-slate-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {user?.name ? user.name.charAt(0) : 'U'}
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
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search input bar with dropdown */}
        <div className="mt-2 sm:hidden relative">
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
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
                <span className="text-blue-600 font-bold">10-15 Min Delivery</span>
              </div>
              {filteredProducts.length > 0 ? (
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="p-2.5 hover:bg-blue-50/70 flex items-center gap-2.5 cursor-pointer transition-colors"
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
                          {p.unit} • <strong className="text-blue-600">{p.deliveryTime || '10 mins'}</strong>
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
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 w-full py-1 hover:underline"
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
      <nav className="hidden lg:block border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-8 py-2.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === 'login' && !user) {
                    setIsAuthModalOpen(true);
                  } else {
                    navigateTo(link.id);
                  }
                }}
                className={`relative py-1 transition-colors flex items-center gap-1.5 ${activeTab === link.id
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-700 hover:text-blue-600'
                  }`}
              >
                <span>{link.label}</span>
                {link.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-blue-100 text-blue-700">
                    {link.badge}
                  </span>
                )}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between z-50 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="font-black text-slate-900">Sumadhura Foods</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
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
                className="w-full mt-4 p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 flex items-center gap-2 text-xs font-semibold text-left"
              >
                <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <div className="truncate">
                  <div className="font-bold">{selectedAddress.tag} Address</div>
                  <div className="text-[11px] text-slate-500 truncate">{selectedAddress.area}</div>
                </div>
              </button>

              {/* Nav links */}
              <div className="mt-6 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (link.id === 'login' && !user) {
                        setIsAuthModalOpen(true);
                      } else {
                        navigateTo(link.id);
                      }
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-between transition-colors ${activeTab === link.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <span>{link.label}</span>
                    {link.badge > 0 && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeTab === link.id
                            ? 'bg-white text-blue-600'
                            : 'bg-blue-100 text-blue-700'
                          }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Quick Subscription Order button in mobile menu */}
              <div className="mt-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSubscriptionModalOpen(true);
                  }}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-between shadow-sm active:scale-98"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-300" />
                    <span>{activeSubscription ? 'Daily Subscription (Active)' : 'Daily Subscription Order'}</span>
                  </div>
                  <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-bold">6 AM DROP</span>
                </button>
              </div>
            </div>

            {/* Mobile Footer info */}
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              {user ? (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">{user.name}</div>
                    <div className="text-[11px]">{user.email || user.phone}</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-rose-600 font-semibold p-2"
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
                  className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-bold text-center"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
