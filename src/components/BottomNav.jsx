import React from 'react';
import { useCart } from '../context/CartContext';
import { Home, Grid, ShoppingBag, User, Package, ArrowRight } from 'lucide-react';

export const BottomNav = () => {
  const { 
    currentPage, 
    navigateTo, 
    totalItemsCount, 
    subtotal, 
    setIsCartDrawerOpen, 
    setIsAuthModalOpen,
    user 
  } = useCart();

  return (
    <>
      {/* Floating Swiggy-Style Cart Bar (appears when items in cart) */}
      {totalItemsCount > 0 && (
        <div className="md:hidden fixed bottom-16 inset-x-3 z-40 animate-bounce-short">
          <div 
            onClick={() => setIsCartDrawerOpen(true)}
            className="bg-neutral-900 text-white rounded-2xl p-3.5 shadow-2xl border border-neutral-700 flex items-center justify-between cursor-pointer active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white text-neutral-900 flex items-center justify-center font-extrabold text-xs">
                {totalItemsCount}
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">₹{subtotal} Total</p>
                <p className="text-[10px] text-neutral-400">Plus taxes • Morning Delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-bold text-xs bg-white text-neutral-950 px-3.5 py-1.5 rounded-xl">
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      )}

      {/* Swiggy-Style Fixed Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 py-2 px-3 flex items-center justify-around shadow-lg">
        
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            currentPage === 'home' ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <Home className={`w-5 h-5 ${currentPage === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span>Sumadhura</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => navigateTo('categories')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            currentPage === 'categories' ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <Grid className={`w-5 h-5 ${currentPage === 'categories' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span>Explore</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center gap-0.5 text-[10px] font-semibold text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-neutral-900 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => {
            if (user) {
              navigateTo('profile');
            } else {
              setIsAuthModalOpen(true);
            }
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            currentPage === 'profile' ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-700'
          }`}
        >
          <Package className={`w-5 h-5 ${currentPage === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span>Orders</span>
        </button>

        {/* Account */}
        <button
          onClick={() => {
            if (user) {
              navigateTo('profile');
            } else {
              setIsAuthModalOpen(true);
            }
          }}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <User className="w-5 h-5 stroke-2" />
          <span>Account</span>
        </button>

      </nav>
    </>
  );
};
