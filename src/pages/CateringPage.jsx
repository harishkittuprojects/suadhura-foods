import React from 'react';
import { CateringSection } from '../components/CateringSection';
import { Sparkles, Utensils, CheckCircle2, PhoneCall, ShieldCheck } from 'lucide-react';

export const CateringPage = () => {
  return (
    <div className="space-y-6">
      {/* Sleek Catering Top Ribbon */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-3">
        <div className="rounded-2xl bg-gradient-to-r from-[#3D040A] via-[#5D0710] to-[#7D0A14] text-white px-4 py-3 sm:px-6 sm:py-3.5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-[#FCE39E] tracking-tight">
                Sumadhura Catering & Events
              </h1>
              <p className="text-[11px] text-amber-100/80 font-medium">
                Pure A2 Desi Ghee Preparation • Party Boxes to Royal Banquets (10 to 2,000+ Guests)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-amber-200 border border-white/15">
              Live in Hyderabad
            </span>
            <a
              href="tel:+919121288450"
              className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#3D040A] text-xs font-black transition-colors"
            >
              Call Desk
            </a>
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
