import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  MapPin, 
  Clock, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  ShoppingBag,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen, 
    cart, 
    subtotal, 
    deliveryFee, 
    discountAmount, 
    totalAmount, 
    deliveryLocation, 
    user, 
    placeOrder 
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: user ? user.name : "Ramesh Rao",
    phone: user ? user.phone : "+91 98490 12345",
    email: user ? user.email : "ramesh.rao@example.com",
    addressLine: "Flat 402, Sai Residency, Road No. 36",
    area: deliveryLocation.area,
    city: deliveryLocation.city,
    pincode: deliveryLocation.pincode,
    deliverySlot: "Tomorrow Morning 6:00 AM - 7:30 AM",
    paymentMode: "Cash on Delivery",
    specialInstructions: "Please ring the bell and leave at door step."
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      placeOrder({
        address: `${formData.addressLine}, ${formData.area}, ${formData.city} - ${formData.pincode}`,
        paymentMode: formData.paymentMode,
        deliverySlot: formData.deliverySlot
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <div>
              <h2 className="text-base font-bold text-neutral-900">Checkout & Order Placement</h2>
              <p className="text-xs text-neutral-500">Sumadhura Foods Morning Delivery</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors border border-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Order Summary Strip */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                Order Summary ({cart.length} items)
              </span>
              <span className="text-sm font-extrabold text-neutral-900">
                Total: ₹{totalAmount}
              </span>
            </div>
            <div className="text-xs text-neutral-600 space-y-1">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-neutral-900 font-semibold">
                  <span>Coupon Savings:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="text-emerald-700 font-semibold">
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
              <MapPin className="w-4 h-4 text-neutral-700" />
              <span>Delivery Address</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-neutral-600 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-600 font-medium mb-1">Flat / House No. & Apartment / Street</label>
                <input
                  type="text"
                  required
                  value={formData.addressLine}
                  onChange={(e) => setFormData({...formData, addressLine: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">Locality / Area</label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-neutral-600 font-medium mb-1">City & Pincode</label>
                <input
                  type="text"
                  required
                  value={`${formData.city} - ${formData.pincode}`}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>
          </div>

          {/* Delivery Slot Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
              <Clock className="w-4 h-4 text-neutral-700" />
              <span>Choose Delivery Slot</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label 
                className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  formData.deliverySlot.includes('Morning')
                    ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <input 
                  type="radio" 
                  name="deliverySlot" 
                  checked={formData.deliverySlot.includes('Morning')}
                  onChange={() => setFormData({...formData, deliverySlot: "Tomorrow Morning 6:00 AM - 7:30 AM"})}
                  className="mt-0.5 text-neutral-900"
                />
                <div>
                  <span className="font-bold text-neutral-900 block">Morning 6:00 AM - 7:30 AM</span>
                  <span className="text-neutral-500 text-[11px]">Recommended • Fresh before breakfast</span>
                </div>
              </label>

              <label 
                className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  formData.deliverySlot.includes('Evening')
                    ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <input 
                  type="radio" 
                  name="deliverySlot" 
                  checked={formData.deliverySlot.includes('Evening')}
                  onChange={() => setFormData({...formData, deliverySlot: "Tomorrow Evening 5:00 PM - 7:00 PM"})}
                  className="mt-0.5 text-neutral-900"
                />
                <div>
                  <span className="font-bold text-neutral-900 block">Evening 5:00 PM - 7:00 PM</span>
                  <span className="text-neutral-500 text-[11px]">Standard express evening slot</span>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
              <CreditCard className="w-4 h-4 text-neutral-700" />
              <span>Select Payment Method</span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { id: "Cash on Delivery", label: "Cash on Delivery (Pay upon arrival)", sub: "Pay cash or scan QR when doorstep delivery arrives" },
                { id: "UPI / Google Pay / PhonePe", label: "UPI / QR Code", sub: "Instant & zero transaction fee" },
                { id: "Debit / Credit Card", label: "Credit or Debit Card", sub: "Visa, Mastercard, RuPay & Amex" }
              ].map((method) => (
                <label 
                  key={method.id}
                  className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMode === method.id
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMode"
                    value={method.id}
                    checked={formData.paymentMode === method.id}
                    onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}
                    className="mt-0.5 text-neutral-900"
                  />
                  <div>
                    <span className="font-bold text-neutral-900 block">{method.label}</span>
                    <span className="text-neutral-500 text-[11px]">{method.sub}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-neutral-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-bold py-4 px-6 rounded-2xl text-base shadow-lg transition-all active:scale-95"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order • ₹{totalAmount}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-neutral-400 mt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              100% Secure Checkout with Sumadhura Purity Guarantee
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
