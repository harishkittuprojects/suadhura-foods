import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { servicesList } from '../data/products';
import {
  ShieldCheck,
  MousePointerClick,
  Zap,
  Lock,
  Layers,
  Headphones,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Mail,
  Send
} from 'lucide-react';

export const ServicesPage = () => {
  const { navigateTo, showToast } = useShop();

  const [openFaq, setOpenFaq] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    service: 'Daily Milk Delivery',
    message: ''
  });
  const [formSent, setFormSent] = useState(false);

  const iconMap = {
    ShieldCheck,
    MousePointerClick,
    Zap,
    Lock,
    Layers,
    Headphones
  };

  const faqs = [
    {
      q: 'How does Sumadhura Foods guarantee dairy purity?',
      a: 'Our milk is tested daily at collection centers for adulteration, urea, starch, and antibiotics. We maintain a cold chain temperature below 4°C from milking to your door.'
    },
    {
      q: 'How fast is the 30-minute delivery service?',
      a: 'We operate neighborhood micro-fulfillment hubs across Bengaluru and Hyderabad. Orders within a 4km radius are packed and dispatched within 7 minutes.'
    },
    {
      q: 'Can I set up a daily recurring milk and vegetable delivery?',
      a: 'Yes! You can choose our Morning Milk Subscription slot (6:30 AM to 8:30 AM) to receive fresh cow milk and vegetables automatically without daily ordering.'
    },
    {
      q: 'What is your return and refund policy?',
      a: 'If any product arrives damaged or not up to freshness expectations, simply notify us via WhatsApp or app within 24 hours. We offer instant refunds or free replacements.'
    }
  ];

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    showToast('Inquiry submitted! Our customer team will contact you shortly.');
    setTimeout(() => {
      setInquiryForm({ name: '', phone: '', service: 'Daily Milk Delivery', message: '' });
      setFormSent(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-12 sm:space-y-16">
      {/* Header Banner */}
      <div
        data-aos="fade-down"
        className="rounded-3xl bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden border border-[#8B121C]"
      >
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Dedicated Customer Care</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Our Services</h1>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            From daily farm milking to doorstep delivery in 30 minutes, discover the end-to-end services
            that make Sumadhura Foods the most reliable choice for food lovers.
          </p>
        </div>
      </div>

      {/* The 6 Core Services Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase text-blue-600 tracking-wider">
            Built for Freshness & Convenience
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3D040A] mt-1">
            Everything You Need, Handled With Care
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, idx) => {
            const Icon = iconMap[service.icon] || ShieldCheck;
            return (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDCF] shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-3 inline-block">
                    {service.highlight}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{service.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Guaranteed Standards</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Express Delivery Breakdown Feature */}
      <section
        data-aos="fade-up"
        className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
      >
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">
            ⚡ 30-Minute Logistics
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            How We Get Fresh Milk & Veggies to You in 30 Mins
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Unlike traditional e-commerce that ships from distant warehouses, our hyper-local fulfillment network
            keeps organic perishables stored at optimal temperatures within minutes of your home.
          </p>

          <div className="space-y-3 pt-2 text-xs text-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <strong>Harvest & Milking at 4:30 AM:</strong> Sourced from local farm cooperatives.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <strong>3-Step Quality Lab Check at 5:30 AM:</strong> Ensuring 0 pesticide residues & pure fat levels.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <strong>Packaged in Chilled Thermal Crates:</strong> Sealed cold chain delivery directly to you.
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('categories')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20"
            >
              Order For 30-Min Delivery
            </button>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
            alt="Cold-chain express delivery"
            className="w-full h-80 object-cover rounded-3xl shadow-lg"
          />
          <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <span className="text-xs font-black text-slate-900 block">Average Delivery Time</span>
              <span className="text-sm font-extrabold text-blue-600">22 Minutes 40 Sec</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ & Contact Inquiry */}
      <section data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: FAQ accordion */}
        <div className="lg:col-span-7 space-y-4">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Have Questions About Delivery?</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-sm hover:text-blue-600"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      openFaq === index ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Special Order / Service Inquiry Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-soft">
          <div className="mb-5">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
              Direct Support & Inquiries
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-0.5">Need a Special Bulk Order?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Contact our service manager for custom recurring daily orders or bulk family orders.
            </p>
          </div>

          <form onSubmit={handleInquirySubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="Full name"
                value={inquiryForm.name}
                onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                placeholder="+91 Mobile number"
                value={inquiryForm.phone}
                onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Service Type</label>
              <select
                value={inquiryForm.service}
                onChange={(e) => setInquiryForm({ ...inquiryForm, service: e.target.value })}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
              >
                <option value="Daily Milk Delivery">Daily Milk Delivery Subscription</option>
                <option value="Weekly Vegetable Basket">Weekly Organic Veggie Basket</option>
                <option value="Apartment Community Tie-up">Apartment Community Tie-up</option>
                <option value="General Support">General Service Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
              <textarea
                rows={3}
                placeholder="Tell us what you need..."
                value={inquiryForm.message}
                onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Service Request</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
