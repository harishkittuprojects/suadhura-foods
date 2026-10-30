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
          className="w-full bg-[#4D060D]/95 backdrop-blur-md hover:bg-[#3D040A] active:scale-98 text-white py-2.5 px-3.5 sm:py-3.5 sm:px-4 rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-between border border-[#680811] transition-all duration-200 group"
        >
          {/* Left details */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-left">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#F5A623] text-[#3D040A] flex items-center justify-center font-black text-sm shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xs sm:text-base">
                  {totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'} | ₹{cartTotal}
                </span>
                {isOneMember && (
                  <span className="hidden sm:inline-flex items-center gap-1 bg-[#F5A623] text-[#3D040A] text-[10px] font-black px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" /> ONE FREE DELIVERY
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-amber-100/80">
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Zap className="w-3 h-3" /> 10-15 mins
                </span>
                <span className="text-amber-200/50 hidden xs:inline">• Tap to review</span>
              </div>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-black text-xs sm:text-sm text-[#F5A623] group-hover:text-amber-300 flex-shrink-0">
            <span>View Cart</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5A623]" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
