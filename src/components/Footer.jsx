import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  ArrowUp
} from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
      {/* Purity Guarantee Ribbon */}
      <div className="border-b border-neutral-800/80 py-8 px-4 sm:px-6 lg:px-8 bg-neutral-900/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-neutral-300" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Purity Certified</h4>
              <p className="text-neutral-400 text-xs">Zero chemical additives or preservatives</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white flex-shrink-0">
              <Clock className="w-5 h-5 text-neutral-300" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Morning 7:00 AM Delivery</h4>
              <p className="text-neutral-400 text-xs">Fresh doorstep delivery before breakfast</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white flex-shrink-0">
              <MapPin className="w-5 h-5 text-neutral-300" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Generational Kitchens</h4>
              <p className="text-neutral-400 text-xs">Authentic heritage recipes preserved</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white flex-shrink-0">
              <Phone className="w-5 h-5 text-neutral-300" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Customer Care</h4>
              <p className="text-neutral-400 text-xs">Toll-free assistance 7 days a week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-neutral-950 flex items-center justify-center font-bold text-lg">
                S
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Sumadhura Foods
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Sumadhura Foods is dedicated to delivering pure, unadulterated, and traditional food products right to your doorstep. From cold stone-ground flours to grandmother's heirloom pickles and pure ghee sweets, we bring authenticity back to every meal.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', page: 'home' },
                { name: 'All Categories', page: 'categories' },
                { name: 'Our Services', page: 'services' },
                { name: 'About Us', page: 'about' },
                { name: 'Contact & Support', page: 'contact' },
                { name: 'Shopping Cart', page: 'cart' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-2">
              {[
                { name: 'Pickles & Chutneys', slug: 'pickles' },
                { name: 'Pure Ghee Sweets', slug: 'sweets' },
                { name: 'Chakki Fresh Flours', slug: 'flours' },
                { name: 'Aromatic Spices', slug: 'spices' },
                { name: 'California Dry Fruits', slug: 'dry-fruits' },
                { name: 'Crispy Snacks & Namkeen', slug: 'snacks' },
              ].map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => navigateTo('categories', cat.slug)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Contact & Hub</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                <span>Central Distribution Hub: Plot 18, Road No. 45, Jubilee Hills, Hyderabad - 500033</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span>Toll Free: 1800-208-7862</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span>support@sumadhurafoods.com</span>
              </li>
              <li className="pt-2 text-[11px] text-neutral-500">
                FSSAI Lic. No: 10022047000189
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} Sumadhura Foods Private Limited. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Refund & Cancellation</a>
            <span>•</span>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors ml-2"
              title="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
