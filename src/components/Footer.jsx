import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  Heart,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useShop();

  return (
    <footer className="bg-[#260206] text-[#D8C7C0] pt-16 pb-24 lg:pb-12 border-t border-[#3D040A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Feature Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-[#3D040A]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#7D0A14]/40 text-amber-300 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">30-Min Fast Delivery</h4>
              <p className="text-xs text-[#A8968F]">Fresh at your doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#7D0A14]/40 text-amber-300 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Quality Checked</h4>
              <p className="text-xs text-[#A8968F]">Sourced from certified farms</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#7D0A14]/40 text-amber-300 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">24/7 Customer Care</h4>
              <p className="text-xs text-[#A8968F]">Always here to assist you</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#7D0A14]/40 text-amber-300 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">70,000+ Happy Families</h4>
              <p className="text-xs text-[#A8968F]">South India's trusted grocer</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                SUMADHURA<span className="text-[#F5A623] font-extrabold ml-1">FOODS</span>
              </span>
            </div>
            <p className="text-xs text-[#A8968F] leading-relaxed max-w-sm">
              Sumadhura Foods is dedicated to bringing authentic, nutritious, farm-fresh dairy products,
              hand-harvested crisp vegetables, and purest grocery staples straight from trusted growers to your dinner table.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                className="w-9 h-9 rounded-full bg-[#3D040A] hover:bg-blue-600 hover:text-white flex items-center justify-center text-[#D8C7C0] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-[#3D040A] hover:bg-rose-600 hover:text-white flex items-center justify-center text-[#D8C7C0] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-[#3D040A] hover:bg-sky-500 hover:text-white flex items-center justify-center text-[#D8C7C0] transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#linkedin"
                className="w-9 h-9 rounded-full bg-[#3D040A] hover:bg-blue-700 hover:text-white flex items-center justify-center text-[#D8C7C0] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide mb-4">Quick Links</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories')}
                  className="hover:text-amber-300 transition-colors"
                >
                  All Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('b2b')}
                  className="text-amber-300 font-bold hover:text-amber-200 transition-colors flex items-center gap-1.5"
                >
                  <span>🏢 B2B Wholesale Supply</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('services')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="text-amber-200 hover:text-white transition-colors flex items-center gap-1.5 font-bold"
                >
                  <span>⚙️ Operations Admin Panel (Demo)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('wishlist')}
                  className="hover:text-amber-300 transition-colors"
                >
                  My Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('cart')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Shopping Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide mb-4">Product Categories</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('categories', 'Dairy Products')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Dairy Products (Milk, Paneer, Ghee)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories', 'Fresh Vegetables')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Farm Fresh Vegetables
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories', 'Rice, Atta and Dals')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Kitchen Groceries & Staples
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories', 'Oils and Ghee')}
                  className="hover:text-amber-300 transition-colors"
                >
                  A2 Desi Cow Ghee
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories', 'Oils and Ghee')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Cold Pressed Cooking Oils
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide mb-4">Contact Information</h5>
            <ul className="space-y-3 text-xs text-[#D8C7C0]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
                <span>Sumadhura Tower, #42 100ft Road, Indiranagar, Bengaluru, KA 560038</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>+91 800-FOOD-SUM (+91 800-3663-786)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>orders@sumadhurafoods.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>Daily Delivery: 6:00 AM – 10:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-[#3D040A] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E8B85] gap-4">
          <p>© {new Date().getFullYear()} Sumadhura Foods Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#D8C7C0] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#D8C7C0] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#D8C7C0] cursor-pointer">Shipping & Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
