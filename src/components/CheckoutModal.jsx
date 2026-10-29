import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  Bike,
  ArrowRight
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    cart,
    cartSubtotal,
    deliveryFee,
    platformFee,
    appliedPromo,
    discountAmount,
    deliveryPartnerTip,
    cartTotal,
    clearCart,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    user,
    selectedAddress,
    savedAddresses,
    setSelectedAddress,
    setActiveOrder,
    setIsLiveTrackingOpen,
    navigateTo
  } = useShop();

  const [step, setStep] = useState(1); // 1: Address & Tip, 2: Payment, 3: Success Confirmation
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderSummary, setOrderSummary] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const placedOrder = {
        id: `SMD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        subtotal: cartSubtotal,
        deliveryFee,
        platformFee,
        tip: deliveryPartnerTip,
        discount: discountAmount,
        total: cartTotal,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        address: `${selectedAddress.title}, ${selectedAddress.area}`,
        slot: 'Instant 10-15 Min Express Delivery',
        paymentMethod: paymentMethod.toUpperCase(),
        partner: 'Ramesh Kumar (★ 4.9)'
      };

      setOrderSummary(placedOrder);
      setActiveOrder(placedOrder);
      clearCart();
      setIsSubmitting(false);
      setStep(3);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  const closeAndReset = () => {
    setIsCheckoutModalOpen(false);
    setStep(1);
    setOrderSummary(null);
  };

  const handleTrackLive = () => {
    closeAndReset();
    setIsLiveTrackingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">
                Sumadhura Express Checkout
              </span>
            </div>
            <h2 className="font-extrabold text-slate-900 text-base sm:text-lg mt-1">
              {step === 3 ? '🎉 Order Placed!' : 'Deliver to ' + selectedAddress.tag}
            </h2>
          </div>
          <button
            onClick={closeAndReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Address confirmation & Delivery Slot */}
        {step === 1 && (
          <div className="p-5 sm:p-6 space-y-4">
            {/* Saved Addresses Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Select Delivery Address
              </label>
              <div className="space-y-2">
                {savedAddresses.map((addr) => {
                  const isSelected = selectedAddress.id === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <div>
                          <div className="font-extrabold text-xs text-slate-900">
                            {addr.tag} • {addr.title}
                          </div>
                          <div className="text-[11px] text-slate-500">{addr.area}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        10-15 mins
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Promise Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-blue-950">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <strong>Sumadhura On-Time Guarantee:</strong> Arriving in 10-15 mins from our nearest store.
              </div>
            </div>

            {/* Bill Preview */}
            <div className="bg-slate-50 p-3.5 rounded-2xl flex items-center justify-between text-xs border border-slate-100">
              <span className="text-slate-600 font-medium">
                To Pay ({cart.length} items):
              </span>
              <span className="text-base font-black text-blue-700">₹{cartTotal}</span>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Payment Options */}
        {step === 2 && (
          <form onSubmit={handlePlaceOrder} className="p-5 sm:p-6 space-y-4">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Choose Payment Method
            </label>

            <div className="space-y-2.5">
              {/* UPI */}
              <label
                className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <div>
                    <span className="font-bold text-xs flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-blue-600" /> UPI (GPay / PhonePe / Paytm / CRED)
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Fastest & recommended for 10-min orders
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  1-Tap Pay
                </span>
              </label>

              {/* Cards */}
              <label
                className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <div>
                    <span className="font-bold text-xs flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-blue-600" /> Credit / Debit Card
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Visa, Mastercard, RuPay, Amex
                    </span>
                  </div>
                </div>
              </label>

              {/* COD */}
              <label
                className={`p-3.5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <div>
                    <span className="font-bold text-xs flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-blue-600" /> Pay on Delivery (Cash / UPI)
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Scan QR or pay cash when partner arrives
                    </span>
                  </div>
                </div>
              </label>
            </div>

            {/* Bill Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Partner Fee</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>
              {deliveryPartnerTip > 0 && (
                <div className="flex justify-between text-blue-700">
                  <span>Partner Tip</span>
                  <span>₹{deliveryPartnerTip}</span>
                </div>
              )}
              {appliedPromo && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon ({appliedPromo.code})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-blue-700">₹{cartTotal}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-2xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{cartTotal} & Place Order</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Success Confirmation with Live Tracking Button */}
        {step === 3 && orderSummary && (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full uppercase">
                Order Confirmed
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Order #{orderSummary.id}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Being packed right now at Sumadhura Dark Store
              </p>
            </div>

            {/* Delivery Partner Assigned Card */}
            <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl text-left text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-blue-900">
                <span className="flex items-center gap-1.5">
                  <Bike className="w-4 h-4 text-blue-600" /> Driver Assigned: {orderSummary.partner}
                </span>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  ⚡ 11 Mins
                </span>
              </div>
              <div className="text-slate-600">
                <strong>Delivering to:</strong> {orderSummary.address}
              </div>
              <div className="text-slate-600 flex justify-between border-t border-blue-100 pt-2 font-medium">
                <span>Total Paid:</span>
                <span className="font-bold text-slate-900">₹{orderSummary.total}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleTrackLive}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Bike className="w-4 h-4 animate-bounce" />
                <span>Track Live Order on Map (11 Mins)</span>
              </button>

              <button
                onClick={() => {
                  closeAndReset();
                  navigateTo('home');
                }}
                className="w-full py-2.5 text-slate-600 hover:text-slate-900 font-bold text-xs"
              >
                Back to Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
