import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, MapPin, Check, Search, Navigation, Home, Briefcase, Plus } from 'lucide-react';

export const LocationModal = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    savedAddresses,
    selectedAddress,
    setSelectedAddress,
    showToast
  } = useShop();

  const [search, setSearch] = useState('');

  if (!isLocationModalOpen) return null;

  const popularAreas = [
    { tag: 'Other', title: '5th Block', area: 'Koramangala, Bengaluru', pincode: '560034' },
    { tag: 'Other', title: '100ft Road', area: 'Indiranagar, Bengaluru', pincode: '560038' },
    { tag: 'Other', title: 'Sector 3', area: 'HSR Layout, Bengaluru', pincode: '560102' },
    { tag: 'Other', title: 'ITPL Main Rd', area: 'Whitefield, Bengaluru', pincode: '560066' },
    { tag: 'Other', title: 'Madhapur', area: 'Hitec City, Hyderabad', pincode: '500081' },
    { tag: 'Other', title: 'Gachibowli', area: 'Financial District, Hyderabad', pincode: '500032' },
  ];

  const handleSelect = (addr) => {
    setSelectedAddress(addr);
    setIsLocationModalOpen(false);
    showToast(`Delivery location set to ${addr.title || addr.tag}, ${addr.area}`);
  };

  const handleDetectGPS = () => {
    handleSelect(savedAddresses[0]);
    showToast('GPS Detected: Koramangala 5th Block (Accuracy: 12 meters)');
  };

  const getTagIcon = (tag) => {
    if (tag === 'Home') return Home;
    if (tag === 'Work') return Briefcase;
    return MapPin;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E8DDCF] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-[#E8DDCF] flex items-center justify-between bg-[#FAF5EC]/80">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <h3 className="font-extrabold text-slate-900 text-base">Select Delivery Address</h3>
            </div>
            <p className="text-[11px] text-slate-500">Dark store delivering to your doorstep</p>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search area, street name or apartment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Current GPS button */}
          <button
            onClick={handleDetectGPS}
            className="w-full py-2.5 px-3 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/70 text-blue-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
            <span>Use My Current Location (GPS)</span>
          </button>

          {/* Saved Addresses */}
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
              Saved Addresses
            </div>

            <div className="space-y-2">
              {savedAddresses.map((addr) => {
                const Icon = getTagIcon(addr.tag);
                const isSelected = selectedAddress.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => handleSelect(addr)}
                    className={`p-3 rounded-2xl cursor-pointer border-2 flex items-center justify-between text-xs transition-colors ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold'
                        : 'border-slate-100 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900">
                          {addr.tag} • {addr.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[200px]">
                          {addr.area}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600 stroke-[3]" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Popular Areas */}
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
              Deliver to Another Neighborhood
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1 divide-y divide-slate-50 text-xs">
              {popularAreas.map((area, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    handleSelect({
                      id: `temp-${idx}`,
                      tag: area.title,
                      title: area.title,
                      area: area.area,
                      pincode: area.pincode
                    })
                  }
                  className="py-2 px-2 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-800">{area.title}</span>
                    <span className="text-slate-400 text-[11px] block">{area.area}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    ⚡ 10m
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
