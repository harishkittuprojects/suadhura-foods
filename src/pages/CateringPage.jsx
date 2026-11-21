import React from 'react';
import { CateringSection } from '../components/CateringSection';
import { Sparkles, Utensils, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';

export const CateringPage = () => {
  return (
    <div className="space-y-6">
      {/* Catering Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="rounded-3xl bg-gradient-to-r from-[#3D040A] via-[#5D0710] to-[#7D0A14] text-white p-6 sm:p-10 shadow-xl relative overflow-hidden border border-[#8B121C]">
          <div className="max-w-2xl relative z-10 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sumadhura Caterers • Serving Hyderabad Since 1998</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif text-[#FCE39E]">
              Sumadhura Catering & Events
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
              From compact 10-guest party boxes to royal 2,000+ guest wedding feasts, we bring authentic
              flavour, pure A2 desi ghee preparation and seamless hospitality to your celebration.
            </p>
          </div>
        </div>
      </div>

      {/* Main Catering UI Section */}
      <CateringSection />

      {/* Why Choose Sumadhura Catering */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-[#FAF5EC] rounded-3xl p-6 sm:p-10 border border-[#EDE1D1] space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase text-[#7D0A14] tracking-wider">
              Purity & Hygiene Guarantee
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3D040A] mt-1">
              Why Hyderabad Chooses Sumadhura Catering
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-[#EDE1D1] space-y-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                🧈
              </div>
              <h3 className="font-black text-[#3D040A] text-sm">100% Pure A2 Desi Cow Ghee</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All sweets, pulavs, biryanis and traditional curries are cooked exclusively using our in-house bilona ghee and farm milk.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EDE1D1] space-y-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black">
                🌿
              </div>
              <h3 className="font-black text-[#3D040A] text-sm">Eco-Friendly & Biodegradable</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our party delivery boxes and corporate trays use food-grade, compostable packaging with zero plastic and separate cutlery.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EDE1D1] space-y-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-black">
                ⏱️
              </div>
              <h3 className="font-black text-[#3D040A] text-sm">Punctual Hot Delivery Across Hyderabad</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Insulated thermal transport ensures your party boxes arrive hot at the exact scheduled time across Madhapur, Gachibowli, Jubilee Hills & Secunderabad.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
