import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Users,
  Clock,
  Sparkles,
  MapPin,
  Utensils,
  CheckCircle2,
  Phone,
  ArrowRight,
  Heart
} from 'lucide-react';

export const CateringBookingModal = () => {
  const { isCateringModalOpen, setIsCateringModalOpen, showToast, selectedAddress } = useShop();

  const [eventType, setEventType] = useState('Family Celebration');
  const [guestCount, setGuestCount] = useState(50);
  const [eventDate, setEventDate] = useState('');
  const [eventMeal, setEventMeal] = useState('Lunch'); // Lunch | Dinner | Breakfast
  const [dietPreference, setDietPreference] = useState('both'); // pure-veg | both | non-veg
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCateringModalOpen) return null;

  const eventTypes = [
    'Family Celebration',
    'Birthday Catering',
    'Wedding Catering',
    'Housewarming / Pooja',
    'Corporate Event'
  ];

  // Dynamic estimate calculation
  const perPlatePrice = dietPreference === 'pure-veg' ? 299 : dietPreference === 'non-veg' ? 399 : 349;
  const estimatedTotal = guestCount * perPlatePrice;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerPhone.trim()) {
      showToast('Please enter your mobile number so our catering manager can connect.', 'error');
      return;
    }

    setIsSuccess(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    showToast('Catering inquiry received! Manager will call within 15 minutes.');
  };

  const handleClose = () => {
    setIsCateringModalOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#EDE1D1] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] p-5 sm:p-6 text-white flex items-center justify-between border-b border-[#8B121C]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-inner flex-shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black bg-[#F5A623] text-[#3D040A] px-2 py-0.2 rounded-full uppercase tracking-wider">
                  Sumadhura Caterers
                </span>
                <span className="text-xs text-amber-200/90 font-semibold">• Hyderabad</span>
              </div>
              <h3 className="text-xl font-black mt-0.5">Book Catering Service</h3>
              <p className="text-xs text-amber-100/90">
                Food Crafted with Love for 20 to 1,000+ Guests
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Confirmation Success State */
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-black text-[#3D040A]">Catering Request Confirmed!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{customerName || 'Guest'}</strong>! Our senior catering banquet chef in <strong>{selectedAddress?.tag || 'Hyderabad'}</strong> is reviewing your {eventType} menu. We will call you on <strong>{customerPhone}</strong> within 15 minutes.
            </p>

            <div className="bg-[#FAF5EC] border border-[#EDE1D1] rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Event Type:</span>
                <span className="text-[#7D0A14]">{eventType}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Guest Count:</span>
                <span>{guestCount} Guests</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Estimated Budget:</span>
                <span className="text-emerald-700 font-black">₹{estimatedTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-[#7D0A14] hover:bg-[#680811] text-white font-black text-xs rounded-xl shadow-md transition-all"
            >
              Back to Home
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
            {/* Event Type */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Select Occasion / Event Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(type)}
                    className={`p-2 rounded-xl border text-center font-bold text-[11px] transition-all ${
                      eventType === type
                        ? 'border-[#7D0A14] bg-[#7D0A14] text-white shadow-sm'
                        : 'border-[#EDE1D1] bg-[#FAF5EC]/50 text-slate-700 hover:border-[#7D0A14]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count Slider & Meal Slot */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Expected Guests: <strong className="text-[#7D0A14]">{guestCount}</strong>
                </label>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#7D0A14] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>20</span>
                  <span>250</span>
                  <span>500+</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Meal Service</label>
                <div className="flex rounded-xl bg-slate-100 p-1">
                  {['Breakfast', 'Lunch', 'Dinner'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setEventMeal(m)}
                      className={`flex-1 py-1.5 rounded-lg text-center font-bold text-[11px] transition-all ${
                        eventMeal === m
                          ? 'bg-[#7D0A14] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Diet Preference */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Cuisine / Diet Preference</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'pure-veg', label: '🌿 Pure Veg', sub: '₹299/plate' },
                  { id: 'both', label: '🍲 Veg & Non-Veg', sub: '₹349/plate' },
                  { id: 'non-veg', label: '🍗 Special Feast', sub: '₹399/plate' }
                ].map((diet) => (
                  <button
                    key={diet.id}
                    type="button"
                    onClick={() => setDietPreference(diet.id)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      dietPreference === diet.id
                        ? 'border-[#7D0A14] bg-[#FAF5EC] text-[#7D0A14] font-extrabold ring-1 ring-[#7D0A14]'
                        : 'border-[#EDE1D1] bg-white text-slate-600'
                    }`}
                  >
                    <div className="font-bold text-[11px]">{diet.label}</div>
                    <div className="text-[10px] opacity-75">{diet.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#EDE1D1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98450 12345"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#EDE1D1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                />
              </div>
            </div>

            {/* Live Pricing Summary Card */}
            <div className="p-3 bg-[#FAF5EC] rounded-2xl border border-[#EDE1D1] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Estimated Package Cost ({guestCount} Guests)
                </span>
                <span className="text-base font-black text-[#7D0A14]">
                  ₹{estimatedTotal.toLocaleString()}{' '}
                  <span className="text-[11px] font-normal text-slate-500">(@ ₹{perPlatePrice}/plate)</span>
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Zero Advance Required
              </span>
            </div>

            {/* Action CTA */}
            <button
              type="submit"
              className="w-full py-3 bg-[#7D0A14] hover:bg-[#680811] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#7D0A14]/25 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Calendar className="w-4 h-4 text-[#F5A623]" />
              <span>Confirm & Request Catering Manager Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

