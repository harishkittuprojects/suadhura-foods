import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingCart, User } from 'lucide-react';

const HomeHutIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
  </svg>
);

const MenuClocheIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v2" />
    <path d="M4 18h16" />
    <path d="M4 18a8 8 0 0 1 16 0" />
    <circle cx="12" cy="4" r="1" fill="currentColor" />
  </svg>
);

export const MobileBottomNav = () => {
  const {
    activeTab,
    navigateTo,
    totalCartCount,
    wishlist,
    user,
    setIsAuthModalOpen,
  } = useShop();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: HomeHutIcon,
      action: () => navigateTo('home')
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: MenuClocheIcon,
      action: () => navigateTo('categories')
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      badge: wishlist?.length || 0,
      action: () => navigateTo('wishlist')
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingCart,
      badge: totalCartCount > 0 ? totalCartCount : 0,
      action: () => navigateTo('cart')
    },
    {
      id: 'account',
      label: 'Account',
      icon: User,
      action: () => {
        if (!user) {
          setIsAuthModalOpen(true);
        } else {
          navigateTo('login');
        }
      }
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF5EC]/98 backdrop-blur-md border-t border-[#EDE1D1] px-2 py-1 shadow-[0_-4px_16px_rgba(125,10,20,0.06)]">
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.id === 'menu' && activeTab === 'categories') ||
            (item.id === 'account' && activeTab === 'login');

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1.5 px-1 relative transition-colors active:scale-95 ${
                isActive ? 'text-[#7D0A14] font-bold' : 'text-[#8A7B76] hover:text-[#52060E]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110 text-[#7D0A14]' : ''}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#7D0A14] text-white text-[9px] font-black rounded-full min-w-4 h-4 px-1 flex items-center justify-center ring-2 ring-[#FAF5EC]">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight truncate w-full text-center ${isActive ? 'text-[#7D0A14] font-bold' : 'text-[#8A7B76]'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-4 h-0.5 bg-[#7D0A14] rounded-full mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
