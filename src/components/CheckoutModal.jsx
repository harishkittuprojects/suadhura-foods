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
  ArrowRight,
  Sunrise,
  Sun,
  Moon,
  Calendar,
  Repeat,
  Check
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
    addOrder,
    setIsLiveTrackingOpen,
    navigateTo,
    pricingMode,
    deliveryTiming,
    setDeliveryTiming,
    scheduledDay,
    setScheduledDay,
    scheduledSlot,
    setScheduledSlot,
    isDailyRecurring,
    setIsDailyRecurring
  } = useShop();

  const [step, setStep] = useState(1); // 1: Address & Tip, 2: Payment, 3: Success Confirmation
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderSummary, setOrderSummary] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const isB2bOrder = pricingMode === 'wholesale' || Boolean(user?.isBusiness);

    // Validate minimum B2B order of 5 units per wholesale item
    if (isB2bOrder) {
      const underMin = cart.find((i) => i.quantity < 5);
      if (underMin) {
        showToast(`⚠️ B2B Wholesale requires a minimum of 5 units for "${underMin.name}" (currently ${underMin.quantity})`, 'error');
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const isB2bOrder = pricingMode === 'wholesale' || user?.isBusiness;
      const dayOptions = [
        { id: 'today', label: 'Today', date: new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }) },
        { id: 'tomorrow', label: 'Tomorrow', date: new Date(Date.now() + 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }) },
        { id: 'day_after', label: new Date(Date.now() + 172800000).toLocaleDateString('en-IN', { weekday: 'short' }), date: new Date(Date.now() + 172800000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }) }
      ];
      const selectedDayObj = dayOptions.find(d => d.id === scheduledDay) || dayOptions[1];

      const slotLabels = {
        morning: { name: 'Morning Slot', time: '6:00 AM – 9:00 AM' },
        afternoon: { name: 'Afternoon Slot', time: '12:00 PM – 2:00 PM' },
        evening: { name: 'Evening Slot', time: '6:00 PM – 9:00 PM' }
      };
      const selectedSlotObj = slotLabels[scheduledSlot] || slotLabels.morning;

      const deliverySlotText = deliveryTiming === 'instant'
        ? (isB2bOrder ? '5:00 AM Morning Loading Bay Dispatch' : '⚡ Instant 10-15 Min Express Delivery')
        : `📅 Scheduled: ${selectedDayObj.label} (${selectedDayObj.date}) • ${selectedSlotObj.name} (${selectedSlotObj.time})${isDailyRecurring ? ' • Recurring Daily' : ''}`;

      const placedOrder = {
        id: isB2bOrder
          ? `B2B-${Math.floor(1000 + Math.random() * 9000)}`
          : `SMD-${Math.floor(100000 + Math.random() * 900000)}`,
        type: isB2bOrder ? 'b2b' : 'b2c',
        customer: user?.name || (isB2bOrder ? user?.companyName || 'Business Partner' : 'Customer'),
        contact: user?.phone || '+91 98450 12345',
        email: user?.email || '',
        companyName: user?.companyName || null,
        items: [...cart],
        subtotal: cartSubtotal,
        deliveryFee,
        platformFee,
        tip: deliveryPartnerTip,
        discount: discountAmount,
        total: cartTotal,
        gstin: user?.gstin || (isB2bOrder ? '36AABCU9603R1ZM' : null),
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        address: `${selectedAddress.title}, ${selectedAddress.area}`,
        slot: deliverySlotText,
        deliveryTiming: deliveryTiming || 'instant',
        scheduledDay: selectedDayObj.label,
        scheduledDate: selectedDayObj.date,
        scheduledSlot: selectedSlotObj.name,
        scheduledTime: selectedSlotObj.time,
        isDailyRecurring: Boolean(isDailyRecurring),
        paymentMethod: paymentMethod.toUpperCase(),
        partner: 'Ramesh Kumar (★ 4.9)',
        status: 'Packing'
      };

      if (addOrder) {
        addOrder(placedOrder);
      } else {
        try {
          const existingOrders = JSON.parse(localStorage.getItem('sumadhura_orders') || '[]');
          localStorage.setItem('sumadhura_orders', JSON.stringify([placedOrder, ...existingOrders]));
        } catch (err) {
          console.error(err);
        }
        setActiveOrder(placedOrder);
      }

      setOrderSummary(placedOrder);
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
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8DDCF] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DDCF] flex items-center justify-between bg-[#FAF5EC]/80">
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

            {/* Delivery Timing: Instant vs Daily Scheduled Slot */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Delivery Timing & Schedule
                </label>
                <span className="text-[10px] font-extrabold text-[#7D0A14] bg-[#FAF5EC] px-2 py-0.5 rounded-full border border-[#EDE1D1]">
                  {deliveryTiming === 'instant' ? '⚡ Express 10-15m' : '📅 Scheduled Daily Slot'}
                </span>
              </div>

              {/* Instant vs Scheduled Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setDeliveryTiming('instant')}
                  className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    deliveryTiming === 'instant'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Bike className={`w-3.5 h-3.5 ${deliveryTiming === 'instant' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>Instant (10-15 Mins)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryTiming('scheduled')}
                  className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    deliveryTiming === 'scheduled'
                      ? 'bg-[#7D0A14] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className={`w-3.5 h-3.5 ${deliveryTiming === 'scheduled' ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>Schedule Daily Slot</span>
                </button>
              </div>

              {/* Conditional Scheduled Controls */}
              {deliveryTiming === 'scheduled' ? (
                <div className="p-3.5 rounded-2xl border border-[#EDE1D1] bg-[#FAF5EC]/60 space-y-3 animate-in fade-in-50 duration-200">
                  {/* Select Day */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                      1. Select Delivery Day
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'today', label: 'Today', sub: 'Today' },
                        { id: 'tomorrow', label: 'Tomorrow', sub: 'Recommended' },
                        { id: 'day_after', label: 'Day After', sub: 'Advance' }
                      ].map((day) => {
                        const isSelected = scheduledDay === day.id;
                        return (
                          <button
                            key={day.id}
                            type="button"
                            onClick={() => setScheduledDay(day.id)}
                            className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                              isSelected
                                ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <span className="text-xs font-black">{day.label}</span>
                            <span className={`text-[9px] ${isSelected ? 'text-amber-200' : 'text-slate-400'}`}>
                              {day.sub}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Select Daily Time Slot */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                      2. Select Daily Time Slot (Morning, Afternoon, Evening)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {/* Morning */}
                      <button
                        type="button"
                        onClick={() => setScheduledSlot('morning')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          scheduledSlot === 'morning'
                            ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <Sunrise className={`w-4 h-4 ${scheduledSlot === 'morning' ? 'text-amber-300' : 'text-amber-500'}`} />
                        <span className="text-[11px] font-black leading-tight">Morning</span>
                        <span className={`text-[9px] font-semibold ${scheduledSlot === 'morning' ? 'text-amber-100' : 'text-slate-500'}`}>
                          6:00 AM – 9:00 AM
                        </span>
                      </button>

                      {/* Afternoon */}
                      <button
                        type="button"
                        onClick={() => setScheduledSlot('afternoon')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          scheduledSlot === 'afternoon'
                            ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <Sun className={`w-4 h-4 ${scheduledSlot === 'afternoon' ? 'text-amber-300' : 'text-amber-600'}`} />
                        <span className="text-[11px] font-black leading-tight">Afternoon</span>
                        <span className={`text-[9px] font-semibold ${scheduledSlot === 'afternoon' ? 'text-amber-100' : 'text-slate-500'}`}>
                          12:00 PM – 2:00 PM
                        </span>
                      </button>

                      {/* Evening */}
                      <button
                        type="button"
                        onClick={() => setScheduledSlot('evening')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          scheduledSlot === 'evening'
                            ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <Moon className={`w-4 h-4 ${scheduledSlot === 'evening' ? 'text-amber-300' : 'text-indigo-600'}`} />
                        <span className="text-[11px] font-black leading-tight">Evening</span>
                        <span className={`text-[9px] font-semibold ${scheduledSlot === 'evening' ? 'text-amber-100' : 'text-slate-500'}`}>
                          6:00 PM – 9:00 PM
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Daily Repeat Option */}
                  <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#EDE1D1] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDailyRecurring}
                      onChange={(e) => setIsDailyRecurring(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#7D0A14] rounded"
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Repeat className="w-3.5 h-3.5 text-[#7D0A14]" />
                        <span>Repeat this order daily at this slot</span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Automate your fresh milk & daily veggies. Modify or pause anytime.
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                /* Instant Delivery Guarantee Card */
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-blue-950">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    <Bike className="w-4 h-4" />
                  </div>
                  <div>
                    <strong>Sumadhura Express Guarantee:</strong> Arriving in 10-15 mins from our nearest dark store.
                  </div>
                </div>
              )}
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

            {/* Delivery Details Card */}
            <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl text-left text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-blue-900">
                <span className="flex items-center gap-1.5">
                  {orderSummary.deliveryTiming === 'scheduled' ? (
                    <>
                      <Calendar className="w-4 h-4 text-[#7D0A14]" />
                      <span>{orderSummary.scheduledSlot || 'Scheduled Slot'} ({orderSummary.scheduledTime || 'Confirmed'})</span>
                    </>
                  ) : (
                    <>
                      <Bike className="w-4 h-4 text-blue-600" /> Driver Assigned: {orderSummary.partner}
                    </>
                  )}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  orderSummary.deliveryTiming === 'scheduled'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {orderSummary.deliveryTiming === 'scheduled' ? `📅 ${orderSummary.scheduledDay}` : '⚡ 11 Mins'}
                </span>
              </div>

              {orderSummary.isDailyRecurring && (
                <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                  <Repeat className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Daily Recurring Dispatch: Delivering every day at this slot</span>
                </div>
              )}

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
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {orderSummary.deliveryTiming === 'scheduled' ? (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>View Scheduled Order Status</span>
                  </>
                ) : (
                  <>
                    <Bike className="w-4 h-4 animate-bounce" />
                    <span>Track Live Order on Map (11 Mins)</span>
                  </>
                )}
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
