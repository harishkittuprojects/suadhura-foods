import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ChevronDown, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  ShieldCheck
} from 'lucide-react';

export const ContactPage = () => {
  const { showToast } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [isSent, setIsSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    showToast("Thank you! Your message has been sent to our customer care team.");
    setTimeout(() => {
      setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      setIsSent(false);
    }, 4000);
  };

  const faqs = [
    {
      q: "When is the morning delivery slot delivered?",
      a: "Our morning delivery slot is completed between 6:00 AM and 7:30 AM every single day. Orders placed before 10:00 PM the previous night are dispatched in the first morning run."
    },
    {
      q: "How does Sumadhura Foods guarantee purity without preservatives?",
      a: "We use traditional preservation techniques that have stood the test of centuries—such as cold-pressed gingelly oil and rock salt for pickles, moisture-controlled vacuum packaging for flours, and zero moisture sterilization for spices. Every single batch is lab tested."
    },
    {
      q: "What is your return or replacement policy?",
      a: "We maintain a 100% satisfaction promise. If you receive an item that is damaged in transit or doesn't meet your expectation, simply message us on WhatsApp or call us within 48 hours for an instant free replacement or refund."
    },
    {
      q: "Do you accept Cash on Delivery (COD) and Online Payments?",
      a: "Yes! We accept Cash on Delivery, UPI (Google Pay, PhonePe, Paytm), Net Banking, and all major Credit and Debit cards with 100% secure encrypted checkout."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="bg-neutral-50 rounded-3xl p-6 sm:p-12 border border-neutral-200 text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
          Support & Communications
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 mt-2 tracking-tight">
          We're Here to Help You
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 mt-3 max-w-2xl mx-auto leading-relaxed">
          Have a question about our ingredients, daily delivery timing, wholesale requirements, or an ongoing order? Reach out to our dedicated support team.
        </p>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-3">
            <Phone className="w-5 h-5 text-neutral-200" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900">Toll Free Support</h3>
            <p className="text-xs text-neutral-500 mt-1">Available 6:00 AM - 10:00 PM</p>
          </div>
          <a href="tel:18002087862" className="mt-3 text-xs font-bold text-neutral-900 hover:underline">
            1800-208-7862
          </a>
        </div>

        <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-3">
            <Mail className="w-5 h-5 text-neutral-200" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900">Email Inquiries</h3>
            <p className="text-xs text-neutral-500 mt-1">Responses within 2 business hours</p>
          </div>
          <a href="mailto:support@sumadhurafoods.com" className="mt-3 text-xs font-bold text-neutral-900 hover:underline truncate max-w-full">
            support@sumadhurafoods.com
          </a>
        </div>

        <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 text-neutral-200" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900">Distribution Hub</h3>
            <p className="text-xs text-neutral-500 mt-1">Road No. 45, Jubilee Hills</p>
          </div>
          <span className="mt-3 text-xs font-bold text-neutral-900">
            Hyderabad - 500033
          </span>
        </div>

        <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-neutral-200" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900">Dispatch Timings</h3>
            <p className="text-xs text-neutral-500 mt-1">Morning: 6:00 AM - 7:30 AM</p>
          </div>
          <span className="mt-3 text-xs font-bold text-neutral-900">
            Evening: 5:00 PM - 7:00 PM
          </span>
        </div>
      </div>

      {/* Contact Form & Office Map/Info Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Send Us a Direct Message</h2>
            <p className="text-xs text-neutral-500 mt-1">
              Fill out this form and our support manager will respond swiftly.
            </p>
          </div>

          {isSent ? (
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-neutral-900 mx-auto" />
              <h3 className="text-base font-bold text-neutral-900">Message Received!</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Thank you for contacting Sumadhura Foods. We will follow up via email or phone shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Rao"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98490 12345"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-semibold mb-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900"
                  >
                    <option>General Product Inquiry</option>
                    <option>Delivery Status / Pincode Check</option>
                    <option>Wholesale / Event Bulk Order</option>
                    <option>Feedback or Suggestion</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-semibold mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist your food order today?"
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:outline-none focus:border-neutral-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info & Socials */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200 space-y-4">
            <h3 className="font-bold text-base text-neutral-900">Headquarters & Kitchens</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Sumadhura Foods Private Limited<br />
              Plot No. 18, Road No. 45, Nandagiri Hills, Jubilee Hills,<br />
              Hyderabad, Telangana - 500033, India.
            </p>

            <div className="pt-2 border-t border-neutral-200 space-y-2 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span className="font-semibold text-neutral-900">Customer Helpline:</span>
                <span>1800-208-7862</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-neutral-900">WhatsApp Support:</span>
                <span>+91 98490 12345</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-neutral-900">FSSAI License:</span>
                <span>10022047000189</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200">
              <span className="text-xs font-bold text-neutral-700 block mb-2">Connect on Social Media</span>
              <div className="flex items-center gap-2.5">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Youtube, label: "YouTube" }
                ].map((s, i) => {
                  const SIcon = s.icon;
                  return (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 rounded-xl bg-white border border-neutral-200 text-neutral-700 hover:text-black hover:border-neutral-900 flex items-center justify-center transition-all shadow-sm"
                      title={s.label}
                    >
                      <SIcon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Clean Quality Stamp */}
          <div className="bg-neutral-900 text-white rounded-3xl p-6 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-neutral-300" />
              <span>Prompt Resolution Guarantee</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every message sent to Sumadhura Foods is tracked by our customer operations lead. We resolve all delivery inquiries within 2 hours.
            </p>
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-neutral-50 rounded-3xl p-6 sm:p-12 border border-neutral-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            Common Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-neutral-900 hover:text-black transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
