import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Plus, Minus, Star, Eye, Clock, Sparkles, Lock, Building2 } from 'lucide-react';

export const ProductCard = ({ product, priority = false }) => {
  const {
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    pricingMode,
    setPricingMode,
    user,
    setIsAuthModalOpen,
    setAuthModalTab,
    showToast
  } = useShop();

  const isLiked = isInWishlist(product.id);
  const cartItem = cart.find((item) => item.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const isWholesale = Boolean(user && user.isBusiness && pricingMode === 'wholesale');
  const activePrice = isWholesale
    ? product.wholesalePrice || Math.round(product.price * 0.74)
    : product.price;
  const activeUnit = isWholesale
    ? product.wholesaleUnit || product.unit
    : product.unit;

  // Calculate percentage discount
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={`group relative bg-white rounded-2xl border shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 ${
        isWholesale
          ? 'border-[#E0CDB8] hover:border-[#7D0A14] ring-1 ring-[#7D0A14]/10'
          : 'border-[#EDE1D1] hover:border-[#D5C2AC]'
      }`}
    >
      {/* Product Image Box */}
      <div className="relative aspect-square w-full bg-[#FAF5EC]/60 overflow-hidden flex items-center justify-center p-2.5">
        {/* Top Badge: Wholesale Rate vs Retail Discount */}
        {isWholesale ? (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#7D0A14] text-amber-200 border border-amber-400/40 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
            🏢 WHOLESALE • {product.wholesaleSavings || '25% OFF'}
          </span>
        ) : (
          discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-blue-700 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
              {discountPercent}% OFF
            </span>
          )
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
      <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Green Veg Dot Indicator & Category */}
          <div className="flex items-center justify-between gap-1 text-xs mb-1">
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
              {/* Indian Food Safety Green Veg Dot Square */}
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 border border-emerald-600 rounded-sm flex items-center justify-center p-0.5 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-extrabold text-blue-600 uppercase tracking-wider truncate max-w-[65px] sm:max-w-[110px]">
                {product.category}
              </span>
            </div>

            <span className={`font-semibold text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0 ${
              isWholesale
                ? 'bg-amber-100/80 text-[#7D0A14] font-black border border-amber-300/60'
                : 'text-slate-500 bg-slate-100'
            }`}>
              {activeUnit}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-[#7D0A14] cursor-pointer transition-colors"
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
        <div className="mt-2.5 pt-2 border-t border-[#F2E8DC] flex items-center justify-between gap-1.5">
          {/* Price */}
          <div className="min-w-0">
            {isWholesale ? (
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-lg font-black text-[#7D0A14]">₹{activePrice}</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 line-through">
                    ₹{product.price}
                  </span>
                </div>
                <span className="text-[9px] font-extrabold text-amber-800 truncate block">
                  MOQ: {product.wholesaleMoq || 'Bulk Pack'}
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-black text-[#52060E]">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-[10px] sm:text-[11px] text-slate-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAuthModalTab('business');
                    setIsAuthModalOpen(true);
                    showToast('🔒 B2B Login Required: Login with your business account to unlock wholesale rates', 'info');
                  }}
                  className="text-[9.5px] text-[#7D0A14] hover:text-[#5A070E] font-bold flex items-center gap-1 mt-0.5 truncate"
                  title="B2B Login Required to unlock wholesale rates"
                >
                  <Lock className="w-2.5 h-2.5 text-amber-600 flex-shrink-0" />
                  <span className="truncate">Wholesale: <strong className="underline font-black">Login to Unlock 🔒</strong></span>
                </button>
              </div>
            )}
          </div>

          {/* Signature ADD Button or Quantity Stepper */}
          {quantityInCart > 0 ? (
            <div className={`flex items-center rounded-lg sm:rounded-xl p-0.5 text-white shadow-sm flex-shrink-0 ${
              isWholesale ? 'bg-[#7D0A14]' : 'bg-blue-600'
            }`}>
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg flex items-center justify-center transition-colors ${
                  isWholesale ? 'bg-[#5A070E] hover:bg-[#3D040A]' : 'bg-blue-700/80 hover:bg-blue-800'
                }`}
                aria-label="Decrease quantity"
              >
                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
              <span className="w-5 sm:w-6 text-center font-black text-[11px] sm:text-xs">{quantityInCart}</span>
              <button
                onClick={() => updateQuantity(product.id, 1)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg flex items-center justify-center transition-colors ${
                  isWholesale ? 'bg-[#5A070E] hover:bg-[#3D040A]' : 'bg-blue-700/80 hover:bg-blue-800'
                }`}
                aria-label="Increase quantity"
              >
                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl font-black text-[11px] sm:text-xs shadow-xs hover:shadow-sm transition-all duration-150 active:scale-95 flex items-center justify-center gap-1 flex-shrink-0 ${
                isWholesale
                  ? 'bg-[#7D0A14] hover:bg-[#60060E] text-white border border-[#91131E]'
                  : 'border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 bg-white'
              }`}
              aria-label={`Add ${product.name} to Cart`}
            >
              <span>{isWholesale ? 'BULK ADD' : 'ADD'}</span>
              <Plus className="w-3 h-3 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
