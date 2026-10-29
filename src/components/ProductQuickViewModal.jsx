import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const ProductQuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isLiked = isInWishlist(quickViewProduct.id);
  const discountPercent = quickViewProduct.originalPrice
    ? Math.round(
        ((quickViewProduct.originalPrice - quickViewProduct.price) /
          quickViewProduct.originalPrice) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-500 hover:text-slate-800 hover:bg-slate-100 shadow-md transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image side */}
          <div className="relative bg-slate-50 p-6 flex items-center justify-center">
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-sm"
            />
          </div>

          {/* Details side */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  {quickViewProduct.category}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  Unit: {quickViewProduct.unit}
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold ml-1">{quickViewProduct.rating}</span>
                </div>
                <span className="text-xs text-slate-400">
                  ({quickViewProduct.reviewsCount} verified customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  ₹{quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{quickViewProduct.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-600 font-bold ml-1">
                  Save ₹{(quickViewProduct.originalPrice || quickViewProduct.price) - quickViewProduct.price}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Badges / Guarantees */}
              <div className="mt-4 space-y-2 border-t border-b border-slate-100 py-3 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Farm Fresh Guarantee & Quality Checked</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>Delivered to your kitchen in 30 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>No questions asked replacement within 24h</span>
                </div>
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center bg-slate-100 rounded-2xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white flex items-center justify-center hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-9 text-center font-bold text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white flex items-center justify-center hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart (₹{quickViewProduct.price * quantity})</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`p-3 rounded-2xl border transition-colors ${
                  isLiked
                    ? 'border-rose-200 bg-rose-50 text-rose-500'
                    : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-slate-50'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
