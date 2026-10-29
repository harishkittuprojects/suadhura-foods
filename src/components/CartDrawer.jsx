import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
  Zap,
  Heart,
  BellOff,
  PhoneOff,
  Home,
  Check,
  AlertTriangle
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
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
    navigateTo
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

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
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    Sumadhura Foods Cart
                  </h2>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                    ⚡ 10-15m
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  Delivering to: <strong>{selectedAddress?.tag || 'Home'}</strong> ({selectedAddress?.area ? selectedAddress.area.split(',')[0] : 'Koramangala'})
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sumadhura VIP Free Delivery Banner */}
          {isOneMember ? (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-4 py-2.5 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Sumadhura VIP Benefit:</strong> You saved ₹25 on Delivery Fee!
                </span>
              </div>
              <span className="text-[10px] font-black bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
                FREE
              </span>
            </div>
          ) : (
            <div className="bg-blue-50/70 border-b border-blue-100 px-4 py-2 text-xs text-blue-900 flex items-center justify-between">
              <span>Add ₹99+ to get FREE Delivery with Sumadhura VIP</span>
              <span className="font-bold text-blue-600">Upgrade</span>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-slate-100 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                  <ShoppingCart className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Add fresh milk, farm-fresh vegetables, or kitchen grocery staples to get started.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('categories');
                  }}
                  className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
                >
                  Explore 10-Min Groceries
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-2 flex items-center gap-3">
                      {/* Veg indicator square */}
                      <div className="w-3.5 h-3.5 border border-emerald-600 rounded-sm flex items-center justify-center p-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 block">{item.unit}</span>
                        <div className="text-xs font-bold text-slate-800 mt-0.5">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center bg-blue-600 rounded-xl p-0.5 text-white shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-blue-700/80 hover:bg-blue-800 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-blue-700/80 hover:bg-blue-800 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Instructions */}
                <div className="pt-4">
                  <h4 className="text-xs font-extrabold text-slate-800 mb-2">
                    Delivery Instructions
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {instructionChips.map((chip) => {
                      const Icon = chip.icon;
                      const isSelected = deliveryInstructions.includes(chip.id);
                      return (
                        <button
                          key={chip.id}
                          onClick={() => toggleDeliveryInstruction(chip.id)}
                          className={`p-2 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50 text-blue-900'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className="truncate">{chip.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Partner Tip */}
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-slate-800">
                      Tip Your Delivery Partner
                    </span>
                    <span className="text-[11px] text-slate-400">100% goes to partner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {tipOptions.map((tip) => (
                      <button
                        key={tip}
                        onClick={() => setDeliveryPartnerTip(tip)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          deliveryPartnerTip === tip
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {tip === 0 ? 'No Tip' : `₹${tip}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* No-Contact Delivery Checkbox */}
                <div className="pt-3">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <input
                      type="checkbox"
                      checked={noContactDelivery}
                      onChange={(e) => setNoContactDelivery(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>Opt in for No-Contact Delivery (Left at door)</span>
                  </label>
                </div>
              </>
            )}
          </div>

          {/* Footer & Detailed Bill */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 space-y-3.5">
              {/* Coupon input */}
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{appliedPromo.code}: -₹{appliedPromo.discountAmount}</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-rose-600 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. SUMADHURA50 / FRESH50)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-xl"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Detailed Bill */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span className="font-semibold text-slate-900">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Partner Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE (VIP)</span>
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
                  <div className="flex justify-between text-blue-700 font-semibold">
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
                <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-black text-slate-900">
                  <span>To Pay</span>
                  <span className="text-blue-700">₹{cartTotal}</span>
                </div>
              </div>

              {/* Cancellation policy note */}
              <div className="text-[10px] text-slate-400 leading-tight">
                <strong>Cancellation Policy:</strong> 100% refund if cancelled before dispatch. Orders are packed within 3 minutes.
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutModalOpen(true);
                }}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-between px-5 transition-all"
              >
                <div className="text-left">
                  <span className="text-[11px] font-medium block opacity-90">TOTAL ₹{cartTotal}</span>
                  <span className="text-xs font-black">Select Payment</span>
                </div>
                <div className="flex items-center gap-1 font-bold">
                  <span>Proceed to Pay</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
  );
};
