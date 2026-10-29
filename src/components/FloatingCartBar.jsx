import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, ArrowRight, Zap, Sparkles } from 'lucide-react';

export const FloatingCartBar = () => {
  const {
    totalCartCount,
    cartTotal,
    cartSubtotal,
    isCartOpen,
    isCheckoutModalOpen,
    isLiveTrackingOpen,
    setIsCartOpen,
    activeTab,
    isOneMember
  } = useShop();

  // Don't show if empty or when cart/checkout/tracking is already active
  if (
    totalCartCount === 0 ||
    isCartOpen ||
    isCheckoutModalOpen ||
    isLiveTrackingOpen ||
    activeTab === 'cart'
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-[4.25rem] sm:bottom-20 lg:bottom-6 left-0 right-0 z-40 px-3 sm:px-4 pointer-events-none animate-in slide-in-from-bottom-4 duration-300">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full bg-slate-900/95 backdrop-blur-md hover:bg-slate-950 active:scale-98 text-white py-2.5 px-3.5 sm:py-3.5 sm:px-4 rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-between border border-slate-700/80 transition-all duration-200 group"
        >
          {/* Left details */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-left">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-base">
                  {totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'} | ₹{cartTotal}
                </span>
                {isOneMember && (
                  <span className="hidden sm:inline-flex items-center gap-1 bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" /> ONE FREE DELIVERY
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-300">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Zap className="w-3 h-3" /> 10-15 mins
                </span>
                <span className="text-slate-400 hidden xs:inline">• Tap to review</span>
              </div>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-bold text-xs sm:text-sm text-blue-400 group-hover:text-blue-300 flex-shrink-0">
            <span>View Cart</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
