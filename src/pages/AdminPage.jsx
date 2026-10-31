import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Building2,
  User,
  ShoppingBag,
  TrendingUp,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Search,
  Filter,
  ArrowRight,
  Download,
  Plus,
  RefreshCw,
  Eye,
  X,
  Printer,
  ChevronDown,
  DollarSign,
  Package,
  Calendar,
  Layers,
  Sparkles,
  PhoneCall,
  Mail,
  ShieldCheck,
  Check,
  Percent,
  HelpCircle,
  Receipt,
  Store
} from 'lucide-react';

export const AdminPage = () => {
  const { navigateTo, showToast } = useShop();

  // Mode: 'unified' | 'b2c' | 'b2b'
  const [adminMode, setAdminMode] = useState('unified');
  // Tabs: 'overview' | 'orders' | 'subscriptions' | 'b2b-quotes' | 'inventory' | 'invoices'
  const [activeTab, setActiveTab] = useState('overview');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Selected invoice for Modal viewing
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // -------------------------------------------------------------------
  // INITIAL DEMO DATA (B2C & B2B)
  // -------------------------------------------------------------------
  const [orders, setOrders] = useState([
    {
      id: 'SMD-9402',
      type: 'b2c',
      customer: 'Priya Sharma',
      contact: '+91 98450 12345',
      address: 'Sobha Dream Acres, Tower 4, Indiranagar, Bengaluru',
      items: [
        { name: 'Nandini Farm Fresh Cow Milk (500ml)', qty: 4, price: 112 },
        { name: 'Farm Fresh Hybrid Tomatoes (1kg)', qty: 1, price: 32 },
        { name: 'Fresh Malai Paneer (200g)', qty: 1, price: 140 }
      ],
      total: 284,
      status: 'Packing',
      paymentMethod: 'UPI • Paid',
      timestamp: '10 mins ago',
      deliverySlot: 'Express 10-15 Mins'
    },
    {
      id: 'B2B-8041',
      type: 'b2b',
      customer: 'Sri Krishna Grand Hotels & Banquets',
      contact: 'K. S. Narayana (Procurement Head) • +91 98450 99888',
      gstin: '36AABCU9603R1ZM',
      address: 'Central Kitchen Hub, Outer Ring Road, Bengaluru',
      items: [
        { name: 'Heritage Bilona Desi Cow Ghee (15kg Commercial Tin)', qty: 2, price: 17700 },
        { name: 'Fresh Malai Paneer Blocks (5kg Vacuum Pack)', qty: 5, price: 7125 },
        { name: 'Nashik Red Onions (50kg Gunny Bag)', qty: 4, price: 4800 },
        { name: 'Farm Fresh Tomatoes (25kg Crate)', qty: 4, price: 1900 }
      ],
      total: 31525,
      status: 'Dispatched',
      paymentMethod: 'Net 15 Credit Account',
      timestamp: '45 mins ago',
      deliverySlot: '5:00 AM Kitchen Loading Bay'
    },
    {
      id: 'SMD-9401',
      type: 'b2c',
      customer: 'Vikram Reddy',
      contact: '+91 98450 67890',
      address: 'Prestige Lakeside Habitat, Flat 1204, Whitefield',
      items: [
        { name: 'A2 Desi Cow Milk Glass Bottle (1L)', qty: 2, price: 196 },
        { name: 'Cold-Pressed Groundnut Oil (1L)', qty: 1, price: 290 },
        { name: 'Fresh Palak Spinach (250g)', qty: 2, price: 48 }
      ],
      total: 534,
      status: 'Dispatched',
      paymentMethod: 'Credit Card • Paid',
      timestamp: '18 mins ago',
      deliverySlot: 'Express 10-15 Mins'
    },
    {
      id: 'B2B-8038',
      type: 'b2b',
      customer: 'Spice Valley Cloud Kitchens (4 Hubs)',
      contact: 'Chef Anand Murthy • +91 98450 33445',
      gstin: '29AAGCS4810P1Z4',
      address: 'Koramangala Commercial Commissary, Bengaluru',
      items: [
        { name: '1121 XXL Aged Biryani Basmati Rice (25kg Bag)', qty: 4, price: 8900 },
        { name: 'Wood-Churned Groundnut Oil (15L Commercial Tin)', qty: 2, price: 4700 },
        { name: 'Whole Kashmiri Stemless Chillies (10kg Sack)', qty: 1, price: 2800 }
      ],
      total: 16400,
      status: 'Packing',
      paymentMethod: 'Bank NEFT • Paid',
      timestamp: '1 hour ago',
      deliverySlot: '5:00 AM Morning Dispatch'
    },
    {
      id: 'SMD-9398',
      type: 'b2c',
      customer: 'Ananya Rao',
      contact: '+91 98450 88221',
      address: 'Sector 2, HSR Layout, Bengaluru',
      items: [
        { name: 'Sona Masoori Raw Rice (5kg Bag)', qty: 1, price: 340 },
        { name: 'Guntur Unpolished Toor Dal (1kg)', qty: 2, price: 350 },
        { name: 'A2 Bilona Cow Ghee (500ml Jar)', qty: 1, price: 540 }
      ],
      total: 1230,
      status: 'Delivered',
      paymentMethod: 'UPI • Paid',
      timestamp: '2 hours ago',
      deliverySlot: 'Delivered in 12 mins'
    },
    {
      id: 'B2B-8035',
      type: 'b2b',
      customer: 'Royal Orchid Suites & Convention Centre',
      contact: 'C. P. Varma (General Manager) • +91 98450 77112',
      gstin: '36AAACR9214L1Z2',
      address: 'Convention Center Dock 2, Airport Road, Bengaluru',
      items: [
        { name: 'Pure Farm Cow Milk (50L Food-Grade Can)', qty: 2, price: 4600 },
        { name: 'Commercial Set Curd (10kg Bucket)', qty: 4, price: 2080 },
        { name: 'MP Sharbati Chakki Atta (50kg Commercial Sack)', qty: 4, price: 6800 }
      ],
      total: 13480,
      status: 'Delivered',
      paymentMethod: 'Net 30 Credit (Due in 18 Days)',
      timestamp: 'Today 5:15 AM',
      deliverySlot: 'Delivered at 5:08 AM'
    }
  ]);

  // Daily Morning Subscriptions (B2C)
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 'SUB-101',
      customer: 'Rajesh Sharma',
      phone: '+91 98450 12345',
      apartment: 'Mantri Espana, Apt 402, Outer Ring Road',
      items: 'Nandini Cow Milk 1L Daily + Bread (Alt days)',
      slot: '6:00 AM - 6:30 AM',
      frequency: 'Every Morning',
      status: 'Active',
      since: '14 Jan 2026'
    },
    {
      id: 'SUB-102',
      customer: 'Sunita Venkatesh',
      phone: '+91 98450 22334',
      apartment: 'Prestige Falcon City, Tower 6, Apt 1102',
      items: 'Pure A2 Gir Cow Milk 1.5L + Farm Fresh Curd 500g',
      slot: '6:30 AM - 7:00 AM',
      frequency: 'Every Morning',
      status: 'Active',
      since: '02 Feb 2026'
    },
    {
      id: 'SUB-103',
      customer: 'Karthik Balan',
      phone: '+91 98450 44556',
      apartment: 'Brigade Metropolis, Arcade 3, Apt 501',
      items: 'Nandini Toned Milk 2L + Weekly Vegetable Basket',
      slot: '6:00 AM - 6:30 AM',
      frequency: 'Every Morning',
      status: 'Paused',
      since: '18 Nov 2025'
    },
    {
      id: 'SUB-104',
      customer: 'Deepa Kulkarni',
      phone: '+91 98450 66778',
      apartment: 'Adarsh Palm Meadows, Villa 42',
      items: 'A2 Cow Milk 2L + Farm Eggs (12 pcs Mon/Thu)',
      slot: '7:00 AM - 7:30 AM',
      frequency: 'Every Morning',
      status: 'Active',
      since: '28 Dec 2025'
    }
  ]);

  // B2B Wholesale Inquiries & RFPs
  const [b2bQuotes, setB2bQuotes] = useState([
    {
      id: 'QT-409',
      company: 'Grand Orchid Banquets & Events',
      contactPerson: 'Chef Ramesh (Executive Head Chef)',
      phone: '+91 98450 11990',
      email: 'ramesh@grandochidevents.com',
      businessType: 'Banquet & Wedding Catering',
      monthlyVolume: '₹1,50,000 - ₹3,00,000 / month',
      categories: ['Bilona Desi Ghee', 'Fresh Malai Paneer', '1121 Biryani Basmati'],
      notes: 'Need 40kg Malai Paneer and 30L Desi Ghee every Friday morning. Please dispatch trial sample.',
      status: 'New Inquiry',
      date: 'Today, 2:30 PM'
    },
    {
      id: 'QT-408',
      company: 'Silicon Tech Park Central Cafeteria',
      contactPerson: 'Murthy K. (Facility Procurement)',
      phone: '+91 98450 88334',
      email: 'facilities@silicontechpark.com',
      businessType: 'Corporate Tech Park Canteen',
      monthlyVolume: '₹3,00,000 - ₹5,00,000 / month',
      categories: ['Daily Milk Cans', 'Fresh Farm Vegetables', 'Cooking Oils'],
      notes: 'Requires 200 Litres milk delivered daily before 5:30 AM across 3 cafeteria stations.',
      status: 'Quote Sent',
      date: 'Yesterday'
    },
    {
      id: 'QT-407',
      company: 'Coastal Curry & Biryani Kitchens',
      contactPerson: 'Anand Rao (Managing Partner)',
      phone: '+91 98450 55112',
      email: 'anand@coastalcurry.in',
      businessType: 'Cloud Kitchen & QSR Chain',
      monthlyVolume: '₹50,000 - ₹1,00,000 / month',
      categories: ['Cold-Pressed Groundnut Oil', 'Whole Spices', 'Toor Dal'],
      notes: 'Approved contracted wholesale rate for 15L oil tins. Awaiting final KYC & GST verification.',
      status: 'Contract Approved',
      date: '28 Oct 2026'
    }
  ]);

  // Product Inventory (Retail vs Wholesale Price Manager)
  const [inventoryList, setInventoryList] = useState([
    {
      id: 'p-1',
      name: 'Nandini Farm Fresh Cow Milk',
      category: 'Dairy',
      stock: '240 Litres',
      retailPrice: 56,
      retailUnit: 'Per Litre',
      wholesalePrice: 46,
      wholesaleUnit: 'Per Litre (Min 20L)',
      moq: '20L',
      inStock: true
    },
    {
      id: 'p-2',
      name: 'Heritage Bilona Desi Cow Ghee',
      category: 'Dairy',
      stock: '18 Commercial Tins',
      retailPrice: 850,
      retailUnit: 'Per kg',
      wholesalePrice: 590,
      wholesaleUnit: 'Per kg (15kg Tin)',
      moq: '15kg Tin',
      inStock: true
    },
    {
      id: 'p-3',
      name: 'Fresh Farm Malai Paneer',
      category: 'Dairy',
      stock: '65 kg',
      retailPrice: 380,
      retailUnit: 'Per kg',
      wholesalePrice: 285,
      wholesaleUnit: 'Per kg (5kg Block)',
      moq: '10kg',
      inStock: true
    },
    {
      id: 'p-4',
      name: 'Nashik Red Onions (Hotel Grade)',
      category: 'Vegetables',
      stock: '28 Gunny Bags (1,400 kg)',
      retailPrice: 38,
      retailUnit: 'Per kg',
      wholesalePrice: 24,
      wholesaleUnit: 'Per kg (50kg Bag)',
      moq: '50kg Bag',
      inStock: true
    },
    {
      id: 'p-5',
      name: 'Farm-Direct Hybrid Tomatoes',
      category: 'Vegetables',
      stock: '16 Crates (400 kg)',
      retailPrice: 32,
      retailUnit: 'Per kg',
      wholesalePrice: 19,
      wholesaleUnit: 'Per kg (25kg Crate)',
      moq: '25kg Crate',
      inStock: true
    },
    {
      id: 'p-6',
      name: '1121 XXL Aged Biryani Basmati',
      category: 'Staples',
      stock: '42 Bags (1,050 kg)',
      retailPrice: 140,
      retailUnit: 'Per kg',
      wholesalePrice: 89,
      wholesaleUnit: 'Per kg (25kg Bag)',
      moq: '50kg',
      inStock: true
    }
  ]);

  // B2B GST Tax Invoices
  const invoices = [
    {
      invoiceNo: 'INV-2026-118',
      date: '31 Oct 2026',
      client: 'Sri Krishna Grand Hotels & Banquets',
      gstin: '36AABCU9603R1ZM',
      orderId: 'B2B-8041',
      taxableAmount: 30023.81,
      cgst: 750.60,
      sgst: 750.60,
      totalAmount: 31525.00,
      status: 'Paid',
      dueDate: '15 Nov 2026 (Net 15)'
    },
    {
      invoiceNo: 'INV-2026-117',
      date: '31 Oct 2026',
      client: 'Spice Valley Cloud Kitchens',
      gstin: '29AAGCS4810P1Z4',
      orderId: 'B2B-8038',
      taxableAmount: 15619.05,
      cgst: 390.48,
      sgst: 390.48,
      totalAmount: 16400.00,
      status: 'Paid',
      dueDate: 'Paid via NEFT'
    },
    {
      invoiceNo: 'INV-2026-114',
      date: '28 Oct 2026',
      client: 'Royal Orchid Convention & Suites',
      gstin: '36AAACR9214L1Z2',
      orderId: 'B2B-8035',
      taxableAmount: 12838.10,
      cgst: 320.95,
      sgst: 320.95,
      totalAmount: 13480.00,
      status: 'Payment Due',
      dueDate: '27 Nov 2026 (Net 30)'
    }
  ];

  // -------------------------------------------------------------------
  // INTERACTIVE DEMO SIMULATORS
  // -------------------------------------------------------------------
  const simulateNewB2COrder = () => {
    const newId = `SMD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newId,
      type: 'b2c',
      customer: 'Deepak Verma',
      contact: '+91 98450 77665',
      address: 'Purva Palm Beach, Tower 3, Hennur Road',
      items: [
        { name: 'Nandini Cow Milk (1L)', qty: 2, price: 56 },
        { name: 'Farm Fresh Tomatoes (1kg)', qty: 1, price: 32 },
        { name: 'Fresh Coriander Bunch', qty: 1, price: 15 }
      ],
      total: 159,
      status: 'Packing',
      paymentMethod: 'UPI • Paid',
      timestamp: 'Just now',
      deliverySlot: 'Express 10-15 Mins'
    };

    setOrders([newOrder, ...orders]);
    showToast(`🔔 New B2C Order ${newId} received! (₹159 • Express Dispatch)`);
  };

  const simulateNewB2BQuote = () => {
    const newId = `QT-${Math.floor(500 + Math.random() * 500)}`;
    const newQuote = {
      id: newId,
      company: 'The Heritage Residency & Banquets',
      contactPerson: 'Chef Vinay Kumar (Executive Chef)',
      phone: '+91 98450 44991',
      email: 'chefvinay@heritageresidency.com',
      businessType: 'Hotel & Banquet Hall',
      monthlyVolume: '₹2,00,000+ / month',
      categories: ['Bilona Desi Ghee', 'Fresh Malai Paneer', 'Aged Basmati Rice'],
      notes: 'Need daily 5:00 AM delivery. Requesting contract rates for 15kg Ghee tins and 10kg Paneer blocks.',
      status: 'New Inquiry',
      date: 'Just now'
    };

    setB2bQuotes([newQuote, ...b2bQuotes]);
    showToast(`🏢 New B2B Wholesale Inquiry ${newId} from The Heritage Residency!`);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} status updated to "${newStatus}"`);
  };

  const toggleSubscriptionStatus = (subId) => {
    setSubscriptions(
      subscriptions.map((s) => {
        if (s.id === subId) {
          const next = s.status === 'Active' ? 'Paused' : 'Active';
          showToast(`Subscription ${subId} is now ${next}`);
          return { ...s, status: next };
        }
        return s;
      })
    );
  };

  const updateQuoteStatus = (quoteId, nextStatus) => {
    setB2bQuotes(
      b2bQuotes.map((q) => (q.id === quoteId ? { ...q, status: nextStatus } : q))
    );
    showToast(`B2B Inquiry ${quoteId} updated to "${nextStatus}"`);
  };

  const toggleInventoryStock = (prodId) => {
    setInventoryList(
      inventoryList.map((p) => {
        if (p.id === prodId) {
          const updated = !p.inStock;
          showToast(`${p.name} marked as ${updated ? 'In Stock' : 'Out of Stock'}`);
          return { ...p, inStock: updated };
        }
        return p;
      })
    );
  };

  // -------------------------------------------------------------------
  // FILTERING LOGIC
  // -------------------------------------------------------------------
  const filteredOrders = orders.filter((o) => {
    // Mode Filter
    if (adminMode === 'b2c' && o.type !== 'b2c') return false;
    if (adminMode === 'b2b' && o.type !== 'b2b') return false;

    // Status Filter
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate Aggregates
  const b2cOrdersCount = orders.filter((o) => o.type === 'b2c').length;
  const b2bOrdersCount = orders.filter((o) => o.type === 'b2b').length;
  const b2cRevenue = orders
    .filter((o) => o.type === 'b2c')
    .reduce((sum, o) => sum + o.total, 0);
  const b2bRevenue = orders
    .filter((o) => o.type === 'b2b')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="bg-[#FAF5EC] min-h-screen pb-16">
      {/* 1. Admin Top Brand Bar */}
      <div className="bg-[#3D040A] text-white border-b border-[#52060E] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-[#3D040A] font-black flex items-center justify-center shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-sm sm:text-base tracking-tight text-white">
                  Sumadhura Command Center
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-400/30">
                  LIVE DEMO
                </span>
              </div>
              <p className="text-[10px] text-amber-200/80">
                Unified Operations for B2C Retail & B2B Wholesale
              </p>
            </div>
          </div>

          {/* Quick Simulation Trigger Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={simulateNewB2COrder}
              className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[11px] flex items-center gap-1 shadow-sm active:scale-95 transition-all"
              title="Simulate incoming retail app customer order"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Simulate B2C Order</span>
            </button>
            <button
              onClick={simulateNewB2BQuote}
              className="px-2.5 py-1.5 rounded-xl bg-[#F5A623] hover:bg-[#E09215] text-[#3D040A] font-black text-[11px] flex items-center gap-1 shadow-sm active:scale-95 transition-all"
              title="Simulate incoming wholesale hotel quote"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>+ Simulate B2B RFP</span>
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition-colors"
            >
              Exit to Store
            </button>
          </div>
        </div>

        {/* 2. Dual-Mode Switcher Bar (Unified vs B2C vs B2B) */}
        <div className="bg-[#4D060D] border-t border-white/10 px-4 sm:px-6 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            {/* Mode Switcher Pills */}
            <div className="inline-flex bg-black/40 p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => setAdminMode('unified')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  adminMode === 'unified'
                    ? 'bg-amber-400 text-[#3D040A] shadow-md'
                    : 'text-amber-100 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Unified View</span>
              </button>

              <button
                onClick={() => setAdminMode('b2c')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  adminMode === 'b2c'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-amber-100 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>B2C Retail Operations</span>
              </button>

              <button
                onClick={() => setAdminMode('b2b')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  adminMode === 'b2b'
                    ? 'bg-[#7D0A14] text-white ring-1 ring-amber-400/50 shadow-md'
                    : 'text-amber-100 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>B2B Wholesale & Supply</span>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar text-xs">
              {[
                { id: 'overview', label: '📊 Dashboard' },
                { id: 'orders', label: `📦 Orders (${orders.length})` },
                { id: 'subscriptions', label: `🥛 Subscriptions (${subscriptions.length})` },
                { id: 'b2b-quotes', label: `🏢 Wholesale Quotes (${b2bQuotes.length})` },
                { id: 'inventory', label: '🏷️ Pricing & Stock' },
                { id: 'invoices', label: '🧾 GST Invoices' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-[#3D040A] shadow-sm font-black'
                      : 'text-amber-100/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ========================================================= */}
        {/* TAB 1: DASHBOARD OVERVIEW                                 */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* B2C Retail Today */}
              <div className="bg-white p-5 rounded-3xl border border-[#EDE1D1] shadow-xs space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Today's B2C Retail</span>
                  <span className="p-1.5 rounded-xl bg-blue-50 text-blue-600">
                    <User className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-2xl font-black text-[#3D040A]">
                  ₹{b2cRevenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{b2cOrdersCount} orders • 11.2m avg delivery</span>
                </div>
              </div>

              {/* B2B Wholesale Volume */}
              <div className="bg-white p-5 rounded-3xl border border-[#EDE1D1] shadow-xs space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>B2B Wholesale Dispatched</span>
                  <span className="p-1.5 rounded-xl bg-amber-50 text-amber-700">
                    <Building2 className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-2xl font-black text-[#7D0A14]">
                  ₹{b2bRevenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{b2bOrdersCount} bulk commercial shipments</span>
                </div>
              </div>

              {/* Active Morning Subscriptions */}
              <div className="bg-white p-5 rounded-3xl border border-[#EDE1D1] shadow-xs space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Morning Milk Subscribers</span>
                  <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700">
                    <Clock className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-2xl font-black text-[#3D040A]">
                  520 <span className="text-xs text-slate-400 font-normal">Homes</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Delivered 6:00 AM daily • 100% On Time
                </div>
              </div>

              {/* Total Pending B2B RFPs */}
              <div className="bg-white p-5 rounded-3xl border border-[#EDE1D1] shadow-xs space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Wholesale RFPs & Quotes</span>
                  <span className="p-1.5 rounded-xl bg-purple-50 text-purple-700">
                    <FileText className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-2xl font-black text-[#3D040A]">
                  {b2bQuotes.length} <span className="text-xs text-slate-400 font-normal">Hotels</span>
                </div>
                <div className="text-[11px] text-amber-600 font-bold">
                  Est. ₹5.8 Lakhs pipeline value
                </div>
              </div>
            </div>

            {/* Live Operational Dispatch Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Live Orders Stream */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-base text-[#3D040A]">Live Dispatch Activity</h3>
                    <p className="text-xs text-slate-500">Real-time status of retail deliveries & bulk morning shipments</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>View all orders</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs flex-shrink-0 ${
                            order.type === 'b2b'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-blue-100 text-blue-900 border border-blue-200'
                          }`}
                        >
                          {order.type === 'b2b' ? 'B2B' : 'B2C'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900">{order.id}</span>
                            <span className="text-xs text-slate-500">• {order.customer}</span>
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1">
                            {order.items.map((i) => `${i.name} (x${i.qty})`).join(', ')}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {order.deliverySlot} • {order.timestamp}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
                        <span className="font-black text-sm text-[#3D040A]">₹{order.total.toLocaleString()}</span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'Dispatched'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 1 Col: Quick Wholesale Actions & Cold Chain Stats */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-[#4A060C] to-[#7D0A14] text-white p-6 rounded-3xl shadow-md border border-[#8B121C] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-amber-300">Warehouse Cold-Chain</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white">3.8°C</div>
                    <p className="text-xs text-amber-100/80">Optimal dairy storage temperature</p>
                  </div>
                  <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-amber-200/80">Milk Tanker 1:</span>
                      <strong className="text-white">100% Tested Pure</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-200/80">Vegetable Mandi Arrival:</span>
                      <strong className="text-white">4:15 AM Handpicked</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-200/80">On-Time Dispatch Rate:</span>
                      <strong className="text-emerald-300">99.4%</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#EDE1D1] shadow-xs space-y-3">
                  <h4 className="font-extrabold text-xs text-[#3D040A] uppercase tracking-wider">
                    Quick Operations Shortcuts
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setActiveTab('b2b-quotes')}
                      className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-[#7D0A14] text-left transition-colors flex flex-col justify-between"
                    >
                      <Building2 className="w-4 h-4 mb-1" />
                      <span>Review Wholesale RFPs</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('subscriptions')}
                      className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-slate-800 text-left transition-colors flex flex-col justify-between"
                    >
                      <Clock className="w-4 h-4 mb-1 text-emerald-600" />
                      <span>Milk Run-Sheet</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('invoices')}
                      className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-slate-800 text-left transition-colors flex flex-col justify-between"
                    >
                      <Receipt className="w-4 h-4 mb-1 text-blue-600" />
                      <span>Download GST Invoices</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('inventory')}
                      className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-slate-800 text-left transition-colors flex flex-col justify-between"
                    >
                      <Percent className="w-4 h-4 mb-1 text-amber-600" />
                      <span>Wholesale Pricing</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ORDER MANAGEMENT (B2C & B2B)                       */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-300">
            {/* Header, Search & Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-[#3D040A]">Order Management Console</h3>
                <p className="text-xs text-slate-500">Live order fulfillment for B2C retail & B2B wholesale dispatches</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search order ID, hotel or client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7D0A14] w-48 sm:w-60"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Packing">Packing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FAF5EC] text-slate-600 font-extrabold border-b border-[#EDE1D1]">
                    <th className="p-3 rounded-l-xl">Order ID & Type</th>
                    <th className="p-3">Customer / Enterprise</th>
                    <th className="p-3">Items & Packaging</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 rounded-r-xl text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* ID & Type */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                              order.type === 'b2b'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {order.type === 'b2b' ? 'B2B Wholesale' : 'B2C Retail'}
                          </span>
                        </div>
                        <div className="font-extrabold text-slate-900 mt-1">{order.id}</div>
                        <div className="text-[10px] text-slate-400">{order.timestamp}</div>
                      </td>

                      {/* Customer / Hotel */}
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{order.customer}</div>
                        {order.gstin && (
                          <div className="text-[10px] text-amber-700 font-mono font-bold">
                            GSTIN: {order.gstin}
                          </div>
                        )}
                        <div className="text-[10px] text-slate-500 line-clamp-1">{order.contact}</div>
                      </td>

                      {/* Items */}
                      <td className="p-3 max-w-xs">
                        <div className="space-y-0.5">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-[11px] text-slate-700">
                              <span className="font-bold">{item.qty}x</span> {item.name}
                            </div>
                          ))}
                        </div>
                        <div className="text-[10px] text-blue-600 font-bold mt-1">
                          Slot: {order.deliverySlot}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="p-3">
                        <div className="font-black text-sm text-[#7D0A14]">
                          ₹{order.total.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-emerald-600 font-bold">
                          {order.paymentMethod}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-3">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : order.status === 'Dispatched'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {order.status === 'Packing' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'Dispatched')}
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black shadow-xs"
                            >
                              Dispatch
                            </button>
                          )}
                          {order.status === 'Dispatched' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'Delivered')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black shadow-xs"
                            >
                              Mark Delivered
                            </button>
                          )}
                          {order.type === 'b2b' && (
                            <button
                              onClick={() => {
                                const found = invoices.find((inv) => inv.orderId === order.id);
                                if (found) setSelectedInvoice(found);
                                else {
                                  setSelectedInvoice({
                                    invoiceNo: `INV-${order.id}`,
                                    date: 'Today',
                                    client: order.customer,
                                    gstin: order.gstin || '36AABCU9603R1ZM',
                                    orderId: order.id,
                                    taxableAmount: (order.total * 0.952).toFixed(2),
                                    cgst: (order.total * 0.024).toFixed(2),
                                    sgst: (order.total * 0.024).toFixed(2),
                                    totalAmount: order.total,
                                    status: 'Generated',
                                    dueDate: 'Net 15 Days'
                                  });
                                }
                              }}
                              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold"
                              title="Print GST Invoice"
                            >
                              <FileText className="w-3.5 h-3.5 inline mr-1" />
                              Invoice
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: DAILY MORNING SUBSCRIPTIONS (B2C)                  */}
        {/* ========================================================= */}
        {activeTab === 'subscriptions' && (
          <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-[#3D040A]">
                  Morning Milk & Veggie Subscriptions (B2C)
                </h3>
                <p className="text-xs text-slate-500">
                  Automated doorstep delivery before 7:00 AM every single morning.
                </p>
              </div>

              <button
                onClick={() => {
                  window.print();
                  showToast('Preparing printable morning delivery run-sheet...');
                }}
                className="px-4 py-2 rounded-xl bg-[#7D0A14] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
              >
                <Printer className="w-3.5 h-3.5 text-amber-300" />
                <span>Print Route Run-Sheet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-[#FAF5EC] p-4 sm:p-5 rounded-2xl border border-[#EDE1D1] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-[#7D0A14]">{sub.id}</span>
                      <span className="font-extrabold text-sm text-slate-900">{sub.customer}</span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        sub.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div>
                      <strong>Items:</strong> {sub.items}
                    </div>
                    <div>
                      <strong>Address:</strong> {sub.apartment}
                    </div>
                    <div>
                      <strong>Delivery Window:</strong> {sub.slot} ({sub.frequency})
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Subscribed Since: {sub.since} • Phone: {sub.phone}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E0D4C3] flex items-center justify-between">
                    <button
                      onClick={() => toggleSubscriptionStatus(sub.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                        sub.status === 'Active'
                          ? 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {sub.status === 'Active' ? 'Pause Daily Dispatch' : 'Resume Daily Dispatch'}
                    </button>

                    <button
                      onClick={() => showToast(`SMS dispatch reminder sent to ${sub.customer}`)}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Send SMS Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: B2B COMMERCIAL QUOTES & RFPs                       */}
        {/* ========================================================= */}
        {activeTab === 'b2b-quotes' && (
          <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-[#3D040A]">
                  B2B Wholesale Quotes & RFP Inquiries
                </h3>
                <p className="text-xs text-slate-500">
                  Manage bulk price requests from Hotels, Cloud Kitchens, Caterers & Canteens
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                <Building2 className="w-4 h-4 text-amber-700" />
                <span>{b2bQuotes.length} Commercial Leads Active</span>
              </div>
            </div>

            <div className="space-y-4">
              {b2bQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#7D0A14] transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-xs text-[#7D0A14] bg-amber-50 px-2 py-0.5 rounded">
                          {quote.id}
                        </span>
                        <h4 className="font-black text-base text-slate-900">{quote.company}</h4>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {quote.contactPerson} • {quote.businessType}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black ${
                          quote.status === 'Contract Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : quote.status === 'Quote Sent'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {quote.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">
                        Estimated Volume
                      </span>
                      <strong className="text-slate-800">{quote.monthlyVolume}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">
                        Contact Info
                      </span>
                      <div className="text-slate-700">{quote.phone}</div>
                      <div className="text-slate-500 text-[11px]">{quote.email}</div>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold uppercase text-[10px] block">
                        Requested Categories
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {quote.categories.map((c, i) => (
                          <span
                            key={i}
                            className="bg-[#FAF5EC] text-[#7D0A14] px-2 py-0.5 rounded text-[10px] font-bold"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {quote.notes && (
                    <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 italic border border-slate-100">
                      "{quote.notes}"
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">Received {quote.date}</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${quote.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                          quote.contactPerson
                        )},%20this%20is%20Sumadhura%20Foods%20B2B%20Procurement%20Desk.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                      >
                        <span>WhatsApp Quote</span>
                      </a>
                      {quote.status === 'New Inquiry' && (
                        <button
                          onClick={() => updateQuoteStatus(quote.id, 'Quote Sent')}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                        >
                          Mark Quote Sent
                        </button>
                      )}
                      {quote.status === 'Quote Sent' && (
                        <button
                          onClick={() => updateQuoteStatus(quote.id, 'Contract Approved')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
                        >
                          Approve Wholesale Contract
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: INVENTORY & PRICING (RETAIL vs WHOLESALE)          */}
        {/* ========================================================= */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-[#3D040A]">
                  Dual-Tier Pricing & Inventory Management
                </h3>
                <p className="text-xs text-slate-500">
                  Side-by-side management of B2C Retail & B2B Wholesale price tiers and stock
                </p>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Showing {inventoryList.length} Core Essential SKUs
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FAF5EC] text-slate-600 font-extrabold border-b border-[#EDE1D1]">
                    <th className="p-3 rounded-l-xl">Product & Category</th>
                    <th className="p-3">Current Stock</th>
                    <th className="p-3">B2C Retail Price</th>
                    <th className="p-3">B2B Wholesale Price</th>
                    <th className="p-3">Wholesale MOQ</th>
                    <th className="p-3 rounded-r-xl text-right">Stock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {inventoryList.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{prod.name}</div>
                        <span className="text-[10px] text-slate-400">{prod.category}</span>
                      </td>
                      <td className="p-3 font-bold text-slate-800">{prod.stock}</td>
                      <td className="p-3">
                        <div className="font-extrabold text-blue-700">₹{prod.retailPrice}</div>
                        <div className="text-[10px] text-slate-400">{prod.retailUnit}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-extrabold text-[#7D0A14]">₹{prod.wholesalePrice}</div>
                        <div className="text-[10px] text-slate-500">{prod.wholesaleUnit}</div>
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-700">{prod.moq}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => toggleInventoryStock(prod.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black transition-colors ${
                            prod.inStock
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-rose-100 hover:text-rose-800'
                              : 'bg-rose-100 text-rose-800 hover:bg-emerald-100 hover:text-emerald-800'
                          }`}
                        >
                          {prod.inStock ? 'In Stock (Active)' : 'Out of Stock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: B2B GST TAX INVOICES & BILLING                     */}
        {/* ========================================================= */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-[#3D040A]">
                  B2B Official GST Tax Invoices
                </h3>
                <p className="text-xs text-slate-500">
                  Government compliant tax invoices for commercial client Input Tax Credit (ITC)
                </p>
              </div>

              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                All Invoices 100% ITC Eligible
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <div
                  key={inv.invoiceNo}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-[#7D0A14]">
                        {inv.invoiceNo}
                      </span>
                      <span className="text-xs text-slate-400">• {inv.date}</span>
                    </div>
                    <div className="font-extrabold text-sm text-slate-900">{inv.client}</div>
                    <div className="text-xs text-amber-800 font-mono">
                      GSTIN: <strong>{inv.gstin}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Taxable: ₹{inv.taxableAmount.toLocaleString()}</div>
                      <div className="font-black text-base text-[#3D040A]">
                        ₹{inv.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">CGST + SGST: ₹{(inv.cgst * 2).toFixed(2)}</div>
                    </div>

                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3.5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-300" />
                      <span>View & Print</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* GST INVOICE MODAL (PRINTABLE LAYOUT)                          */}
      {/* ------------------------------------------------------------- */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#7D0A14]" />
                <h3 className="font-black text-base text-slate-900">
                  Official GST Tax Invoice ({selectedInvoice.invoiceNo})
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Invoice Sheet */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4 text-xs font-sans bg-white">
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-black text-base text-[#7D0A14]">SUMADHURA FOODS PRIVATE LIMITED</h4>
                  <p className="text-slate-500 text-[11px]">
                    Plot 14, Food Tech Corridor, Outer Ring Road, Bengaluru - 560103
                  </p>
                  <p className="text-slate-700 font-mono font-bold text-[11px]">
                    GSTIN: 29AAACS8910P1Z8 • FSSAI: 11223334000122
                  </p>
                </div>
                <div className="text-right">
                  <span className="bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded text-[10px]">
                    ORIGINAL FOR RECIPIENT
                  </span>
                  <div className="font-mono font-bold mt-1 text-slate-800">{selectedInvoice.invoiceNo}</div>
                  <div className="text-slate-400 text-[10px]">{selectedInvoice.date}</div>
                </div>
              </div>

              {/* Billed To */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px]">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Billed To (Client):</span>
                  <strong className="text-slate-900 text-xs block">{selectedInvoice.client}</strong>
                  <span className="font-mono font-bold text-amber-800">
                    GSTIN: {selectedInvoice.gstin}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Payment Terms:</span>
                  <strong className="text-slate-800">{selectedInvoice.dueDate}</strong>
                  <span className="text-emerald-700 block font-bold mt-0.5">
                    Status: {selectedInvoice.status}
                  </span>
                </div>
              </div>

              {/* Calculation Summary */}
              <div className="border-t border-slate-200 pt-3 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-600">Taxable Value of Supply:</span>
                  <strong className="font-mono">₹{selectedInvoice.taxableAmount.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Central GST (CGST @ 2.5%):</span>
                  <span className="font-mono text-slate-700">₹{selectedInvoice.cgst}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">State GST (SGST @ 2.5%):</span>
                  <span className="font-mono text-slate-700">₹{selectedInvoice.sgst}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black text-[#7D0A14]">
                  <span>Total Invoice Value (INR):</span>
                  <span className="font-mono">₹{selectedInvoice.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-[10px] text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  Valid for claiming Input Tax Credit (ITC) under Section 16 of CGST Act. Certified E-Invoice compliant.
                </span>
              </div>
            </div>

            {/* Print & Close Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  showToast('Preparing invoice print preview...');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <Printer className="w-3.5 h-3.5 text-amber-300" />
                <span>Print Official Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

