import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  Plus,
  Minus,
  Milk,
  Carrot,
  ShieldCheck,
  PauseCircle,
  PlayCircle,
  ArrowRight,
  Sun
} from 'lucide-react';

export const SubscriptionModal = () => {
  const {
    isSubscriptionModalOpen,
    setIsSubscriptionModalOpen,
    activeSubscription,
    setActiveSubscription,
    selectedAddress,
    showToast
  } = useShop();

  // Subscription plan items
  const [subItems, setSubItems] = useState([
    {
      id: 'sub-milk',
      name: 'Farm Fresh Pure Cow Milk (500ml)',
      unitPrice: 34,
      qty: 2,
      icon: Milk,
      badge: 'Most Popular'
    },
    {
      id: 'sub-curd',
      name: 'Homestyle Fresh Thick Curd (400g)',
      unitPrice: 42,
      qty: 1,
      icon: Milk,
      badge: 'Daily Probiotic'
    },
    {
      id: 'sub-veg',
      name: 'Morning Fresh Veggie Harvest Basket (1.5 kg)',
      unitPrice: 79,
      qty: 0,
      icon: Carrot,
      badge: 'Farm Greens'
    }
  ]);

  const [frequency, setFrequency] = useState('daily'); // daily | alternate | weekdays
  const [slot, setSlot] = useState('6am-7am'); // 6am-7am | 7am-8am
  const [durationDays, setDurationDays] = useState(30); // 7 | 30
  const [isPaused, setIsPaused] = useState(false);
  const [step, setStep] = useState(activeSubscription ? 2 : 1);

  if (!isSubscriptionModalOpen) return null;

  const updateItemQty = (id, delta) => {
    setSubItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
      )
    );
  };

  // Calculations
  const dailyTotal = subItems.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const deliveryDaysCount =
    frequency === 'daily'
      ? durationDays
      : frequency === 'alternate'
      ? Math.ceil(durationDays / 2)
      : Math.round(durationDays * (5 / 7));

  const grossTotal = dailyTotal * deliveryDaysCount;
  const discountRate = durationDays === 30 ? 0.15 : 0.1;
  const discountAmount = Math.round(grossTotal * discountRate);
  const netPayable = grossTotal - discountAmount;

  const handleStartSubscription = (e) => {
    e.preventDefault();
    if (dailyTotal === 0) {
      showToast('Please select at least 1 item for your subscription order', 'error');
      return;
    }

    const newSub = {
      id: `SUB-${Math.floor(100000 + Math.random() * 900000)}`,
      items: subItems.filter((i) => i.qty > 0),
      frequency,
      slot: slot === '6am-7am' ? '6:00 AM - 7:00 AM' : '7:00 AM - 8:00 AM',
      durationDays,
      dailyCost: dailyTotal,
      totalPaid: netPayable,
      startDate: 'Tomorrow Morning',
      address: `${selectedAddress.title}, ${selectedAddress.area}`,
      status: 'Active'
    };

    setActiveSubscription(newSub);
    setStep(2);
    showToast('Subscription Order activated! Delivery starts tomorrow 6:00 AM 🥛');

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePause = () => {
    const nextState = !isPaused;
    setIsPaused(nextState);
    if (activeSubscription) {
      setActiveSubscription({
        ...activeSubscription,
        status: nextState ? 'Paused' : 'Active'
      });
    }
    showToast(
      nextState
        ? 'Subscription paused! Deliveries paused until you resume.'
        : 'Subscription resumed! Morning deliveries active.'
    );
  };

  const handleCancelSub = () => {
    setActiveSubscription(null);
    setStep(1);
    showToast('Subscription cancelled. Refund credited for remaining days.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner flex-shrink-0">
              <Sun className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-amber-400 text-slate-900 px-2 py-0.2 rounded-full uppercase">
                  Daily Morning Sourcing
                </span>
                <span className="text-xs text-blue-100">6:00 AM - 7:00 AM</span>
              </div>
              <h3 className="text-xl font-black mt-0.5">Subscription Order</h3>
              <p className="text-xs text-blue-100">
                Fresh cow milk & vegetables at your doorstep daily. Pause anytime.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSubscriptionModalOpen(false)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View 1: Configure & Start Subscription */}
        {step === 1 && (
          <form onSubmit={handleStartSubscription} className="p-5 sm:p-6 space-y-5">
            {/* Step 1: Select Products */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  1. Select Daily Morning Items
                </label>
                <span className="text-[11px] text-blue-600 font-bold">100% Farm Bottled</span>
              </div>

              <div className="space-y-2.5">
                {subItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-extrabold text-xs text-slate-900 truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          ₹{item.unitPrice} per day • <span className="text-emerald-600 font-semibold">{item.badge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-sm">
                      <button
                        type="button"
                        onClick={() => updateItemQty(item.id, -1)}
                        className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center font-black text-xs text-slate-900">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateItemQty(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Delivery Frequency */}
            <div>
              <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                2. Delivery Frequency
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFrequency('daily')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all ${
                    frequency === 'daily'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-black">Daily</div>
                  <span className="text-[10px] text-slate-500 font-normal">7 days/week</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFrequency('alternate')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all ${
                    frequency === 'alternate'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-black">Alternate Days</div>
                  <span className="text-[10px] text-slate-500 font-normal">Mon, Wed, Fri...</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFrequency('weekdays')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all ${
                    frequency === 'weekdays'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-black">Weekdays Only</div>
                  <span className="text-[10px] text-slate-500 font-normal">Mon to Fri</span>
                </button>
              </div>
            </div>

            {/* Step 3: Morning Delivery Slot & Plan Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5">
                  Morning Time Slot
                </label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 font-bold"
                >
                  <option value="6am-7am">6:00 AM – 7:00 AM (Early)</option>
                  <option value="7am-8am">7:00 AM – 8:00 AM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5">
                  Plan Duration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDurationDays(7)}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      durationDays === 7
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    7-Day Trial (10% Off)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDurationDays(30)}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      durationDays === 30
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    30 Days (15% Off)
                  </button>
                </div>
              </div>
            </div>

            {/* Vacation / Pause Guarantee */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Vacation Guarantee:</strong> Going out of town? Pause or modify your milk and vegetable delivery anytime without charges.
              </span>
            </div>

            {/* Estimated Price Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Daily Basket Cost</span>
                <span className="font-bold text-slate-900">₹{dailyTotal} / day</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Days ({deliveryDaysCount} mornings)</span>
                <span>₹{grossTotal}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Subscriber Savings ({durationDays === 30 ? '15%' : '10%'})</span>
                <span>-₹{discountAmount}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-black text-slate-900">
                <span>Total Payable</span>
                <span className="text-blue-700">₹{netPayable}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={dailyTotal === 0}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Start Morning Subscription (₹{netPayable})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* View 2: Active Subscription Dashboard */}
        {step === 2 && activeSubscription && (
          <div className="p-5 sm:p-6 space-y-5">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-slate-900">
                      Subscription #{activeSubscription.id}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.2 rounded-full ${
                        isPaused
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isPaused ? 'PAUSED' : 'ACTIVE DAILY'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Next Morning Drop: Tomorrow between {activeSubscription.slot}
                  </p>
                </div>
              </div>

              {/* Pause / Resume Button */}
              <button
                onClick={handleTogglePause}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                  isPaused
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-amber-500 text-white hover:bg-amber-600'
                }`}
              >
                {isPaused ? (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <PauseCircle className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                )}
              </button>
            </div>

            {/* Subscribed Items */}
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                Your Daily Morning Items
              </h4>
              <div className="space-y-2">
                {activeSubscription?.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <span className="font-bold text-slate-800">
                      {item.qty}x {item.name}
                    </span>
                    <span className="font-extrabold text-blue-700">
                      ₹{item.unitPrice * item.qty} / day
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1">
              <div>
                <strong>Delivery Address:</strong> {activeSubscription?.address || 'Default Address'}
              </div>
              <div>
                <strong>Schedule:</strong> {activeSubscription?.frequency?.toUpperCase() || 'DAILY'} at{' '}
                {activeSubscription?.slot || '6:00 AM - 7:00 AM'}
              </div>
              <div>
                <strong>Total Plan Cost:</strong> ₹{activeSubscription?.totalPaid || 0} (30 Days prepaid)
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
              >
                Modify Items / Plan
              </button>
              <button
                onClick={handleCancelSub}
                className="py-2.5 px-4 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-50 transition-colors"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
