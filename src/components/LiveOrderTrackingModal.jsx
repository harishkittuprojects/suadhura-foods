import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Phone,
  MessageSquare,
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  Sparkles,
  ShoppingBag,
  BellOff,
  Bike
} from 'lucide-react';

export const LiveOrderTrackingModal = () => {
  const {
    activeOrder,
    isLiveTrackingOpen,
    setIsLiveTrackingOpen,
    deliveryInstructions,
    showToast
  } = useShop();

  const [etaMinutes, setEtaMinutes] = useState(11);
  const [partnerProgress, setPartnerProgress] = useState(65); // percentage along the route

  useEffect(() => {
    if (!isLiveTrackingOpen) return;
    const interval = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
      setPartnerProgress((prev) => (prev < 92 ? prev + 4 : 92));
    }, 12000);
    return () => clearInterval(interval);
  }, [isLiveTrackingOpen]);

  if (!isLiveTrackingOpen || !activeOrder) return null;

  const handleCallPartner = () => {
    showToast('Calling delivery partner Ramesh Kumar (+91 98450 77123)...', 'info');
  };

  const handleChatPartner = () => {
    showToast('Chat opened: "Partner is 400m away approaching your gate"', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 p-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Live Express Delivery
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              Arriving in {etaMinutes} Mins ⚡
            </h2>
            <p className="text-xs text-blue-200">Order #{activeOrder.id} • On time guarantee</p>
          </div>
          <button
            onClick={() => setIsLiveTrackingOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Animated Map Simulation */}
        <div className="relative h-48 sm:h-56 bg-slate-100 overflow-hidden border-b border-slate-200">
          {/* Simulated Map Background Grid & Roads */}
          <div className="absolute inset-0 bg-[#e5e9ec] opacity-90">
            {/* SVG Roads and City Blocks */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d5dbe0" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* City Parks */}
              <rect x="20" y="20" width="80" height="60" rx="8" fill="#c7e6c9" opacity="0.6" />
              <rect x="320" y="80" width="100" height="70" rx="8" fill="#c7e6c9" opacity="0.6" />
              {/* Main Avenue */}
              <line x1="0" y1="110" x2="600" y2="110" stroke="#ffffff" strokeWidth="18" />
              <line x1="0" y1="110" x2="600" y2="110" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 6" />
              {/* Diagonal Route */}
              <line x1="60" y1="110" x2="160" y2="40" stroke="#ffffff" strokeWidth="14" />
              <line x1="160" y1="40" x2="480" y2="40" stroke="#ffffff" strokeWidth="14" />
              <line x1="480" y1="40" x2="480" y2="170" stroke="#ffffff" strokeWidth="14" />
              {/* Active Blue Delivery Track */}
              <path
                d="M 60 110 L 160 40 L 480 40 L 480 150"
                fill="none"
                stroke="#2563eb"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Store Pin */}
          <div className="absolute top-[85px] left-8 sm:left-12 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold bg-slate-900 text-white px-2 py-0.5 rounded-full mt-1 shadow-sm">
              Sumadhura Hub
            </span>
          </div>

          {/* Moving Delivery Partner Bike (Positioned along route) */}
          <div
            className="absolute transition-all duration-1000 flex flex-col items-center z-10"
            style={{
              top: '20px',
              left: `${Math.min(partnerProgress, 80)}%`
            }}
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-blue-500/30 animate-bounce">
              <Bike className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black bg-blue-900 text-white px-2 py-0.5 rounded-full mt-0.5 shadow-md flex items-center gap-1">
              <span>Ramesh</span> • {etaMinutes}m
            </span>
          </div>

          {/* Customer Destination Pin */}
          <div className="absolute bottom-5 right-8 sm:right-14 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl border-2 border-white ring-4 ring-rose-400/20">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-extrabold bg-slate-900 text-white px-2 py-0.5 rounded-full mt-1 shadow-sm">
              Your Doorstep
            </span>
          </div>

          {/* Delivery PIN Badge */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border border-slate-200/80 text-right">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">Delivery OTP</span>
            <span className="text-base font-black text-blue-700 tracking-widest">4829</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Delivery Partner Profile Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Delivery Partner"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-slate-900 text-sm">Ramesh Kumar</h4>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.2 rounded">
                    ★ 4.9
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Temperature: 98.4°F
                  </span>
                  <span>• 1,420 deliveries</span>
                </div>
              </div>
            </div>

            {/* Call and Message buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCallPartner}
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-all"
                title="Call Partner"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={handleChatPartner}
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition-all"
                title="Message Partner"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Delivery Instructions Active Tag */}
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-center gap-2">
            <BellOff className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              <strong>Delivery Instruction:</strong> "Do not ring the bell. Leave near door." Partner has been instructed.
            </span>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Order Milestones
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold">Order Confirmed with Sumadhura Store</span>
                <span className="text-[11px] text-slate-400 ml-auto">Just now</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold">Dairy & Veggies Packed in Thermal Cold-Box</span>
                <span className="text-[11px] text-slate-400 ml-auto">2 mins ago</span>
              </div>
              <div className="flex items-center gap-3 text-blue-700 font-bold">
                <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin flex-shrink-0" />
                <span>Ramesh is on the way with your fresh delivery</span>
                <span className="text-[11px] text-blue-600 ml-auto font-black">{etaMinutes} mins left</span>
              </div>
            </div>
          </div>

          {/* Order Brief Summary */}
          <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-600">
            <span>
              Delivering {activeOrder.items?.length || 2} items to <strong>{activeOrder.address}</strong>
            </span>
            <span className="font-black text-slate-900 text-sm">₹{activeOrder.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
