import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { products as defaultProducts } from '../data/products';
import confetti from 'canvas-confetti';
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
  Building2,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Award,
  Leaf,
  Package,
  ThumbsUp,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from 'lucide-react';

export const ProductQuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    products: shopProducts,
    pricingMode,
    setPricingMode,
    user,
    setIsAuthModalOpen,
    showToast
  } = useShop();

  const isB2B = Boolean(user && user.isBusiness);

  const scrollContainerRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPackMultiplier, setSelectedPackMultiplier] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showScrollDownHint, setShowScrollDownHint] = useState(true);

  // Check URL on mount for ?product=... parameter to support direct shared links
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const prodId = params.get('product') || params.get('share');
      if (prodId && !quickViewProduct) {
        const found = products.find(
          (p) => String(p.id).toLowerCase() === String(prodId).toLowerCase()
        );
        if (found) {
          setQuickViewProduct(found);
        }
      }
    } catch (err) {
      console.error('Error parsing product URL param:', err);
    }
  }, []);

  // Sync URL query param when modal opens/closes so users can copy the current browser address bar directly
  useEffect(() => {
    if (quickViewProduct) {
      const isWholesale = Boolean(pricingMode === 'wholesale' || (user && user.isBusiness));
      setQuantity(isWholesale ? 5 : 1);
      setSelectedPackMultiplier(1);
      setActiveImageIndex(0);
      setIsShareOpen(false);
      setCopiedLink(false);
      setShowScrollDownHint(true);

      // Reset scroll position to top
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }

      try {
        const url = new URL(window.location.href);
        url.searchParams.set('product', quickViewProduct.id);
        window.history.replaceState({}, '', url.toString());
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('product')) {
          url.searchParams.delete('product');
          window.history.replaceState({}, '', url.toString());
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isLiked = isInWishlist(quickViewProduct.id);
  const cartItem = cart.find((item) => item.id === quickViewProduct.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const isWholesale = Boolean(isB2B && pricingMode === 'wholesale');
  const baseUnitPrice = isWholesale
    ? quickViewProduct.wholesalePrice || Math.round(quickViewProduct.price * 0.74)
    : quickViewProduct.price;

  // Price calculation based on pack multiplier
  const effectiveUnitPrice =
    selectedPackMultiplier === 1
      ? baseUnitPrice
      : selectedPackMultiplier === 2
      ? Math.round(baseUnitPrice * 1.9) // 5% savings on 2x
      : Math.round(baseUnitPrice * 2.75); // ~8% savings on 3x

  const discountPercent = quickViewProduct.originalPrice
    ? Math.round(
        ((quickViewProduct.originalPrice - quickViewProduct.price) /
          quickViewProduct.originalPrice) *
          100
      )
    : 0;

  const totalPayable = effectiveUnitPrice * quantity;

  // Image Gallery Angles / Previews
  const galleryImages = [
    quickViewProduct.image,
    // Contextual farm harvest and natural fresh images based on category
    quickViewProduct.category?.toLowerCase().includes('fruit')
      ? 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80'
      : quickViewProduct.category?.toLowerCase().includes('veg')
      ? 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
      : quickViewProduct.category?.toLowerCase().includes('dish')
      ? 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=800&q=80'
  ];

  // Sharing handlers
  const productShareUrl = `${window.location.origin}${window.location.pathname}?product=${quickViewProduct.id}`;
  const shareMessage = `Check out fresh "${quickViewProduct.name}" (₹${baseUnitPrice}/${quickViewProduct.unit}) on Sumadhura Foods! 10-15 Min Express Delivery 🚚 Doorstep fresh!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productShareUrl);
      setCopiedLink(true);
      showToast(`Link to ${quickViewProduct.name} copied to clipboard! 📋`);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      showToast(`Product URL: ${productShareUrl}`);
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareMessage}\n\n👉 Order here: ${productShareUrl}`
    )}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${quickViewProduct.name} | Sumadhura Foods`,
          text: shareMessage,
          url: productShareUrl
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      }
    }
    // Fallback: Copy link
    handleCopyLink();
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    showToast(`Added ${quantity}x ${quickViewProduct.name} to cart! 🛍️`);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {}
    setQuickViewProduct(null);
  };

  // Scroll Helpers
  const handleScroll = (e) => {
    if (e.target.scrollTop > 80) {
      setShowScrollDownHint(false);
    } else {
      setShowScrollDownHint(true);
    }
  };

  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 320, behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-hidden"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full h-[92vh] sm:h-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col shadow-2xl border border-[#EDE1D1] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. STICKY TOP HEADER BAR - Pinned above scroll */}
        <div className="bg-gradient-to-r from-[#FAF5EC] via-white to-[#FAF5EC] px-3.5 sm:px-6 py-3 border-b border-[#EDE1D1] flex items-center justify-between gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            {/* Indian FSSAI Veg / Non-Veg Indicator */}
            <div
              className={`w-4 h-4 border rounded-sm flex items-center justify-center p-0.5 shrink-0 ${
                quickViewProduct.isVeg === false ? 'border-rose-600' : 'border-emerald-600'
              }`}
              title={quickViewProduct.isVeg === false ? 'Non-Vegetarian' : '100% Pure Vegetarian'}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  quickViewProduct.isVeg === false ? 'bg-rose-600' : 'bg-emerald-600'
                }`}
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold truncate">
              <span className="text-[#7D0A14] font-black uppercase tracking-wider text-[11px] truncate">
                {quickViewProduct.category}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-800 font-bold truncate hidden sm:inline">
                {quickViewProduct.name}
              </span>
            </div>
          </div>

          {/* Action Icons: Scroll Helper, Share, Wishlist, Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Scroll Indicator Button */}
            <button
              type="button"
              onClick={handleScrollDown}
              className="px-2.5 py-1.5 rounded-xl bg-[#FAF5EC] hover:bg-[#EDE1D1] text-[#7D0A14] border border-[#EDE1D1] text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
              title="Scroll down for details, nutrition & reviews"
            >
              <span>Scroll</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Share Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setIsShareOpen(!isShareOpen)}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#FAF5EC] hover:bg-[#F2E8DC] text-[#7D0A14] border border-[#EDE1D1] text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Share product with friends & family"
              >
                <Share2 className="w-3.5 h-3.5 text-[#7D0A14]" />
                <span className="hidden sm:inline">Share</span>
              </button>

              {/* Share Popover Menu */}
              {isShareOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#EDE1D1] p-3 z-30 space-y-2 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-[11px] font-black text-slate-800 uppercase tracking-wider px-1">
                    Share This Product
                  </div>

                  {/* WhatsApp */}
                  <button
                    onClick={handleWhatsAppShare}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                      💬
                    </span>
                    <span>Share on WhatsApp</span>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-amber-50 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-[#7D0A14] flex items-center justify-center">
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </span>
                    <span>{copiedLink ? 'Link Copied!' : 'Copy Direct Link'}</span>
                  </button>

                  {/* Native Device Share (Mobile / Tablet) */}
                  {navigator.share && (
                    <button
                      onClick={handleNativeShare}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
                        <Share2 className="w-3.5 h-3.5" />
                      </span>
                      <span>More Sharing Options...</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(quickViewProduct)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isLiked
                  ? 'border-rose-200 bg-rose-50 text-rose-500 shadow-2xs'
                  : 'border-[#EDE1D1] bg-[#FAF5EC] text-slate-500 hover:text-rose-500 hover:bg-white'
              }`}
              title="Add to wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 stroke-rose-500' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              aria-label="Close"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. DEDICATED ALWAYS-SCROLLABLE BODY CONTAINER (min-h-0 + product-modal-scroll) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 min-h-0 overflow-y-scroll overscroll-contain product-modal-scroll p-4 sm:p-6 lg:p-7 space-y-5"
        >
          {/* SECTION A: Product Overview (Responsive Grid: mobile image is compact, desktop is 2-col) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
            {/* Left Column: Image Showcase & Gallery (5 cols on md) */}
            <div className="md:col-span-5 space-y-2.5">
              {/* Main Image Box with Touch Swipe & Floating Side Arrows (Matches User Reference Image) */}
              <div
                className="relative h-48 sm:h-64 md:h-80 w-full bg-[#FAF5EC]/70 rounded-2xl border border-[#EDE1D1] overflow-hidden flex items-center justify-center p-2.5 shadow-inner group select-none"
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  const diff = touchStartX.current - e.changedTouches[0].clientX;
                  if (diff > 35) {
                    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
                  } else if (diff < -35) {
                    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                  }
                }}
              >
                {/* Discount Badge */}
                {discountPercent > 0 && (
                  <span className="absolute top-2.5 left-2.5 z-10 bg-[#7D0A14] text-white text-xs font-black px-2 py-0.5 rounded-lg shadow-sm">
                    {discountPercent}% OFF
                  </span>
                )}

                {/* Delivery Time Badge */}
                <div className="absolute top-2.5 right-2.5 z-10 bg-slate-900/85 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                  <Clock className="w-3 h-3 text-amber-300" />
                  <span>{quickViewProduct.deliveryTime || '10-15 MINS'}</span>
                </div>

                {/* Floating Left Arrow (Previous Image Option) */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-12 sm:w-8 sm:h-14 bg-white/95 hover:bg-white text-slate-800 rounded-xl shadow-lg border border-slate-200/90 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title="Previous option"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-800 stroke-[2.5]" />
                  </button>
                )}

                {/* Main Product Image */}
                <img
                  src={galleryImages[activeImageIndex] || quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-contain md:object-cover rounded-xl transition-all duration-300 group-hover:scale-105"
                />

                {/* Floating Right Arrow (Next Image Option - Matches User Cropped Reference) */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-12 sm:w-8 sm:h-14 bg-white/95 hover:bg-white text-slate-800 rounded-xl shadow-lg border border-slate-200/90 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title="Next option"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-800 stroke-[2.5]" />
                  </button>
                )}

                {/* Direct Sourcing Pill */}
                <div className="absolute bottom-2.5 inset-x-2.5 bg-white/95 backdrop-blur-md border border-[#EDE1D1] rounded-xl px-2 py-1 flex items-center justify-between text-[10px] sm:text-[11px] text-[#3D040A] font-bold shadow-xs pointer-events-none">
                  <span className="flex items-center gap-1 truncate">
                    <Leaf className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Direct Farm Source</span>
                  </span>
                  <span className="text-emerald-700 font-black shrink-0">100% Pesticide Tested</span>
                </div>
              </div>

              {/* Slider Pagination Indicator Dots (Matches User Reference Image [==] • • •) */}
              {galleryImages.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 py-1">
                  {galleryImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                        activeImageIndex === idx
                          ? 'w-7 bg-[#7D0A14] shadow-xs'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      title={`View option ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Gallery Image Thumbnails with Horizontal Scroll */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-white cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#7D0A14] ring-2 ring-[#7D0A14]/20 scale-102 shadow-xs'
                        : 'border-[#EDE1D1] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Option ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>

              {/* Freshness Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="p-2 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-center">
                  <div className="text-sm">❄️</div>
                  <div className="text-[10px] font-black text-slate-800 mt-0.5">Cold Chain</div>
                  <div className="text-[9px] text-slate-500 font-medium">Stored at 4°C</div>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-center">
                  <div className="text-sm">🌿</div>
                  <div className="text-[10px] font-black text-slate-800 mt-0.5">Zero Wax</div>
                  <div className="text-[9px] text-slate-500 font-medium">Naturally Ripened</div>
                </div>
                <div className="p-2 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-center">
                  <div className="text-sm">🛡️</div>
                  <div className="text-[10px] font-black text-slate-800 mt-0.5">Quality Pass</div>
                  <div className="text-[9px] text-slate-500 font-medium">3-Level Check</div>
                </div>
              </div>
            </div>

            {/* Right Column: Complete Product Details & Pack Selection (7 cols on md) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-3.5">
              <div>
                {/* Title & Category */}
                <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                  {quickViewProduct.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <div className="flex items-center gap-1 font-black text-xs text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{quickViewProduct.rating || 4.9}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">
                    ({quickViewProduct.reviewsCount || 1240} verified buyer reviews)
                  </span>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                    Verified Fresh
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-3 p-3 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1] flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#7D0A14]">
                      ₹{effectiveUnitPrice}
                    </span>
                    {!isWholesale && quickViewProduct.originalPrice && (
                      <span className="text-sm text-slate-400 line-through font-bold">
                        ₹{quickViewProduct.originalPrice * selectedPackMultiplier}
                      </span>
                    )}
                    {!isWholesale && discountPercent > 0 && (
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Save ₹{(quickViewProduct.originalPrice - quickViewProduct.price) * selectedPackMultiplier}
                      </span>
                    )}
                    {isWholesale && (
                      <span className="text-xs font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300/80">
                        B2B Wholesale
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded-lg border border-[#EDE1D1]">
                    Unit: {quickViewProduct.unit} {selectedPackMultiplier > 1 && `(x${selectedPackMultiplier} Pack)`}
                  </span>
                </div>

                {/* Pack Size / Quantity Selector */}
                <div className="mt-3.5 space-y-1.5">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">
                    Select Pack Size / Quantity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPackMultiplier(1)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedPackMultiplier === 1
                          ? 'border-[#7D0A14] bg-white ring-2 ring-[#7D0A14]/20 shadow-xs'
                          : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-black text-slate-900">Standard Pack</div>
                      <div className="text-[11px] text-slate-500 font-medium">1x {quickViewProduct.unit}</div>
                      <div className="text-xs font-extrabold text-[#7D0A14] mt-0.5">₹{baseUnitPrice}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPackMultiplier(2)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedPackMultiplier === 2
                          ? 'border-[#7D0A14] bg-white ring-2 ring-[#7D0A14]/20 shadow-xs'
                          : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">Value Pack</span>
                        <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1 rounded">5% OFF</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">2x {quickViewProduct.unit}</div>
                      <div className="text-xs font-extrabold text-[#7D0A14] mt-0.5">₹{Math.round(baseUnitPrice * 1.9)}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPackMultiplier(3)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedPackMultiplier === 3
                          ? 'border-[#7D0A14] bg-white ring-2 ring-[#7D0A14]/20 shadow-xs'
                          : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">Family Bulk</span>
                        <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1 rounded">8% OFF</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">3x {quickViewProduct.unit}</div>
                      <div className="text-xs font-extrabold text-[#7D0A14] mt-0.5">₹{Math.round(baseUnitPrice * 2.75)}</div>
                    </button>
                  </div>
                </div>

                {/* Dual B2B Rate Toggle for Shopkeepers */}
                {isB2B && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-black text-[#7D0A14] block">Shopkeeper / B2B Rate Available</span>
                      <span className="text-[11px] text-amber-900">
                        Wholesale Price: ₹{quickViewProduct.wholesalePrice || Math.round(quickViewProduct.price * 0.74)} (MOQ: {quickViewProduct.wholesaleMoq || '10 packs'})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPricingMode(pricingMode === 'wholesale' ? 'retail' : 'wholesale')}
                      className="px-2.5 py-1 rounded-lg bg-[#7D0A14] text-white text-[10px] font-black hover:bg-[#680811] transition-colors"
                    >
                      {pricingMode === 'wholesale' ? 'Using Wholesale' : 'Apply Wholesale'}
                    </button>
                  </div>
                )}

                {/* Product Description */}
                <div className="mt-3.5">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">
                    Product Description
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {quickViewProduct.description ||
                      'Handpicked directly from farm orchards at sunrise. Packed with utmost hygienic care under cold-chain standards to deliver pristine crunch, natural sweetness, and maximum nutritional vitality straight to your kitchen table.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: Sourcing Story & Harvest Transparency */}
          <div className="bg-[#FAF5EC] border border-[#EDE1D1] rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#7D0A14] text-white flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Farm Harvest & Sourcing Story</h3>
                <p className="text-[11px] text-slate-500">From verified local farm partners directly to your doorstep</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700">
              <div className="bg-white p-3 rounded-xl border border-[#EDE1D1] space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span className="text-amber-600">🚜</span> Origin & Harvest
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Harvested at 4:30 AM today from our network of partner farms in Ratnagiri, Shimla, and Bangalore Rural.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#EDE1D1] space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span className="text-blue-600">❄️</span> Cold Chain Logistics
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Chilled at 4°C immediately after sorting to preserve crunch, aroma, and natural moisture without chemicals.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#EDE1D1] space-y-1">
                <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span className="text-emerald-600">🛡️</span> Food Safety Assured
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  100% compliant with FSSAI hygiene norms. Inspected for zero pesticide residue and chemical ripener free.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION C: Storage & Nutritional Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[#EDE1D1] p-4 rounded-2xl space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#7D0A14]" />
                <span>Storage & Shelf Life</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Keep in a cool, ventilated space or refrigerate between 4°C – 8°C.</li>
                <li>Best consumed within <strong>3 to 5 days</strong> of doorstep delivery.</li>
                <li>Wash with clean drinking water right before preparation or consumption.</li>
              </ul>
            </div>

            <div className="bg-white border border-[#EDE1D1] p-4 rounded-2xl space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#7D0A14]" />
                <span>Health & Nutrition Highlights</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Naturally loaded with vital vitamins, active antioxidants & fiber.</li>
                <li>Zero artificial chemical ripening agents or harmful wax coatings.</li>
                <li>Naturally wholesome for daily healthy household meals and recipes.</li>
              </ul>
            </div>
          </div>

          {/* SECTION D: Dedicated Share Product Card */}
          <div className="bg-gradient-to-r from-amber-50 via-[#FAF5EC] to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shrink-0 shadow-sm">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Share this fresh product with family & friends</h4>
                <p className="text-xs text-slate-500">
                  Send fresh grocery recommendations directly on WhatsApp or copy the product link.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>💬 WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white hover:bg-amber-100/60 border border-[#EDE1D1] text-[#7D0A14] font-black text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* SECTION E: Customer Reviews Showcase */}
          <div className="bg-white border border-[#EDE1D1] rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#7D0A14]" />
                <span>Verified Customer Testimonials</span>
              </h4>
              <span className="text-[11px] font-bold text-emerald-700">98% would recommend to neighbors</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-[#FAF5EC]/50 border border-[#EDE1D1] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900">Priya Ramanathan</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">
                  "Delivered to our apartment in 12 minutes! Incredibly fresh, crisp, and clean packaging. Far better than supermarket produce."
                </p>
                <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Purchase • Madhapur</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF5EC]/50 border border-[#EDE1D1] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900">Dr. Rajesh V. Rao</span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">
                  "Remarkable natural sweetness and aroma. You can clearly taste that it has not been chemically forced or ripened with gas."
                </p>
                <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Purchase • Hitec City</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Scroll Down / Top Badge */}
        {showScrollDownHint ? (
          <button
            type="button"
            onClick={handleScrollDown}
            className="absolute bottom-20 right-4 z-20 bg-[#7D0A14] hover:bg-[#680811] active:scale-95 text-white text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-xl border border-amber-300/40 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Scroll for Details</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleScrollToTop}
            className="absolute bottom-20 right-4 z-20 bg-white hover:bg-[#FAF5EC] active:scale-95 text-[#7D0A14] text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg border border-[#EDE1D1] flex items-center gap-1 transition-all cursor-pointer"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        )}

        {/* 3. STICKY BOTTOM ACTION FOOTER - Pinned below scroll */}
        <div className="shrink-0 p-3.5 sm:p-4 bg-white border-t border-[#EDE1D1] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
          {/* Price & Quantity Controls */}
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Price</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-[#7D0A14]">₹{totalPayable}</span>
                <span className="text-xs text-slate-500 font-medium">
                  ({quantity} × ₹{effectiveUnitPrice})
                </span>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center bg-[#FAF5EC] border border-[#EDE1D1] rounded-2xl p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  const isWholesale = Boolean(pricingMode === 'wholesale' || (user && user.isBusiness));
                  if (isWholesale && quantity <= 5) {
                    showToast('⚠️ B2B Wholesale requires a minimum order of 5 units', 'warning');
                    return;
                  }
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors shadow-2xs cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-9 text-center font-black text-sm text-slate-900">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors shadow-2xs cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial px-7 py-3.5 rounded-2xl bg-[#7D0A14] hover:bg-[#680811] active:scale-98 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#7D0A14]/25 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-amber-300" />
              <span>
                {quantityInCart > 0 ? `Update Cart (₹${totalPayable})` : `Add to Cart • ₹${totalPayable}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
