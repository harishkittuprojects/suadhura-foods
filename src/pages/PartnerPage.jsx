import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Bike,
  Navigation,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Store,
  RotateCcw,
  DollarSign,
  Award,
  Sparkles,
  BatteryCharging,
  Wifi,
  User,
  Key,
  ChevronRight,
  Package,
  Power,
  Send,
  ThumbsUp,
  X,
  Search
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const DEFAULT_PARTNERS = [
  {
    id: 'partner1',
    loginId: 'partner1',
    password: 'password123',
    name: 'Ramesh Kumar',
    phone: '+91 98450 77123',
    vehicle: 'TS09-EG-4412 (Ather EV Express)',
    branchHub: 'Branch 1 (Madhapur Hub)',
    branchCode: 'SMD-HYD-001',
    hubAddress: 'Plot 42, Hitec City Main Road, Cyber Towers Junction, Madhapur',
    rating: 4.94,
    totalDeliveries: 428,
    todayDeliveriesCount: 14,
    todayEarnings: 940,
    basePay: 560,
    tips: 160,
    surgeBonus: 220,
    status: 'online',
    coldChainEquipped: true,
    bagTemp: '3.6°C',
    battery: '88%'
  },
  {
    id: 'partner2',
    loginId: 'partner2',
    password: 'password123',
    name: 'Kiran Goud',
    phone: '+91 98450 77124',
    vehicle: 'TS09-EG-5589 (Hero Electric Flash)',
    branchHub: 'Branch 1 (Madhapur Hub)',
    branchCode: 'SMD-HYD-001',
    hubAddress: 'Plot 42, Hitec City Main Road, Cyber Towers Junction, Madhapur',
    rating: 4.88,
    totalDeliveries: 310,
    todayDeliveriesCount: 11,
    todayEarnings: 760,
    basePay: 440,
    tips: 140,
    surgeBonus: 180,
    status: 'online',
    coldChainEquipped: true,
    bagTemp: '3.8°C',
    battery: '94%'
  },
  {
    id: 'partner3',
    loginId: 'partner3',
    password: 'password123',
    name: 'Suresh Varma',
    phone: '+91 98450 77125',
    vehicle: 'TS09-EG-6623 (Bajaj Chetak EV)',
    branchHub: 'Branch 2 (Gachibowli Hub)',
    branchCode: 'SMD-HYD-002',
    hubAddress: 'Shop #14, Financial District Circle, Nanakramguda, Gachibowli',
    rating: 4.96,
    totalDeliveries: 512,
    todayDeliveriesCount: 16,
    todayEarnings: 1120,
    basePay: 640,
    tips: 220,
    surgeBonus: 260,
    status: 'online',
    coldChainEquipped: true,
    bagTemp: '3.5°C',
    battery: '82%'
  },
  {
    id: 'partner4',
    loginId: 'partner4',
    password: 'password123',
    name: 'Anil Reddy',
    phone: '+91 98450 77126',
    vehicle: 'TS09-EG-7741 (Ola S1 Pro EV)',
    branchHub: 'Branch 3 (Jubilee Hills Hub)',
    branchCode: 'SMD-HYD-003',
    hubAddress: 'Road No. 36, Near Jubilee Hills Check Post, Jubilee Hills',
    rating: 4.90,
    totalDeliveries: 380,
    todayDeliveriesCount: 13,
    todayEarnings: 880,
    basePay: 520,
    tips: 150,
    surgeBonus: 210,
    status: 'online',
    coldChainEquipped: true,
    bagTemp: '3.7°C',
    battery: '76%'
  }
];

