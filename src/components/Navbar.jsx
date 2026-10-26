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
      {/* Top Banner (Country Delight style delivery & purity strip) */}
      <div className="bg-neutral-900 text-neutral-300 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-neutral-800 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left Purity Text */}
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-neutral-200 font-medium truncate">
              <span className="hidden sm:inline">100% Purity Tested • Zero Adulteration • Morning 7 AM Drop</span>
              <span className="sm:hidden">100% Pure Food • 7 AM Delivery</span>
            </span>
          </div>

          {/* Right Location & Support */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 text-[11px] sm:text-xs">
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1 text-neutral-200 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-neutral-400 flex-shrink-0" />
              <span className="font-semibold underline decoration-neutral-600 underline-offset-2 truncate max-w-[110px] sm:max-w-none">
                {deliveryLocation.area}
              </span>
              <span className="hidden md:inline text-neutral-400 font-normal">({deliveryLocation.pincode})</span>
            </button>
            <span className="hidden md:inline text-neutral-600">|</span>
            <a 
              href="tel:18002087862" 
              className="hidden md:flex items-center gap-1 text-neutral-300 hover:text-white"
            >
              <PhoneCall className="w-3 h-3" />
              <span>1800-208-7862</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-200 ${isScrolled ? 'py-2.5 bg-white/95 backdrop-blur-md' : 'py-3.5 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            
            {/* Logo */}
            <div 
              onClick={() => navigateTo('home')} 
              className="flex items-center gap-2.5 cursor-pointer flex-shrink-0 select-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-neutral-800 transition-colors">
                <span className="tracking-tighter">S</span>
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-neutral-900 group-hover:text-black block leading-tight">
                  Sumadhura Foods
                </span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block">
                  Pure & Traditional
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
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
              className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm relative"
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
                className="w-full bg-neutral-100 hover:bg-neutral-150 focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-neutral-400 focus:outline-none transition-all shadow-inner"
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

            {/* Right Action Icons (User, Cart, Mobile Toggle) */}
            <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
              
              {/* User Login / Profile Button */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors border border-neutral-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline max-w-[90px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500 hidden sm:inline" />
                  </button>

                  {/* Dropdown Menu */}
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
                  className="flex items-center gap-1.5 text-neutral-800 hover:text-black font-semibold text-xs sm:text-sm p-2 sm:px-3 sm:py-2 rounded-xl hover:bg-neutral-100 transition-colors"
                  title="User Login"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">User Login</span>
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center gap-1.5 sm:gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm active:scale-95 flex-shrink-0"
                aria-label="View Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-neutral-900 border border-neutral-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItemsCount}
                    </span>
                  )}
                </div>
                <span className="font-bold hidden sm:inline">Cart</span>
                {totalItemsCount > 0 && (
                  <span className="hidden md:inline text-neutral-400 font-normal">
                    • ₹{subtotal}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 text-neutral-700 hover:text-black rounded-xl hover:bg-neutral-100 lg:hidden transition-colors flex-shrink-0"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>

            </div>
          </div>

          {/* Mobile Search Row (visible on small mobile screens) */}
          <div className="mt-3 block md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search food, pickles, sweets, spices..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentPage !== 'categories' && e.target.value.length > 0) {
                    navigateTo('categories');
                  }
                }}
                className="w-full bg-neutral-100 focus:bg-white text-xs text-neutral-900 placeholder-neutral-400 pl-10 pr-4 py-2 rounded-xl border border-neutral-200 focus:border-neutral-500 focus:outline-none"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] bottom-0 bg-white/95 backdrop-blur-md z-50 border-t border-neutral-200 flex flex-col justify-between overflow-y-auto p-6 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLocationModalOpen(true);
                }}
                className="flex items-center gap-2 text-xs font-semibold text-neutral-800"
              >
                <MapPin className="w-4 h-4 text-neutral-600" />
                <span>Deliver to: {deliveryLocation.area}, {deliveryLocation.city}</span>
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    navigateTo(link.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                    currentPage === link.page
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </button>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-neutral-200 space-y-3">
            {user ? (
              <div className="space-y-2">
                <div className="p-3 bg-neutral-100 rounded-xl">
                  <p className="text-xs font-bold text-neutral-900">{user.name}</p>
                  <p className="text-xs text-neutral-500">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateTo('profile');
                  }}
                  className="w-full text-center py-2.5 text-xs font-bold bg-neutral-200 text-neutral-900 rounded-xl"
                >
                  View Profile & Past Orders
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logoutUser();
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-3 bg-neutral-900 text-white font-bold text-sm rounded-xl"
              >
                Login / Create Account
              </button>
            )}

            <div className="text-center text-xs text-neutral-400 pt-2">
              Sumadhura Foods Customer Desk: 1800-208-7862
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
