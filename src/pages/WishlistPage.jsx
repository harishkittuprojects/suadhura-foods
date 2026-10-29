import React from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const WishlistPage = () => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    navigateTo,
    setQuickViewProduct
  } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    savedProducts.forEach((p) => addToCart(p, 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Page Header */}
      <div
        data-aos="fade-down"
        className="rounded-3xl bg-gradient-to-r from-blue-800 via-blue-700 to-slate-900 text-white p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">My Wishlist</h1>
          <p className="text-xs sm:text-sm text-blue-100">
            {savedProducts.length} {savedProducts.length === 1 ? 'product' : 'products'} saved to your wishlist.
          </p>
        </div>

        {savedProducts.length > 0 && (
          <button
            onClick={handleMoveAllToCart}
            className="px-6 py-3.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 active:scale-95 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all flex-shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add All to Cart</span>
          </button>
        )}
      </div>

      {/* Wishlist Items Grid */}
      {savedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 sm:p-16 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-sm">
            <Heart className="w-10 h-10 fill-rose-400/30 text-rose-500 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Your wishlist is currently empty</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Explore our farm-fresh milk, organic vegetables, and kitchen groceries, then click the heart icon on any product to save it here!
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('categories')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all inline-flex items-center gap-2"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {savedProducts.map((prod) => (
            <div
              key={prod.id}
              data-aos="fade-up"
              className="group bg-white rounded-2xl border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative aspect-square w-full bg-slate-50 overflow-hidden p-3">
                <img
                  src={prod.image}
                  alt={prod.name}
                  onClick={() => setQuickViewProduct(prod)}
                  className="w-full h-full object-cover rounded-xl cursor-pointer group-hover:scale-105 transition-transform duration-300"
                />
                {/* Remove button */}
                <button
                  onClick={() => toggleWishlist(prod)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-rose-50 shadow-sm transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-bold text-blue-600 uppercase text-[10px]">
                      {prod.category}
                    </span>
                    <span className="text-slate-400 text-[11px]">{prod.unit}</span>
                  </div>
                  <h3
                    onClick={() => setQuickViewProduct(prod)}
                    className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-blue-600 cursor-pointer"
                  >
                    {prod.name}
                  </h3>
                </div>

                {/* Price & Add to Cart button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-slate-900">₹{prod.price}</span>
                    {prod.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">₹{prod.originalPrice}</span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