export const INITIAL_DELIVERY_TASKS = [
  {
    id: 'DEL-90412',
    orderId: 'SMD-90412',
    customerName: 'Deepak Varma',
    customerPhone: '+91 98765 43210',
    deliveryAddress: 'Flat 402, Fortune Towers, Silicon Valley, Madhapur, Hyderabad',
    distanceKm: '2.4 km',
    estimatedTime: '8 mins',
    items: [
      { name: 'Pure Buffalo Farm Fresh Milk (1L)', qty: 2, coldChain: true },
      { name: 'Fresh Malai Paneer (200g)', qty: 1, coldChain: true },
      { name: 'Organic Royal Gala Apples (1kg)', qty: 1, coldChain: false }
    ],
    totalAmount: 480,
    paymentMethod: 'Prepaid (UPI / Paid)',
    partnerPay: 65,
    tip: 20,
    status: 'out-for-delivery', // 'assigned' | 'picked-up' | 'out-for-delivery' | 'arrived' | 'delivered'
    assignedAt: '10 mins ago',
    instructions: 'Ring bell and leave at door if no response. Cold-chain bag required.'
  },
  {
    id: 'DEL-90415',
    orderId: 'SMD-90415',
    customerName: 'Sneha Patel',
    customerPhone: '+91 98123 45678',
    deliveryAddress: 'Villa 18, Jayabheri Silicon County, Kondapur, Hyderabad',
    distanceKm: '3.8 km',
    estimatedTime: '12 mins',
    items: [
      { name: 'Desi Cow Bilona Ghee (500ml)', qty: 1, coldChain: false },
      { name: 'Pure Buffalo Farm Fresh Milk (1L)', qty: 3, coldChain: true }
    ],
    totalAmount: 890,
    paymentMethod: 'Cash on Delivery (Collect ₹890)',
    partnerPay: 85,
    tip: 30,
    status: 'assigned',
    assignedAt: '3 mins ago',
    instructions: 'Call before reaching the gate for security approval.'
  }
];

export const COMPLETED_DELIVERIES_HISTORY = [
  {
    id: 'DEL-90395',
    orderId: 'SMD-90395',
    customerName: 'Arun Teja',
    deliveredAt: '45 mins ago',
    address: 'Avasa Hotel Lane, Madhapur',
    amount: 192,
    payout: 65,
    rating: 5,
    status: 'Delivered On-Time (9 mins)'
  },
  {
    id: 'DEL-90390',
    orderId: 'SMD-90390',
    customerName: 'Rahul Sharma',
    deliveredAt: '1 hr 15 mins ago',
    address: 'DSR Fortune Prime, Durgam Cheruvu',
    amount: 650,
    payout: 85,
    rating: 5,
    status: 'Delivered On-Time (11 mins)'
  },
  {
    id: 'DEL-90382',
    orderId: 'SMD-90382',
    customerName: 'Meera Rao',
    deliveredAt: '2 hrs ago',
    address: 'Rainbow Vistas, Moosapet Rd',
    amount: 340,
    payout: 70,
    rating: 5,
    status: 'Delivered On-Time (14 mins)'
  }
];

