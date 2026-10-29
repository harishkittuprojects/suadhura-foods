import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Plus, Minus, Star, Eye, Clock, Sparkles } from 'lucide-react';

export const ProductCard = ({ product, priority = false }) => {
  const {
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useShop();

  const isLiked = isInWishlist(product.id);
  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Calculate percentage discount
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={priority ? '50' : '100'}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
    >
      {/* Product Image Box */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden flex items-center justify-center p-2.5">
        {/* 10-Min Delivery Ribbon / Discount */}
        {discountPercent > 0 && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-blue-700 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
            {discountPercent}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full transition-all duration-200 shadow-sm ${
            isLiked
              ? 'bg-rose-50 text-rose-500 scale-110 shadow-rose-200'
              : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 stroke-rose-500' : ''}`} />
        </button>

        {/* Quick View overlay button */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-white/95 text-slate-700 opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-blue-600 hover:text-white transform group-hover:scale-100 scale-75 z-10"
          title="Quick View"
          aria-label="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onClick={() => setQuickViewProduct(product)}
          className="w-full h-full object-cover object-center rounded-xl cursor-pointer group-hover:scale-105 transition-transform duration-300"
        />

        {/* ETA Tag Overlay */}
        <div className="absolute bottom-2 left-2 z-10 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-2.5 h-2.5 text-amber-300" />
          <span>{product.deliveryTime || '10 MINS'}</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Green Veg Dot Indicator & Category */}
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex items-center gap-1.5">
              {/* Indian Food Safety Green Veg Dot Square */}
              <div className="w-3.5 h-3.5 border border-emerald-600 rounded-sm flex items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </div>
              <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider truncate max-w-[100px]">
                {product.category}
              </span>
            </div>

            <span className="text-slate-500 font-semibold text-[11px] bg-slate-100 px-1.5 py-0.2 rounded">
              {product.unit}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-0.5 font-extrabold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              {product.rating}
            </span>
            <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing and ADD Button Section */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-[11px] text-slate-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Signature ADD Button or Quantity Stepper */}
          {quantityInCart > 0 ? (
            <div className="flex items-center bg-blue-600 rounded-xl p-0.5 text-white shadow-md shadow-blue-500/20">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className="w-6 h-6 rounded-lg bg-blue-700/80 hover:bg-blue-800 flex items-center justify-center transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center font-black text-xs">{quantityInCart}</span>
              <button
                onClick={() => updateQuantity(product.id, 1)}
                className="w-6 h-6 rounded-lg bg-blue-700/80 hover:bg-blue-800 flex items-center justify-center transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              className="px-4 py-1.5 rounded-xl border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 bg-white font-extrabold text-xs shadow-sm hover:shadow-md transition-all duration-150 active:scale-95 flex items-center gap-1"
              aria-label={`Add ${product.name} to Cart`}
            >
              <span>ADD</span>
              <Plus className="w-3 h-3 stroke-[3]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
