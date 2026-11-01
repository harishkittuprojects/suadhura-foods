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
  Store,
  Menu,
  LogOut,
  Home,
  Bell,
  ExternalLink,
  ChevronRight,
  Zap,
  Users
} from 'lucide-react';

export const AdminPage = () => {
  const {
    navigateTo,
    showToast,
    user,
    activeSubscription,
    activeOrder,
    setActiveSubscription,
    setIsAuthModalOpen,
    setIsSubscriptionModalOpen,
    login
  } = useShop();

  // Mode: 'unified' | 'b2c' | 'b2b'
  const [adminMode, setAdminMode] = useState('unified');
  // Tabs: 'overview' | 'orders' | 'subscriptions' | 'b2b-quotes' | 'inventory' | 'invoices'
  const [activeTab, setActiveTab] = useState('overview');

  // Mobile sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Selected invoice for Modal viewing
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // -------------------------------------------------------------------
  // REAL REGISTERED & LOGGED-IN CUSTOMERS (ZERO FAKE CUSTOMERS)
  // -------------------------------------------------------------------
  const FAKE_MOCK_KEYWORDS = [
    'rajesh sharma',
    'sunita venkatesh',
    'karthik balan',
    'deepa kulkarni',
    'priya sharma',
    'vikram reddy',
    'ananya rao',
    'sri krishna grand',
    'spice valley',
    'royal orchid',
    'deepak verma',
    'b2b-smd-99104',
    'b2b-smd-98842',
    'smd-739201',
    'smd-684192',
    'sub-101',
    'sub-102',
    'sub-103',
    'sub-104'
  ];

  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_registered_customers');
      let list = saved ? JSON.parse(saved) : [];
      list = list.filter((c) => {
        const name = (c.name || '').toLowerCase();
        const comp = (c.companyName || '').toLowerCase();
        return !FAKE_MOCK_KEYWORDS.some((fk) => name.includes(fk) || comp.includes(fk));
      });
      const savedUser = localStorage.getItem('sumadhura_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        const name = (u.name || '').toLowerCase();
        const comp = (u.companyName || '').toLowerCase();
        const isFake = FAKE_MOCK_KEYWORDS.some((fk) => name.includes(fk) || comp.includes(fk));
        if (!isFake) {
          const exists = list.some(
            (c) => (u.email && c.email === u.email) || (u.phone && c.phone === u.phone)
          );
          if (!exists) {
            list.unshift({
              id: u.id || `CUST-${u.isBusiness ? 'B2B' : 'B2C'}-101`,
              name: u.name || (u.isBusiness ? u.companyName : 'Customer'),
              email: u.email || '',
              phone: u.phone || '',
              isBusiness: Boolean(u.isBusiness),
              companyName: u.companyName || null,
              gstin: u.gstin || null,
              businessType: u.businessType || null,
              registeredAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
              lastLogin: 'Live Now',
              status: 'Active'
            });
          }
        }
      }
      return list;
    } catch {
      return [];
    }
  });

  // Keep customer list in sync if user logs in
  React.useEffect(() => {
    if (user) {
      setCustomers((prev) => {
        const email = user.email || '';
        const phone = user.phone || '';
        const name = (user.name || '').toLowerCase();
        const comp = (user.companyName || '').toLowerCase();
        if (FAKE_MOCK_KEYWORDS.some((fk) => name.includes(fk) || comp.includes(fk))) {
          return prev;
        }
        const exists = prev.some(
          (c) => (email && c.email === email) || (phone && c.phone === phone)
        );
        if (!exists) {
          const newCust = {
            id: user.id || `CUST-${user.isBusiness ? 'B2B' : 'B2C'}-${Math.floor(100 + Math.random() * 900)}`,
            name: user.name || (user.isBusiness ? user.companyName : 'Customer'),
            email,
            phone,
            isBusiness: Boolean(user.isBusiness),
            companyName: user.companyName || null,
            gstin: user.gstin || null,
            businessType: user.businessType || null,
            registeredAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            lastLogin: 'Live Now',
            status: 'Active'
          };
          return [newCust, ...prev];
        }
        return prev;
      });
    }
  }, [user]);

  // -------------------------------------------------------------------
  // REAL CUSTOMER ORDERS (NO FAKE ORDERS)
  // -------------------------------------------------------------------
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_orders');
      let list = saved ? JSON.parse(saved) : [];
      list = list.filter((o) => {
        const cust = (o.customer || '').toLowerCase();
        const comp = (o.companyName || '').toLowerCase();
        const id = (o.id || '').toLowerCase();
        return !FAKE_MOCK_KEYWORDS.some((fk) => cust.includes(fk) || comp.includes(fk) || id.includes(fk));
      });
      const savedOrder = localStorage.getItem('sumadhura_active_order');
      if (savedOrder) {
        const o = JSON.parse(savedOrder);
        const cust = (o.customer || '').toLowerCase();
        const comp = (o.companyName || '').toLowerCase();
        const id = (o.id || '').toLowerCase();
        const isFake = FAKE_MOCK_KEYWORDS.some((fk) => cust.includes(fk) || comp.includes(fk) || id.includes(fk));
        if (!isFake && !list.some((item) => item.id === o.id)) {
          list.unshift(o);
        }
      }
      return list;
    } catch {
      return [];
    }
  });

  // -------------------------------------------------------------------
  // REAL MORNING MILK SUBSCRIPTIONS (NO FAKE CUSTOMERS)
  // -------------------------------------------------------------------
  const [subscriptions, setSubscriptions] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_subscriptions');
      let list = saved ? JSON.parse(saved) : [];
      list = list.filter((s) => {
        const cust = (s.customer || '').toLowerCase();
        const id = (s.id || '').toLowerCase();
        return !FAKE_MOCK_KEYWORDS.some((fk) => cust.includes(fk) || id.includes(fk));
      });
      const savedSub = localStorage.getItem('sumadhura_subscription');
      if (savedSub) {
        const s = JSON.parse(savedSub);
        const cust = (s.customer || '').toLowerCase();
        const id = (s.id || '').toLowerCase();
        const isFake = FAKE_MOCK_KEYWORDS.some((fk) => cust.includes(fk) || id.includes(fk));
        if (!isFake && !list.some((item) => item.id === s.id)) {
          list.unshift(s);
        }
      }
      return list;
    } catch {
      return [];
    }
  });

  // Keep subscription in sync if activeSubscription changes
  React.useEffect(() => {
    if (activeSubscription) {
      setSubscriptions((prev) => {
        if (!prev.some((s) => s.id === activeSubscription.id)) {
          const subObj = {
            id: activeSubscription.id || `SUB-${Math.floor(100 + Math.random() * 900)}`,
            customer: user?.name || user?.companyName || 'Current Customer',
            phone: user?.phone || '+91 98450 12345',
            email: user?.email || '',
            apartment: activeSubscription.address || 'Hitec City, Hyderabad',
            items: activeSubscription.itemsList ? activeSubscription.itemsList.map(i => `${i.name} (${i.qty})`).join(' + ') : 'Pure Farm Cow Milk 1L',
            slot: activeSubscription.slot || '6:00 AM - 7:00 AM',
            frequency: activeSubscription.frequency || 'Every Morning',
            status: activeSubscription.status || 'Active',
            since: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            isBusiness: Boolean(user?.isBusiness)
          };
          return [subObj, ...prev];
        }
        return prev;
      });
    }
  }, [activeSubscription, user]);

  // -------------------------------------------------------------------
  // REAL B2B WHOLESALE RFPs & QUOTES (NO FAKE RFPs)
  // -------------------------------------------------------------------
  const [b2bQuotes, setB2bQuotes] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_b2b_rfps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

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

  // B2B GST Tax Invoices (Dynamically generated from real B2B orders)
  const invoices = orders
    .filter((o) => o.type === 'b2b')
    .map((o, idx) => ({
      invoiceNo: `INV-2026-${100 + idx}`,
      date: o.date || 'Today',
      client: o.customer || o.companyName || 'B2B Client',
      gstin: o.gstin || '36AABCU9603R1ZM',
      orderId: o.id,
      taxableAmount: Math.round((o.total / 1.05) * 100) / 100,
      cgst: Math.round(((o.total - o.total / 1.05) / 2) * 100) / 100,
      sgst: Math.round(((o.total - o.total / 1.05) / 2) * 100) / 100,
      totalAmount: o.total,
      status: 'Paid',
      dueDate: 'Net 15 Days'
    }));

  // -------------------------------------------------------------------
  // REAL CUSTOMER ORDER & SUBSCRIPTION HELPERS
  // -------------------------------------------------------------------
  const simulateNewB2COrder = () => {
    const custName = user?.name || (user?.isBusiness ? user.companyName : null);
    if (!custName) {
      showToast('⚠️ No customer logged in. Please sign in or click "Log In as Customer" below.', 'error');
      return;
    }
    const newId = `SMD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newId,
      type: user?.isBusiness ? 'b2b' : 'b2c',
      customer: custName,
      contact: user?.phone || '+91 98450 12345',
      email: user?.email || '',
      gstin: user?.gstin || null,
      address: 'Madhapur / Hitec City, Hyderabad',
      items: [
        { name: 'Nandini Farm Fresh Cow Milk (1L)', qty: 2, price: 56 },
        { name: 'Fresh Malai Paneer (200g)', qty: 1, price: 140 }
      ],
      total: 252,
      status: 'Packing',
      paymentMethod: 'UPI • Paid',
      timestamp: 'Just now',
      deliverySlot: 'Instant 10-15 Mins'
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem('sumadhura_orders', JSON.stringify(updated));
    } catch {}
    showToast(`🔔 Real Order ${newId} created for ${custName}!`);
  };

  const simulateNewB2BQuote = () => {
    const compName = user?.isBusiness ? user.companyName : 'Commercial Enterprise Partner';
    const contactP = user ? user.name : 'Procurement Manager';
    const phone = user ? user.phone : '+91 98450 99888';
    const newId = `QT-${Math.floor(100 + Math.random() * 900)}`;
    const newQuote = {
      id: newId,
      company: compName,
      contactPerson: contactP,
      phone,
      email: user?.email || 'procurement@business.com',
      businessType: user?.businessType || 'Hospitality & Commercial Kitchen',
      monthlyVolume: '₹2,50,000 / month',
      categories: ['Heritage Bilona Ghee', 'Fresh Paneer Blocks', 'Basmati Rice'],
      notes: 'Requested volume commercial pricing with 5:00 AM delivery SLA.',
      status: 'New Inquiry',
      date: 'Just now'
    };

    const updated = [newQuote, ...b2bQuotes];
    setB2bQuotes(updated);
    try {
      localStorage.setItem('sumadhura_b2b_rfps', JSON.stringify(updated));
    } catch {}
    showToast(`🏢 B2B RFP ${newId} submitted for ${compName}!`);
  };

  const createSubscriptionForUser = (targetUser = user) => {
    if (!targetUser) {
      showToast('No customer logged in to create a subscription.', 'error');
      return;
    }
    const newSubId = `SUB-${Math.floor(100 + Math.random() * 900)}`;
    const newSub = {
      id: newSubId,
      customer: targetUser.name || targetUser.companyName || 'Customer',
      phone: targetUser.phone || '+91 98450 12345',
      email: targetUser.email || '',
      isBusiness: Boolean(targetUser.isBusiness),
      companyName: targetUser.companyName || null,
      apartment: 'Madhapur / Hitec City, Hyderabad',
      items: 'Nandini Farm Fresh Cow Milk 1L Daily (Morning)',
      slot: '6:00 AM - 7:00 AM',
      frequency: 'Every Morning',
      status: 'Active',
      since: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    const updated = [newSub, ...subscriptions];
    setSubscriptions(updated);
    if (setActiveSubscription) {
      setActiveSubscription(newSub);
    }
    try {
      localStorage.setItem('sumadhura_subscriptions', JSON.stringify(updated));
      localStorage.setItem('sumadhura_subscription', JSON.stringify(newSub));
    } catch {}
    showToast(`🥛 Daily Morning Milk Subscription activated for ${targetUser.name || targetUser.companyName}!`);
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
    if (adminMode === 'b2c' && o.type !== 'b2c') return false;
    if (adminMode === 'b2b' && o.type !== 'b2b') return false;
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;

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

  const b2cOrdersCount = orders.filter((o) => o.type === 'b2c').length;
  const b2bOrdersCount = orders.filter((o) => o.type === 'b2b').length;
  const b2cRevenue = orders
    .filter((o) => o.type === 'b2c')
    .reduce((sum, o) => sum + o.total, 0);
  const b2bRevenue = orders
    .filter((o) => o.type === 'b2b')
    .reduce((sum, o) => sum + o.total, 0);

  const sidebarLinks = [
    { id: 'overview', label: 'Dashboard Overview', icon: Layers, badge: null },
    {
      id: 'customers',
      label: 'Logged-In Customers',
      icon: Users,
      badge: customers.length,
      scopeTag: null
    },
    {
      id: 'orders',
      label:
        adminMode === 'b2c'
          ? 'B2C Orders Dispatch'
          : adminMode === 'b2b'
          ? 'B2B Wholesale Orders'
          : 'Live Orders Dispatch',
      icon: Package,
      badge:
        adminMode === 'b2c'
          ? b2cOrdersCount
          : adminMode === 'b2b'
          ? b2bOrdersCount
          : orders.length
    },
    {
      id: 'subscriptions',
      label: 'Morning Subscriptions',
      icon: Clock,
      badge: subscriptions.length,
      scopeTag: 'B2C'
    },
    {
      id: 'b2b-quotes',
      label: 'Wholesale RFPs & Quotes',
      icon: Building2,
      badge: b2bQuotes.length,
      scopeTag: 'B2B'
    },
    { id: 'inventory', label: 'Catalog & Dual-Pricing', icon: Percent, badge: null },
    {
      id: 'invoices',
      label: 'GST Tax Invoices',
      icon: Receipt,
      badge: invoices.length,
      scopeTag: 'B2B'
    }
  ];

  return (
    <div className="flex h-screen w-full bg-[#FAF5EC] text-[#3D040A] overflow-hidden font-sans">
      {/* ============================================================= */}
      {/* 1. STANDALONE LEFT SIDEBAR (SUMADHURA ROYAL MAROON BRAND THEME)*/}
      {/* ============================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#3D040A] text-white border-r border-[#52060E] flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Brand Header */}
          <div className="p-5 bg-[#4D060D] border-b border-[#52060E] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F5A623] text-[#3D040A] flex items-center justify-center font-black text-xl shadow-lg">
                <Store className="w-5 h-5 text-[#3D040A]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-black text-sm text-white tracking-tight">Sumadhura Ops</h2>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#F5A623] text-[#3D040A]">
                    HQ v2.4
                  </span>
                </div>
                <p className="text-[11px] text-amber-200/80">Operations Command Center</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-white/70 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher Segmented Control */}
          <div className="p-4 border-b border-[#52060E] bg-[#330308]">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-amber-300/80 mb-2">
              <span>Operational Scope</span>
              <span className="text-[9px] text-amber-400 font-bold lowercase">
                {adminMode === 'b2c' ? 'retail only' : adminMode === 'b2b' ? 'wholesale only' : 'all operations'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-[#230206] p-1 rounded-xl border border-[#52060E] text-[11px] font-extrabold text-center">
              <button
                onClick={() => {
                  setAdminMode('unified');
                  showToast('Switched to Unified View (B2C + B2B)');
                }}
                className={`py-1.5 rounded-lg transition-all ${
                  adminMode === 'unified'
                    ? 'bg-[#F5A623] text-[#3D040A] font-black shadow-sm'
                    : 'text-amber-100/70 hover:text-white'
                }`}
              >
                Unified
              </button>
              <button
                onClick={() => {
                  setAdminMode('b2c');
                  showToast('Switched to B2C Retail Operations');
                }}
                className={`py-1.5 rounded-lg transition-all ${
                  adminMode === 'b2c'
                    ? 'bg-blue-600 text-white font-black shadow-sm'
                    : 'text-amber-100/70 hover:text-white'
                }`}
              >
                B2C Retail
              </button>
              <button
                onClick={() => {
                  setAdminMode('b2b');
                  showToast('Switched to B2B Wholesale Portal');
                }}
                className={`py-1.5 rounded-lg transition-all ${
                  adminMode === 'b2b'
                    ? 'bg-[#7D0A14] text-white border border-amber-400/40 font-black shadow-sm'
                    : 'text-amber-100/70 hover:text-white'
                }`}
              >
                B2B Wholesale
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-3 flex-1 overflow-y-auto space-y-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-200/60 px-3 py-1">
              Management Modules
            </div>
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F5A623]/30 to-transparent text-amber-300 border-l-4 border-[#F5A623] font-black'
                      : 'text-amber-100/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-amber-200/70'}`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.scopeTag && (
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.2 rounded ${
                          item.scopeTag === 'B2C'
                            ? 'bg-blue-900/60 text-blue-200 border border-blue-500/30'
                            : 'bg-amber-950/60 text-amber-200 border border-amber-500/30'
                        }`}
                      >
                        {item.scopeTag}
                      </span>
                    )}
                    {item.badge !== null && (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#F5A623] text-[#3D040A]'
                            : 'bg-black/30 text-amber-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Card: Back to Live Storefront */}
          <div className="p-4 border-t border-[#52060E] space-y-3 bg-[#330308]">
            <div className="p-3 rounded-2xl bg-[#230206] border border-[#52060E] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-extrabold text-white text-[11px]">Dark Store: Bengaluru South</span>
              </div>
              <div className="text-[10px] text-amber-200/70 mt-1">Logged in as Operations Supervisor</div>
            </div>

            <button
              onClick={() => navigateTo('home')}
              className="w-full py-2.5 px-3 rounded-xl bg-[#F5A623] hover:bg-[#E09215] text-[#3D040A] font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Customer Store</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* ============================================================= */}
      {/* 2. MAIN ADMIN CANVAS (MATCHING STOREFRONT CREAM & MAROON)      */}
      {/* ============================================================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#FAF5EC]">
        {/* Header Bar */}
        <header className="min-h-16 bg-white border-b border-[#E8DDCF] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 flex-shrink-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#FAF5EC] text-[#7D0A14] hover:bg-[#F3EAD9]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span>Sumadhura Operations</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-[#7D0A14] capitalize font-black">{activeTab.replace('-', ' ')}</span>
              </div>
              <h1 className="text-sm sm:text-base font-black text-[#3D040A] capitalize">
                {activeTab === 'overview'
                  ? adminMode === 'b2c'
                    ? 'B2C Retail Operations Dashboard'
                    : adminMode === 'b2b'
                    ? 'B2B Wholesale Commercial Dashboard'
                    : 'Operations Command Dashboard'
                  : activeTab === 'b2b-quotes'
                  ? 'Wholesale RFPs & Quotations Desk'
                  : activeTab.replace('-', ' ')}
              </h1>
            </div>
          </div>

          {/* Central Header Scope Switch Toggle (Switch between B2C and B2B instantly) */}
          <div className="flex items-center bg-[#FAF5EC] p-1 rounded-2xl border-2 border-[#E8DDCF] shadow-xs">
            <button
              onClick={() => {
                setAdminMode('b2c');
                showToast('Switched to B2C Retail Operations');
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                adminMode === 'b2c'
                  ? 'bg-blue-600 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>B2C Retail</span>
            </button>

            <button
              onClick={() => {
                setAdminMode('b2b');
                showToast('Switched to B2B Wholesale Portal');
              }}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                adminMode === 'b2b'
                  ? 'bg-[#7D0A14] text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B Wholesale</span>
            </button>

            <button
              onClick={() => {
                setAdminMode('unified');
                showToast('Switched to Unified View (B2C + B2B)');
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                adminMode === 'unified'
                  ? 'bg-[#F5A623] text-[#3D040A] shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Unified</span>
            </button>
          </div>

          {/* Quick Simulators & Storefront Jump */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-bold">
              <span className="text-[#D98207]">❄️ 3.8°C</span>
              <span>Cold-Chain OK</span>
            </div>

            {(adminMode === 'b2c' || adminMode === 'unified') && (
              <button
                onClick={simulateNewB2COrder}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
                title="Simulate a real-time incoming B2C retail order"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simulate B2C Order</span>
                <span className="sm:hidden">B2C</span>
              </button>
            )}

            {(adminMode === 'b2b' || adminMode === 'unified') && (
              <button
                onClick={simulateNewB2BQuote}
                className="px-3 py-1.5 rounded-xl bg-[#F5A623] hover:bg-[#E09215] text-[#3D040A] font-black text-xs flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
                title="Simulate incoming wholesale hotel quote"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simulate B2B RFP</span>
                <span className="sm:hidden">B2B</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('home')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF5EC] hover:bg-[#F3EAD9] text-[#7D0A14] font-bold text-xs border border-[#E8DDCF] transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Customer Storefront</span>
            </button>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ========================================================= */}
          {/* 1. DASHBOARD OVERVIEW                                     */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Active Mode Quick Switch Banner */}
              <div
                className={`p-4 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs transition-all ${
                  adminMode === 'b2c'
                    ? 'bg-gradient-to-r from-blue-50 via-white to-blue-50/60 border-blue-200'
                    : adminMode === 'b2b'
                    ? 'bg-gradient-to-r from-rose-50 via-white to-amber-50/60 border-rose-200'
                    : 'bg-gradient-to-r from-amber-50 via-white to-[#FAF5EC] border-[#EDE1D1]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black flex-shrink-0 ${
                      adminMode === 'b2c'
                        ? 'bg-blue-600 text-white shadow-md'
                        : adminMode === 'b2b'
                        ? 'bg-[#7D0A14] text-white shadow-md'
                        : 'bg-[#F5A623] text-[#3D040A] shadow-md'
                    }`}
                  >
                    {adminMode === 'b2c' ? (
                      <User className="w-5 h-5" />
                    ) : adminMode === 'b2b' ? (
                      <Building2 className="w-5 h-5" />
                    ) : (
                      <Layers className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm sm:text-base font-black text-[#3D040A]">
                        {adminMode === 'b2c'
                          ? 'B2C Retail Operations Dashboard'
                          : adminMode === 'b2b'
                          ? 'B2B Wholesale & Commercial Portal'
                          : 'Unified Operations Command (B2C Retail + B2B Wholesale)'}
                      </h2>
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                          adminMode === 'b2c'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : adminMode === 'b2b'
                            ? 'bg-rose-100 text-[#7D0A14] border border-rose-200'
                            : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}
                      >
                        {adminMode === 'b2c'
                          ? 'B2C Scope Active'
                          : adminMode === 'b2b'
                          ? 'B2B Scope Active'
                          : 'Combined Scope Active'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {adminMode === 'b2c'
                        ? 'Showing consumer retail orders, 10–15 min express delivery SLA & daily morning milk subscriptions.'
                        : adminMode === 'b2b'
                        ? 'Showing commercial hotel/kitchen bulk shipments, RFP quotation pipeline & GST tax invoicing.'
                        : 'Consolidated overview showing both retail consumer streams and commercial wholesale dispatches.'}
                    </p>
                  </div>
                </div>

                {/* Instant 1-Click Toggle Button */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  {adminMode === 'b2c' && (
                    <button
                      onClick={() => {
                        setAdminMode('b2b');
                        showToast('Switched to B2B Wholesale Portal');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <Building2 className="w-3.5 h-3.5 text-amber-300" />
                      <span>Switch to B2B Wholesale</span>
                      <ArrowRight className="w-3 h-3 ml-0.5" />
                    </button>
                  )}
                  {adminMode === 'b2b' && (
                    <button
                      onClick={() => {
                        setAdminMode('b2c');
                        showToast('Switched to B2C Retail Operations');
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <User className="w-3.5 h-3.5 text-blue-200" />
                      <span>Switch to B2C Retail</span>
                      <ArrowRight className="w-3 h-3 ml-0.5" />
                    </button>
                  )}
                  {adminMode === 'unified' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setAdminMode('b2c');
                          showToast('Switched to B2C Retail Operations');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center gap-1 shadow-xs"
                      >
                        <User className="w-3 h-3" />
                        <span>Filter B2C</span>
                      </button>
                      <button
                        onClick={() => {
                          setAdminMode('b2b');
                          showToast('Switched to B2B Wholesale Portal');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1 shadow-xs"
                      >
                        <Building2 className="w-3 h-3" />
                        <span>Filter B2B</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Metric Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {adminMode === 'b2c' ? (
                  <>
                    {/* B2C Card 1: Today's Retail Revenue */}
                    <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>Today's B2C Retail</span>
                        <span className="p-1.5 rounded-xl bg-blue-50 text-blue-600">
                          <User className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#3D040A]">
                        ₹{b2cRevenue.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{b2cOrdersCount} orders • 100% Prepaid UPI</span>
                      </div>
                    </div>

                    {/* B2C Card 2: Express Delivery SLA */}
                    <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>Avg Express Delivery</span>
                        <span className="p-1.5 rounded-xl bg-amber-50 text-amber-700">
                          <Zap className="w-4 h-4 text-amber-600" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-700">
                        11.2 <span className="text-xs text-slate-400 font-normal">Mins</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        10–15 Min SLA • 100% On-Time Dispatch
                      </div>
                    </div>

                    {/* B2C Card 3: Morning Milk Subscribers */}
                    <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>Morning Milk Subscribers</span>
                        <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700">
                          <Clock className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#3D040A]">
                        {subscriptions.length} <span className="text-xs text-slate-400 font-normal">Active</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Delivered 6:00 AM daily • Doorstep Fresh
                      </div>
                    </div>

                    {/* B2C Card 4: Retail Avg Order Value */}
                    <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>Retail Avg Order Value</span>
                        <span className="p-1.5 rounded-xl bg-purple-50 text-purple-700">
                          <ShoppingBag className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#3D040A]">
                        ₹{b2cOrdersCount ? Math.round(b2cRevenue / b2cOrdersCount) : 0}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold">
                        +18% repeat customer rate
                      </div>
                    </div>
                  </>
                ) : adminMode === 'b2b' ? (
                  <>
                    {/* B2B Card 1: Wholesale Revenue */}
                    <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>B2B Wholesale Dispatched</span>
                        <span className="p-1.5 rounded-xl bg-rose-50 text-[#7D0A14]">
                          <Building2 className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#7D0A14]">
                        ₹{b2bRevenue.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{b2bOrdersCount} bulk commercial shipments</span>
                      </div>
                    </div>

                    {/* B2B Card 2: Commercial Hotel Accounts */}
                    <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>Active Commercial Accounts</span>
                        <span className="p-1.5 rounded-xl bg-amber-50 text-amber-700">
                          <Store className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#3D040A]">
                        {customers.filter((c) => c.isBusiness).length} <span className="text-xs text-slate-400 font-normal">Clients</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Hotels, Banquets & Cloud Kitchens
                      </div>
                    </div>

                    {/* B2B Card 3: Commercial RFPs & Pipeline */}
                    <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>Commercial RFPs & Quotes</span>
                        <span className="p-1.5 rounded-xl bg-purple-50 text-purple-700">
                          <FileText className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#3D040A]">
                        {b2bQuotes.length} <span className="text-xs text-slate-400 font-normal">Inquiries</span>
                      </div>
                      <div className="text-[11px] text-amber-700 font-bold">
                        Est. ₹5.8 Lakhs pipeline value
                      </div>
                    </div>

                    {/* B2B Card 4: Net Receivables */}
                    <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>Net 15 / 30 Receivables</span>
                        <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700">
                          <Receipt className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#7D0A14]">
                        ₹{invoices.reduce((sum, inv) => sum + (Number(inv.totalAmount) || 0), 0).toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        100% GST ITC Compliant Invoices
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Unified Card 1: B2C Retail Today */}
                    <div className="bg-white p-5 rounded-3xl border border-[#EDE1D1] shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>Today's B2C Retail</span>
                        <span className="p-1.5 rounded-xl bg-blue-50 text-blue-600">
                          <User className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#3D040A]">
                        ₹{b2cRevenue.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{b2cOrdersCount} orders • 11.2m avg delivery</span>
                      </div>
                    </div>

                    {/* Unified Card 2: B2B Wholesale Dispatched */}
                    <div className="bg-white p-5 rounded-3xl border border-[#EDE1D1] shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>B2B Wholesale Dispatched</span>
                        <span className="p-1.5 rounded-xl bg-amber-50 text-amber-700">
                          <Building2 className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#7D0A14]">
                        ₹{b2bRevenue.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{b2bOrdersCount} bulk commercial shipments</span>
                      </div>
                    </div>

                    {/* Unified Card 3: Morning Milk Subscribers */}
                    <div className="bg-white p-5 rounded-3xl border border-[#EDE1D1] shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>Morning Milk Subscribers</span>
                        <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700">
                          <Clock className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#3D040A]">
                        {subscriptions.length} <span className="text-xs text-slate-400 font-normal">Active</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Delivered 6:00 AM daily • 100% On Time
                      </div>
                    </div>

                    {/* Unified Card 4: Wholesale RFPs & Pipeline */}
                    <div className="bg-white p-5 rounded-3xl border border-[#EDE1D1] shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                        <span>Commercial RFPs & Quotes</span>
                        <span className="p-1.5 rounded-xl bg-purple-50 text-purple-700">
                          <FileText className="w-4 h-4" />
                        </span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#3D040A]">
                        {b2bQuotes.length} <span className="text-xs text-slate-400 font-normal">Hotels</span>
                      </div>
                      <div className="text-[11px] text-amber-700 font-bold">
                        Est. ₹5.8 Lakhs pipeline value
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Two Column Section: Live Dispatch + Operations Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Live Orders Dispatch Stream (Filtered based on adminMode) */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-base text-[#3D040A]">
                        {adminMode === 'b2c'
                          ? 'Live B2C Retail Dispatches (10–15 Min Express)'
                          : adminMode === 'b2b'
                          ? 'Live B2B Commercial Shipments (Bulk Kitchen Dispatch)'
                          : 'Live Dispatch Activity (Retail & Bulk Shipments)'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {adminMode === 'b2c'
                          ? 'Real-time status of express consumer deliveries in transit'
                          : adminMode === 'b2b'
                          ? 'Real-time status of commercial bulk dispatches to hotels and restaurants'
                          : 'Real-time status of retail deliveries & bulk morning shipments'}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#7D0A14] hover:underline flex items-center gap-1"
                    >
                      <span>
                        View all{' '}
                        {adminMode === 'b2c'
                          ? `${b2cOrdersCount} B2C`
                          : adminMode === 'b2b'
                          ? `${b2bOrdersCount} B2B`
                          : `${orders.length}`}{' '}
                        orders
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {filteredOrders.slice(0, 5).map((order) => (
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
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : order.status === 'Dispatched'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {filteredOrders.length === 0 && (
                      <div className="py-8 text-center text-xs text-slate-500">
                        No {adminMode === 'b2c' ? 'B2C retail' : adminMode === 'b2b' ? 'B2B wholesale' : ''} orders matching current view.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right 1 Col: Cold-Chain & Contextual Shortcuts */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-[#3D040A] via-[#5C0810] to-[#7D0A14] text-white p-6 rounded-3xl border border-[#8B121C] space-y-4 shadow-md">
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
                        <span className="text-amber-200/80">Mandi Veggie Arrival:</span>
                        <strong className="text-white">4:15 AM Handpicked</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-200/80">On-Time Dispatch Rate:</span>
                        <strong className="text-emerald-300">99.4%</strong>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-[#EDE1D1] space-y-3 shadow-xs">
                    <h4 className="font-extrabold text-xs text-[#3D040A] uppercase tracking-wider">
                      Operations Shortcuts ({adminMode.toUpperCase()})
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {adminMode === 'b2c' ? (
                        <>
                          <button
                            onClick={() => setActiveTab('subscriptions')}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-slate-800 text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Clock className="w-4 h-4 mb-1 text-emerald-600" />
                            <span>Milk Run-Sheet</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('inventory')}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-slate-800 text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Percent className="w-4 h-4 mb-1 text-blue-600" />
                            <span>Retail Stock</span>
                          </button>
                          <button
                            onClick={simulateNewB2COrder}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-blue-700 text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Plus className="w-4 h-4 mb-1 text-blue-600" />
                            <span>Simulate Order</span>
                          </button>
                          <button
                            onClick={() => {
                              setAdminMode('b2b');
                              showToast('Switched to B2B Wholesale Portal');
                            }}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-[#7D0A14] text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Building2 className="w-4 h-4 mb-1 text-[#7D0A14]" />
                            <span>Switch to B2B</span>
                          </button>
                        </>
                      ) : adminMode === 'b2b' ? (
                        <>
                          <button
                            onClick={() => setActiveTab('b2b-quotes')}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-[#7D0A14] text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Building2 className="w-4 h-4 mb-1 text-[#7D0A14]" />
                            <span>Review B2B RFPs</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('invoices')}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-slate-800 text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Receipt className="w-4 h-4 mb-1 text-purple-600" />
                            <span>GST Invoices</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('inventory')}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-slate-800 text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Percent className="w-4 h-4 mb-1 text-amber-600" />
                            <span>Bulk MOQ & Rates</span>
                          </button>
                          <button
                            onClick={() => {
                              setAdminMode('b2c');
                              showToast('Switched to B2C Retail Operations');
                            }}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-blue-700 text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <User className="w-4 h-4 mb-1 text-blue-600" />
                            <span>Switch to B2C</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setActiveTab('b2b-quotes')}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-[#7D0A14] text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Building2 className="w-4 h-4 mb-1" />
                            <span>Review B2B RFPs</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('subscriptions')}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-slate-800 text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Clock className="w-4 h-4 mb-1 text-emerald-600" />
                            <span>Milk Run-Sheet</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('invoices')}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-slate-800 text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Receipt className="w-4 h-4 mb-1 text-blue-600" />
                            <span>GST Invoices</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('inventory')}
                            className="p-3 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] font-bold text-slate-800 text-left transition-colors flex flex-col justify-between border border-[#EDE1D1]"
                          >
                            <Percent className="w-4 h-4 mb-1 text-amber-600" />
                            <span>Dual-Pricing</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. ORDER MANAGEMENT CONSOLE                               */}
          {/* ========================================================= */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-[#3D040A]">
                    {adminMode === 'b2c'
                      ? 'B2C Retail Orders Console'
                      : adminMode === 'b2b'
                      ? 'B2B Wholesale Orders Console'
                      : 'Order Management Console (Unified)'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {adminMode === 'b2c'
                      ? 'Live retail consumer orders and 10–15 min express doorstep delivery'
                      : adminMode === 'b2b'
                      ? 'Live commercial dispatches for hotels, banquets and cloud kitchens'
                      : 'Live order fulfillment for B2C retail & B2B wholesale dispatches'}
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Inline Scope Switcher */}
                  <div className="flex items-center bg-[#FAF5EC] p-1 rounded-xl border border-[#E8DDCF] text-xs font-bold">
                    <button
                      onClick={() => {
                        setAdminMode('b2c');
                        showToast('Filtered to B2C Retail Orders');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                        adminMode === 'b2c'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      B2C ({b2cOrdersCount})
                    </button>
                    <button
                      onClick={() => {
                        setAdminMode('b2b');
                        showToast('Filtered to B2B Wholesale Orders');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                        adminMode === 'b2b'
                          ? 'bg-[#7D0A14] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      B2B ({b2bOrdersCount})
                    </button>
                    <button
                      onClick={() => {
                        setAdminMode('unified');
                        showToast('Showing All Orders');
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                        adminMode === 'unified'
                          ? 'bg-[#F5A623] text-[#3D040A] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      All ({orders.length})
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search order ID, hotel or client..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-[#E8DDCF] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7D0A14] w-44 sm:w-56"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl bg-white border border-[#E8DDCF] text-slate-800 font-medium focus:outline-none"
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
                      <tr key={order.id} className="hover:bg-[#FAF5EC]/50 transition-colors">
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                              order.type === 'b2b'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-blue-100 text-blue-900 border border-blue-200'
                            }`}
                          >
                            {order.type === 'b2b' ? 'B2B Wholesale' : 'B2C Retail'}
                          </span>
                          <div className="font-extrabold text-[#3D040A] mt-1">{order.id}</div>
                          <div className="text-[10px] text-slate-400">{order.timestamp}</div>
                        </td>

                        <td className="p-3">
                          <div className="font-bold text-slate-900">{order.customer}</div>
                          {order.gstin && (
                            <div className="text-[10px] text-amber-700 font-mono font-bold">
                              GSTIN: {order.gstin}
                            </div>
                          )}
                          <div className="text-[10px] text-slate-500 line-clamp-1">{order.contact}</div>
                        </td>

                        <td className="p-3 max-w-xs">
                          <div className="space-y-0.5">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-[11px] text-slate-700">
                                <span className="font-bold">{item.qty}x</span> {item.name}
                              </div>
                            ))}
                          </div>
                          <div className="text-[10px] text-[#7D0A14] font-bold mt-1">
                            Slot: {order.deliverySlot}
                          </div>
                        </td>

                        <td className="p-3">
                          <div className="font-black text-sm text-[#7D0A14]">
                            ₹{order.total.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-emerald-600 font-bold">
                            {order.paymentMethod}
                          </div>
                        </td>

                        <td className="p-3">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : order.status === 'Dispatched'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

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
                                className="px-2.5 py-1 rounded-lg bg-[#FAF5EC] hover:bg-[#F3EAD9] text-[#7D0A14] text-[10px] font-bold border border-[#EDE1D1]"
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
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan="6" className="p-8 text-center">
                          <div className="max-w-md mx-auto space-y-3">
                            <Package className="w-10 h-10 text-[#7D0A14]/30 mx-auto" />
                            <h4 className="font-black text-[#3D040A] text-sm">No Customer Orders Yet</h4>
                            <p className="text-xs text-slate-500">
                              Only real orders placed by verified logged-in customers are shown here. Place an order on the storefront or click below to simulate an order for the logged-in customer.
                            </p>
                            <button
                              onClick={simulateNewB2COrder}
                              className="px-3.5 py-1.5 rounded-xl bg-[#7D0A14] text-white text-xs font-bold shadow-xs hover:bg-[#60060E] transition-colors"
                            >
                              + Simulate Order for Current Customer
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* LOGGED-IN CUSTOMERS REGISTRY (ZERO FAKE CUSTOMERS)        */}
          {/* ========================================================= */}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-[#3D040A]">
                    Verified Logged-In Customers Registry
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live authenticated customer database. Displays exclusively real customer accounts (No fake mock accounts).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAuthModalOpen && setIsAuthModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1.5 shadow-sm"
                  >
                    <User className="w-3.5 h-3.5 text-amber-300" />
                    <span>{user ? `Switch Account (Logged in as ${user.name || 'User'})` : 'Sign In as Customer'}</span>
                  </button>
                </div>
              </div>

              {customers.length === 0 && !user ? (
                <div className="py-12 text-center bg-[#FAF5EC]/50 rounded-2xl border border-dashed border-[#EDE1D1] p-6 space-y-3">
                  <Users className="w-12 h-12 text-[#7D0A14]/30 mx-auto" />
                  <h4 className="font-black text-[#3D040A] text-base">No Customers Logged In Yet</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Fake mock customers have been completely eliminated. Once customers sign in or register on the storefront, their live account profiles and credentials will automatically appear here.
                  </p>
                  <button
                    onClick={() => setIsAuthModalOpen && setIsAuthModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#7D0A14] text-white text-xs font-black shadow-sm hover:bg-[#60060E] transition-all inline-flex items-center gap-1.5"
                  >
                    <User className="w-4 h-4 text-amber-300" />
                    <span>Log In as Customer Now</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customers.map((c) => {
                    const isCurrentUser = user && ((user.email && user.email === c.email) || (user.phone && user.phone === c.phone));
                    const custSub = subscriptions.find(s => s.phone === c.phone || s.customer === c.name);
                    const custOrders = orders.filter(o => o.customer === c.name || (o.contact && o.contact.includes(c.phone)));

                    return (
                      <div
                        key={c.id || c.phone || c.email}
                        className={`p-5 rounded-2xl border space-y-3 transition-all ${
                          isCurrentUser
                            ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/40 shadow-xs'
                            : 'bg-[#FAF5EC] border-[#EDE1D1]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${
                              c.isBusiness ? 'bg-purple-100 text-purple-900 border border-purple-200' : 'bg-[#7D0A14] text-white'
                            }`}>
                              {c.name ? c.name[0].toUpperCase() : 'C'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-sm text-[#3D040A]">{c.name}</span>
                                {isCurrentUser && (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Live Session
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500">{c.phone} {c.email ? `• ${c.email}` : ''}</div>
                            </div>
                          </div>

                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                              c.isBusiness
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {c.isBusiness ? 'B2B Wholesale' : 'B2C Retail'}
                          </span>
                        </div>

                        {c.isBusiness && c.companyName && (
                          <div className="p-2.5 rounded-xl bg-white border border-[#EDE1D1] text-xs">
                            <div className="font-bold text-slate-900">{c.companyName}</div>
                            <div className="text-[11px] text-slate-500">{c.businessType || 'Commercial Enterprise'}</div>
                            {c.gstin && <div className="text-[10px] font-mono text-amber-800 mt-0.5">GSTIN: {c.gstin}</div>}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#E8DDCF]">
                          <div className="bg-white/80 p-2 rounded-xl border border-[#EDE1D1]">
                            <span className="text-[10px] text-slate-400 block font-bold">Morning Milk Sub</span>
                            <strong className="text-slate-800">
                              {custSub ? `Active (${custSub.slot})` : 'None'}
                            </strong>
                          </div>
                          <div className="bg-white/80 p-2 rounded-xl border border-[#EDE1D1]">
                            <span className="text-[10px] text-slate-400 block font-bold">Total Orders</span>
                            <strong className="text-slate-800">{custOrders.length} Orders Placed</strong>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-xs">
                          {!custSub ? (
                            <button
                              onClick={() => createSubscriptionForUser(c)}
                              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-[11px] transition-colors"
                            >
                              🥛 Activate Morning Subscription
                            </button>
                          ) : (
                            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed
                            </span>
                          )}

                          <button
                            onClick={() => {
                              if (login) login(c);
                              showToast(`Switched active customer session to ${c.name}`);
                            }}
                            className="text-xs font-bold text-[#7D0A14] hover:underline"
                          >
                            Switch Session →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. MORNING SUBSCRIPTIONS (B2C) - AUTHENTIC CUSTOMERS ONLY */}
          {/* ========================================================= */}
          {activeTab === 'subscriptions' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-[#3D040A]">
                    Morning Milk & Veggie Subscriptions (B2C)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Automated doorstep delivery before 7:00 AM every single morning (Real Subscriptions Only).
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {user && (
                    <button
                      onClick={() => createSubscriptionForUser(user)}
                      className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Subscribe {user.name || 'User'}</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      window.print();
                      showToast('Preparing printable morning delivery run-sheet...');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1.5 shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5 text-amber-300" />
                    <span>Print Route Run-Sheet</span>
                  </button>
                </div>
              </div>

              {/* Active Logged-In Customer Status Banner */}
              <div className="bg-[#FAF5EC] p-4 rounded-2xl border border-[#EDE1D1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7D0A14] text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                    {user ? (user.name ? user.name[0].toUpperCase() : 'U') : <User className="w-5 h-5 text-amber-300" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#3D040A]">
                        {user ? (user.name || user.companyName) : 'No Customer Logged In'}
                      </span>
                      {user ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Online Customer Session
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">
                          Signed Out / Guest Mode
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      {user ? (
                        <span>{user.phone} {user.email ? `• ${user.email}` : ''} • {user.isBusiness ? 'B2B Wholesale' : 'B2C Retail'}</span>
                      ) : (
                        <span>Sign in on the storefront to register a real customer morning milk subscription.</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {!user ? (
                    <button
                      onClick={() => setIsAuthModalOpen && setIsAuthModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-amber-300" />
                      <span>Log In as Customer</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-slate-600">
                      Subscriptions: <strong className="text-[#7D0A14]">{subscriptions.length} active</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Subscriptions Grid or Clean Empty State */}
              {subscriptions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subscriptions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-[#FAF5EC] p-4 sm:p-5 rounded-2xl border border-[#EDE1D1] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-xs text-[#7D0A14]">{sub.id}</span>
                          <span className="font-extrabold text-sm text-[#3D040A]">{sub.customer}</span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                            sub.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <div>
                          <strong className="text-slate-900">Items:</strong> {sub.items}
                        </div>
                        <div>
                          <strong className="text-slate-900">Address:</strong> {sub.apartment}
                        </div>
                        <div>
                          <strong className="text-slate-900">Delivery Window:</strong> {sub.slot} ({sub.frequency})
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Subscribed Since: {sub.since} • Phone: {sub.phone}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#E8DDCF] flex items-center justify-between">
                        <button
                          onClick={() => toggleSubscriptionStatus(sub.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                            sub.status === 'Active'
                              ? 'bg-amber-200 text-amber-950 hover:bg-amber-300'
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
              ) : (
                <div className="py-12 text-center bg-[#FAF5EC]/50 rounded-2xl border border-dashed border-[#EDE1D1] p-6 space-y-3">
                  <Clock className="w-12 h-12 text-[#7D0A14]/30 mx-auto" />
                  <h4 className="font-black text-[#3D040A] text-base">No Customer Subscriptions Active</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    All mock demo customers (Rajesh Sharma, Sunita Venkatesh, Karthik Balan, Deepa Kulkarni) have been completely removed.
                    Only real logged-in customers who subscribe will appear here.
                  </p>
                  {user ? (
                    <button
                      onClick={() => createSubscriptionForUser(user)}
                      className="px-4 py-2 rounded-xl bg-[#7D0A14] text-white text-xs font-black shadow-sm hover:bg-[#60060E] transition-all inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4 text-amber-300" />
                      <span>Activate Morning Milk Delivery for {user.name || user.companyName}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsAuthModalOpen && setIsAuthModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-[#7D0A14] text-white text-xs font-black shadow-sm hover:bg-[#60060E] transition-all inline-flex items-center gap-1.5"
                    >
                      <User className="w-4 h-4 text-amber-300" />
                      <span>Log In as Customer to Subscribe</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. B2B COMMERCIAL QUOTES & RFPs                           */}
          {/* ========================================================= */}
          {activeTab === 'b2b-quotes' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-200">
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

              {b2bQuotes.length > 0 ? (
                <div className="space-y-4">
                  {b2bQuotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="bg-[#FAF5EC]/70 rounded-2xl p-5 border border-[#EDE1D1] hover:border-[#7D0A14] transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DDCF] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xs text-[#7D0A14] bg-white px-2 py-0.5 rounded border border-[#EDE1D1]">
                              {quote.id}
                            </span>
                            <h4 className="font-black text-base text-[#3D040A]">{quote.company}</h4>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {quote.contactPerson} • {quote.businessType}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-black ${
                              quote.status === 'Contract Approved'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : quote.status === 'Quote Sent'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
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
                          <strong className="text-[#3D040A]">{quote.monthlyVolume}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold uppercase text-[10px] block">
                            Contact Info
                          </span>
                          <div className="text-slate-800">{quote.phone}</div>
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
                                className="bg-white text-[#7D0A14] border border-[#EDE1D1] px-2 py-0.5 rounded text-[10px] font-bold"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {quote.notes && (
                        <div className="p-3 rounded-xl bg-white text-xs text-slate-700 italic border border-[#EDE1D1]">
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
                              className="px-3 py-1.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold text-xs"
                            >
                              Approve Wholesale Contract
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-[#FAF5EC]/50 rounded-2xl border border-dashed border-[#EDE1D1] p-6 space-y-3">
                  <Building2 className="w-12 h-12 text-[#7D0A14]/30 mx-auto" />
                  <h4 className="font-black text-[#3D040A] text-base">No Wholesale RFP Inquiries Yet</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Fake mock inquiries have been removed. Commercial RFPs submitted by hotel, restaurant, and catering partners via the B2B portal will appear here.
                  </p>
                  <button
                    onClick={simulateNewB2BQuote}
                    className="px-4 py-2 rounded-xl bg-[#7D0A14] text-white text-xs font-black shadow-sm hover:bg-[#60060E] transition-all inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-amber-300" />
                    <span>+ Simulate Commercial RFP</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. INVENTORY & PRICING (RETAIL vs WHOLESALE)              */}
          {/* ========================================================= */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-200">
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
                      <tr key={prod.id} className="hover:bg-[#FAF5EC]/50 transition-colors">
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
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-rose-100 hover:text-rose-800 border border-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-emerald-100 hover:text-emerald-800 border border-rose-200'
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
          {/* 6. B2B GST TAX INVOICES & BILLING                         */}
          {/* ========================================================= */}
          {activeTab === 'invoices' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-[#3D040A]">
                    B2B Official GST Tax Invoices
                  </h3>
                  <p className="text-xs text-slate-500">
                    Government compliant tax invoices for commercial client Input Tax Credit (ITC)
                  </p>
                </div>

                <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  All Invoices 100% ITC Eligible
                </div>
              </div>

              {invoices.length > 0 ? (
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
              ) : (
                <div className="py-12 text-center bg-[#FAF5EC]/50 rounded-2xl border border-dashed border-[#EDE1D1] p-6 space-y-3">
                  <Receipt className="w-12 h-12 text-[#7D0A14]/30 mx-auto" />
                  <h4 className="font-black text-[#3D040A] text-base">No B2B Invoices Generated Yet</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Official GST tax invoices are automatically created when registered B2B clients place commercial orders.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* GST INVOICE MODAL (PRINTABLE LAYOUT)                          */}
      {/* ------------------------------------------------------------- */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 space-y-6"
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
