import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';

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
      icon: Home,
      action: () => navigateTo('home')
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Grid,
      action: () => navigateTo('categories')
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      badge: wishlist.length,
      action: () => navigateTo('wishlist')
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingBag,
      badge: totalCartCount,
      action: () => navigateTo('cart')
    },
    {
      id: 'login',
      label: user ? 'Account' : 'Login',
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF5EC]/95 backdrop-blur-md border-t border-[#E8DDCF] px-2 py-1 shadow-[0_-4px_16px_rgba(125,10,20,0.06)]">
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center py-1.5 px-1 relative transition-colors active:scale-95 ${
                isActive ? 'text-blue-600 font-bold' : 'text-[#7A6B63] hover:text-[#52060E]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110 stroke-[2.2]' : ''}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[9px] font-black rounded-full min-w-4 h-4 px-1 flex items-center justify-center ring-2 ring-[#FAF5EC]">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1 bg-blue-600 rounded-full mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
