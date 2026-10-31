import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Building2,
  ShieldCheck,
  Truck,
  Receipt,
  CreditCard,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Mail,
  BadgeCheck,
  Send,
  Download,
  Users,
  Clock,
  Percent,
  FileSpreadsheet,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const B2BPage = () => {
  const { navigateTo, showToast, setIsAuthModalOpen } = useShop();

  const [activeCatalogCategory, setActiveCatalogCategory] = useState('dairy');
  const [quoteForm, setQuoteForm] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    gstin: '',
    businessType: 'Restaurant & Fine Dining',
    monthlyBudget: '₹50,000 - ₹1,00,000',
    city: 'Bengaluru',
    categories: ['Dairy & Milk', 'Fresh Vegetables'],
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Wholesale Catalog Data
  const wholesaleCategories = [
    { id: 'dairy', name: 'Commercial Dairy & Ghee', icon: '🥛' },
    { id: 'vegetables', name: 'Fresh Farm Vegetables', icon: '🥕' },
    { id: 'staples', name: 'Rice, Dals & Flours', icon: '🌾' },
    { id: 'oils', name: 'Cooking Oils & Tins', icon: '🛢️' },
    { id: 'dryfruits', name: 'Whole Spices & Nuts', icon: '🌰' }
  ];

  const wholesaleProducts = {
    dairy: [
      {
        id: 'b2b-d1',
        name: 'Fresh Cow Milk (Bulk Dispatch)',
        packageSize: '10 Litre / 50 Litre Cans',
        retailPrice: '₹56/L',
        wholesalePrice: '₹46/L',
        minOrder: '20 Litres',
        savings: '18% OFF',
        highlight: 'Tested Daily • 3.8% Fat',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-d2',
        name: 'Heritage Bilona Desi Cow Ghee',
        packageSize: '15 kg Sealed Commercial Tin',
        retailPrice: '₹850/kg',
        wholesalePrice: '₹590/kg',
        minOrder: '1 Tin (15 kg)',
        savings: '30% OFF',
        highlight: '100% Pure • Traditional Aroma',
        image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-d3',
        name: 'Fresh Soft Malai Paneer Blocks',
        packageSize: '5 kg Vacuum Bulk Block',
        retailPrice: '₹380/kg',
        wholesalePrice: '₹285/kg',
        minOrder: '10 kg (2 Blocks)',
        savings: '25% OFF',
        highlight: 'Zero Preservatives • Melt-in-Mouth',
        image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-d4',
        name: 'Commercial Set Curd (Dahi)',
        packageSize: '10 kg Food-Grade Bucket',
        retailPrice: '₹75/kg',
        wholesalePrice: '₹52/kg',
        minOrder: '2 Buckets (20 kg)',
        savings: '31% OFF',
        highlight: 'Thick Consistent Texture for Gravies',
        image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80'
      }
    ],
    vegetables: [
      {
        id: 'b2b-v1',
        name: 'Farm-Direct Red Hybrid Tomatoes',
        packageSize: '25 kg Heavy Duty Crate',
        retailPrice: '₹32/kg',
        wholesalePrice: '₹19/kg',
        minOrder: '2 Crates (50 kg)',
        savings: '40% OFF',
        highlight: 'Firm, Ripe & Graded • Zero Wastage',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-v2',
        name: 'Nashik Red Onions (Hotel Grade)',
        packageSize: '50 kg Jute Gunny Bag',
        retailPrice: '₹38/kg',
        wholesalePrice: '₹24/kg',
        minOrder: '1 Bag (50 kg)',
        savings: '37% OFF',
        highlight: 'Medium-Large Bulbs • Long Shelf Life',
        image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-v3',
        name: 'Agra Jyoti Fresh Table Potatoes',
        packageSize: '50 kg Jute Gunny Bag',
        retailPrice: '₹34/kg',
        wholesalePrice: '₹21/kg',
        minOrder: '1 Bag (50 kg)',
        savings: '38% OFF',
        highlight: 'Washed, Low-Sugar • Ideal for Frying',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-v4',
        name: 'Ginger & Garlic Kitchen Combo',
        packageSize: '10 kg Poly Bags',
        retailPrice: '₹160/kg',
        wholesalePrice: '₹110/kg',
        minOrder: '10 kg',
        savings: '31% OFF',
        highlight: 'High Oil Content • Strong Punch',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'
      }
    ],
    staples: [
      {
        id: 'b2b-s1',
        name: '1121 XXL Aged Biryani Basmati Rice',
        packageSize: '25 kg Non-Woven Bag',
        retailPrice: '₹140/kg',
        wholesalePrice: '₹89/kg',
        minOrder: '2 Bags (50 kg)',
        savings: '36% OFF',
        highlight: '2-Year Aged • Extra Long Grain 8.4mm',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-s2',
        name: 'Kurnool Sona Masoori Raw Rice',
        packageSize: '50 kg Stitched Bag',
        retailPrice: '₹68/kg',
        wholesalePrice: '₹49/kg',
        minOrder: '1 Bag (50 kg)',
        savings: '28% OFF',
        highlight: 'Old Harvest • Non-Sticky Fluffy Grains',
        image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-s3',
        name: 'Guntur Unpolished Toor Dal Bold',
        packageSize: '30 kg Heavy Woven Bag',
        retailPrice: '₹175/kg',
        wholesalePrice: '₹126/kg',
        minOrder: '1 Bag (30 kg)',
        savings: '28% OFF',
        highlight: 'Zero Color Polish • High Protein Yield',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-s4',
        name: 'MP Sharbati Whole Wheat Chakki Atta',
        packageSize: '50 kg Commercial Sack',
        retailPrice: '₹48/kg',
        wholesalePrice: '₹34/kg',
        minOrder: '1 Bag (50 kg)',
        savings: '29% OFF',
        highlight: 'Stone Ground • Super Soft Rotis & Naan',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
      }
    ],
    oils: [
      {
        id: 'b2b-o1',
        name: 'Wood-Churned Cold-Pressed Groundnut Oil',
        packageSize: '15 Litre Commercial Sealed Tin',
        retailPrice: '₹3,200',
        wholesalePrice: '₹2,350',
        minOrder: '2 Tins (30 L)',
        savings: '26% OFF',
        highlight: 'High Smoke Point • Traditional Marachekku',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-o2',
        name: 'Refined Pure Sunflower Oil Tin',
        packageSize: '15 Litre Commercial Tin',
        retailPrice: '₹2,300',
        wholesalePrice: '₹1,740',
        minOrder: '2 Tins (30 L)',
        savings: '24% OFF',
        highlight: 'Fortified with Vit A & D • Neutral Odor',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'
      }
    ],
    dryfruits: [
      {
        id: 'b2b-df1',
        name: 'Whole Premium Cashews W320 Grade',
        packageSize: '10 kg Vacuum Packed Box',
        retailPrice: '₹890/kg',
        wholesalePrice: '₹670/kg',
        minOrder: '1 Box (10 kg)',
        savings: '25% OFF',
        highlight: 'Unbroken Whole White • High Sweetness',
        image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'b2b-df2',
        name: 'Whole Kashmiri Stemless Dried Mirch',
        packageSize: '10 kg Jute Sack',
        retailPrice: '₹420/kg',
        wholesalePrice: '₹280/kg',
        minOrder: '1 Sack (10 kg)',
        savings: '33% OFF',
        highlight: 'Natural Deep Red Gravy Color • Low Heat',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80'
      }
    ]
  };

  const b2bPillars = [
    {
      icon: Clock,
      title: '5:00 AM Direct Kitchen Delivery',
      desc: 'Our cold-chain delivery fleet arrives before your morning prep shifts start. Zero delays guarantee.'
    },
    {
      icon: Percent,
      title: 'Tiered Bulk Wholesale Pricing',
      desc: 'Save 20% to 40% over retail market pricing. Direct farm and mill sourcing without middlemen markups.'
    },
    {
      icon: Receipt,
      title: '100% Compliant GST Tax Invoices',
      desc: 'Download automated monthly GST summary invoices for seamless Input Tax Credit (ITC) claiming.'
    },
    {
      icon: ShieldCheck,
      title: 'FSSAI Tested Pure & Graded',
      desc: 'Daily lab tests for milk purity, adulteration-free spices, and premium-graded vegetables with zero spoilage.'
    },
    {
      icon: CreditCard,
      title: 'Flexible Net 15 / 30 Credit Terms',
      desc: 'Eligible registered corporate businesses can avail convenient credit billing cycles after verification.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Key Account Manager',
      desc: 'A single point of contact on phone & WhatsApp for emergency morning additions and rush dispatches.'
    }
  ];

  const clientTypes = [
    { name: 'Fine Dining & Restaurants', count: '450+ Units', icon: '🍽️' },
    { name: 'Hotels & Banquets', count: '180+ Properties', icon: '🏨' },
    { name: 'Catering Companies', count: '320+ Caterers', icon: '🍲' },
    { name: 'Cloud Kitchens & QSRs', count: '290+ Hubs', icon: '🛵' },
    { name: 'Corporate & Tech Parks', count: '85+ Canteens', icon: '🏢' },
    { name: 'Supermarkets & Retailers', count: '140+ Outlets', icon: '🛒' }
  ];

  const handleCategoryToggle = (cat) => {
    setQuoteForm((prev) => {
      const exists = prev.categories.includes(cat);
      if (exists) {
        return { ...prev, categories: prev.categories.filter((c) => c !== cat) };
      } else {
        return { ...prev, categories: [...prev.categories, cat] };
      }
    });
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteForm.companyName || !quoteForm.phone) {
      showToast('Please provide your business name and phone number.', 'error');
      return;
    }

    setFormSubmitted(true);
    showToast('B2B quotation request submitted! Our corporate desk will call you within 30 minutes.');
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. B2B Hero Banner */}
      <section className="bg-gradient-to-br from-[#3D040A] via-[#5C070F] to-[#7D0A14] text-white py-12 sm:py-20 relative overflow-hidden border-b border-[#8B121C]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-amber-300" />
                <span>Sumadhura for Business • B2B Wholesale Supply</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                Fresh Farm Produce & Pure Dairy for{' '}
                <span className="text-[#F5A623] underline decoration-amber-400/40">
                  Commercial Kitchens
                </span>
              </h1>

              <p className="text-sm sm:text-base text-amber-100/90 max-w-2xl font-normal leading-relaxed">
                Direct-from-source unadulterated milk, Bilona ghee, paneer, handpicked vegetables,
                aged basmati rice & staples delivered at bulk wholesale rates. Certified GST invoices,
                5:00 AM delivery, and net credit terms for Hotels, Caterers & Cloud Kitchens.
              </p>

              {/* Quick Feature Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-xs font-bold text-amber-200">
                <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10">
                  <Truck className="w-4 h-4 text-amber-400" /> 5:00 AM Delivery
                </span>
                <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10">
                  <Receipt className="w-4 h-4 text-emerald-400" /> 100% GST ITC Invoices
                </span>
                <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10">
                  <Percent className="w-4 h-4 text-yellow-400" /> Up to 35% Bulk Discount
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="#b2b-quote"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#F5A623] hover:bg-[#E09215] text-[#3D040A] font-black text-sm shadow-xl active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Request Custom Bulk Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => navigateTo('login')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/30 backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-amber-300" />
                  <span>Business Sign In / Register</span>
                </button>
              </div>
            </div>

            {/* Right Card: Quick B2B Trust Badge */}
            <div className="lg:col-span-5">
              <div className="bg-[#4D060D]/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-400/30 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                      Commercial Desk
                    </span>
                    <h3 className="text-xl font-black text-white">Dedicated B2B Support</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xl">
                    🏢
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>1,200+ Commercial Kitchens</strong> served daily in Bengaluru & Hyderabad.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Minimum Order Value:</strong> Starts at only ₹3,000 for commercial free shipping.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Sample Testing:</strong> Free product samples available for executive chefs.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Net 15 / 30 Terms:</strong> Seamless monthly billing for verified hospitality partners.</span>
                  </div>
                </div>

                {/* Direct Procurement Call Box */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-slate-300">Procurement Hotline</div>
                      <a href="tel:+919845099888" className="text-sm font-black text-white hover:text-amber-300">
                        +91 98450 99888
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919845099888?text=Hello%20Sumadhura%20Foods%20B2B%20Desk,%20I%20am%20interested%20in%20commercial%20wholesale%20supply."
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-md transition-colors"
                  >
                    <span>WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Client Sectors We Power */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold uppercase text-[#7D0A14] tracking-wider">
            Trusted Hospitality Partners
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#3D040A] mt-1">
            Built Specifically for High-Volume Food Businesses
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {clientTypes.map((client, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-[#E8DDCF] shadow-xs text-center space-y-1.5 hover:border-[#7D0A14] hover:shadow-md transition-all group"
            >
              <div className="text-2xl group-hover:scale-110 transition-transform">{client.icon}</div>
              <h3 className="font-extrabold text-xs sm:text-sm text-[#3D040A] leading-tight">
                {client.name}
              </h3>
              <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {client.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Wholesale Catalog Price Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#7D0A14] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Commercial Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3D040A] mt-1">
              Sample B2B Wholesale Price Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Prices update weekly based on wholesale APMC mandi and farm harvest benchmarks. GST additional as applicable.
            </p>
          </div>

          <a
            href="#b2b-quote"
            className="text-xs sm:text-sm font-extrabold text-[#7D0A14] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Need full 400+ SKU price list? Request Quote</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {wholesaleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCatalogCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCatalogCategory === cat.id
                  ? 'bg-[#7D0A14] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-[#E8DDCF] hover:bg-[#FAF5EC]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Wholesale Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(wholesaleProducts[activeCatalogCategory] || []).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DDCF] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#7D0A14] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                    {product.savings}
                  </span>
                  <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    MOQ: {product.minOrder}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                    {product.highlight}
                  </span>
                  <h3 className="font-black text-sm text-[#3D040A] line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium">
                    Packaging: <strong>{product.packageSize}</strong>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 line-through">Retail: {product.retailPrice}</div>
                      <div className="text-base font-black text-[#7D0A14]">
                        {product.wholesalePrice} <span className="text-[10px] text-slate-500 font-semibold">Bulk Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <a
                  href="#b2b-quote"
                  className="w-full py-2.5 rounded-xl bg-[#FAF5EC] hover:bg-[#7D0A14] text-[#7D0A14] hover:text-white border border-[#E8DDCF] hover:border-[#7D0A14] text-xs font-black transition-all flex items-center justify-center gap-1.5 block text-center"
                >
                  <span>Inquire Volume Pricing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Partner With Sumadhura Foods B2B */}
      <section className="bg-gradient-to-b from-white to-[#FAF5EC] py-12 border-y border-[#E8DDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase text-[#7D0A14] tracking-wider">
              The Sumadhura Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3D040A] mt-1">
              Why 1,200+ Head Chefs & Procurement Heads Rely On Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We streamline your back-of-house ingredient supply chain with consistency, purity, and transparent billing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {b2bPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-[#E8DDCF] shadow-xs hover:border-[#7D0A14] hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#7D0A14]/10 text-[#7D0A14] flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-base text-[#3D040A]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Interactive Bulk Quotation & Onboarding Form */}
      <section id="b2b-quote" className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DDCF] shadow-xl space-y-8 relative overflow-hidden">
          <div className="space-y-2 border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              <span>Instant Wholesale Onboarding</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3D040A]">
              Request Custom Bulk Price Quote
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Fill in your commercial requirements below. Our institutional procurement manager will contact you within 30 minutes with customized volume rates and free sample delivery.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-emerald-950">
                Inquiry Received Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                Thank you, <strong>{quoteForm.contactPerson || quoteForm.companyName}</strong>. Our Key Account Manager is reviewing your requirements and will reach you at <strong>{quoteForm.phone}</strong> shortly.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors"
                >
                  Submit Another Inquiry
                </button>
                <a
                  href="https://wa.me/919845099888?text=Hello%20Sumadhura%20B2B%20Desk,%20I%20just%20submitted%20a%20quotation%20request%20on%20the%20website."
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Chat on WhatsApp Directly</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              {/* Row 1: Company Name & Contact Person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-[#3D040A] uppercase tracking-wider mb-1.5">
                    Company / Establishment Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Orchid Hotels / Sri Krishna Grand"
                    value={quoteForm.companyName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#7D0A14] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#3D040A] uppercase tracking-wider mb-1.5">
                    Contact Person & Designation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chef Ramesh / Procurement Head"
                    value={quoteForm.contactPerson}
                    onChange={(e) => setQuoteForm({ ...quoteForm, contactPerson: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#7D0A14] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-[#3D040A] uppercase tracking-wider mb-1.5">
                    Commercial Mobile / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 XXXXX"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#7D0A14] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#3D040A] uppercase tracking-wider mb-1.5">
                    Official Work Email (For Quotations)
                  </label>
                  <input
                    type="email"
                    placeholder="procurement@company.com"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#7D0A14] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Business Type & Monthly Requirement */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-black text-[#3D040A] uppercase tracking-wider mb-1.5">
                    Business Type
                  </label>
                  <select
                    value={quoteForm.businessType}
                    onChange={(e) => setQuoteForm({ ...quoteForm, businessType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#7D0A14] focus:outline-none bg-white font-medium"
                  >
                    <option>Restaurant & Fine Dining</option>
                    <option>Hotel & Banquet Hall</option>
                    <option>Outdoor & Wedding Catering</option>
                    <option>Cloud Kitchen & QSR</option>
                    <option>Corporate Tech Park Canteen</option>
                    <option>Supermarket & Retail Store</option>
                    <option>Hospital / School Cafeteria</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-[#3D040A] uppercase tracking-wider mb-1.5">
                    GSTIN Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="36AABCU9603R1ZM"
                    value={quoteForm.gstin}
                    onChange={(e) => setQuoteForm({ ...quoteForm, gstin: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#7D0A14] focus:outline-none uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-[#3D040A] uppercase tracking-wider mb-1.5">
                    Est. Monthly Purchase Volume
                  </label>
                  <select
                    value={quoteForm.monthlyBudget}
                    onChange={(e) => setQuoteForm({ ...quoteForm, monthlyBudget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#7D0A14] focus:outline-none bg-white font-medium"
                  >
                    <option>₹25,000 - ₹50,000 / month</option>
                    <option>₹50,000 - ₹1,00,000 / month</option>
                    <option>₹1,00,000 - ₹3,00,000 / month</option>
                    <option>₹3,00,000 - ₹5,00,000 / month</option>
                    <option>₹5,00,000+ / month (Enterprise)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Category Multi-Select Checkboxes */}
              <div>
                <label className="block text-xs font-black text-[#3D040A] uppercase tracking-wider mb-2">
                  Select Required Categories (Click to toggle)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Dairy & Milk',
                    'Bilona Desi Ghee',
                    'Fresh Malai Paneer',
                    'Fresh Farm Vegetables',
                    'Aged Basmati Rice',
                    'Sona Masoori Rice',
                    'Pulses & Dals',
                    'Chakki Atta & Flours',
                    'Cold-Pressed Cooking Oils',
                    'Dry Fruits & Spices'
                  ].map((category) => {
                    const isSelected = quoteForm.categories.includes(category);
                    return (
                      <button
                        type="button"
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#7D0A14] text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                        <span>{category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Notes & Submit */}
              <div>
                <label className="block text-xs font-black text-[#3D040A] uppercase tracking-wider mb-1.5">
                  Delivery Location, Delivery Timings or Specific Instructions
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Need morning delivery before 6:00 AM at Indiranagar outlet. Please send samples of Paneer and Biryani Basmati Rice."
                  value={quoteForm.notes}
                  onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-[#7D0A14] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Strict NDA & Data Privacy. No spam, only direct wholesale quotes.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Submit Custom B2B Quote Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 6. Direct Portal Login CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#8B121C]">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-black uppercase">
              <Building2 className="w-3.5 h-3.5" />
              <span>Already a Registered Commercial Partner?</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black">
              Access Your B2B Enterprise Portal
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
              Log in to view contracted rates, download GST invoices, repeat recurring daily supply schedules, and manage branch deliveries.
            </p>
          </div>

          <button
            onClick={() => navigateTo('login')}
            className="px-8 py-3.5 rounded-2xl bg-[#F5A623] hover:bg-[#E09215] text-[#3D040A] font-black text-sm shadow-lg active:scale-95 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>Launch B2B Portal Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

