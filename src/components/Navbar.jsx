import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  User, 
  MapPin, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  PhoneCall, 
  ShieldCheck, 
  LogOut, 
  Package, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentPage, 
    navigateTo, 
    cart, 
    totalItemsCount, 
    subtotal, 
    user, 
    logoutUser, 
    deliveryLocation, 
    setIsCartDrawerOpen, 
    setIsLocationModalOpen, 
    setIsAuthModalOpen, 
    setAuthMode,
    searchQuery,
    setSearchQuery
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (currentPage !== 'categories') {
      navigateTo('categories');
    }
  };

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Categories', page: 'categories' },
    { label: 'Our Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm transition-shadow overflow-x-clip">
      
      {/* ======================================================= */}
      {/* 1. SWIGGY-STYLE MOBILE APP HEADER (< md screens) */}
      {/* ======================================================= */}
      <div className="md:hidden bg-white px-3.5 pt-3 pb-2.5 space-y-2 border-b border-neutral-100">
        {/* Top Location Bar with User Profile */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-2 text-left min-w-0"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 flex-shrink-0">
              <MapPin className="w-4 h-4 text-neutral-800" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 font-black text-xs text-neutral-950 leading-tight">
                <span className="truncate max-w-[140px]">{deliveryLocation.area}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
              </div>
              <span className="text-[10px] text-neutral-400 font-medium truncate block max-w-[180px]">
                {deliveryLocation.city} - {deliveryLocation.pincode}
              </span>
            </div>
          </button>

          {/* Right Action: Cart + User Profile Circle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative w-8 h-8 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-950 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                if (user) {
                  navigateTo('profile');
                } else {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }
              }}
              className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center text-xs font-bold shadow-sm"
              aria-label="Account"
            >
              {user ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Swiggy Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search 'avakaya pickle', 'besan laddu', 'atta'..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentPage !== 'categories' && e.target.value.length > 0) {
                navigateTo('categories');
              }
            }}
            className="w-full bg-neutral-100 hover:bg-neutral-150 focus:bg-white text-xs text-neutral-900 placeholder-neutral-400 pl-10 pr-8 py-2.5 rounded-xl border border-transparent focus:border-neutral-300 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-neutral-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* ======================================================= */}
      {/* 2. DESKTOP HEADER (MD & LARGER SCREENS) */}
      {/* ======================================================= */}
      <div className="hidden md:block">
        {/* Top Purity Banner */}
        <div className="bg-neutral-900 text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 truncate">
              <span className="flex items-center gap-1.5 text-neutral-200 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                100% Purity Tested • Zero Adulteration
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300">
                Morning Delivery by 7:00 AM Guaranteed
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs flex-shrink-0">
              <button 
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-1.5 text-neutral-200 hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-semibold underline decoration-neutral-600 underline-offset-2">
                  {deliveryLocation.area}, {deliveryLocation.city}
                </span>
                <span className="text-neutral-400 font-normal">({deliveryLocation.pincode})</span>
              </button>
              <span className="text-neutral-600">|</span>
              <a 
                href="tel:18002087862" 
                className="flex items-center gap-1 text-neutral-300 hover:text-white"
              >
                <PhoneCall className="w-3 h-3" />
                <span>1800-208-7862</span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Navbar Row */}
        <div className={`transition-all duration-200 ${isScrolled ? 'py-2.5 bg-white/95 backdrop-blur-md' : 'py-3.5 bg-white'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between gap-6 lg:gap-8">
              
              {/* Logo */}
              <div 
                onClick={() => navigateTo('home')} 
                className="flex items-center gap-2.5 cursor-pointer flex-shrink-0 select-none group"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-neutral-800 transition-colors">
                  <span className="tracking-tighter">S</span>
                </div>
                <div>
                  <span className="font-extrabold text-xl tracking-tight text-neutral-900 group-hover:text-black block leading-tight">
                    Sumadhura Foods
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block">
                    Pure & Traditional
                  </span>
                </div>
              </div>

              {/* Desktop Nav Links */}
              <nav className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => navigateTo(link.page)}
                    className={`text-sm font-semibold tracking-tight transition-colors py-1 relative ${
                      currentPage === link.page
                        ? 'text-neutral-950 font-bold'
                        : 'text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    {link.label}
                    {currentPage === link.page && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950 rounded-full" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Search Bar */}
              <form 
                onSubmit={handleSearchSubmit}
                className="flex items-center flex-1 max-w-xs lg:max-w-sm relative"
              >
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search pickles, sweets, spices, atta..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentPage !== 'categories' && e.target.value.length > 0) {
                      navigateTo('categories');
                    }
                  }}
                  className="w-full bg-neutral-100 hover:bg-neutral-150 focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 pl-10 pr-8 py-2.5 rounded-full border border-transparent focus:border-neutral-400 focus:outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-neutral-400 hover:text-neutral-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Desktop Right Action Icons */}
              <div className="flex items-center gap-3">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors border border-neutral-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="max-w-[100px] truncate">{user.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                    </button>

                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-neutral-200 py-2 z-50 animate-fade-in">
                        <div className="px-4 py-2.5 border-b border-neutral-100">
                          <p className="text-xs font-bold text-neutral-900">{user.name}</p>
                          <p className="text-[11px] text-neutral-500 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            navigateTo('profile');
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                        >
                          <User className="w-4 h-4 text-neutral-500" />
                          My Profile & Addresses
                        </button>
                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            navigateTo('profile');
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                        >
                          <Package className="w-4 h-4 text-neutral-500" />
                          Order History
                        </button>
                        <div className="border-t border-neutral-100 my-1" />
                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            logoutUser();
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 text-neutral-800 hover:text-black font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl hover:bg-neutral-100 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>User Login</span>
                  </button>
                )}

                {/* Desktop Cart Button */}
                <button
                  onClick={() => setIsCartDrawerOpen(true)}
                  className="relative flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-neutral-900 border border-neutral-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItemsCount}
                    </span>
                  )}
                  <span className="font-bold">Cart</span>
                  {totalItemsCount > 0 && (
                    <span className="text-neutral-400 font-normal">
                      • ₹{subtotal}
                    </span>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </header>
  );
};
