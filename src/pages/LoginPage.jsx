import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  Package,
  MapPin,
  Heart,
  LogOut,
  ArrowRight,
  Building2,
  Briefcase,
  FileText,
  BadgeCheck,
  Truck,
  Sparkles,
  Receipt,
  Headphones,
  CreditCard,
  Percent,
  Trash2
} from 'lucide-react';

export const LoginPage = () => {
  const {
    user,
    login,
    logout,
    navigateTo,
    wishlist,
    cart,
    showToast,
    orders,
    deleteOrder,
    setActiveOrder,
    setIsLiveTrackingOpen
  } = useShop();

  // Mode: 'user' | 'business'
  const [accountType, setAccountType] = useState('user'); // 'user' | 'business'
  const [tab, setTab] = useState('login'); // 'login' | 'register'

  // Personal User fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Business User fields
  const [businessIdentifier, setBusinessIdentifier] = useState('');
  const [businessPassword, setBusinessPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [gstin, setGstin] = useState('');
  const [businessType, setBusinessType] = useState('Restaurant & Commercial Kitchen');

  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Filter orders exclusively for the currently logged-in customer
  const currentCustomerOrders = (orders || []).filter((o) => {
    if (!user) return false;
    const matchName = user.name && o.customer && o.customer.toLowerCase().includes(user.name.toLowerCase());
    const matchCompany = user.companyName && ((o.customer && o.customer.toLowerCase().includes(user.companyName.toLowerCase())) || (o.companyName && o.companyName.toLowerCase().includes(user.companyName.toLowerCase())));
    const matchPhone = user.phone && o.contact && o.contact.includes(user.phone);
    const matchEmail = user.email && o.email && o.email === user.email;
    return matchName || matchCompany || matchPhone || matchEmail;
  });

  const b2bCustomerOrders = currentCustomerOrders.filter((o) => o.type === 'b2b');
  const b2cCustomerOrders = currentCustomerOrders.filter((o) => o.type !== 'b2b');

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (accountType === 'business') {
      if (tab === 'login') {
        login({
          name: contactPerson || 'Procurement Officer',
          companyName: companyName || (businessIdentifier.includes('@') ? businessIdentifier.split('@')[1].split('.')[0].toUpperCase() : 'Commercial Enterprise'),
          email: businessIdentifier.includes('@') ? businessIdentifier : `${businessIdentifier}@business.com`,
          phone: businessPhone || '+91 98450 99888',
          gstin: gstin || '36AABCU9603R1ZM',
          businessType: businessType || 'Restaurant & Hotel',
          isBusiness: true
        });
      } else {
        login({
          name: contactPerson || 'Business Partner',
          companyName: companyName || 'Commercial Enterprise Partner',
          email: businessIdentifier,
          phone: businessPhone,
          gstin: gstin || '36AABCU9603R1ZM',
          businessType: businessType,
          isBusiness: true
        });
      }
    } else {
      // Personal User
      if (tab === 'login') {
        login({
          name: identifier.includes('@') ? identifier.split('@')[0].replace(/[._]/g, ' ') : 'Customer',
          email: identifier.includes('@') ? identifier : `${identifier}@customer.com`,
          phone: identifier.includes('@') ? '+91 98450 12345' : identifier,
          isBusiness: false
        });
      } else {
        login({
          name: name || 'Customer',
          email: identifier,
          phone: phone,
          isBusiness: false
        });
      }
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetSent(true);
    showToast('Password reset link sent to registered email/mobile!');
    setTimeout(() => {
      setForgotPasswordActive(false);
      setResetSent(false);
    }, 2500);
  };

  // Quick Demo fill
  const fillCustomerDemo = () => {
    setAccountType('user');
    setTab('login');
    setIdentifier('customer@sumadhurafoods.com');
    setPassword('customer123');
    showToast('Filled Customer login fields');
  };

  const fillBusinessDemo = () => {
    setAccountType('business');
    setTab('login');
    setBusinessIdentifier('procurement@enterprise.com');
    setBusinessPassword('business123');
    setCompanyName('Enterprise Hospitality & Banquets');
    setContactPerson('Procurement Head');
    setGstin('36AABCU9603R1ZM');
    setBusinessType('Restaurant & Commercial Kitchen');
    showToast('Filled B2B Wholesale login fields');
  };

  // ----------------------------------------------------
  // LOGGED IN DASHBOARD
  // ----------------------------------------------------
  if (user) {
    // 1. BUSINESS ACCOUNT DASHBOARD
    if (user.isBusiness) {
      return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {/* Business Hero Banner */}
          <div className="bg-gradient-to-r from-[#3D040A] via-[#680811] to-[#7D0A14] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#8B121C] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 font-bold text-xs border border-white/20">
                <Building2 className="w-3.5 h-3.5" />
                <span>Verified B2B Business Partner</span>
                <BadgeCheck className="w-4 h-4 text-emerald-400" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {user.companyName || user.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-amber-100/90 font-medium">
                <span>Authorized Rep: <strong>{user.name}</strong></span>
                <span>•</span>
                <span>GSTIN: <strong>{user.gstin || '36AABCU9603R1ZM'}</strong></span>
                <span>•</span>
                <span>Type: <strong>{user.businessType || 'Commercial Partner'}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
              <button
                onClick={() => {
                  showToast('Monthly GST Tax Statement generated & emailed! 📄');
                }}
                className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-amber-300" />
                <span>GST Invoices</span>
              </button>

              <button
                onClick={logout}
                className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-200 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* B2B Commercial Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#EDE1D1] shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>B2B Wholesale Tier</span>
                <Percent className="w-4 h-4 text-[#7D0A14]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#7D0A14] mt-1.5">Up to 25% OFF</div>
              <span className="text-[11px] text-emerald-600 font-bold block mt-1">Tier-1 Bulk Margins Active</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EDE1D1] shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Commercial Credit</span>
                <CreditCard className="w-4 h-4 text-[#7D0A14]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">₹50,000</div>
              <span className="text-[11px] text-slate-500 font-medium block mt-1">15-day Net Payment Cycle</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EDE1D1] shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Input Tax Credit</span>
                <Receipt className="w-4 h-4 text-[#7D0A14]" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">100% Eligible</div>
              <span className="text-[11px] text-blue-600 font-semibold block mt-1">Monthly B2B Tax Filing</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EDE1D1] shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Key Account Rep</span>
                <Headphones className="w-4 h-4 text-[#7D0A14]" />
              </div>
              <div className="text-sm font-black text-slate-900 mt-1.5 truncate">Chef Vikram Rao</div>
              <span className="text-[11px] text-emerald-600 font-bold block mt-1">+91 91234 56789</span>
            </div>
          </div>

          {/* Quick Wholesale Action Banner */}
          <div className="bg-[#FFF9F2] rounded-3xl p-6 sm:p-7 border border-[#F3DFC3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#7D0A14] uppercase tracking-wider">
                <Truck className="w-4 h-4 text-[#7D0A14]" />
                <span>Commercial Morning Delivery Fleet</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">Need Scheduled Daily Bulk Crates?</h3>
              <p className="text-xs text-slate-600 max-w-xl">
                Order 50L milk cans, 20kg paneer blocks, and 25kg bags of Sharbati Atta with guaranteed 6:00 AM delivery before your kitchen opens.
              </p>
            </div>

            <button
              onClick={() => navigateTo('categories')}
              className="px-6 py-3 rounded-xl bg-[#7D0A14] hover:bg-[#680811] active:scale-95 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap flex items-center gap-2"
            >
              <span>Browse Wholesale Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recent B2B Commercial Orders */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE1D1] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#7D0A14]" />
                <h2 className="font-extrabold text-slate-900 text-base">Recent Commercial Deliveries</h2>
              </div>
              <span className="text-xs text-slate-400">
                {b2bCustomerOrders.length} {b2bCustomerOrders.length === 1 ? 'Shipment' : 'Shipments'}
              </span>
            </div>

            {b2bCustomerOrders.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {b2bCustomerOrders.map((order) => (
                  <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">#{order.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status} (Invoice #INV-2026-{order.id.replace(/[^0-9]/g, '').slice(-3) || '901'})
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 font-medium">
                        {order.items && order.items.length > 0
                          ? order.items.map((i) => `${i.name} (x${i.qty})`).join(', ')
                          : 'Commercial Bulk Supplies'}
                      </p>
                      <span className="text-[11px] text-slate-400">
                        {order.slot || '5:00 AM Commercial Kitchen Dispatch'} • {order.date || order.timestamp || 'Today'}
                      </span>
                    </div>
                    <div className="text-right sm:flex-shrink-0">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-black text-[#7D0A14] text-base">
                          ₹{Number(order.total).toLocaleString()}
                        </span>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete order #${order.id} from your history?`)) {
                              deleteOrder(order.id);
                              showToast(`Order #${order.id} removed`);
                            }
                          }}
                          className="p-1 rounded-lg text-rose-500 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors"
                          title="Delete / cancel order"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => showToast(`Generating official GST Tax Invoice for Order #${order.id}...`)}
                        className="block text-[11px] text-blue-600 font-bold hover:underline ml-auto mt-0.5"
                      >
                        Download Tax Invoice PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <Package className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-extrabold text-slate-800 text-sm">No Commercial Deliveries Placed Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  All mock orders have been removed. Commercial wholesale orders placed under your account ({user.companyName || user.name}) will appear here in real-time.
                </p>
                <button
                  onClick={() => navigateTo('categories')}
                  className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#680811] text-white text-xs font-bold shadow-xs transition-all inline-flex items-center gap-1.5"
                >
                  <span>Browse Wholesale Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    // 2. PERSONAL CUSTOMER DASHBOARD
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE1D1] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#680811] to-[#7D0A14] text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-[#7D0A14]/25">
              {user.name.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-bold text-[#7D0A14] bg-[#FCE8D0] px-2.5 py-0.5 rounded-full">
                Personal Member
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{user.name}</h1>
              <p className="text-xs text-slate-500">{user.email} • {user.phone}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Account Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => navigateTo('cart')}
            className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/60 cursor-pointer hover:bg-blue-100/70 transition-colors"
          >
            <span className="text-xs font-bold text-blue-800">Items in Cart</span>
            <div className="text-2xl font-black text-blue-900 mt-1">{cart.length} Products</div>
            <span className="text-[11px] text-blue-600 font-semibold mt-1 inline-block">
              View Cart &rarr;
            </span>
          </div>

          <div
            onClick={() => navigateTo('wishlist')}
            className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/60 cursor-pointer hover:bg-rose-100/70 transition-colors"
          >
            <span className="text-xs font-bold text-rose-800">Saved Wishlist</span>
            <div className="text-2xl font-black text-rose-900 mt-1">{wishlist.length} Items</div>
            <span className="text-[11px] text-rose-600 font-semibold mt-1 inline-block">
              View Wishlist &rarr;
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
            <span className="text-xs font-bold text-emerald-800">Sumadhura Wallet</span>
            <div className="text-2xl font-black text-emerald-900 mt-1">₹150 Cash</div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-block">
              Usable on any order
            </span>
          </div>
        </div>

        {/* Recent Deliveries */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE1D1] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#7D0A14]" />
              <h2 className="font-extrabold text-slate-900 text-base">Recent Household Orders</h2>
            </div>
            <span className="text-xs text-slate-400">
              {b2cCustomerOrders.length} {b2cCustomerOrders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </div>

          {b2cCustomerOrders.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {b2cCustomerOrders.map((order) => (
                <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">#{order.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {order.items && order.items.length > 0
                        ? order.items.map((i) => `${i.name} (x${i.qty})`).join(', ')
                        : 'Fresh Household Groceries'}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      {order.slot || '10-15 Min Express Delivery'} • {order.date || order.timestamp || 'Today'}
                    </span>
                  </div>
                  <div className="text-right sm:flex-shrink-0">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-black text-slate-900 text-sm">
                        ₹{Number(order.total).toLocaleString()}
                      </span>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete order #${order.id} from your history?`)) {
                            deleteOrder(order.id);
                            showToast(`Order #${order.id} removed`);
                          }
                        }}
                        className="p-1 rounded-lg text-rose-500 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors"
                        title="Delete / cancel order"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        if (setActiveOrder && setIsLiveTrackingOpen) {
                          setActiveOrder(order);
                          setIsLiveTrackingOpen(true);
                        } else {
                          showToast(`Tracking Order #${order.id}...`);
                        }
                      }}
                      className="block text-[11px] text-[#7D0A14] font-bold hover:underline ml-auto mt-0.5"
                    >
                      Track Order &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <Package className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-extrabold text-slate-800 text-sm">No Household Orders Placed Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                All mock demo orders have been removed. Any grocery or dairy orders placed under your account ({user.name}) will appear here in real-time.
              </p>
              <button
                onClick={() => navigateTo('categories')}
                className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#680811] text-white text-xs font-bold shadow-xs transition-all inline-flex items-center gap-1.5"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // LOGIN & REGISTRATION VIEW
  // ----------------------------------------------------
  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-4">
      {/* 1. Account Type Switcher: B2C vs B2B */}
      <div className="bg-white p-2 rounded-2xl border border-[#EDE1D1] shadow-2xs space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Select Portal
          </span>
          <span className="text-[10px] font-bold text-[#7D0A14]">
            {accountType === 'user' ? 'Retail / Household' : 'Wholesale / Commercial'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setAccountType('user');
              setTab('login');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              accountType === 'user'
                ? 'bg-[#7D0A14] text-white shadow-md ring-2 ring-[#7D0A14]/20'
                : 'bg-[#FAF5EC] text-slate-700 hover:text-slate-900 hover:bg-[#F3EAD9]'
            }`}
          >
            <User className="w-4 h-4" />
            <div className="text-left">
              <div className="leading-tight font-black">B2C Login</div>
              <div className={`text-[9px] font-normal ${accountType === 'user' ? 'text-amber-200' : 'text-slate-500'}`}>
                Retail Customer
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setAccountType('business');
              setTab('login');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              accountType === 'business'
                ? 'bg-[#7D0A14] text-white shadow-md ring-2 ring-[#7D0A14]/20'
                : 'bg-[#FAF5EC] text-slate-700 hover:text-slate-900 hover:bg-[#F3EAD9]'
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-300" />
            <div className="text-left">
              <div className="leading-tight font-black">B2B Login</div>
              <div className={`text-[9px] font-normal ${accountType === 'business' ? 'text-amber-200' : 'text-slate-500'}`}>
                Wholesale Business
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#EDE1D1] shadow-soft overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] p-6 text-white text-center border-b border-[#8B121C]">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner">
            {accountType === 'business' ? (
              <Building2 className="w-6 h-6 text-amber-300" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            )}
          </div>
          <h1 className="text-xl font-black">
            {accountType === 'business' ? 'B2B Wholesale Portal' : 'B2C Customer Login'}
          </h1>
          <p className="text-xs text-amber-100/90 mt-1 max-w-sm mx-auto leading-relaxed">
            {accountType === 'business'
              ? 'Wholesale bulk pricing, GST tax invoices & recurring morning kitchen supplies for hotels, restaurants & caterers'
              : 'Sign in to track orders, manage daily milk subscriptions & save your favorites'}
          </p>

          {/* Business Perks Pill Strip */}
          {accountType === 'business' && (
            <div className="mt-3.5 pt-3 border-t border-white/15 flex items-center justify-around text-[10px] text-amber-200 font-bold">
              <span>🏷️ Wholesale Rates</span>
              <span>•</span>
              <span>🧾 GST Invoices</span>
              <span>•</span>
              <span>🚚 5:00 AM Delivery</span>
            </div>
          )}
        </div>

        {forgotPasswordActive ? (
          <div className="p-6 sm:p-8 space-y-4">
            <h2 className="font-extrabold text-slate-900 text-base">Forgot Your Password?</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your {accountType === 'business' ? 'work email or business phone' : 'email or phone number'} and we will send you a one-time OTP login code.
            </p>

            {resetSent ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Verification link sent! Redirecting back...</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {accountType === 'business' ? 'Work Email or Business Mobile' : 'Email or Mobile Number'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter email or 10-digit number"
                    value={accountType === 'business' ? businessIdentifier : identifier}
                    onChange={(e) =>
                      accountType === 'business'
                        ? setBusinessIdentifier(e.target.value)
                        : setIdentifier(e.target.value)
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#7D0A14] hover:bg-[#680811] text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Send OTP Code
                </button>
                <button
                  type="button"
                  onClick={() => setForgotPasswordActive(false)}
                  className="w-full text-center text-xs font-semibold text-slate-500 hover:text-[#7D0A14]"
                >
                  Return to Login
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* Tabs: Sign In vs Create Account */}
            <div className="grid grid-cols-2 bg-[#FAF5EC] p-1 rounded-2xl mb-6 border border-[#EDE1D1]">
              <button
                type="button"
                onClick={() => setTab('login')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${tab === 'login'
                    ? 'bg-white text-[#7D0A14] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab('register')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${tab === 'register'
                    ? 'bg-white text-[#7D0A14] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {accountType === 'business' ? 'Register Business' : 'Create Account'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* BUSINESS SPECIFIC FIELDS */}
              {accountType === 'business' ? (
                <>
                  {tab === 'register' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Company / Business Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sri Krishna Grand Hotels & Banquets"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                          />
                          <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Business Type
                          </label>
                          <select
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                          >
                            <option>Restaurant & Hotel</option>
                            <option>Catering & Banquets</option>
                            <option>Cloud Kitchen</option>
                            <option>Corporate Office Pantry</option>
                            <option>Supermarket / Retailer</option>
                            <option>School / Hostel Mess</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            GSTIN (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 36AABCU9603R1ZM"
                            value={gstin}
                            onChange={(e) => setGstin(e.target.value.toUpperCase())}
                            className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium uppercase"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Authorized Contact Person *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. K. S. Narayana (Manager)"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                          />
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Work Email or Business Mobile *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. procurement@srikrishnagrand.com"
                        value={businessIdentifier}
                        onChange={(e) => setBusinessIdentifier(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {tab === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Dispatch / Delivery Contact Phone *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="+91 98450 99888"
                          value={businessPhone}
                          onChange={(e) => setBusinessPhone(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">Password</label>
                      {tab === 'login' && (
                        <button
                          type="button"
                          onClick={() => setForgotPasswordActive(true)}
                          className="text-[11px] font-semibold text-[#7D0A14] hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter password"
                        value={businessPassword}
                        onChange={(e) => setBusinessPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* PERSONAL USER FIELDS */
                <>
                  {tab === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                        />
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email or Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. name@example.com or 9845012345"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {tab === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="+91 98450 12345"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">Password</label>
                      {tab === 'login' && (
                        <button
                          type="button"
                          onClick={() => setForgotPasswordActive(true)}
                          className="text-[11px] font-semibold text-[#7D0A14] hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-[#7D0A14] focus:ring-[#7D0A14] w-3.5 h-3.5"
                  />
                  <span>Remember me</span>
                </label>
                <span className="text-[11px] text-slate-400">256-Bit SSL Encrypted</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#7D0A14] hover:bg-[#680811] active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg shadow-[#7D0A14]/25 transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {accountType === 'business'
                    ? tab === 'login'
                      ? 'Sign In to Business Portal'
                      : 'Register Business Account'
                    : tab === 'login'
                      ? 'Sign In to Account'
                      : 'Create My Account'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Autofill Helpers */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={accountType === 'business' ? fillBusinessDemo : fillCustomerDemo}
                  className="text-[11px] text-slate-500 hover:text-[#7D0A14] underline font-medium"
                >
                  ⚡ Quick Demo: {accountType === 'business' ? 'Sri Krishna Grand (B2B)' : 'Rajesh Sharma (Customer)'}
                </button>
              </div>

              <div className="text-center pt-1 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  {tab === 'login' ? "Don't have an account? " : 'Already registered? '}
                  <button
                    type="button"
                    onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
                    className="text-[#7D0A14] font-bold hover:underline"
                  >
                    {tab === 'login' ? 'Create an account' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* B2B Wholesale Supply Information Card */}
      {accountType === 'business' ? (
        <div className="bg-white p-4 rounded-2xl border border-[#EDE1D1] shadow-2xs space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-[#3D040A]">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#7D0A14]" />
              <span>Wholesale Bulk Supply Desk</span>
            </span>
            <button
              onClick={() => navigateTo('b2b')}
              className="text-[#7D0A14] font-black hover:underline flex items-center gap-1"
            >
              <span>View Wholesale Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Need customized quotations, daily milk cans, 50kg vegetable bags or basmati rice for your commercial kitchen?
          </p>
        </div>
      ) : (
        <div className="bg-white p-3.5 rounded-2xl border border-[#EDE1D1] shadow-2xs text-center text-xs text-slate-500">
          Looking for commercial bulk supply? Switch to{' '}
          <button
            onClick={() => setAccountType('business')}
            className="text-[#7D0A14] font-black underline hover:text-[#55070E]"
          >
            B2B Wholesale Login
          </button>
        </div>
      )}
      {/* Admin Panel Direct Jump Demo Card */}
      <div className="bg-[#FAF5EC] p-3 rounded-2xl border border-[#EDE1D1] flex items-center justify-between text-xs">
        <span className="font-bold text-slate-700 flex items-center gap-1.5">
          <span>⚙️ Operations Admin Panel</span>
        </span>
        <button
          onClick={() => navigateTo('admin')}
          className="px-3 py-1.5 rounded-xl bg-[#3D040A] hover:bg-[#52060E] text-white font-extrabold text-[11px] transition-colors"
        >
          Open Admin Demo
        </button>
      </div>
    </div>
  );
};
