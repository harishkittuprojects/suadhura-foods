import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SERVICES } from '../data/foodData';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  PackageCheck, 
  Sparkles, 
  Headphones, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  Send
} from 'lucide-react';

const iconMap = {
  ShoppingBag,
  ShieldCheck,
  Truck,
  PackageCheck,
  Sparkles,
  Headphones
};

export const ServicesPage = () => {
  const { navigateTo, showToast } = useCart();
  const [bulkForm, setBulkForm] = useState({
    name: '',
    phone: '',
    category: 'Sweets & Snacks',
    quantity: '50-100 kg / Boxes',
    message: ''
  });
  const [bulkSubmitted, setBulkSubmitted] = useState(false);

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    setBulkSubmitted(true);
    showToast("Bulk inquiry received! Our catering & event manager will call you within 2 hours.");
    setTimeout(() => {
      setBulkForm({ name: '', phone: '', category: 'Sweets & Snacks', quantity: '50-100 kg / Boxes', message: '' });
      setBulkSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="bg-neutral-50 rounded-3xl p-6 sm:p-12 border border-neutral-200 text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
          Tailored Food Logistics & Supply
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 mt-2 tracking-tight">
          Our Services & Capabilities
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-3 max-w-2xl mx-auto leading-relaxed">
          Sumadhura Foods delivers end-to-end culinary reliability—from daily doorstep grocery essentials to corporate gift hampers and large event catering batches.
        </p>
      </div>

      {/* Services Grid (6 Core Services Required) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, index) => {
          const Icon = iconMap[service.icon] || ShoppingBag;
          return (
            <div
              key={service.id}
              className="bg-white border border-neutral-200 hover:border-neutral-900 rounded-3xl p-7 transition-all duration-300 hover:shadow-subtle flex flex-col justify-between"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-6 h-6 text-neutral-200" />
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  {service.tagline}
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-2.5">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="border-t border-neutral-100 pt-4 space-y-2 mb-6">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {service.id === 'online-shopping' ? (
                  <button
                    onClick={() => navigateTo('categories')}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Browse Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : service.id === 'bulk-orders' ? (
                  <a
                    href="#bulk-inquiry"
                    className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Request Bulk Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : service.id === 'combo-packs' ? (
                  <button
                    onClick={() => navigateTo('categories', 'combo-packs')}
                    className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Explore Combos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigateTo('contact')}
                    className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Get Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bulk Orders Inquiry Section */}
      <div id="bulk-inquiry" className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 border border-neutral-800 shadow-2xl" data-aos="fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Wholesale & Event Gifting
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Planning a Wedding, Festival or Corporate Gifting?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Order customized boxes of Pure Desi Ghee Sweets, Sun-dried Pickles, Premium California Dry Fruit Jars, and authentic Regional Savories at tiered volume prices.
            </p>
            <div className="space-y-2.5 pt-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Custom brand printing on gift packaging boxes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Guaranteed freshly batched 24 hours prior to dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Pan-India refrigerated and express delivery options</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-neutral-800/80 p-6 sm:p-8 rounded-3xl border border-neutral-700 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4">
              Request a Bulk Price Quote
            </h3>

            {bulkSubmitted ? (
              <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-white mx-auto" />
                <h4 className="font-bold text-white text-base">Inquiry Submitted!</h4>
                <p className="text-xs text-neutral-300">
                  Our wholesale team will contact your provided number shortly with the catalog & discount rate card.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Your Name / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kumar / TechCorp India"
                    value={bulkForm.name}
                    onChange={(e) => setBulkForm({...bulkForm, name: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98490 12345"
                    value={bulkForm.phone}
                    onChange={(e) => setBulkForm({...bulkForm, phone: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">Product Category</label>
                    <select
                      value={bulkForm.category}
                      onChange={(e) => setBulkForm({...bulkForm, category: e.target.value})}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white"
                    >
                      <option>Sweets & Laddus</option>
                      <option>Traditional Pickles</option>
                      <option>Dry Fruits Gift Boxes</option>
                      <option>Stone Ground Flours</option>
                      <option>Assorted Namkeen</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">Estimated Quantity</label>
                    <select
                      value={bulkForm.quantity}
                      onChange={(e) => setBulkForm({...bulkForm, quantity: e.target.value})}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white"
                    >
                      <option>25 - 50 kg / Boxes</option>
                      <option>50 - 100 kg / Boxes</option>
                      <option>100 - 500 kg / Boxes</option>
                      <option>500+ kg Wholesale</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Special Requirements (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Date required, custom packaging, specific dietary preferences..."
                    value={bulkForm.message}
                    onChange={(e) => setBulkForm({...bulkForm, message: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white hover:bg-neutral-200 text-neutral-950 font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Wholesale Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
