import React, { useState, useEffect } from 'react';
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
  Sun,
  Sunrise,
  Moon,
  User,
  MapPin
} from 'lucide-react';

export const SubscriptionModal = () => {
  const {
    isSubscriptionModalOpen,
    setIsSubscriptionModalOpen,
    activeSubscription,
    setActiveSubscription,
    addSubscription,
    selectedAddress,
    user,
    login,
    setIsAuthModalOpen,
    showToast
  } = useShop();

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestAddress, setGuestAddress] = useState('');

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
  const [slot, setSlot] = useState('morning'); // morning | afternoon | evening
  const [durationDays, setDurationDays] = useState(30); // 7 | 30
  const [isPaused, setIsPaused] = useState(false);
  const [step, setStep] = useState(activeSubscription ? 2 : 1);
  const [createdSub, setCreatedSub] = useState(null);

  const currentSubscription = activeSubscription || createdSub;

  useEffect(() => {
    if (activeSubscription) {
      setStep(2);
      setIsPaused(activeSubscription.status === 'Paused');
    } else {
      setStep(1);
    }
  }, [activeSubscription, isSubscriptionModalOpen]);

  useEffect(() => {
    if (user) {
      setGuestName(user.name || user.companyName || '');
      setGuestPhone(user.phone || '');
      if (selectedAddress) {
        setGuestAddress(`${selectedAddress.title}, ${selectedAddress.area}`);
      }
    }
  }, [user, selectedAddress]);

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
    if (e && e.preventDefault) e.preventDefault();
    if (dailyTotal === 0) {
      showToast('Please select at least 1 item for your subscription order', 'error');
      return;
    }

    const finalCustomerName = (user?.name || user?.companyName || guestName || '').trim();
    const finalPhone = (user?.phone || guestPhone || '').trim();
    const fallbackAddr = selectedAddress ? `${selectedAddress.title}, ${selectedAddress.area}` : 'Madhapur / Hitec City, Hyderabad';
    const finalAddress = (guestAddress || fallbackAddr).trim();

    if (!finalCustomerName || !finalPhone) {
      showToast('Please enter your full name and mobile number for morning milk delivery', 'error');
      return;
    }

    // Auto-create/authenticate live customer session if not already logged in
    if (!user && login) {
      const newCustomerUser = {
        id: `CUST-B2C-${Date.now()}`,
        name: finalCustomerName,
        phone: finalPhone,
        email: `${finalPhone.replace(/\D/g, '')}@customer.com`,
        isBusiness: false,
        address: finalAddress,
        registeredAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Active'
      };
      login(newCustomerUser);
    }

    let formattedSlot = 'Morning (6:00 AM – 8:00 AM)';
    if (slot === 'afternoon') formattedSlot = 'Afternoon (12:00 PM – 2:00 PM)';
    else if (slot === 'evening') formattedSlot = 'Evening (6:00 PM – 9:00 PM)';
    else if (slot === '6am-7am') formattedSlot = 'Early Morning (6:00 AM – 7:00 AM)';
    else if (slot === '7am-8am') formattedSlot = 'Morning (7:00 AM – 8:00 AM)';

    const newSub = {
      id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
      customer: finalCustomerName,
      phone: finalPhone,
      email: user?.email || '',
      isBusiness: Boolean(user?.isBusiness),
      companyName: user?.companyName || null,
      items: subItems.filter((i) => i.qty > 0).map(i => `${i.name} (${i.qty})`).join(' + '),
      itemsList: subItems.filter((i) => i.qty > 0),
      frequency,
      slot: formattedSlot,
      durationDays,
      dailyCost: dailyTotal,
      totalPaid: netPayable,
      startDate: slot === 'evening' ? 'Today / Tomorrow Evening' : slot === 'afternoon' ? 'Tomorrow Afternoon' : 'Tomorrow Morning',
      address: finalAddress,
      apartment: finalAddress,
      since: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Active'
    };

    setCreatedSub(newSub);
    if (addSubscription) {
      addSubscription(newSub);
    } else {
      try {
        const existingSubs = JSON.parse(localStorage.getItem('sumadhura_subscriptions') || '[]');
        localStorage.setItem('sumadhura_subscriptions', JSON.stringify([newSub, ...existingSubs]));
        localStorage.setItem('sumadhura_subscription', JSON.stringify(newSub));
      } catch (e) {
        console.error(e);
      }
      setActiveSubscription(newSub);
    }

    setStep(2);
    showToast(`Milk subscription activated for ${finalCustomerName}! Delivery starts tomorrow 6:00 AM 🥛`);

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
      const updated = {
        ...activeSubscription,
        status: nextState ? 'Paused' : 'Active'
      };
      setActiveSubscription(updated);
      try {
        localStorage.setItem('sumadhura_subscription', JSON.stringify(updated));
        const existingSubs = JSON.parse(localStorage.getItem('sumadhura_subscriptions') || '[]');
        localStorage.setItem(
          'sumadhura_subscriptions',
          JSON.stringify(existingSubs.map((s) => (s.id === updated.id ? updated : s)))
        );
      } catch {}
    }
    showToast(
      nextState
        ? 'Subscription paused! Deliveries paused until you resume.'
        : 'Subscription resumed! Morning deliveries active.'
    );
  };

  const handleCancelSub = () => {
    setActiveSubscription(null);
    try {
      localStorage.removeItem('sumadhura_subscription');
      if (activeSubscription) {
        const existingSubs = JSON.parse(localStorage.getItem('sumadhura_subscriptions') || '[]');
        localStorage.setItem(
          'sumadhura_subscriptions',
          JSON.stringify(existingSubs.filter((s) => s.id !== activeSubscription.id))
        );
      }
    } catch {}
    setStep(1);
    showToast('Subscription cancelled. Refund credited for remaining days.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#EDE1D1] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner - Fixed at top */}
        <div className="bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] p-4 sm:p-5 text-white flex items-center justify-between border-b border-[#8B121C] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner shrink-0">
              <Sun className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-[#F5A623] text-[#3D040A] px-2 py-0.5 rounded-full uppercase">
                  Daily Morning Sourcing
                </span>
                <span className="text-xs text-amber-100 font-semibold">6:00 AM - 7:00 AM</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black mt-0.5">Morning Milk & Veggie Subscription</h3>
              <p className="text-xs text-amber-100/90 leading-tight">
                Doorstep delivery before 7:00 AM daily. Pause or resume anytime.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSubscriptionModalOpen(false)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View 1: Configure & Start Subscription */}
        {step === 1 && (
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Step 1: Select Products */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    1. Select Daily Morning Items
                  </label>
                  <span className="text-[11px] text-[#7D0A14] font-black">100% Farm Fresh</span>
                </div>

                <div className="space-y-2">
                  {subItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl border border-[#EDE1D1] bg-[#FAF5EC]/40 hover:bg-[#FAF5EC] flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#7D0A14] flex items-center justify-center shrink-0">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="font-extrabold text-xs text-slate-900 truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            ₹{item.unitPrice} per day • <span className="text-emerald-700 font-bold">{item.badge}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-white border border-[#EDE1D1] rounded-xl p-0.5 shadow-2xs">
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
                          className="w-7 h-7 rounded-lg bg-[#7D0A14] hover:bg-[#680811] text-white flex items-center justify-center transition-colors"
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
                        ? 'border-[#7D0A14] bg-[#FAF5EC] text-[#3D040A] ring-2 ring-[#7D0A14]/15 shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
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
                        ? 'border-[#7D0A14] bg-[#FAF5EC] text-[#3D040A] ring-2 ring-[#7D0A14]/15 shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
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
                        ? 'border-[#7D0A14] bg-[#FAF5EC] text-[#3D040A] ring-2 ring-[#7D0A14]/15 shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="font-black">Weekdays Only</div>
                    <span className="text-[10px] text-slate-500 font-normal">Mon to Fri</span>
                  </button>
                </div>
              </div>

              {/* Step 3: Daily Delivery Time Slot */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                  3. Daily Delivery Slot (Morning, Afternoon, Evening)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSlot('morning')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      slot === 'morning' || slot === '6am-7am' || slot === '7am-8am'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Sunrise className={`w-4 h-4 ${slot === 'morning' || slot === '6am-7am' || slot === '7am-8am' ? 'text-amber-300' : 'text-amber-500'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">Morning</span>
                    <span className={`text-[9px] ${slot === 'morning' || slot === '6am-7am' || slot === '7am-8am' ? 'text-amber-100' : 'text-slate-400'}`}>
                      6:00 AM – 8:00 AM
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSlot('afternoon')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      slot === 'afternoon'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Sun className={`w-4 h-4 ${slot === 'afternoon' ? 'text-amber-300' : 'text-amber-600'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">Afternoon</span>
                    <span className={`text-[9px] ${slot === 'afternoon' ? 'text-amber-100' : 'text-slate-400'}`}>
                      12:00 PM – 2:00 PM
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSlot('evening')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      slot === 'evening'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Moon className={`w-4 h-4 ${slot === 'evening' ? 'text-amber-300' : 'text-indigo-600'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">Evening</span>
                    <span className={`text-[9px] ${slot === 'evening' ? 'text-amber-100' : 'text-slate-400'}`}>
                      6:00 PM – 9:00 PM
                    </span>
                  </button>
                </div>
              </div>

              {/* Step 4: Plan Duration */}
              <div>
                <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-1.5">
                  4. Plan Duration
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDurationDays(7)}
                      className={`py-2 text-xs rounded-xl border transition-all ${
                        durationDays === 7
                          ? 'bg-[#7D0A14] text-white border-[#7D0A14] font-black shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 font-bold hover:bg-slate-50'
                      }`}
                    >
                      7 Days (10% Off)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDurationDays(30)}
                      className={`py-2 text-xs rounded-xl border transition-all ${
                        durationDays === 30
                          ? 'bg-[#7D0A14] text-white border-[#7D0A14] font-black shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 font-bold hover:bg-slate-50'
                      }`}
                    >
                      30 Days (15% Off)
                    </button>
                  </div>
                </div>

              {/* Vacation / Pause Guarantee */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Vacation Guarantee:</strong> Going out of town? Pause or modify your milk and vegetable delivery anytime without charges.
                </span>
              </div>

              {/* Customer Details & Delivery Contact */}
              <div className="bg-[#FAF5EC] border border-[#EDE1D1] rounded-2xl p-3.5 sm:p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#3D040A] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#7D0A14]" />
                    <span>Doorstep Delivery Contact</span>
                  </span>
                  {user ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Logged In as {user.name}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAuthModalOpen && setIsAuthModalOpen(true)}
                      className="text-[11px] font-bold text-[#7D0A14] hover:underline cursor-pointer"
                    >
                      Already have account? Sign In
                    </button>
                  )}
                </div>

                {user ? (
                  <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-[#EDE1D1] space-y-1">
                    <div className="font-extrabold text-[#3D040A] text-sm">{user.name || user.companyName}</div>
                    <div className="text-slate-500">{user.phone} • {user.email || 'Doorstep Delivery'}</div>
                    <div className="text-slate-600 font-medium truncate pt-1 border-t border-slate-100 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#7D0A14] shrink-0" />
                      <span>{guestAddress || (selectedAddress ? `${selectedAddress.title}, ${selectedAddress.area}` : 'Madhapur / Hitec City, Hyderabad')}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#EDE1D1] rounded-xl focus:ring-2 focus:ring-[#7D0A14] font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Mobile / WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 text-xs bg-white border border-[#EDE1D1] rounded-xl focus:ring-2 focus:ring-[#7D0A14] font-semibold text-slate-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Doorstep Apartment / Flat / Address *</label>
                      <input
                        type="text"
                        required
                        value={guestAddress}
                        onChange={(e) => setGuestAddress(e.target.value)}
                        placeholder="e.g. Flat 302, Sai Residency, Madhapur, Hyderabad"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#EDE1D1] rounded-xl focus:ring-2 focus:ring-[#7D0A14] font-semibold text-slate-900"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Estimated Price Summary breakdown */}
              <div className="bg-[#FAF5EC]/70 p-3.5 rounded-2xl border border-[#EDE1D1] space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Daily Basket Cost</span>
                  <span className="font-bold text-slate-900">₹{dailyTotal} / day</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Days ({deliveryDaysCount} mornings)</span>
                  <span>₹{grossTotal}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Subscriber Savings ({durationDays === 30 ? '15%' : '10%'})</span>
                  <span>-₹{discountAmount}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-[#EDE1D1] text-sm font-black text-slate-900">
                  <span>Total Subscription Cost</span>
                  <span className="text-[#7D0A14]">₹{netPayable}</span>
                </div>
              </div>
            </div>

            {/* Sticky Bottom Footer CTA */}
            <div className="shrink-0 p-3.5 sm:p-4 bg-white border-t border-[#EDE1D1] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Payable</span>
                  <span className="text-xl font-black text-[#7D0A14]">₹{netPayable}</span>
                </div>
                <div className="text-right sm:text-left text-[11px] text-slate-500 font-medium">
                  <span>({deliveryDaysCount} drops • ₹{dailyTotal}/day)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartSubscription}
                disabled={dailyTotal === 0}
                className="w-full sm:w-auto px-6 py-3 bg-[#7D0A14] hover:bg-[#680811] active:scale-98 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-[#7D0A14]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Start Morning Subscription</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </>
        )}

        {/* View 2: Active Subscription Dashboard */}
        {step === 2 && currentSubscription && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-slate-900">
                      Subscription #{currentSubscription.id}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isPaused
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isPaused ? 'PAUSED' : 'ACTIVE DAILY'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Next Scheduled Drop: Tomorrow ({currentSubscription.slot})
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
                {(currentSubscription?.itemsList || (Array.isArray(currentSubscription?.items) ? currentSubscription.items : [])).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-[#EDE1D1] bg-[#FAF5EC]/40 flex items-center justify-between text-xs"
                  >
                    <span className="font-bold text-slate-800">
                      {item.qty}x {item.name}
                    </span>
                    <span className="font-extrabold text-[#7D0A14]">
                      ₹{(item.unitPrice || 0) * (item.qty || 1)} / day
                    </span>
                  </div>
                ))}
                {(!currentSubscription?.itemsList && typeof currentSubscription?.items === 'string') && (
                  <div className="p-3 rounded-xl border border-[#EDE1D1] bg-[#FAF5EC]/40 text-xs font-bold text-slate-800">
                    {currentSubscription.items}
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-[#FAF5EC]/60 p-4 rounded-2xl border border-[#EDE1D1] text-xs text-slate-600 space-y-1">
              <div>
                <strong>Delivery Address:</strong> {currentSubscription?.address || 'Default Address'}
              </div>
              <div>
                <strong>Schedule:</strong> {currentSubscription?.frequency?.toUpperCase() || 'DAILY'} at{' '}
                {currentSubscription?.slot || '6:00 AM - 7:00 AM'}
              </div>
              <div>
                <strong>Total Plan Cost:</strong> ₹{currentSubscription?.totalPaid || 0} ({currentSubscription?.durationDays || 30} Days prepaid)
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