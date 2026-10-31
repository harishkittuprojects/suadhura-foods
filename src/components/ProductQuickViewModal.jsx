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
  RotateCcw,
  Lock,
  Building2
} from 'lucide-react';

export const ProductQuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    pricingMode,
    setPricingMode,
    user,
    setIsAuthModalOpen,
    setAuthModalTab,
    showToast
  } = useShop();

  const isB2B = Boolean(user && user.isBusiness);

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
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8DDCF] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-500 hover:text-slate-800 hover:bg-[#FAF5EC] shadow-md transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image side */}
          <div className="relative bg-[#FAF5EC]/60 p-6 flex items-center justify-center">
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

              {/* Dual-Pricing Tier Box (Retail vs Wholesale / Whole Piece Rate) */}
              <div className="mt-4 p-3 rounded-2xl bg-[#FAF5EC] border border-[#E8DDCF] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    Pricing Rates (B2C & B2B)
                  </span>
                  <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#EDE1D1] text-[10px] font-black">
                    <button
                      onClick={() => setPricingMode('retail')}
                      className={`px-2 py-0.5 rounded transition-all ${
                        pricingMode === 'retail' ? 'bg-blue-600 text-white' : 'text-slate-600'
                      }`}
                    >
                      Retail
                    </button>
                    <button
                      onClick={() => {
                        if (!isB2B) {
                          setAuthModalTab('business');
                          setIsAuthModalOpen(true);
                          setQuickViewProduct(null);
                          showToast('🔒 B2B Login Required: Please login with a verified Business account to access wholesale rates', 'info');
                          return;
                        }
                        setPricingMode('wholesale');
                      }}
                      className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                        pricingMode === 'wholesale' ? 'bg-[#7D0A14] text-white' : 'text-slate-600'
                      }`}
                    >
                      <span>Wholesale</span>
                      {!isB2B && <Lock className="w-2.5 h-2.5 text-amber-600" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Retail Rate */}
                  <div
                    onClick={() => setPricingMode('retail')}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      pricingMode === 'retail'
                        ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                        : 'bg-white/60 border-slate-200 opacity-80'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Retail Rate (B2C)</div>
                    <div className="text-xl font-black text-[#52060E]">₹{quickViewProduct.price}</div>
                    <div className="text-[10px] text-slate-500 truncate">{quickViewProduct.unit}</div>
                  </div>

                  {/* Wholesale Rate (Unlocked only for B2B accounts) */}
                  {isB2B ? (
                    <div
                      onClick={() => setPricingMode('wholesale')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        pricingMode === 'wholesale'
                          ? 'bg-white border-[#7D0A14] ring-2 ring-[#7D0A14]/20 shadow-xs'
                          : 'bg-white/60 border-slate-200 opacity-80'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-black text-[#7D0A14] uppercase">
                        <span>Wholesale Rate</span>
                        <span className="bg-amber-100 text-amber-900 px-1 rounded text-[9px]">
                          {quickViewProduct.wholesaleSavings || 'Save 26%'}
                        </span>
                      </div>
                      <div className="text-xl font-black text-[#7D0A14]">
                        ₹{quickViewProduct.wholesalePrice || Math.round(quickViewProduct.price * 0.74)}
                      </div>
                      <div className="text-[10px] text-amber-900 font-bold truncate">
                        {quickViewProduct.wholesaleUnit || 'Commercial Bulk Pack'}
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setAuthModalTab('business');
                        setIsAuthModalOpen(true);
                        setQuickViewProduct(null);
                        showToast('🔒 B2B Login Required: Login with your business account to unlock wholesale rates', 'info');
                      }}
                      className="p-2.5 rounded-xl border-2 border-dashed border-[#7D0A14]/30 bg-gradient-to-br from-[#FFFBF5] to-[#FAF5EC] hover:border-[#7D0A14] hover:bg-[#F5ECE0] transition-all cursor-pointer flex flex-col justify-between group shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-black text-[#7D0A14] uppercase">
                          <span className="flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-600" /> B2B Wholesale
                          </span>
                          <span className="bg-[#7D0A14] text-amber-200 px-1 rounded text-[8.5px] font-black">
                            Save 35%
                          </span>
                        </div>
                        <div className="text-xs font-black text-[#3D040A] mt-1 leading-tight">
                          Confidential Rates
                        </div>
                        <div className="text-[9.5px] text-slate-500 mt-0.5">
                          GST / Trade accounts only
                        </div>
                      </div>
                      <button
                        type="button"
                        className="mt-2 w-full py-1 px-2 rounded-lg bg-[#7D0A14] group-hover:bg-[#5A070E] text-white text-[10px] font-black flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Building2 className="w-3 h-3 text-amber-300" />
                        <span>Unlock with B2B Login</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-[#E8DDCF]/60">
                  <span>MOQ: <strong>{quickViewProduct.wholesaleMoq || 'Commercial Bulk'}</strong></span>
                  <span className="text-emerald-700 font-bold">100% GST ITC Invoice Eligible</span>
                </div>
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
                className={`flex-1 py-3 px-5 rounded-2xl active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isB2B && pricingMode === 'wholesale'
                    ? 'bg-[#7D0A14] hover:bg-[#60060E] shadow-[#7D0A14]/25'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>
                  {isB2B && pricingMode === 'wholesale' ? 'Bulk Add to Cart' : 'Add to Cart'} (₹
                  {(isB2B && pricingMode === 'wholesale'
                    ? quickViewProduct.wholesalePrice || Math.round(quickViewProduct.price * 0.74)
                    : quickViewProduct.price) * quantity}
                  )
                </span>
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