export const PartnerPage = () => {
  const { navigateTo, showToast } = useShop();

  const [partnersList] = useState(DEFAULT_PARTNERS);
  const [currentPartner, setCurrentPartner] = useState(() => {
    try {
      const decoded = decodeURIComponent(window.location.pathname + window.location.hash).toLowerCase();
      const match = decoded.match(/partner[\/\s-]?([1-4])/i);
      if (match && match[1]) {
        const target = DEFAULT_PARTNERS.find((p) => p.id === `partner${match[1]}`);
        if (target) return target;
      }
      const saved = localStorage.getItem('sumadhura_active_partner');
      if (saved) return JSON.parse(saved);
      return DEFAULT_PARTNERS[0];
    } catch {
      return DEFAULT_PARTNERS[0];
    }
  });

  const [isOnline, setIsOnline] = useState(true);
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_partner_tasks');
      if (saved) return JSON.parse(saved);
      return INITIAL_DELIVERY_TASKS;
    } catch {
      return INITIAL_DELIVERY_TASKS;
    }
  });

  const [completedHistory, setCompletedHistory] = useState(COMPLETED_DELIVERIES_HISTORY);
  const [isPartnerLoginModalOpen, setIsPartnerLoginModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ loginId: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActivePartnerTab] = useState('active'); // 'active' | 'available' | 'earnings' | 'history'

  // Available pickup pool orders at the Branch Hub
  const [availablePool, setAvailablePool] = useState([
    {
      id: 'POOL-101',
      orderId: 'SMD-90422',
      customerName: 'Vikram Joshi',
      address: 'Prestige Ivy League, Hitec City',
      distance: '1.8 km',
      itemsCount: 3,
      pay: 55,
      coldChain: true,
      readyIn: 'Ready Now'
    },
    {
      id: 'POOL-102',
      orderId: 'SMD-90425',
      customerName: 'Ananya Deshmukh',
      address: 'My Home Bhooja, Block B, Silpa Gram Craft Village',
      distance: '3.1 km',
      itemsCount: 4,
      pay: 75,
      coldChain: true,
      readyIn: 'Ready in 2 mins'
    }
  ]);

  // Keep address bar synced to /partner1, /partner2, /partner3, /partner4
  useEffect(() => {
    try {
      const pNum = currentPartner?.id?.replace('partner', '') || '1';
      const targetPath = `/partner${pNum}`;
      const currentPath = decodeURIComponent(window.location.pathname).toLowerCase();
      if (!currentPath.includes(`partner${pNum}`)) {
        window.history.pushState(null, '', targetPath);
      }
    } catch {}
  }, [currentPartner]);

  // Listen for browser navigation (popstate / hashchange) to auto-select partner
  useEffect(() => {
    const handleUrlChange = () => {
      try {
        const decoded = decodeURIComponent(window.location.pathname + window.location.hash).toLowerCase();
        const match = decoded.match(/partner[\/\s-]?([1-4])/i);
        if (match && match[1]) {
          const target = DEFAULT_PARTNERS.find((p) => p.id === `partner${match[1]}`);
          if (target && target.id !== currentPartner?.id) {
            setCurrentPartner(target);
            try {
              localStorage.setItem('sumadhura_active_partner', JSON.stringify(target));
            } catch {}
          }
        }
      } catch {}
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [currentPartner]);

  const handlePartnerSwitch = (partner) => {
    setCurrentPartner(partner);
    const pNum = partner.id.replace('partner', '');
    try {
      window.history.pushState(null, '', `/partner${pNum}`);
      localStorage.setItem('sumadhura_active_partner', JSON.stringify(partner));
    } catch {}
    setIsPartnerLoginModalOpen(false);
    showToast(`🚴 Signed in as Delivery Partner ${partner.name} (${partner.vehicle})!`);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const raw = loginForm.loginId.trim().toLowerCase();
    const query = raw.replace(/\s+/g, '');
    const found = partnersList.find(
      (p) =>
        p.loginId.toLowerCase() === query ||
        p.id.toLowerCase() === query ||
        p.name.toLowerCase().includes(raw) ||
        (query === '1' && p.id === 'partner1') ||
        (query === '2' && p.id === 'partner2') ||
        (query === '3' && p.id === 'partner3') ||
        (query === '4' && p.id === 'partner4') ||
        (query.includes('partner1') && p.id === 'partner1') ||
        (query.includes('partner2') && p.id === 'partner2') ||
        (query.includes('partner3') && p.id === 'partner3') ||
        (query.includes('partner4') && p.id === 'partner4')
    );

    if (!found) {
      setLoginError('Invalid Partner ID. Enter partner1, partner2, partner3 or partner4 (password: password123)');
      showToast('❌ Partner credentials not recognized.', 'error');
      return;
    }

    handlePartnerSwitch(found);
    setLoginForm({ loginId: '', password: '' });
    setLoginError('');
  };

  const advanceTaskStatus = (taskId) => {
    setTasks((prevTasks) => {
      const target = prevTasks.find((t) => t.id === taskId);
      if (!target) return prevTasks;

      let nextStatus = 'assigned';
      if (target.status === 'assigned') {
        nextStatus = 'picked-up';
        showToast(`📦 Picked up from ${currentPartner.branchHub}. Bag Sealed & Ready!`, 'success');
      } else if (target.status === 'picked-up') {
        nextStatus = 'out-for-delivery';
        showToast('🛵 Out for Delivery! Navigation started to customer location.', 'info');
      } else if (target.status === 'out-for-delivery') {
        nextStatus = 'arrived';
        showToast('📍 Arrived at Customer Location! Call or ring bell.', 'info');
      } else if (target.status === 'arrived') {
        // Delivered!
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}

        showToast(`🎉 Order ${target.orderId} Delivered successfully! +₹${target.partnerPay + target.tip} credited to your earnings!`, 'success');

        // Add to completed history
        setCompletedHistory((prev) => [
          {
            id: target.id,
            orderId: target.orderId,
            customerName: target.customerName,
            deliveredAt: 'Just now',
            address: target.deliveryAddress,
            amount: target.totalAmount,
            payout: target.partnerPay + target.tip,
            rating: 5,
            status: 'Delivered On-Time'
          },
          ...prev
        ]);

        // Remove from active tasks
        const remaining = prevTasks.filter((t) => t.id !== taskId);
        try {
          localStorage.setItem('sumadhura_partner_tasks', JSON.stringify(remaining));
        } catch {}
        return remaining;
      }

      const updated = prevTasks.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t));
      try {
        localStorage.setItem('sumadhura_partner_tasks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const acceptPoolOrder = (poolItem) => {
    const newTask = {
      id: `DEL-${Date.now().toString().slice(-5)}`,
      orderId: poolItem.orderId,
      customerName: poolItem.customerName,
      customerPhone: '+91 99887 76655',
      deliveryAddress: poolItem.address,
      distanceKm: poolItem.distance,
      estimatedTime: '10 mins',
      items: [
        { name: 'Pure Buffalo Farm Fresh Milk (1L)', qty: 2, coldChain: true },
        { name: 'Fresh Paneer & Curd Pack', qty: 1, coldChain: true }
      ],
      totalAmount: 420,
      paymentMethod: 'Prepaid UPI',
      partnerPay: poolItem.pay,
      tip: 15,
      status: 'assigned',
      assignedAt: 'Just now',
      instructions: 'Insulated Cold-Chain Bag Verified. 10-15 Min Express SLA.'
    };

    setTasks((prev) => [newTask, ...prev]);
    setAvailablePool((prev) => prev.filter((p) => p.id !== poolItem.id));
    setActivePartnerTab('active');
    showToast(`✅ Order ${poolItem.orderId} Accepted! Pickup at ${currentPartner.branchHub}`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAF5EC] text-slate-900 font-sans pb-16 antialiased selection:bg-[#F5A623] selection:text-[#3D040A]">
      {/* ----------------------------------------------------------------- */}
      {/* TOP HEADER: BRAND IDENTITY, DRIVER BADGE & LIVE SHIFT STATUS     */}
      {/* ----------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#3D040A] text-amber-50 shadow-lg border-b border-[#52060E]">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3">
          {/* Logo & Hub Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#D98207] text-[#3D040A] flex items-center justify-center font-black shadow-md shrink-0">
              <Bike className="w-5 h-5 text-[#3D040A]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-sm sm:text-base text-amber-100 tracking-tight">
                  Sumadhura Express Fleet
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30 font-mono">
                  /partner{currentPartner.id.replace('partner', '')}
                </span>

                {/* Direct 1-Click /partner1-4 Quick Switch Pills */}
                <div className="hidden sm:inline-flex items-center gap-1 bg-black/20 p-0.5 rounded-lg border border-white/10 ml-1">
                  {partnersList.map((p) => {
                    const num = p.id.replace('partner', '');
                    const isSelected = currentPartner?.id === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handlePartnerSwitch(p)}
                        className={`px-2 py-0.5 rounded text-[10px] font-black transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-slate-900 shadow-2xs font-bold'
                            : 'text-amber-200/80 hover:text-white hover:bg-white/10'
                        }`}
                        title={`Open /partner${num} (${p.name})`}
                      >
                        /partner{num}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-200/80 font-medium">
                <span className="flex items-center gap-1">
                  <Store className="w-3 h-3 text-[#F5A623]" />
                  <span>{currentPartner.branchHub}</span>
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">10-15m Express</span>
              </div>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Shift Online / Offline Toggle */}
            <button
              type="button"
              onClick={() => {
                const next = !isOnline;
                setIsOnline(next);
                showToast(next ? '🟢 You are now ONLINE & ready for delivery orders!' : '⚪ You are now OFFLINE on break.', next ? 'success' : 'info');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer border ${
                isOnline
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-400/30'
                  : 'bg-white/10 hover:bg-white/20 text-amber-200 border-white/20'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isOnline ? 'Online (Ready)' : 'Offline'}</span>
              <span className="sm:hidden">{isOnline ? 'Online' : 'Off'}</span>
            </button>

            {/* Switch Partner / Login Button */}
            <button
              type="button"
              onClick={() => setIsPartnerLoginModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-100 font-bold text-xs border border-white/15 cursor-pointer active:scale-95 transition-all"
              title="Switch Delivery Partner profile"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline truncate max-w-[120px]">{currentPartner.name}</span>
              <span className="sm:hidden">Driver</span>
            </button>

            {/* Quick Link to Admin */}
            <a
              href="/admin"
              className="p-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-bold text-xs border border-amber-400/30 cursor-pointer"
              title="Go to Admin Panel"
            >
              <Store className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Status Sub-bar */}
        <div className="bg-[#2C0307] px-4 py-1.5 border-t border-[#52060E] text-[11px] font-bold text-amber-200/80">
          <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>GPS Live Tracking</span>
              </span>
              <span>•</span>
              <span className="text-amber-200">Vehicle: {currentPartner.vehicle}</span>
              <span>•</span>
              <span className="text-cyan-300">❄️ Bag Temp: {currentPartner.bagTemp} OK</span>
            </div>

            <div className="flex items-center gap-3">
              <span>🔋 Battery: {currentPartner.battery}</span>
              <span>★ {currentPartner.rating} Rating</span>
            </div>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* MAIN CONTAINER                                                    */}
      {/* ----------------------------------------------------------------- */}
      <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-5">
        {/* Rider KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#EDE1D1] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black text-slate-400">Today's Payout</span>
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              ₹{currentPartner.todayEarnings + completedHistory.length * 20}
            </div>
            <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
              Base + ₹{currentPartner.tips} Tips
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EDE1D1] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black text-slate-400">Drops Done</span>
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {currentPartner.todayDeliveriesCount + completedHistory.length}
            </div>
            <span className="text-[10px] text-blue-700 font-bold block mt-0.5">
              98.4% On-Time SLA
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EDE1D1] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black text-slate-400">Active Tasks</span>
              <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                <Package className="w-4 h-4" />
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {tasks.length}
            </div>
            <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
              {tasks.length > 0 ? 'Delivery in Progress' : 'Ready for New Order'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EDE1D1] shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black text-slate-400">Rider Rating</span>
              <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
                <Award className="w-4 h-4" />
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              ★ {currentPartner.rating}
            </div>
            <span className="text-[10px] text-purple-700 font-bold block mt-0.5">
              Super Rider Badge
            </span>
          </div>
        </div>

        {/* Tab Navigation Segmented Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#EDE1D1] rounded-2xl shadow-2xs overflow-x-auto">
          <button
            type="button"
            onClick={() => setActivePartnerTab('active')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'active'
                ? 'bg-[#7D0A14] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#FAF5EC]'
            }`}
          >
            <Bike className="w-3.5 h-3.5" />
            <span>Active Deliveries</span>
            {tasks.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === 'active' ? 'bg-[#F5A623] text-[#3D040A]' : 'bg-[#7D0A14] text-white'
              }`}>
                {tasks.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActivePartnerTab('available')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'available'
                ? 'bg-[#7D0A14] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#FAF5EC]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Hub Pickup Queue</span>
            {availablePool.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === 'available' ? 'bg-[#F5A623] text-[#3D040A]' : 'bg-slate-200 text-slate-800'
              }`}>
                {availablePool.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActivePartnerTab('history')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#7D0A14] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-[#FAF5EC]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Completed ({completedHistory.length})</span>
          </button>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* VIEW 1: ACTIVE DELIVERY TASKS                                   */}
        {/* --------------------------------------------------------------- */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-[#EDE1D1] shadow-2xs space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  All assigned orders are delivered!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Great work {currentPartner.name}! You are currently available. Check the Hub Pickup Queue to take new orders.
                </p>
                <button
                  type="button"
                  onClick={() => setActivePartnerTab('available')}
                  className="px-5 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black text-xs shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4" />
                  <span>Check Hub Pickup Queue ({availablePool.length})</span>
                </button>
              </div>
            ) : (
              tasks.map((task) => {
                const getStatusStep = (st) => {
                  switch (st) {
                    case 'assigned': return 1;
                    case 'picked-up': return 2;
                    case 'out-for-delivery': return 3;
                    case 'arrived': return 4;
                    case 'delivered': return 5;
                    default: return 1;
                  }
                };

                const currentStep = getStatusStep(task.status);

                return (
                  <div
                    key={task.id}
                    className="p-4 sm:p-6 bg-white rounded-3xl border-2 border-[#7D0A14]/20 shadow-md space-y-4"
                  >
                    {/* Task Top Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-xl bg-[#7D0A14] text-white font-black text-xs">
                          {task.orderId}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          Assigned {task.assignedAt}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black border border-amber-300">
                          {task.distanceKm} • ~{task.estimatedTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-500">
                          Earn: <strong className="text-emerald-700 text-sm font-black">₹{task.partnerPay + task.tip}</strong> (inc. ₹{task.tip} tip)
                        </span>
                      </div>
                    </div>

                    {/* Visual Progress Stepper */}
                    <div className="py-1">
                      <div className="flex items-center justify-between text-[11px] font-black text-slate-600 mb-2">
                        <span className={currentStep >= 1 ? 'text-[#7D0A14]' : ''}>1. Assigned</span>
                        <span className={currentStep >= 2 ? 'text-[#7D0A14]' : ''}>2. Picked Up</span>
                        <span className={currentStep >= 3 ? 'text-[#7D0A14]' : ''}>3. On the Way</span>
                        <span className={currentStep >= 4 ? 'text-[#7D0A14]' : ''}>4. At Door</span>
                        <span className={currentStep >= 5 ? 'text-emerald-700' : ''}>5. Delivered</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#F5A623] to-[#7D0A14] h-full rounded-full transition-all duration-300"
                          style={{ width: `${(currentStep / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Customer & Route Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF5EC]/60 p-4 rounded-2xl border border-[#EDE1D1]">
                      {/* Left: Pickup Origin */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-black text-slate-400 block flex items-center gap-1">
                          <Store className="w-3 h-3 text-[#7D0A14]" />
                          <span>Pickup Origin Hub</span>
                        </span>
                        <div className="font-black text-slate-900 text-xs">{currentPartner.branchHub}</div>
                        <p className="text-[11px] text-slate-600 line-clamp-1">{currentPartner.hubAddress}</p>
                        <span className="inline-block text-[10px] font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-md border border-cyan-300">
                          ❄️ Insulated Cold Chain Box {currentPartner.bagTemp}
                        </span>
                      </div>

                      {/* Right: Drop Destination & Customer Contact */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-black text-slate-400 block flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-600" />
                          <span>Delivery Destination</span>
                        </span>
                        <div className="font-black text-slate-900 text-xs flex items-center justify-between">
                          <span>{task.customerName}</span>
                          <span className="text-[11px] font-bold text-slate-600">{task.paymentMethod}</span>
                        </div>
                        <p className="text-[11px] text-slate-700 font-medium leading-snug">{task.deliveryAddress}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href={`tel:${task.customerPhone}`}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] flex items-center gap-1 shadow-2xs"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Customer</span>
                          </a>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(task.deliveryAddress)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] flex items-center gap-1 shadow-2xs"
                          >
                            <Navigation className="w-3 h-3" />
                            <span>GPS Navigate</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Order Checklist */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-black text-slate-400 block">
                        Items in Parcel ({task.items.length} items)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {task.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                          >
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="w-5 h-5 rounded-md bg-[#7D0A14] text-amber-200 text-[10px] font-black flex items-center justify-center shrink-0">
                                {it.qty}x
                              </span>
                              <span className="truncate font-bold text-slate-800 text-[11px]">{it.name}</span>
                            </div>
                            {it.coldChain && (
                              <span className="text-[10px] font-black text-cyan-700 shrink-0">❄️ Cold</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Instructions */}
                    {task.instructions && (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>Customer Note: {task.instructions}</span>
                      </div>
                    )}

                    {/* Action Execution Button */}
                    <div className="pt-2">
                      {task.status === 'assigned' && (
                        <button
                          type="button"
                          onClick={() => advanceTaskStatus(task.id)}
                          className="w-full py-3 rounded-2xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#7D0A14]/25 active:scale-95 transition-all cursor-pointer"
                        >
                          <Package className="w-4 h-4 text-[#F5A623]" />
                          <span>1. Confirm Pickup from {currentPartner.branchHub} & Depart</span>
                        </button>
                      )}

                      {task.status === 'picked-up' && (
                        <button
                          type="button"
                          onClick={() => advanceTaskStatus(task.id)}
                          className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 active:scale-95 transition-all cursor-pointer"
                        >
                          <Bike className="w-4 h-4 text-amber-300" />
                          <span>2. Start Live Transit / Out for Delivery</span>
                        </button>
                      )}

                      {task.status === 'out-for-delivery' && (
                        <button
                          type="button"
                          onClick={() => advanceTaskStatus(task.id)}
                          className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-[#3D040A] font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
                        >
                          <MapPin className="w-4 h-4" />
                          <span>3. Arrived at Customer Doorstep ({task.customerName})</span>
                        </button>
                      )}

                      {task.status === 'arrived' && (
                        <button
                          type="button"
                          onClick={() => advanceTaskStatus(task.id)}
                          className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-5 h-5 text-white" />
                          <span>4. Handover & Mark Delivered (Collect ₹{task.partnerPay + task.tip} Payout)</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* VIEW 2: HUB PICKUP QUEUE (AVAILABLE ORDERS READY AT HUB)        */}
        {/* --------------------------------------------------------------- */}
        {activeTab === 'available' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-sm">
                  Orders Packed & Ready for Pickup at {currentPartner.branchHub}
                </h3>
                <p className="text-xs text-slate-500">
                  Accept an order to claim delivery payout and start trip.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                {availablePool.length} Ready
              </span>
            </div>

            {availablePool.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-[#EDE1D1] shadow-2xs space-y-2">
                <Package className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-black text-slate-800 text-sm">No orders in queue right now</h4>
                <p className="text-xs text-slate-500">
                  New incoming customer orders will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availablePool.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-3xl bg-white border border-[#EDE1D1] shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#7D0A14] text-white font-black text-xs">
                          {item.orderId}
                        </span>
                        <span className="text-sm font-black text-emerald-700">
                          Earn ₹{item.pay}
                        </span>
                      </div>

                      <div className="font-black text-slate-900 text-xs">
                        Customer: {item.customerName}
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{item.address}</span>
                      </p>

                      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-bold">
                        <span>Distance: {item.distance}</span>
                        <span>•</span>
                        <span>{item.itemsCount} items</span>
                        <span>•</span>
                        <span className="text-cyan-700 font-black">❄️ Cold-Chain</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => acceptPoolOrder(item)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      <Bike className="w-3.5 h-3.5" />
                      <span>Accept Order & Start Delivery (₹{item.pay})</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* VIEW 3: COMPLETED DELIVERIES HISTORY                            */}
        {/* --------------------------------------------------------------- */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-sm">
                  Today's Delivered Orders ({completedHistory.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Total earnings earned from completed drops today: ₹{completedHistory.reduce((sum, c) => sum + c.payout, 0)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#EDE1D1] shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[550px] text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAF5EC] text-slate-700 font-extrabold border-b border-[#EDE1D1]">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer & Drop Area</th>
                      <th className="p-3">Delivered Time</th>
                      <th className="p-3">Order Value</th>
                      <th className="p-3">Rider Payout</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {completedHistory.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="p-3 font-black text-[#7D0A14]">{row.orderId}</td>
                        <td className="p-3">
                          <div className="font-black text-slate-900">{row.customerName}</div>
                          <div className="text-[11px] text-slate-500">{row.address}</div>
                        </td>
                        <td className="p-3 text-slate-600 font-medium">{row.deliveredAt}</td>
                        <td className="p-3 font-bold text-slate-800">₹{row.amount}</td>
                        <td className="p-3">
                          <span className="font-black text-emerald-700">₹{row.payout}</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                            ✓ {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ----------------------------------------------------------------- */}
      {/* PARTNER SWITCHER / LOGIN MODAL                                    */}
      {/* ----------------------------------------------------------------- */}
      {isPartnerLoginModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={() => setIsPartnerLoginModalOpen(false)}
        >
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">
                    Delivery Partner Portal Login
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Select a rider profile or enter login ID (/partner)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPartnerLoginModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1-Click Fast Rider Switcher Cards */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                Select Active Fleet Rider
              </label>
              <div className="grid grid-cols-2 gap-2">
                {partnersList.map((p) => {
                  const num = p.id.replace('partner', '');
                  const isCurrent = currentPartner?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePartnerSwitch(p)}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-[#7D0A14] bg-[#FAF5EC] ring-2 ring-[#7D0A14]/20'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-black text-[#7D0A14] bg-white px-1.5 py-0.5 rounded border border-[#EDE1D1]">
                          /partner{num}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="font-black text-slate-900 text-xs truncate">{p.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{p.vehicle}</div>
                      <div className="text-[9px] text-[#7D0A14] font-bold mt-1">★ {p.rating} • {p.branchCode}</div>
                      <div className="mt-1.5 text-[10px] font-black text-emerald-700 flex items-center gap-0.5">
                        <span>Open /partner{num}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Or Enter Rider ID
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Partner Login ID *
                </label>
                <input
                  type="text"
                  value={loginForm.loginId}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, loginId: e.target.value });
                    setLoginError('');
                  }}
                  placeholder="e.g. partner1, partner2, partner3, partner4"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Tip: enter <strong>partner1</strong> (password: <strong>password123</strong>)
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, password: e.target.value });
                    setLoginError('');
                  }}
                  placeholder="Enter password (default: password123)"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  required
                />
              </div>

              {loginError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPartnerLoginModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black shadow-md cursor-pointer"
                >
                  Sign In to /partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default PartnerPage;

