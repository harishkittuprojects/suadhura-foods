import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
  Zap,
  ArrowLeft,
  BellOff,
  PhoneOff,
  Home,
  Check,
  Bike
} from 'lucide-react';

export const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    platformFee,
    deliveryFee,
    appliedPromo,
    discountAmount,
    cartTotal,
    applyPromoCode,
    removePromoCode,
    promoError,
    deliveryPartnerTip,
    setDeliveryPartnerTip,
    noContactDelivery,
    setNoContactDelivery,
    deliveryInstructions,
    toggleDeliveryInstruction,
    isOneMember,
    setIsCheckoutModalOpen,
    selectedAddress,
    navigateTo,
    pricingMode,
    setPricingMode,
    totalWholesaleSavings,
    user
  } = useShop();

  const isWholesaleActive = Boolean(user && user.isBusiness && pricingMode === 'wholesale');

  const [couponInput, setCouponInput] = useState('');

  const tipOptions = [0, 20, 30, 50];

  const instructionChips = [
    { id: 'dont-ring-bell', label: "Don't ring bell", icon: BellOff },
    { id: 'avoid-calling', label: 'Avoid calling', icon: PhoneOff },
    { id: 'leave-at-door', label: 'Leave at door', icon: Home },
    { id: 'leave-with-guard', label: 'Leave with security', icon: ShieldCheck }
  ];

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    if (applyPromoCode(couponInput)) {
      setCouponInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Page Header */}
      <div
        data-aos="fade-down"
        className="rounded-3xl bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] text-white p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#8B121C]"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Sumadhura Express • 10-15 Min Delivery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-amber-100/90">
            {cart.length} items • Delivering to <strong>{selectedAddress.tag}</strong> ({selectedAddress.area})
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-rose-300 hover:text-white font-semibold underline self-start sm:self-center"
          >
            Clear All Items
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 sm:p-16 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
            <ShoppingCart className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Your shopping cart is empty</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't added any fresh groceries yet. Explore our farm fresh dairy, crisp vegetables, and pantry staples!
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('categories')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore 10-Min Groceries</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-5">
            {/* VIP Banner */}
            {isOneMember ? (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between text-xs text-amber-950">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <span className="font-black text-sm block">Sumadhura VIP Benefits Applied</span>
                    <span className="text-[11px] text-amber-800">
                      You unlocked FREE Express Delivery (Saved ₹25) and extra member pricing!
                    </span>
                  </div>
                </div>
                <span className="font-black text-xs bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full">
                  FREE DELIVERY
                </span>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center justify-between text-xs text-blue-900">
                <span>Free delivery available on orders above ₹99 with Sumadhura VIP</span>
                <span className="font-bold underline cursor-pointer">Activate VIP</span>
              </div>
            )}

            {/* Items Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden divide-y divide-slate-100">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-3.5 h-3.5 border border-emerald-600 rounded-sm flex items-center justify-center p-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {item.name}
                      </h3>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        {item.unit} • <strong className="text-blue-600">{item.deliveryTime || '10 mins'}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-slate-50">
                    {/* Quantity stepper */}
                    <div className="flex items-center bg-blue-600 rounded-xl p-0.5 text-white shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-blue-700/80 hover:bg-blue-800 flex items-center justify-center transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-blue-700/80 hover:bg-blue-800 flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[70px]">
                      <span className="text-base font-black text-slate-900 block">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-300 hover:text-rose-500 rounded-lg transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Instructions Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3">
                Delivery Instructions
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {instructionChips.map((chip) => {
                  const Icon = chip.icon;
                  const isSelected = deliveryInstructions.includes(chip.id);
                  return (
                    <button
                      key={chip.id}
                      onClick={() => toggleDeliveryInstruction(chip.id)}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold flex flex-col justify-between gap-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Partner Tip Section */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    Tip Your Delivery Partner
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Thank your delivery partner for bringing fresh food in 10-15 mins.
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-600">100% goes to partner</span>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {tipOptions.map((tip) => (
                  <button
                    key={tip}
                    onClick={() => setDeliveryPartnerTip(tip)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      deliveryPartnerTip === tip
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tip === 0 ? 'No Tip' : `₹${tip}`}
                  </button>
                ))}
              </div>
            </div>

            {/* No Contact Checkbox */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft">
              <label className="flex items-center gap-3 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noContactDelivery}
                  onChange={(e) => setNoContactDelivery(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <div>
                  <span className="block">No-Contact Delivery Option</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Partner will leave package at your gate/door and ring phone once.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Right Column: Detailed Bill & Checkout */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-soft space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base">
                  Bill Details
                </h3>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  isWholesaleActive
                    ? 'bg-[#7D0A14] text-white'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {isWholesaleActive ? '🏢 Wholesale Tier' : '🛍️ Retail Tier'}
                </span>
              </div>

              {/* Wholesale Savings Callout */}
              {isWholesaleActive && totalWholesaleSavings > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900 font-bold">
                  <span>🏢 B2B Wholesale Savings:</span>
                  <span className="text-emerald-700 font-black">
                    Saved ₹{totalWholesaleSavings}
                  </span>
                </div>
              )}

              {/* Coupon Code Section */}
              {appliedPromo ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold">{appliedPromo.code} applied</span>
                      <span className="block text-[11px] text-emerald-600">
                        Saved ₹{appliedPromo.discountAmount}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-rose-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (SUMADHURA50)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase tracking-wider font-semibold focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <span className="text-[11px] text-rose-500 font-semibold block">{promoError}</span>
                  )}
                  <span className="text-[10px] text-slate-400 block">
                    Use <strong>SUMADHURA50</strong> for ₹50 off or <strong>SUMADHURAVIP</strong> for 15% off
                  </span>
                </form>
              )}

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span className="font-semibold text-slate-900">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Partner Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE (One)</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="font-semibold">₹{platformFee}</span>
                </div>
                {deliveryPartnerTip > 0 && (
                  <div className="flex justify-between text-blue-700">
                    <span>Delivery Partner Tip</span>
                    <span>₹{deliveryPartnerTip}</span>
                  </div>
                )}
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Savings</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                  <span>To Pay</span>
                  <span className="text-blue-700">₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-between px-5 transition-all"
              >
                <span>Proceed to Pay</span>
                <div className="flex items-center gap-1 font-bold">
                  <span>₹{cartTotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Secure Checkout with 256-Bit Encryption</span>
              </div>
            </div>

            {/* Cancellation Guarantee Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-500 space-y-1">
              <strong className="text-slate-800 block">Review your order before paying</strong>
              <p className="text-[11px]">
                Orders are dispatched from Sumadhura Dark Store in 3 mins. Instant tracking available on map.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
