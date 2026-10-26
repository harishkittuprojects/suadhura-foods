import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, MapPin, Check, Search } from 'lucide-react';

export const LocationModal = () => {
  const { 
    isLocationModalOpen, 
    setIsLocationModalOpen, 
    deliveryLocation, 
    setDeliveryLocation, 
    showToast 
  } = useCart();

  const [pincodeInput, setPincodeInput] = useState('');
  const [selectedCity, setSelectedCity] = useState(deliveryLocation.city || 'Hyderabad');

  if (!isLocationModalOpen) return null;

  const popularLocalities = [
    { city: 'Hyderabad', area: 'Jubilee Hills', pincode: '500033' },
    { city: 'Hyderabad', area: 'Banjara Hills', pincode: '500034' },
    { city: 'Hyderabad', area: 'Gachibowli', pincode: '500032' },
    { city: 'Hyderabad', area: 'Madhapur', pincode: '500081' },
    { city: 'Hyderabad', area: 'Kukatpally', pincode: '500072' },
    { city: 'Bengaluru', area: 'Indiranagar', pincode: '560038' },
    { city: 'Bengaluru', area: 'Koramangala', pincode: '560034' },
    { city: 'Bengaluru', area: 'Whitefield', pincode: '560066' },
    { city: 'Bengaluru', area: 'HSR Layout', pincode: '560102' },
    { city: 'Chennai', area: 'Adyar', pincode: '600020' },
    { city: 'Chennai', area: 'Anna Nagar', pincode: '600040' },
    { city: 'Pune', area: 'Kothrud', pincode: '411038' },
  ];

  const handleSelect = (loc) => {
    setDeliveryLocation({
      ...loc,
      slot: "Tomorrow Morning 6:00 AM - 7:30 AM"
    });
    setIsLocationModalOpen(false);
    showToast(`Delivery location set to ${loc.area}, ${loc.city}`);
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    if (pincodeInput.trim().length === 6) {
      setDeliveryLocation({
        area: "Verified Delivery Zone",
        city: selectedCity,
        pincode: pincodeInput.trim(),
        slot: "Tomorrow Morning 6:00 AM - 7:30 AM"
      });
      setIsLocationModalOpen(false);
      showToast(`Delivering to ${selectedCity} (${pincodeInput.trim()})`);
    } else {
      showToast("Please enter a valid 6-digit pincode", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-neutral-900" />
            <div>
              <h2 className="text-base font-bold text-neutral-900">Choose Delivery Location</h2>
              <p className="text-xs text-neutral-500">Morning 7 AM delivery service areas</p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors border border-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Pincode Search form */}
          <form onSubmit={handlePincodeSubmit} className="space-y-2">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
              Enter 6-Digit Pincode:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. 500033"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                className="flex-1 bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 font-mono"
              />
              <button
                type="submit"
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
              >
                Check
              </button>
            </div>
          </form>

          {/* City Tabs */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Select City:
            </label>
            <div className="flex flex-wrap gap-2">
              {['Hyderabad', 'Bengaluru', 'Chennai', 'Pune'].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    selectedCity === city
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Localities List */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Popular Hubs in {selectedCity}:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto">
              {popularLocalities
                .filter(loc => loc.city === selectedCity)
                .map((loc) => {
                  const isCurrent = deliveryLocation.area === loc.area && deliveryLocation.city === loc.city;
                  return (
                    <button
                      key={loc.area}
                      onClick={() => handleSelect(loc)}
                      className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                        isCurrent 
                          ? 'border-neutral-900 bg-neutral-100 font-bold text-neutral-900'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div>
                        <span className="block font-semibold">{loc.area}</span>
                        <span className="text-[11px] text-neutral-400">{loc.pincode}</span>
                      </div>
                      {isCurrent && <Check className="w-4 h-4 text-neutral-900" />}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
