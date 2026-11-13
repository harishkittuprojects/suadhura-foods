import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Building2,
  User,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
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
  ChevronLeft,
  Zap,
  Users,
  Trash2,
  Edit3,
  Pencil,
  Save,
  Settings,
  ImageIcon,
  Upload,
  ArrowUp,
  ArrowDown,
  Boxes,
  MoreVertical,
  LayoutGrid,
  Briefcase,
  Handshake,
  BarChart3,
  Ticket,
  Warehouse,
  Tag,
  CreditCard,
  Star,
  Globe,
  Key,
  MapPin,
  Phone,
  MoreHorizontal,
  UserPlus,
  ClipboardList,
  Bike
} from 'lucide-react';

import { DEFAULT_HERO_SLIDES } from './HomePage';
import { ErpSuite } from '../components/erp/ErpSuite';

export const DEFAULT_SHOPS = [
  {
    id: 'shop1',
    loginId: 'branch1',
    email: 'branch1@sumadhura.com',
    password: 'password123',
    name: 'Sumadhura Express Store #1 - Branch 1 (Madhapur Hub)',
    shortName: 'Branch 1 (Madhapur)',
    branchCode: 'SMD-HYD-001',
    tagline: 'Flagship Tech District Dispatch & Express Fulfillment Centre',
    manager: 'Ramesh Varma',
    phone: '+91 98450 11001',
    address: 'Plot 42, Hitec City Main Road, Cyber Towers Junction, Madhapur, Hyderabad, Telangana 500081',
    fssai: '13622011000189',
    gstin: '36AABCS1234F1Z5',
    timings: '5:00 AM – 11:00 PM Express Delivery',
    coverage: 'Madhapur, Hitec City, Kondapur, KPHB (5.5 km Radius)',
    dispatchFleetCount: 8,
    dailyCapacity: 450,
    coldChainTemp: '3.8°C OK',
    rating: 4.9,
    ordersCount: 142,
    todayRevenue: 28450,
    activeStatus: 'Active & Fulfilling',
    colorTheme: 'from-emerald-700 to-emerald-950',
    accentColor: 'text-emerald-700',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    inventory: [
      { id: 'inv-101', name: 'Pure Buffalo Milk (1L)', stock: 85, unit: 'Litres', category: 'Dairy', inStock: true },
      { id: 'inv-102', name: 'Fresh Malai Paneer (200g)', stock: 42, unit: 'Packs', category: 'Dairy', inStock: true },
      { id: 'inv-103', name: 'Desi Cow Bilona Ghee (500ml)', stock: 28, unit: 'Jars', category: 'Dairy', inStock: true },
      { id: 'inv-104', name: 'Farm Crisp Carrots (500g)', stock: 60, unit: 'kg', category: 'Vegetables', inStock: true },
      { id: 'inv-105', name: 'Organic Royal Gala Apples (1kg)', stock: 35, unit: 'Packs', category: 'Fruits', inStock: true },
      { id: 'inv-106', name: 'Thick Curd (400g)', stock: 50, unit: 'Tubs', category: 'Dairy', inStock: true }
    ],
    assignedOrders: [
      { id: 'SMD-90412', customer: 'Deepak Varma', items: '2x Buffalo Milk, 1x Paneer', total: 226, status: 'Packing', time: '5 mins ago', partner: 'Kiran G. (★ 4.9)' },
      { id: 'SMD-90408', customer: 'Sneha Patel', items: '1x Desi Ghee, 2x Apples', total: 840, status: 'Dispatched', time: '14 mins ago', partner: 'Ramesh K. (★ 4.8)' },
      { id: 'SMD-90395', customer: 'Arun Teja', items: '3x Buffalo Milk (1L)', total: 192, status: 'Delivered', time: '32 mins ago', partner: 'Sunil R. (★ 4.9)' }
    ]
  },
  {
    id: 'shop2',
    loginId: 'branch2',
    email: 'branch2@sumadhura.com',
    password: 'password123',
    name: 'Sumadhura Fresh Mart #2 - Branch 2 (Gachibowli Hub)',
    shortName: 'Branch 2 (Gachibowli)',
    branchCode: 'SMD-HYD-002',
    tagline: 'Financial District Corporate & Residential Cold-Chain Hub',
    manager: 'Priya Reddy',
    phone: '+91 98450 22002',
    address: 'Shop #14, Financial District Circle, Nanakramguda, Gachibowli, Hyderabad, Telangana 500032',
    fssai: '13622011000290',
    gstin: '36AABCS5678F2Z8',
    timings: '5:00 AM – 11:30 PM Express Delivery',
    coverage: 'Gachibowli, Financial District, Kokapet, Nanakramguda (6.0 km Radius)',
    dispatchFleetCount: 10,
    dailyCapacity: 550,
    coldChainTemp: '3.5°C OK',
    rating: 4.95,
    ordersCount: 186,
    todayRevenue: 37200,
    activeStatus: 'Active & Fulfilling',
    colorTheme: 'from-amber-700 to-amber-950',
    accentColor: 'text-amber-700',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    inventory: [
      { id: 'inv-201', name: 'Pure Buffalo Milk (1L)', stock: 110, unit: 'Litres', category: 'Dairy', inStock: true },
      { id: 'inv-202', name: 'Fresh Malai Paneer (200g)', stock: 55, unit: 'Packs', category: 'Dairy', inStock: true },
      { id: 'inv-203', name: 'Desi Cow Bilona Ghee (500ml)', stock: 34, unit: 'Jars', category: 'Dairy', inStock: true },
      { id: 'inv-204', name: 'Farm Crisp Carrots (500g)', stock: 75, unit: 'kg', category: 'Vegetables', inStock: true },
      { id: 'inv-205', name: 'Organic Royal Gala Apples (1kg)', stock: 48, unit: 'Packs', category: 'Fruits', inStock: true },
      { id: 'inv-206', name: 'Thick Curd (400g)', stock: 65, unit: 'Tubs', category: 'Dairy', inStock: true }
    ],
    assignedOrders: [
      { id: 'SMD-90415', customer: 'Vikram Joshi', items: '4x Buffalo Milk (1L)', total: 256, status: 'Packing', time: '2 mins ago', partner: 'Suresh V. (★ 4.9)' },
      { id: 'SMD-90410', customer: 'Meera Rao', items: '2x Paneer, 1x Curd', total: 238, status: 'Dispatched', time: '11 mins ago', partner: 'Anil K. (★ 4.8)' },
      { id: 'SMD-90390', customer: 'Rahul Sharma', items: '1x Desi Ghee (500ml)', total: 650, status: 'Delivered', time: '40 mins ago', partner: 'Naresh M. (★ 5.0)' }
    ]
  },
  {
    id: 'shop3',
    loginId: 'branch3',
    email: 'branch3@sumadhura.com',
    password: 'password123',
    name: 'Sumadhura Super Store #3 - Branch 3 (Jubilee Hills Hub)',
    shortName: 'Branch 3 (Jubilee Hills)',
    branchCode: 'SMD-HYD-003',
    tagline: 'Premium Heritage Organic Sourcing & Gourmet Hub',
    manager: 'K. Venkat Rao',
    phone: '+91 98450 33003',
    address: 'Road No. 36, Near Jubilee Hills Check Post, Jubilee Hills, Hyderabad, Telangana 500033',
    fssai: '13622011000391',
    gstin: '36AABCS9012F3Z1',
    timings: '5:00 AM – 11:00 PM Express Delivery',
    coverage: 'Jubilee Hills, Banjara Hills, Film Nagar, Madhapur Rd (7.0 km Radius)',
    dispatchFleetCount: 12,
    dailyCapacity: 600,
    coldChainTemp: '3.7°C OK',
    rating: 4.98,
    ordersCount: 215,
    todayRevenue: 44100,
    activeStatus: 'Active & Fulfilling',
    colorTheme: 'from-purple-700 to-purple-950',
    accentColor: 'text-purple-700',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    inventory: [
      { id: 'inv-301', name: 'Pure Buffalo Milk (1L)', stock: 135, unit: 'Litres', category: 'Dairy', inStock: true },
      { id: 'inv-302', name: 'Fresh Malai Paneer (200g)', stock: 70, unit: 'Packs', category: 'Dairy', inStock: true },
      { id: 'inv-303', name: 'Desi Cow Bilona Ghee (500ml)', stock: 50, unit: 'Jars', category: 'Dairy', inStock: true },
      { id: 'inv-304', name: 'Farm Crisp Carrots (500g)', stock: 90, unit: 'kg', category: 'Vegetables', inStock: true },
      { id: 'inv-305', name: 'Organic Royal Gala Apples (1kg)', stock: 62, unit: 'Packs', category: 'Fruits', inStock: true },
      { id: 'inv-306', name: 'Thick Curd (400g)', stock: 85, unit: 'Tubs', category: 'Dairy', inStock: true }
    ],
    assignedOrders: [
      { id: 'SMD-90418', customer: 'Dr. Rajeshwar', items: '2x Bilona Ghee, 2x Paneer', total: 1496, status: 'Packing', time: '1 min ago', partner: 'Praveen T. (★ 5.0)' },
      { id: 'SMD-90411', customer: 'Ananya Deshmukh', items: '3x Apples, 2x Carrots', total: 580, status: 'Dispatched', time: '8 mins ago', partner: 'Gopi L. (★ 4.9)' },
      { id: 'SMD-90401', customer: 'Harish V.', items: '4x Buffalo Milk (1L)', total: 256, status: 'Delivered', time: '25 mins ago', partner: 'Mohan B. (★ 4.8)' }
    ]
  }
];

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
    login,
    orders: contextOrders,
    setOrders: setContextOrders,
    subscriptions: contextSubs,
    setSubscriptions: setContextSubs,
    addSubscription,
    toggleSubscriptionStatus,
    cancelSubscription,
    deleteOrder,
    addProduct,
    deleteProduct: contextDeleteProduct
  } = useShop();

  const orders = contextOrders || [];
  const subscriptions = contextSubs || [];
  const setOrders = setContextOrders;
  const setSubscriptions = setContextSubs;

  // Mode: 'unified' | 'b2c' | 'b2b'
  const [adminMode, setAdminMode] = useState('unified');
  // Tabs: 'overview' | 'orders' | 'subscriptions' | 'b2b-quotes' | 'inventory' | 'invoices' | 'shop-store-details' | 'erp-suite'
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p.includes('/branch') || h.includes('branch')) {
        return 'shop-store-details';
      }
      if (p.includes('/erp') || h.includes('erp')) {
        return 'erp-suite';
      }
    } catch {}
    return 'dashboard';
  });

  // Mobile sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Daily-Wise Calendar Date Filter State: 'all' | 'today' | 'yesterday' | 'week' | 'custom'
  const [orderDateRange, setOrderDateRange] = useState('all');
  const [selectedCustomDate, setSelectedCustomDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false);
  const [isDailyOrdersModalOpen, setIsDailyOrdersModalOpen] = useState(false);

  // -------------------------------------------------------------------
  // MULTI-BRANCH STORES & BRANCH LOGIN (Branch 1, Branch 2, Branch 3)
  // -------------------------------------------------------------------
  const [shopsList, setShopsList] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_admin_shops');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((s) => {
          const defaultMatch = DEFAULT_SHOPS.find(d => d.id === s.id);
          return {
            ...s,
            shortName: s.shortName?.replace(/Shop\s*([1-3])/i, 'Branch $1') || defaultMatch?.shortName || s.shortName,
            name: s.name?.replace(/Shop\s*([1-3])/i, 'Branch $1') || defaultMatch?.name || s.name,
            loginId: s.loginId?.replace('shop', 'branch') || defaultMatch?.loginId || s.loginId
          };
        });
      }
      return DEFAULT_SHOPS;
    } catch {
      return DEFAULT_SHOPS;
    }
  });

  const getBranchNum = (shopOrId, fallback = '1') => {
    const raw = typeof shopOrId === 'string' ? shopOrId : (shopOrId?.loginId || shopOrId?.id || '');
    const m = String(raw).match(/(\d+)/);
    return m ? m[1] : String(fallback);
  };

  const [currentShop, setCurrentShop] = useState(() => {
    try {
      const decoded = decodeURIComponent(window.location.pathname + window.location.hash).toLowerCase();
      const branchMatch = decoded.match(/branch[\/\s-]?(\d+)/i);
      if (branchMatch && branchMatch[1]) {
        const num = branchMatch[1];
        const matchBranch = shopsList.find(
          s => s.id === `shop${num}` || s.loginId === `branch${num}`
        );
        if (matchBranch) return matchBranch;
      }
      const savedShopId = localStorage.getItem('sumadhura_active_shop_id');
      if (savedShopId) {
        const found = shopsList.find(s => s.id === savedShopId || s.loginId === savedShopId);
        if (found) return found;
      }
      return shopsList[0] || DEFAULT_SHOPS[0];
    } catch {
      return DEFAULT_SHOPS[0];
    }
  });

  // URL synchronization: Keep address bar updated to /branch1, /branch2, /branch3, /erp, or /admin
  useEffect(() => {
    try {
      if (activeTab === 'shop-store-details') {
        const branchNum = getBranchNum(currentShop, '1');
        const expectedPath = `/branch${branchNum}`;
        const currentDecoded = decodeURIComponent(window.location.pathname + window.location.hash).toLowerCase();
        if (
          !currentDecoded.includes(`branch${branchNum}`) &&
          !currentDecoded.includes(`branch/${branchNum}`) &&
          !currentDecoded.includes(`branch ${branchNum}`) &&
          !currentDecoded.includes(`branch-${branchNum}`)
        ) {
          window.history.pushState(null, '', expectedPath);
        }
      } else if (activeTab === 'erp-suite') {
        if (!window.location.pathname.includes('/erp') && !window.location.hash.includes('erp')) {
          window.history.pushState(null, '', '/erp');
        }
      } else {
        if (
          window.location.pathname.includes('/branch') || window.location.hash.includes('branch') ||
          window.location.pathname.includes('/erp') || window.location.hash.includes('erp')
        ) {
          window.history.pushState(null, '', '/admin');
        }
      }
    } catch {}
  }, [activeTab, currentShop]);

  // Handle browser back/forward or direct /branch1, /branch2, /branch3+ or /erp navigation
  useEffect(() => {
    const handleUrlSync = () => {
      try {
        const decoded = decodeURIComponent(window.location.pathname + window.location.hash).toLowerCase();
        if (decoded.includes('branch')) {
          setActiveTab('shop-store-details');
          const match = decoded.match(/branch[\/\s-]?(\d+)/i);
          if (match && match[1]) {
            const num = match[1];
            const target = shopsList.find(s => s.id === `shop${num}` || s.loginId === `branch${num}`);
            if (target) setCurrentShop(target);
          }
        } else if (decoded.includes('erp')) {
          setActiveTab('erp-suite');
        }
      } catch {}
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, [shopsList]);

  const [isShopLoginModalOpen, setIsShopLoginModalOpen] = useState(false);
  const [isEditShopModalOpen, setIsEditShopModalOpen] = useState(false);
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  const [newBranchForm, setNewBranchForm] = useState({
    area: '',
    manager: '',
    phone: '+91 ',
    address: '',
    coverage: '',
    dailyCapacity: 400,
    dispatchFleetCount: 6
  });
  const [shopLoginForm, setShopLoginForm] = useState({ loginId: '', password: '' });
  const [shopLoginError, setShopLoginError] = useState('');
  const [storeActiveSubTab, setStoreActiveSubTab] = useState('orders'); // 'orders' | 'inventory' | 'fleet' | 'profile'
  const [editStoreForm, setEditStoreForm] = useState(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [branchesDropdownOpen, setBranchesDropdownOpen] = useState(false);

  const handleAddBranch = (e) => {
    e.preventDefault();
    const area = newBranchForm.area.trim();
    if (!area) {
      showToast('Please enter a branch area / location name.', 'error');
      return;
    }
    const nextNum = shopsList.length + 1;
    const paddedNum = String(nextNum).padStart(3, '0');
    const newShop = {
      id: `shop${nextNum}`,
      loginId: `branch${nextNum}`,
      email: `branch${nextNum}@sumadhura.com`,
      password: 'password123',
      name: `Sumadhura Express Hub #${nextNum} - Branch ${nextNum} (${area} Hub)`,
      shortName: `Branch ${nextNum} (${area})`,
      branchCode: `SMD-HYD-${paddedNum}`,
      tagline: `${area} Cold-Chain Express Dispatch Hub`,
      manager: newBranchForm.manager.trim() || 'Branch Manager',
      phone: newBranchForm.phone.trim() || '+91 98450 00000',
      address: newBranchForm.address.trim() || `${area}, Hyderabad, Telangana`,
      fssai: `13622011000${paddedNum}`,
      gstin: `36AABCS${paddedNum}F1Z5`,
      timings: '5:00 AM – 11:00 PM Express Delivery',
      coverage: newBranchForm.coverage.trim() || `${area} (5.0 km Radius)`,
      dispatchFleetCount: Number(newBranchForm.dispatchFleetCount) || 6,
      dailyCapacity: Number(newBranchForm.dailyCapacity) || 400,
      coldChainTemp: '3.6°C OK',
      rating: 5.0,
      ordersCount: 0,
      todayRevenue: 0,
      activeStatus: 'Active & Ready',
      colorTheme: 'from-emerald-700 to-emerald-950',
      accentColor: 'text-emerald-700',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      image: DEFAULT_SHOPS[0].image,
      inventory: DEFAULT_SHOPS[0].inventory.map((item, idx) => ({
        ...item,
        id: `inv-${nextNum}0${idx + 1}`,
        stock: 50
      })),
      assignedOrders: []
    };

    const updatedShops = [...shopsList, newShop];
    setShopsList(updatedShops);
    setCurrentShop(newShop);
    try {
      localStorage.setItem('sumadhura_admin_shops', JSON.stringify(updatedShops));
      localStorage.setItem('sumadhura_active_shop_id', newShop.id);
    } catch {}

    setIsAddBranchModalOpen(false);
    setNewBranchForm({
      area: '',
      manager: '',
      phone: '+91 ',
      address: '',
      coverage: '',
      dailyCapacity: 400,
      dispatchFleetCount: 6
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    showToast(`🏪 Added ${newShop.shortName}! Route /branch${nextNum} is now live.`, 'success');
  };

  const handleShopLogin = (loginIdOrShop) => {
    let targetShop = null;
    if (typeof loginIdOrShop === 'object' && loginIdOrShop?.id) {
      targetShop = shopsList.find(s => s.id === loginIdOrShop.id) || loginIdOrShop;
    } else {
      const query = (loginIdOrShop || shopLoginForm.loginId || '').trim().toLowerCase();
      targetShop = shopsList.find(
        s => (s.loginId && s.loginId.toLowerCase() === query) ||
             (s.id && s.id.toLowerCase() === query) ||
             (s.email && s.email.toLowerCase() === query) ||
             (s.name && s.name.toLowerCase().includes(query)) ||
             (s.shortName && s.shortName.toLowerCase().includes(query)) ||
             (query.replace(/\s+/g, '') === `branch${getBranchNum(s)}`) ||
             (query === getBranchNum(s))
      );
    }

    if (!targetShop) {
      setShopLoginError('Invalid Branch credentials. Please enter branch1, branch2, or branch3 (password: password123)');
      showToast('❌ Branch credentials not recognized. Enter branch1, branch2, or branch3.', 'error');
      return;
    }

    setCurrentShop(targetShop);
    try {
      localStorage.setItem('sumadhura_active_shop_id', targetShop.id);
    } catch {}

    setIsShopLoginModalOpen(false);
    setShopLoginError('');
    setShopLoginForm({ loginId: '', password: '' });

    // AUTOMATICALLY OPEN BRANCH DETAILS AND UPDATE URL TO /branch1, /branch2, /branch3+
    setActiveTab('shop-store-details');
    const branchNum = getBranchNum(targetShop, '1');
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `/branch${branchNum}`);
      }
    } catch {}

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    showToast(`🏪 Successfully logged in as ${targetShop.shortName}! Opening /branch${branchNum} details...`, 'success');
  };

  const handleUpdateStoreDetails = (e) => {
    e.preventDefault();
    if (!editStoreForm || !currentShop) return;
    const updatedShops = shopsList.map(s => s.id === currentShop.id ? { ...s, ...editStoreForm } : s);
    setShopsList(updatedShops);
    setCurrentShop({ ...currentShop, ...editStoreForm });
    try {
      localStorage.setItem('sumadhura_admin_shops', JSON.stringify(updatedShops));
    } catch {}
    setIsEditShopModalOpen(false);
    showToast(`✅ Store details updated for ${currentShop.shortName}!`);
  };

  const handleRestockStoreItem = (shopId, itemId) => {
    const updatedShops = shopsList.map(shop => {
      if (shop.id !== shopId) return shop;
      const updatedInv = (shop.inventory || []).map(item => {
        if (item.id === itemId) {
          return { ...item, stock: (item.stock || 0) + 20, inStock: true };
        }
        return item;
      });
      return { ...shop, inventory: updatedInv };
    });
    setShopsList(updatedShops);
    const active = updatedShops.find(s => s.id === (currentShop ? currentShop.id : ''));
    if (active) setCurrentShop(active);
    try {
      localStorage.setItem('sumadhura_admin_shops', JSON.stringify(updatedShops));
    } catch {}
    showToast(`📦 Restocked +20 units for this store!`, 'success');
  };

  const handleUpdateShopCash = (shopId, cashData) => {
    const updatedShops = shopsList.map((shop) => {
      if (shop.id !== shopId) return shop;
      const cashInCounter = Number(cashData.cashInCounter) || 0;
      const openingFloat = Number(cashData.openingFloat) || 0;
      const cashHandover = Number(cashData.cashHandover) || 0;
      const digitalRevenue = Number(cashData.digitalRevenue) !== undefined && !isNaN(Number(cashData.digitalRevenue))
        ? Number(cashData.digitalRevenue)
        : Math.max(0, (shop.todayRevenue || 0) - cashInCounter);
      return {
        ...shop,
        cashInCounter,
        openingFloat,
        cashHandover,
        digitalRevenue,
        lastCashier: cashData.cashierName || shop.manager || 'Counter Cashier',
        lastCashUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
    });
    setShopsList(updatedShops);
    const active = updatedShops.find((s) => s.id === (currentShop ? currentShop.id : ''));
    if (active) setCurrentShop(active);
    try {
      localStorage.setItem('sumadhura_admin_shops', JSON.stringify(updatedShops));
    } catch {}
    showToast(`💵 Cash counter updated for ${shopsList.find(s => s.id === shopId)?.shortName || 'Branch'}!`, 'success');
  };

  // Helper to extract a normalized YYYY-MM-DD date from an order
  const getOrderDateString = (o) => {
    if (!o) return '';
    if (o.createdAt) {
      try {
        const d = new Date(o.createdAt);
        if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
      } catch {}
    }
    if (o.timestamp && o.timestamp !== 'Just now') {
      try {
        const d = new Date(o.timestamp);
        if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
      } catch {}
    }
    if (o.date) {
      if (o.date === 'Today' || o.date === 'Just now') {
        return new Date().toISOString().split('T')[0];
      }
      try {
        const d = new Date(o.date);
        if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
      } catch {}
    }
    return new Date().toISOString().split('T')[0];
  };

  const matchesOrderDate = (order, range, customDateStr) => {
    if (range === 'all') return true;
    const orderDateStr = getOrderDateString(order);
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    if (range === 'today') {
      return orderDateStr === todayStr || order.date === 'Today' || order.date === 'Just now' || order.timestamp === 'Just now';
    }

    if (range === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      return orderDateStr === yesterdayStr;
    }

    if (range === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      const weekAgoStr = weekAgo.toISOString().split('T')[0];
      return orderDateStr >= weekAgoStr && orderDateStr <= todayStr;
    }

    if (range === 'custom') {
      return orderDateStr === customDateStr;
    }

    return true;
  };

  // Selected invoice for Modal viewing
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Manual Subscription Modal State (Admin create for real customer)
  const [isManualSubModalOpen, setIsManualSubModalOpen] = useState(false);
  const [manualSubForm, setManualSubForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    items: 'Farm Fresh Pure Cow Milk (500ml) (2)',
    address: 'Madhapur / Hitec City, Hyderabad',
    frequency: 'daily',
    slot: '6:00 AM - 7:00 AM',
    durationDays: 30,
    dailyCost: 68
  });

  // Real-time synchronization: live customer subscriptions appear instantly without page reload
  React.useEffect(() => {
    const reloadAdminLiveFeed = () => {
      try {
        const savedSubs = localStorage.getItem('sumadhura_subscriptions');
        if (savedSubs) {
          const parsed = JSON.parse(savedSubs);
          setSubscriptions(parsed);
        }
        const savedCusts = localStorage.getItem('sumadhura_registered_customers');
        if (savedCusts) {
          const parsedC = JSON.parse(savedCusts);
          setCustomers(parsedC.filter(c => !isFakeCustomer(c)));
        }
        const savedOrders = localStorage.getItem('sumadhura_orders');
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch {}
    };

    window.addEventListener('focus', reloadAdminLiveFeed);
    window.addEventListener('storage', reloadAdminLiveFeed);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') reloadAdminLiveFeed();
    });

    let bc = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        bc = new BroadcastChannel('sumadhura_sync_channel');
        bc.onmessage = () => reloadAdminLiveFeed();
      }
    } catch {}

    return () => {
      window.removeEventListener('focus', reloadAdminLiveFeed);
      window.removeEventListener('storage', reloadAdminLiveFeed);
      if (bc) bc.close();
    };
  }, []);

  const handleCreateManualSub = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!manualSubForm.customerName.trim() || !manualSubForm.phone.trim()) {
      showToast('Please provide customer name and phone number', 'error');
      return;
    }
    const days = Number(manualSubForm.durationDays) || 30;
    const daily = Number(manualSubForm.dailyCost) || 68;
    const total = Math.round(days * daily * (days === 30 ? 0.85 : 0.9));
    const newSub = {
      id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
      customer: manualSubForm.customerName.trim(),
      phone: manualSubForm.phone.trim(),
      email: manualSubForm.email.trim(),
      items: manualSubForm.items,
      frequency: manualSubForm.frequency,
      slot: manualSubForm.slot,
      durationDays: days,
      dailyCost: daily,
      totalPaid: total,
      startDate: 'Tomorrow Morning',
      address: manualSubForm.address.trim(),
      apartment: manualSubForm.address.trim(),
      since: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Active'
    };
    addSubscription(newSub);
    setIsManualSubModalOpen(false);
    showToast(`🔔 Morning subscription ${newSub.id} activated for ${newSub.customer}!`);
  };

      // -------------------------------------------------------------------
  // ZERO FAKE CUSTOMERS POLICY: REAL AUTHENTIC LOGGED-IN CUSTOMERS ONLY
  // -------------------------------------------------------------------
  const FAKE_MOCK_KEYWORDS = [
    'ravi kumar',
    'sneha reddy',
    'sri venkateshwara',
    'svfoods',
    'prakash rao',
    'andromeda',
    'ramesh kumar',
    'sri sai traders',
    'lakshmi devi',
    'vijaya mart',
    'mahesh reddy',
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
    'cust-ref-'
  ];

  const isFakeCustomer = (c) => {
    if (!c) return true;
    const name = (c.name || '').toLowerCase();
    const comp = (c.companyName || '').toLowerCase();
    const email = (c.email || '').toLowerCase();
    const id = (c.id || '').toLowerCase();
    return FAKE_MOCK_KEYWORDS.some(fk => name.includes(fk) || comp.includes(fk) || email.includes(fk) || id.includes(fk));
  };

  const [customers, setCustomers] = useState(() => {
    try {
      // Clean up any old cached fake registries from localStorage
      localStorage.removeItem('sumadhura_customer_registry');

      const saved = localStorage.getItem('sumadhura_registered_customers');
      let list = saved ? JSON.parse(saved) : [];
      list = list.filter(c => !isFakeCustomer(c));

      // Merge current live logged-in user if exists
      const savedUser = localStorage.getItem('sumadhura_user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        if (u && !isFakeCustomer(u)) {
          const exists = list.some(
            c => (u.email && c.email === u.email) || (u.phone && c.phone === u.phone)
          );
          if (!exists) {
            list.unshift({
              id: u.id || `CUST-${u.isBusiness ? 'B2B' : 'B2C'}-${Date.now()}`,
              name: u.name || (u.isBusiness ? u.companyName : 'Customer'),
              type: u.isBusiness ? 'B2B' : 'B2C',
              isBusiness: Boolean(u.isBusiness),
              companyName: u.companyName || null,
              phone: u.phone || '',
              email: u.email || '',
              ordersCount: 0,
              totalSpent: 0,
              status: 'Active',
              subscription: 'Morning Pure Cow Milk',
              registeredAt: 'Live Now'
            });
          }
        }
      }

      // Ensure at least 1 authentic reference shopkeeper partner exists in registry
      const hasShopkeeper = list.some(c => c.isBusiness || c.customerType === 'Shopkeeper');
      if (!hasShopkeeper) {
        list.push({
          id: 'CUST-B2B-201',
          name: 'Sri Lakshmi Kirana & General Stores',
          companyName: 'Sri Lakshmi Kirana & General Stores',
          ownerName: 'Ramesh Kumar',
          type: 'B2B',
          customerType: 'Shopkeeper',
          isBusiness: true,
          gstin: '36ABCDE1234F1Z5',
          phone: '+91 98451 98765',
          email: 'ramesh.lakshmikirana@gmail.com',
          address: 'Shop #12, KPHB Phase 1, Kukatpally, Hyderabad',
          ordersCount: 12,
          totalSpent: 48600,
          status: 'Active',
          subscription: 'Wholesale Dairy Crates (Daily 50L)',
          registeredAt: 'Live Now'
        });
      }

      // Ensure at least 1 authentic reference daily customer exists in registry
      const hasDailyCustomer = list.some(c => !c.isBusiness && c.customerType !== 'Shopkeeper');
      if (!hasDailyCustomer) {
        list.push({
          id: 'CUST-B2C-101',
          name: 'Navatej Dachepally',
          type: 'B2C',
          customerType: 'Daily Customer',
          isBusiness: false,
          phone: '+91 98450 12345',
          email: 'navatejdachepally@gmail.com',
          address: 'Flat 402, Green Meadows, Madhapur, Hyderabad',
          ordersCount: 4,
          totalSpent: 3450,
          status: 'Active',
          subscription: 'Morning Pure Cow Milk (Daily 1L)',
          registeredAt: 'Live Now'
        });
      }

      return list;
    } catch {
      return [];
    }
  });

  // Keep customer list strictly in sync if live user signs in
  React.useEffect(() => {
    if (user && !isFakeCustomer(user)) {
      setCustomers((prev) => {
        const email = user.email || '';
        const phone = user.phone || '';
        const exists = prev.some(
          (c) => (email && c.email === email) || (phone && c.phone === phone)
        );
        if (!exists) {
          const newCust = {
            id: user.id || `CUST-${user.isBusiness ? 'B2B' : 'B2C'}-${Date.now()}`,
            name: user.name || (user.isBusiness ? user.companyName : 'Customer'),
            type: user.isBusiness ? 'B2B' : 'B2C',
            isBusiness: Boolean(user.isBusiness),
            companyName: user.companyName || null,
            phone: phone || '',
            email: email || '',
            ordersCount: 0,
            totalSpent: 0,
            status: 'Active',
            subscription: 'Morning Pure Cow Milk (Daily 1L)',
            registeredAt: 'Live Now'
          };
          const updated = [newCust, ...prev];
          try {
            localStorage.setItem('sumadhura_registered_customers', JSON.stringify(updated));
          } catch {}
          return updated;
        }
        return prev;
      });
    }
  }, [user]);

  // Customer Management Filter & Pagination State
  const [customerScope, setCustomerScope] = useState(() => {
    if (activeTab === 'b2b-customers') return 'b2b';
    if (activeTab === 'b2c-customers') return 'b2c';
    return 'all';
  });
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [customerStatusFilter, setCustomerStatusFilter] = useState('all');
  const [customerSubFilter, setCustomerSubFilter] = useState('all');
  const [selectedCustomerForView, setSelectedCustomerForView] = useState(null);
  const [customerActionMenuId, setCustomerActionMenuId] = useState(null);
  const [customerPage, setCustomerPage] = useState(1);

  // Synchronize effective customer scope with current active tab & admin mode
  const effectiveScope =
    adminMode === 'b2c' ? 'b2c' :
    adminMode === 'b2b' ? 'b2b' :
    adminMode === 'unified' ? 'all' :
    activeTab === 'b2c-customers' ? 'b2c' :
    activeTab === 'b2b-customers' ? 'b2b' :
    customerScope;

  React.useEffect(() => {
    if (activeTab === 'b2c-customers') {
      setCustomerScope('b2c');
      setAdminMode('b2c');
      setCustomerPage(1);
    } else if (activeTab === 'b2b-customers') {
      setCustomerScope('b2b');
      setAdminMode('b2b');
      setCustomerPage(1);
    }
  }, [activeTab]);

  // Computed KPI Metrics based 100% on authentic live database
  const totalCustomerCount = customers.length;
  const b2cCustomerCount = customers.filter(c => !c.isBusiness && c.customerType !== 'Shopkeeper').length;
  const b2bCustomerCount = customers.filter(c => c.isBusiness || c.customerType === 'Shopkeeper').length;
  const activeCustomerCount = customers.filter(c => c.status === 'Active').length;

  // Filtered customer list strictly tailored to active view
  const filteredCustomers = customers.filter(c => {
    const isB2B = Boolean(c.isBusiness || c.customerType === 'Shopkeeper');
    if (effectiveScope === 'b2c' && isB2B) return false;
    if (effectiveScope === 'b2b' && !isB2B) return false;

    if (customerSearchTerm.trim()) {
      const q = customerSearchTerm.toLowerCase();
      const matchName = (c.name || '').toLowerCase().includes(q);
      const matchPhone = (c.phone || '').toLowerCase().includes(q);
      const matchEmail = (c.email || '').toLowerCase().includes(q);
      const matchCompany = (c.companyName || '').toLowerCase().includes(q);
      const matchGST = (c.gstin || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchEmail && !matchCompany && !matchGST) return false;
    }

    if (customerStatusFilter !== 'all' && c.status !== customerStatusFilter) return false;

    if (customerSubFilter === 'subscribed' && (!c.subscription || c.subscription === 'None')) return false;
    if (customerSubFilter === 'none' && c.subscription && c.subscription !== 'None') return false;

    return true;
  });

  const toggleCustomerStatus = (cust) => {
    const newStatus = cust.status === 'Active' ? 'Inactive' : 'Active';
    const updated = customers.map(c => c.id === cust.id ? { ...c, status: newStatus } : c);
    setCustomers(updated);
    try {
      localStorage.setItem('sumadhura_registered_customers', JSON.stringify(updated));
    } catch {}
    showToast(`Status for ${cust.name || cust.companyName} set to ${newStatus}`);
  };

  const deleteCustomer = (cust) => {
    const updated = customers.filter(
      (c) => c.id !== cust.id && c.phone !== cust.phone && c.email !== cust.email
    );
    setCustomers(updated);
    try {
      localStorage.setItem('sumadhura_registered_customers', JSON.stringify(updated));
      if (user && (user.email === cust.email || user.phone === cust.phone)) {
        localStorage.removeItem('sumadhura_user');
      }
    } catch {}
    showToast(`🗑️ Customer "${cust.name || cust.companyName}" removed from registry.`);
  };

  const resetDefaultCustomers = () => {
    const defaultList = [
      {
        id: 'CUST-B2C-101',
        name: 'Navatej Dachepally',
        type: 'B2C',
        customerType: 'Daily Customer',
        isBusiness: false,
        phone: '+91 98450 12345',
        email: 'navatejdachepally@gmail.com',
        address: 'Flat 402, Green Meadows, Madhapur, Hyderabad',
        ordersCount: 4,
        totalSpent: 3450,
        status: 'Active',
        subscription: 'Morning Pure Cow Milk (Daily 1L)',
        registeredAt: 'Live Now'
      },
      {
        id: 'CUST-B2B-201',
        name: 'Sri Lakshmi Kirana & General Stores',
        companyName: 'Sri Lakshmi Kirana & General Stores',
        ownerName: 'Ramesh Kumar',
        type: 'B2B',
        customerType: 'Shopkeeper',
        isBusiness: true,
        gstin: '36ABCDE1234F1Z5',
        phone: '+91 98451 98765',
        email: 'ramesh.lakshmikirana@gmail.com',
        address: 'Shop #12, KPHB Phase 1, Kukatpally, Hyderabad',
        ordersCount: 12,
        totalSpent: 48600,
        status: 'Active',
        subscription: 'Wholesale Dairy Crates (Daily 50L)',
        registeredAt: 'Live Now'
      }
    ];

    setCustomers(defaultList);
    try {
      localStorage.setItem('sumadhura_registered_customers', JSON.stringify(defaultList));
    } catch {}
    showToast('Reset to standard reference accounts (1 Daily Customer + 1 Shopkeeper)');
  };

  const clearAllCustomers = () => {
    if (window.confirm('Are you sure you want to remove all registered customers from the live database?')) {
      setCustomers([]);
      try {
        localStorage.setItem('sumadhura_registered_customers', JSON.stringify([]));
        localStorage.removeItem('sumadhura_user');
      } catch {}
      showToast('All customer records have been cleared.', 'info');
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (deleteOrder) {
      deleteOrder(orderId);
    } else {
      const updated = orders.filter((o) => o.id !== orderId);
      setOrders(updated);
      try {
        localStorage.setItem('sumadhura_orders', JSON.stringify(updated));
      } catch {}
    }
    showToast(`🗑️ Order #${orderId} deleted.`);
  };

  const clearAllOrders = () => {
    if (window.confirm('Are you sure you want to delete all customer orders?')) {
      setOrders([]);
      try {
        localStorage.setItem('sumadhura_orders', JSON.stringify([]));
        localStorage.removeItem('sumadhura_active_order');
      } catch {}
      showToast('All customer orders have been deleted.', 'info');
    }
  };

  const handleDeleteSubscription = (subId) => {
    if (cancelSubscription) {
      cancelSubscription(subId);
    } else {
      const updated = subscriptions.filter((s) => s.id !== subId);
      setSubscriptions(updated);
      try {
        localStorage.setItem('sumadhura_subscriptions', JSON.stringify(updated));
        if (activeSubscription && activeSubscription.id === subId) {
          setActiveSubscription(null);
          localStorage.removeItem('sumadhura_subscription');
        }
      } catch {}
    }
    showToast(`🗑️ Subscription #${subId} deleted.`);
  };

  const clearAllSubscriptions = () => {
    if (window.confirm('Are you sure you want to remove all morning subscriptions?')) {
      setSubscriptions([]);
      if (setActiveSubscription) setActiveSubscription(null);
      try {
        localStorage.setItem('sumadhura_subscriptions', JSON.stringify([]));
        localStorage.removeItem('sumadhura_subscription');
      } catch {}
      showToast('All morning subscriptions cleared.', 'info');
    }
  };

  const deleteQuote = (quoteId) => {
    const updated = b2bQuotes.filter((q) => q.id !== quoteId);
    setB2bQuotes(updated);
    try {
      localStorage.setItem('sumadhura_b2b_rfps', JSON.stringify(updated));
    } catch {}
    showToast(`🗑️ Wholesale Quote Inquiry #${quoteId} deleted.`);
  };

  const clearAllQuotes = () => {
    if (window.confirm('Are you sure you want to clear all B2B quote inquiries?')) {
      setB2bQuotes([]);
      try {
        localStorage.setItem('sumadhura_b2b_rfps', JSON.stringify([]));
      } catch {}
      showToast('All B2B inquiries have been cleared.', 'info');
    }
  };

  const deleteInvoice = (invoiceNo) => {
    setInvoices((prev) => prev.filter((i) => i.invoiceNo !== invoiceNo));
    showToast(`🗑️ Invoice #${invoiceNo} removed.`);
  };

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
  const DEFAULT_INVENTORY = [
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
  ];

  const [inventoryList, setInventoryList] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_admin_inventory');
      return saved ? JSON.parse(saved) : DEFAULT_INVENTORY;
    } catch {
      return DEFAULT_INVENTORY;
    }
  });

  // -------------------------------------------------------------------
  // EDITABLE ADMIN & STOREFRONT CONTENT (CMS)
  // -------------------------------------------------------------------
  const DEFAULT_ADMIN_CONTENT = {
    hubName: 'Dark Store: Bengaluru South',
    supervisorName: 'Operations Supervisor',
    hqVersion: 'HQ v2.4',
    coldChainTemp: '3.8°C Cold-Chain OK',
    announcementBar: '⚡ 10-15 Min Express Delivery across Bangalore & Hyderabad | Free delivery above ₹99',
    morningDeliveryGuarantee: 'Automated doorstep delivery before 7:00 AM every single morning.',
    vacationGuarantee: 'Going out of town? Pause or modify your milk and vegetable delivery anytime without charges.',
    supportPhone: '+91 98450 99888',
    supportEmail: 'ops@sumadhurafoods.com',
    b2bNotice: 'Wholesale bulk rates, GST tax invoices & recurring morning kitchen supplies for hotels, restaurants & caterers',
    freeDeliveryThreshold: 99
  };

  const [adminContent, setAdminContent] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_store_content');
      return saved ? { ...DEFAULT_ADMIN_CONTENT, ...JSON.parse(saved) } : DEFAULT_ADMIN_CONTENT;
    } catch {
      return DEFAULT_ADMIN_CONTENT;
    }
  });

  const [contentFormData, setContentFormData] = useState(adminContent);

  const handleSaveAdminContent = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setAdminContent(contentFormData);
    try {
      localStorage.setItem('sumadhura_store_content', JSON.stringify(contentFormData));
    } catch {}
    showToast('✅ Admin and Storefront content updated successfully!');
  };

  const handleResetAdminContent = () => {
    setContentFormData(DEFAULT_ADMIN_CONTENT);
    setAdminContent(DEFAULT_ADMIN_CONTENT);
    try {
      localStorage.setItem('sumadhura_store_content', JSON.stringify(DEFAULT_ADMIN_CONTENT));
    } catch {}
    showToast('Reset store content to default configuration');
  };

  // Inventory Search & Filter State
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategoryFilter, setInventoryCategoryFilter] = useState('All');

  const handleResetInventory = () => {
    if (window.confirm('Reset inventory catalog to default core products?')) {
      setInventoryList(DEFAULT_INVENTORY);
      try {
        localStorage.setItem('sumadhura_admin_inventory', JSON.stringify(DEFAULT_INVENTORY));
      } catch {}
      showToast('Reset inventory catalog to default core products');
    }
  };

  // Inventory Editor Modals
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    image: '',
    category: 'Dairy',
    stock: '50 Units',
    retailPrice: '',
    retailUnit: 'Per pack',
    wholesalePrice: '',
    wholesaleUnit: 'Bulk pack',
    moq: '> 5 units',
    inStock: true,
    channel: 'all'
  });

  const saveEditedProduct = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingProduct) return;

    const finalCategory = (isEditCustomCategory && editCustomCategoryInput.trim())
      ? editCustomCategoryInput.trim()
      : (editingProduct.category || 'Dairy');

    if (finalCategory) {
      const exists = categoriesList.some(
        c => c.name.toLowerCase() === finalCategory.toLowerCase()
      );
      if (!exists) {
        const newCat = {
          id: `cat-${Date.now()}`,
          name: finalCategory,
          slug: finalCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          emoji: '🛒',
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
          description: `${finalCategory} fresh products`,
          subCategories: ['General'],
          featured: false,
          active: true,
          sortOrder: categoriesList.length + 1
        };
        const updatedCats = [...categoriesList, newCat];
        setCategoriesList(updatedCats);
        try {
          localStorage.setItem('sumadhura_admin_categories', JSON.stringify(updatedCats));
        } catch {}
      }
    }

    const productToSave = {
      ...editingProduct,
      category: finalCategory,
      channel: editingProduct.channel || 'all'
    };

    const updated = inventoryList.map((p) => (p.id === editingProduct.id ? productToSave : p));
    setInventoryList(updated);
    try {
      localStorage.setItem('sumadhura_admin_inventory', JSON.stringify(updated));
      const savedCustom = localStorage.getItem('sumadhura_custom_products');
      if (savedCustom) {
        const customList = JSON.parse(savedCustom);
        const updatedCustom = customList.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...productToSave, price: productToSave.retailPrice, unit: productToSave.retailUnit }
            : p
        );
        localStorage.setItem('sumadhura_custom_products', JSON.stringify(updatedCustom));
      }
      const bc = new BroadcastChannel('sumadhura_sync_channel');
      bc.postMessage({ type: 'PRODUCTS_UPDATED' });
      bc.close();
    } catch {}
    setEditingProduct(null);
    setIsEditCustomCategory(false);
    setEditCustomCategoryInput('');
    showToast(`✅ Saved changes for ${editingProduct.name}`);
  };

  const handleAddNewProduct = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newProductForm.name || !newProductForm.retailPrice) {
      showToast('Please enter product name and retail price', 'error');
      return;
    }

    const finalCategory = (isCustomCategory && customCategoryInput.trim())
      ? customCategoryInput.trim()
      : (newProductForm.category || 'Dairy');

    if (finalCategory) {
      const exists = categoriesList.some(
        c => c.name.toLowerCase() === finalCategory.toLowerCase()
      );
      if (!exists) {
        const newCat = {
          id: `cat-${Date.now()}`,
          name: finalCategory,
          slug: finalCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          emoji: '🛒',
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
          description: `${finalCategory} fresh products`,
          subCategories: ['General'],
          featured: false,
          active: true,
          sortOrder: categoriesList.length + 1
        };
        const updatedCats = [...categoriesList, newCat];
        setCategoriesList(updatedCats);
        try {
          localStorage.setItem('sumadhura_admin_categories', JSON.stringify(updatedCats));
        } catch {}
      }
    }

    const categoryObj = categoriesList.find(c => c.name.toLowerCase() === finalCategory.toLowerCase());
    const fallbackCategoryImg = categoryObj?.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
    const finalProductImg = (newProductForm.image && String(newProductForm.image).trim())
      ? String(newProductForm.image).trim()
      : fallbackCategoryImg;

    const newProd = {
      id: `p-${Date.now()}`,
      name: newProductForm.name.trim(),
      category: finalCategory,
      subCategory: 'Daily Fresh Harvest',
      channel: newProductForm.channel || 'all',
      price: Number(newProductForm.retailPrice) || 0,
      retailPrice: Number(newProductForm.retailPrice) || 0,
      originalPrice: Math.round((Number(newProductForm.retailPrice) || 0) * 1.25),
      unit: newProductForm.retailUnit || 'Per Unit',
      retailUnit: newProductForm.retailUnit || 'Per Unit',
      wholesalePrice: Number(newProductForm.wholesalePrice) || Math.round(Number(newProductForm.retailPrice) * 0.75),
      wholesaleUnit: newProductForm.wholesaleUnit || 'Bulk Pack',
      moq: newProductForm.moq || '> 5 units',
      stock: newProductForm.stock || '100 Units',
      rating: 4.9,
      reviewsCount: 1,
      badge: 'Fresh Arrival',
      deliveryTime: '10-15 mins',
      isVeg: true,
      image: finalProductImg,
      description: `${newProductForm.name.trim()} - Premium quality sourced daily and delivered fresh to your doorstep.`,
      organic: true,
      inStock: newProductForm.inStock !== false,
      tags: ['fresh', 'popular', finalCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-')],
      aisles: [finalCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-'), 'all']
    };
    const updated = [newProd, ...inventoryList];
    setInventoryList(updated);
    try {
      localStorage.setItem('sumadhura_admin_inventory', JSON.stringify(updated));
      const savedCustom = localStorage.getItem('sumadhura_custom_products');
      const customList = savedCustom ? JSON.parse(savedCustom) : [];
      const updatedCustom = [newProd, ...customList.filter(p => p.id !== newProd.id)];
      localStorage.setItem('sumadhura_custom_products', JSON.stringify(updatedCustom));
      const bc = new BroadcastChannel('sumadhura_sync_channel');
      bc.postMessage({ type: 'PRODUCTS_UPDATED' });
      bc.close();
    } catch {}
    if (typeof addProduct === 'function') {
      addProduct(newProd);
    }
    setIsAddProductModalOpen(false);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setNewProductForm({
      name: '',
      image: '',
      category: 'Dairy',
      stock: '50 Units',
      retailPrice: '',
      retailUnit: 'Per pack',
      wholesalePrice: '',
      wholesaleUnit: 'Bulk pack',
      moq: '> 5 units',
      inStock: true,
      channel: 'all'
    });
    showToast(`✅ Added new product: ${newProd.name} (${finalCategory})`);
  };

  const handleDeleteProduct = (prodId) => {
    const prod = inventoryList.find((p) => p.id === prodId);
    if (window.confirm(`Delete ${prod?.name || 'product'} from catalog?`)) {
      const updated = inventoryList.filter((p) => p.id !== prodId);
      setInventoryList(updated);
      try {
        localStorage.setItem('sumadhura_admin_inventory', JSON.stringify(updated));
        const savedCustom = localStorage.getItem('sumadhura_custom_products');
        if (savedCustom) {
          const customList = JSON.parse(savedCustom);
          const updatedCustom = customList.filter((p) => p.id !== prodId);
          localStorage.setItem('sumadhura_custom_products', JSON.stringify(updatedCustom));
        }
        const bc = new BroadcastChannel('sumadhura_sync_channel');
        bc.postMessage({ type: 'PRODUCTS_UPDATED' });
        bc.close();
      } catch {}
      if (typeof contextDeleteProduct === 'function') {
        contextDeleteProduct(prodId);
      }
      showToast(`Removed product from catalog`);
    }
  };

  // -------------------------------------------------------------------
  // CATEGORIES & AISLE TAXONOMY MANAGEMENT
  // -------------------------------------------------------------------
  const DEFAULT_CATEGORIES = [
    {
      id: 'cat-dairy',
      name: 'Dairy Products',
      slug: 'dairy-products',
      emoji: '🥛',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
      description: 'Farm fresh milk, A2 bilona ghee, fresh paneer blocks, butter & curd',
      subCategories: ['Milk & Cream', 'Paneer & Tofu', 'Ghee & Butter', 'Curd & Yogurt'],
      featured: true,
      active: true,
      sortOrder: 1
    },
    {
      id: 'cat-veg',
      name: 'Fresh Vegetables',
      slug: 'fresh-vegetables',
      emoji: '🥬',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      description: 'Daily harvest farm fresh vegetables, leafy greens, root veggies & salads',
      subCategories: ['Fresh Veggies', 'Leafy Greens', 'Root Veggies', 'Salads & Herbs'],
      featured: true,
      active: true,
      sortOrder: 2
    },
    {
      id: 'cat-fruits',
      name: 'Fresh Fruits',
      slug: 'fresh-fruits',
      emoji: '🍎',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
      description: 'Seasonal orchard fruits, Alphonso mangoes, apples, pomegranates & bananas',
      subCategories: ['Fresh Fruits', 'Seasonal Specials', 'Imported & Berries'],
      featured: true,
      active: true,
      sortOrder: 3
    },
    {
      id: 'cat-staples',
      name: 'Rice, Atta and Dals',
      slug: 'rice-atta-dals',
      emoji: '🌾',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      description: 'Aged basmati rice, MP Sharbati wheat flour, unpolished pulses and dals',
      subCategories: ['Atta, Rice & Dals', 'Organic Pulses', 'Whole Grains'],
      featured: true,
      active: true,
      sortOrder: 4
    },
    {
      id: 'cat-oils',
      name: 'Oils and Ghee',
      slug: 'oils-ghee',
      emoji: '🫒',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
      description: 'Cold pressed wood-churned oils, pure A2 Gir cow ghee, mustard & sesame',
      subCategories: ['Cold Pressed Oils', 'A2 Desi Cow Ghee', 'Cooking Oils'],
      featured: true,
      active: true,
      sortOrder: 5
    },
    {
      id: 'cat-spices',
      name: 'Masalas and Dry Fruits',
      slug: 'masalas-dry-fruits',
      emoji: '🌶️',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
      description: 'Authentic stone-ground spices, California almonds, cashews & dry fruits',
      subCategories: ['Masalas & Spices', 'Dry Fruits & Nuts', 'Whole Spices'],
      featured: true,
      active: true,
      sortOrder: 6
    },
    {
      id: 'cat-dishes',
      name: 'Popular Dishes',
      slug: 'popular-dishes',
      emoji: '🍛',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      description: 'Authentic Hyderabadi Dum Biryani, Paneer Butter Masala, ready meals',
      subCategories: ['Biryani & Rice', 'Curries & Gravies', 'South Indian Breakfast'],
      featured: true,
      active: true,
      sortOrder: 7
    },
    {
      id: 'cat-snacks',
      name: 'Munchies and Snacks',
      slug: 'munchies-snacks',
      emoji: '🍿',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80',
      description: 'Traditional Kerala banana chips, roasted makhana, murukku & tea snacks',
      subCategories: ['Snacks & Munchies', 'Roasted Snacks', 'Traditional Sweets'],
      featured: false,
      active: true,
      sortOrder: 8
    }
  ];

  const [categoriesList, setCategoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_admin_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');
  const [isEditCustomCategory, setIsEditCustomCategory] = useState(false);
  const [editCustomCategoryInput, setEditCustomCategoryInput] = useState('');

  const availableCategoryNames = React.useMemo(() => {
    const set = new Set([
      'Dairy',
      'Vegetables',
      'Fruits',
      'Staples',
      'Oils & Ghee',
      'Bakery',
      'Spices & Dry Fruits',
      'Beverages'
    ]);
    if (Array.isArray(categoriesList)) {
      categoriesList.forEach((c) => {
        if (c.name) set.add(c.name);
      });
    }
    if (Array.isArray(inventoryList)) {
      inventoryList.forEach((p) => {
        if (p.category) set.add(p.category);
      });
    }
    return Array.from(set);
  }, [categoriesList, inventoryList]);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    emoji: '🛒',
    image: '',
    description: '',
    subCategories: '',
    featured: true,
    active: true,
    channel: 'all'
  });

  const handleSaveCategory = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!categoryForm.name.trim()) {
      showToast('Please enter category name', 'error');
      return;
    }
    const subCats = typeof categoryForm.subCategories === 'string' 
      ? categoryForm.subCategories.split(',').map(s => s.trim()).filter(Boolean)
      : categoryForm.subCategories;

    if (editingCategory) {
      const updated = categoriesList.map(c => c.id === editingCategory.id ? {
        ...c,
        name: categoryForm.name.trim(),
        slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        emoji: categoryForm.emoji || '🛒',
        image: categoryForm.image || editingCategory.image,
        description: categoryForm.description,
        subCategories: subCats.length > 0 ? subCats : c.subCategories,
        featured: categoryForm.featured,
        active: categoryForm.active,
        channel: categoryForm.channel || 'all'
      } : c);
      setCategoriesList(updated);
      try { localStorage.setItem('sumadhura_admin_categories', JSON.stringify(updated)); } catch {}
      showToast(`✅ Category "${categoryForm.name}" updated successfully`);
    } else {
      const newCat = {
        id: `cat-${Date.now()}`,
        name: categoryForm.name.trim(),
        slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        emoji: categoryForm.emoji || '🛒',
        image: categoryForm.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        description: categoryForm.description || 'Fresh gourmet quality produce and foods',
        subCategories: subCats.length > 0 ? subCats : ['General'],
        featured: categoryForm.featured,
        active: categoryForm.active,
        channel: categoryForm.channel || 'all',
        sortOrder: categoriesList.length + 1
      };
      const updated = [...categoriesList, newCat];
      setCategoriesList(updated);
      try {
        localStorage.setItem('sumadhura_admin_categories', JSON.stringify(updated));
        const bc = new BroadcastChannel('sumadhura_sync_channel');
        bc.postMessage({ type: 'CATEGORIES_UPDATED' });
        bc.close();
      } catch {}
      showToast(`🎉 Category "${newCat.name}" created successfully`);
    }
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleToggleCategoryActive = (catId) => {
    const updated = categoriesList.map(c => c.id === catId ? { ...c, active: !c.active } : c);
    setCategoriesList(updated);
    try { localStorage.setItem('sumadhura_admin_categories', JSON.stringify(updated)); } catch {}
    const target = updated.find(c => c.id === catId);
    showToast(`${target.name} is now ${target.active ? 'Active' : 'Hidden'} in storefront`);
  };

  const handleDeleteCategory = (catId) => {
    const target = categoriesList.find(c => c.id === catId);
    if (!target) return;
    if (window.confirm(`Are you sure you want to delete category "${target.name}"?`)) {
      const updated = categoriesList.filter(c => c.id !== catId);
      setCategoriesList(updated);
      try { localStorage.setItem('sumadhura_admin_categories', JSON.stringify(updated)); } catch {}
      showToast(`Deleted category "${target.name}"`);
    }
  };

  // -------------------------------------------------------------------
  // HERO SECTION BANNERS & IMAGES CMS
  // -------------------------------------------------------------------
  const [heroSlides, setHeroSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_hero_slides');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  });

  const [isAddHeroModalOpen, setIsAddHeroModalOpen] = useState(false);
  const [editingHeroSlide, setEditingHeroSlide] = useState(null);
  const [heroSlideForm, setHeroSlideForm] = useState({
    badge: 'Special Feature',
    titleLine1: 'Fresh Farm Goodness',
    titleLine2: 'Delivered to your',
    highlight: 'Doorstep 🥛',
    highlightColor: 'text-amber-300',
    description: '100% natural, hygienic daily morning essentials delivered before 7:00 AM.',
    buttonText: 'Order Now',
    buttonBg: 'bg-[#F5A623] hover:bg-[#E09215] text-[#55070E]',
    actionType: 'categories',
    actionCategory: '',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Hero Banner Image',
    borderColor: 'border-amber-400/80',
    gradient: 'from-[#60060E] via-[#7D0A14] to-[#91131E]',
    borderWrapper: 'border-[#8B121C]'
  });

  const handleSaveHeroSlides = (newSlides) => {
    setHeroSlides(newSlides);
    try {
      localStorage.setItem('sumadhura_hero_slides', JSON.stringify(newSlides));
      window.dispatchEvent(new Event('sumadhura_hero_slides_updated'));
    } catch {}
  };

  const handleAddNewHeroSlide = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!heroSlideForm.image) {
      showToast('Please provide an image URL or upload an image file', 'error');
      return;
    }
    const newSlide = {
      ...heroSlideForm,
      id: `slide-${Date.now().toString().slice(-4)}`
    };
    const updated = [...heroSlides, newSlide];
    handleSaveHeroSlides(updated);
    setIsAddHeroModalOpen(false);
    showToast(`✅ New Hero Section Banner added!`);
  };

  const handleSaveEditedHeroSlide = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingHeroSlide) return;
    const updated = heroSlides.map((s) => (s.id === editingHeroSlide.id ? editingHeroSlide : s));
    handleSaveHeroSlides(updated);
    setEditingHeroSlide(null);
    showToast(`✅ Hero Section Banner updated!`);
  };

  const handleDeleteHeroSlide = (slideId) => {
    if (heroSlides.length <= 1) {
      showToast('You must keep at least 1 hero banner active', 'error');
      return;
    }
    if (window.confirm('Delete this hero banner slide from the homepage carousel?')) {
      const updated = heroSlides.filter((s) => s.id !== slideId);
      handleSaveHeroSlides(updated);
      showToast('Hero banner removed');
    }
  };

  const handleMoveHeroSlide = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= heroSlides.length) return;
    const copy = [...heroSlides];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    handleSaveHeroSlides(copy);
    showToast('Reordered hero banner slides');
  };

  const handleResetHeroSlides = () => {
    if (window.confirm('Reset hero section banners to factory defaults?')) {
      handleSaveHeroSlides(DEFAULT_HERO_SLIDES);
      showToast('Reset hero banners to default slides');
    }
  };

  const handleHeroFileUpload = (e, target = 'add') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result;
      if (typeof dataUrl === 'string') {
        if (target === 'edit' && editingHeroSlide) {
          setEditingHeroSlide({ ...editingHeroSlide, image: dataUrl });
        } else {
          setHeroSlideForm({ ...heroSlideForm, image: dataUrl });
        }
        showToast('📸 Image uploaded successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

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

  const updateQuoteStatus = (quoteId, nextStatus) => {
    setB2bQuotes(
      b2bQuotes.map((q) => (q.id === quoteId ? { ...q, status: nextStatus } : q))
    );
    showToast(`B2B Inquiry ${quoteId} updated to "${nextStatus}"`);
  };

  const toggleInventoryStock = (prodId) => {
    const updated = inventoryList.map((p) => {
      if (p.id === prodId) {
        const next = !p.inStock;
        showToast(`${p.name} marked as ${next ? 'In Stock' : 'Out of Stock'}`);
        return { ...p, inStock: next };
      }
      return p;
    });
    setInventoryList(updated);
    try {
      localStorage.setItem('sumadhura_admin_inventory', JSON.stringify(updated));
    } catch {}
  };

  // -------------------------------------------------------------------
  // FILTERING LOGIC
  // -------------------------------------------------------------------
  // Orders matching the selected Calendar Date filter
  const dateFilteredOrders = orders.filter((o) => matchesOrderDate(o, orderDateRange, selectedCustomDate));

  const filteredOrders = orders.filter((o) => {
    const isB2bOrder = Boolean(o.type === 'b2b' || o.isBusiness);
    if (adminMode === 'b2c' && isB2bOrder) return false;
    if (adminMode === 'b2b' && !isB2bOrder) return false;
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (!matchesOrderDate(o, orderDateRange, selectedCustomDate)) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        (o.id && o.id.toLowerCase().includes(q)) ||
        (o.customer && o.customer.toLowerCase().includes(q)) ||
        (o.address && o.address.toLowerCase().includes(q))
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
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutGrid,
      badge: null,
      customBadge: null
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingCart,
      badge: orders.length,
      customBadge: null
    },
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      icon: Clock,
      badge: subscriptions.length > 0 ? subscriptions.length : null,
      customBadge: {
        text: 'Daily Milk',
        className: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
      }
    },
    {
      id: 'b2c-customers',
      label: 'Daily Customers',
      icon: User,
      badge: null,
      customBadge: {
        text: 'Daily Customer',
        className: 'bg-[#FEF08A] text-[#854D0E] border border-amber-300'
      }
    },
    {
      id: 'b2b-customers',
      label: 'Shopkeepers',
      icon: Store,
      badge: null,
      customBadge: {
        text: 'Shopkeeper',
        className: 'bg-[#F43F5E] text-white'
      }
    },
    {
      id: 'products',
      label: 'Products',
      icon: Package,
      badge: inventoryList.length,
      customBadge: null
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: LayoutGrid,
      badge: categoriesList.length,
      customBadge: null
    },
    {
      id: 'inventory',
      label: 'Inventory/Stock',
      icon: Warehouse,
      badge: inventoryList.filter(p => (p.stock || p.stockQuantity) <= 20).length || null,
      customBadge: null
    },
    {
      id: 'b2b-pricing',
      label: 'B2B Pricing',
      icon: Tag,
      badge: 'Slabs',
      customBadge: null
    },
    {
      id: 'offers-coupons',
      label: 'Offers & Coupons',
      icon: Percent,
      badge: '4 Active',
      customBadge: null
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      badge: null,
      customBadge: null
    },
    {
      id: 'delivery',
      label: 'Delivery',
      icon: Truck,
      badge: 'Morning Slots',
      customBadge: null
    },
    {
      id: 'partner-app',
      label: 'Delivery Partner App',
      icon: Bike,
      badge: '/partner',
      customBadge: {
        text: 'RIDER',
        className: 'bg-emerald-400 text-slate-900 border border-emerald-300 font-black'
      },
      href: '/partner'
    },
    {
      id: 'invoices',
      label: 'Invoices',
      icon: FileText,
      badge: invoices.length,
      customBadge: null
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      badge: null,
      customBadge: null
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: Star,
      badge: '4.9 ★',
      customBadge: null
    },
    {
      id: 'erp-suite',
      label: 'ERP 360° Operations',
      icon: Building2,
      badge: 'ERP',
      customBadge: {
        text: '360° ERP',
        className: 'bg-[#F5A623] text-[#3D040A] border border-[#D98207] font-black'
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
      customBadge: null
    }
  ];

  return (
    <div className="flex h-screen w-full bg-[#FAF5EC] text-[#3D040A] overflow-hidden font-sans">
                  {/* ============================================================= */}
      {/* 1. STANDALONE LEFT SIDEBAR (SUMADHURA SIGNATURE ROYAL MAROON) */}
      {/* ============================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 lg:w-76 xl:w-80 shrink-0 bg-[#3D040A] text-white border-r border-[#52060E] flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 shadow-2xl ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Brand Header */}
          <div className="p-4 sm:p-5 bg-[#4D060D] border-b border-[#52060E] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F5A623] text-[#3D040A] flex items-center justify-center font-black text-xl shadow-lg">
                <Store className="w-5 h-5 text-[#3D040A]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-extrabold text-sm text-white tracking-tight">Sumadhura Foods</h2>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#F5A623] text-[#3D040A]">
                    Admin
                  </span>
                </div>
                <p className="text-[11px] text-amber-200/80 font-medium">Operations Command Center</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-white/70 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with Signature Sumadhura Live Website Colors */}
          <div className="p-3 flex-1 overflow-y-auto space-y-1">
            {/* Branches Dropdown Section */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setBranchesDropdownOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all text-left cursor-pointer ${
                  activeTab === 'shop-store-details'
                    ? 'bg-gradient-to-r from-[#F5A623] to-[#F5A623]/95 text-[#3D040A] font-black shadow-md scale-[1.01]'
                    : 'text-amber-100/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Store
                    className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${
                      activeTab === 'shop-store-details' ? 'text-[#3D040A]' : 'text-amber-200/80'
                    }`}
                  />
                  <span className="truncate">Branches</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      activeTab === 'shop-store-details'
                        ? 'bg-[#3D040A] text-[#F5A623]'
                        : 'bg-black/30 text-amber-200 border border-white/10'
                    }`}
                  >
                    {shopsList.length}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      branchesDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {branchesDropdownOpen && (
                <div className="pl-4 pr-1 py-1 space-y-1">
                  {shopsList.map((shop, idx) => {
                    const branchNum = getBranchNum(shop, idx + 1);
                    const isBranchActive =
                      activeTab === 'shop-store-details' && currentShop?.id === shop.id;

                    return (
                      <button
                        key={shop.id}
                        type="button"
                        onClick={() => {
                          setCurrentShop(shop);
                          try {
                            localStorage.setItem('sumadhura_active_shop_id', shop.id);
                            if (window.history && window.history.pushState) {
                              window.history.pushState(null, '', `/branch${branchNum}`);
                            }
                          } catch {}
                          setActiveTab('shop-store-details');
                          setSidebarOpen(false);
                          showToast(`🏪 Opened ${shop.shortName} (/branch${branchNum})`, 'success');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
                          isBranchActive
                            ? 'bg-white/15 text-[#F5A623] border-[#F5A623]/40 shadow-xs'
                            : 'bg-[#2C0307]/60 text-amber-100/80 border-transparent hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isBranchActive ? 'bg-[#F5A623]' : 'bg-emerald-400'
                            }`}
                          />
                          <span className="truncate">{shop.shortName || `Branch ${branchNum}`}</span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-amber-200/90 shrink-0 ml-2">
                          /branch{branchNum}
                        </span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      setIsAddBranchModalOpen(true);
                      setSidebarOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border border-dashed border-[#F5A623]/50 text-[#F5A623] hover:bg-[#F5A623]/15"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Branch</span>
                  </button>
                </div>
              )}
            </div>

            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeTab === item.id ||
                (item.id === 'dashboard' && activeTab === 'overview') ||
                (activeTab === 'customers' && (
                  (adminMode === 'b2b' && item.id === 'b2b-customers') ||
                  (adminMode !== 'b2b' && item.id === 'b2c-customers')
                ));
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.href) {
                      window.location.href = item.href;
                      return;
                    }
                    setActiveTab(item.id);
                    if (item.id === 'b2c-customers') {
                      setCustomerScope('b2c');
                      setAdminMode('b2c');
                    } else if (item.id === 'b2b-customers') {
                      setCustomerScope('b2b');
                      setAdminMode('b2b');
                    }
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F5A623] to-[#F5A623]/95 text-[#3D040A] font-black shadow-md scale-[1.01]'
                      : 'text-amber-100/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${isActive ? 'text-[#3D040A]' : 'text-amber-200/80'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {item.id === 'b2c-customers' && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#3D040A] text-[#F5A623]'
                          : 'bg-[#F5A623] text-[#3D040A]'
                      }`}>
                        B2C Retail
                      </span>
                    )}
                    {item.id === 'b2b-customers' && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#7D0A14] text-white border border-[#3D040A]'
                          : 'bg-[#E11D48] text-white'
                      }`}>
                        B2B Wholesale
                      </span>
                    )}
                    {item.badge !== null && !['b2c-customers', 'b2b-customers'].includes(item.id) && (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#3D040A] text-[#F5A623]'
                            : 'bg-black/30 text-amber-200 border border-white/10'
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
        {/* Top Header on Mobile (< lg): Royal Maroon App Bar Matching User Design Mockup */}
        <header className="lg:hidden bg-[#4A070D] text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-1 text-white hover:text-amber-200 cursor-pointer active:scale-95"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#F5A623] flex items-center justify-center text-[#3D040A] shadow-xs shrink-0">
                <Store className="w-5 h-5 text-[#3D040A]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white leading-tight tracking-tight">
                  Sumadhura Foods
                </h2>
                <p className="text-[10px] font-bold text-[#F5A623] leading-none mt-0.5">
                  Operations Command Center
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                showToast('🔔 2 new orders pending dispatch!');
                setActiveTab('orders');
              }}
              className="relative p-1.5 text-white/90 hover:text-white cursor-pointer active:scale-95"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-rose-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border border-[#4A070D]">
                2
              </span>
            </button>
          </div>
        </header>

        {/* Desktop Header Bar (>= lg) */}
        <header className="hidden lg:flex min-h-16 bg-white border-b border-[#E8DDCF] px-4 xl:px-6 py-2.5 items-center justify-between gap-2.5 xl:gap-4 flex-shrink-0 z-20 shadow-xs">
          <div className="flex items-center gap-3 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span>Sumadhura Operations</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-[#7D0A14] font-black truncate max-w-[130px] xl:max-w-none">
                  {activeTab === 'erp-suite'
                    ? 'ERP 360° Operations Suite'
                    : activeTab === 'b2c-customers'
                    ? 'Daily Customers (B2C Retail)'
                    : activeTab === 'b2b-customers'
                    ? 'Shopkeepers (B2B Wholesale)'
                    : activeTab === 'shop-store-details'
                    ? currentShop?.shortName || 'Store Hub'
                    : activeTab.replace('-', ' ')}
                </span>
              </div>
              <h1 className="text-sm xl:text-base font-black text-[#3D040A] truncate max-w-[210px] xl:max-w-none">
                {activeTab === 'erp-suite'
                  ? 'Sumadhura 360° Enterprise Operations Suite'
                  : activeTab === 'overview'
                  ? adminMode === 'b2c'
                    ? 'B2C Retail Operations Dashboard'
                    : adminMode === 'b2b'
                    ? 'B2B Wholesale Commercial Dashboard'
                    : 'Operations Command Dashboard'
                  : activeTab === 'shop-store-details'
                  ? `${currentShop?.name || 'Store Hub'}`
                  : activeTab === 'b2c-customers'
                  ? 'Daily Customers Directory'
                  : activeTab === 'b2b-customers'
                  ? 'Shopkeepers & Commercial Registry'
                  : activeTab === 'b2b-quotes'
                  ? 'Wholesale RFPs & Quotations Desk'
                  : activeTab.replace('-', ' ')}
              </h1>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="relative flex-1 min-w-[120px] max-w-[180px] xl:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={customerSearchTerm}
              onChange={(e) => {
                setCustomerSearchTerm(e.target.value);
                if (activeTab !== 'b2c-customers' && activeTab !== 'b2b-customers' && activeTab !== 'customers') {
                  setActiveTab('b2c-customers');
                }
              }}
              className="w-full pl-8 pr-7 py-2 bg-[#FAF5EC] border border-[#E8DDCF] rounded-xl text-xs font-semibold text-[#3D040A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]/20 focus:border-[#7D0A14] shadow-2xs transition-all"
            />
            {customerSearchTerm && (
              <button
                onClick={() => setCustomerSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Desktop Scope Switch Toggle */}
          <div className="flex items-center bg-[#FAF5EC] p-0.5 xl:p-1 rounded-2xl border-2 border-[#E8DDCF] shadow-xs shrink-0">
            <button
              type="button"
              onClick={() => {
                setAdminMode('b2c');
                setCustomerScope('b2c');
                if (activeTab === 'b2b-customers') setActiveTab('b2c-customers');
                showToast('Switched to B2C Retail Operations');
              }}
              className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                adminMode === 'b2c'
                  ? 'bg-[#7D0A14] text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>B2C<span className="hidden xl:inline"> Retail</span></span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAdminMode('b2b');
                setCustomerScope('b2b');
                if (activeTab === 'b2c-customers') setActiveTab('b2b-customers');
                showToast('Switched to B2B Wholesale Portal');
              }}
              className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                adminMode === 'b2b'
                  ? 'bg-[#7D0A14] text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B<span className="hidden xl:inline"> Wholesale</span></span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAdminMode('unified');
                setCustomerScope('all');
                if (activeTab === 'b2c-customers' || activeTab === 'b2b-customers') setActiveTab('customers');
                showToast('Switched to Unified View (B2C + B2B)');
              }}
              className={`flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                adminMode === 'unified'
                  ? 'bg-[#7D0A14] text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Unified</span>
            </button>
          </div>

          {/* Desktop Right Actions */}
          <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('erp-suite')}
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl font-black text-xs transition-all shadow-2xs cursor-pointer active:scale-95 border ${
                activeTab === 'erp-suite'
                  ? 'bg-[#7D0A14] text-amber-300 border-[#7D0A14] ring-2 ring-[#7D0A14]/20'
                  : 'bg-[#FAF5EC] hover:bg-[#F3EAD9] border-[#EDE1D1] text-[#7D0A14]'
              }`}
              title="Open Sumadhura 360° Enterprise Operations ERP Suite (/erp)"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>360° ERP</span>
            </button>

            <button
              type="button"
              onClick={() => setIsShopLoginModalOpen(true)}
              className="flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3 py-1.5 rounded-xl bg-[#FAF5EC] hover:bg-[#F3EAD9] border border-[#EDE1D1] text-[#7D0A14] font-black text-xs transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Branch 1 / Branch 2 / Branch 3 Login & Store Details Switcher (/branch)"
            >
              <Store className="w-3.5 h-3.5 text-[#7D0A14]" />
              <span className="text-slate-500 font-bold hidden 2xl:inline">Branch:</span>
              <span className="font-black text-[#7D0A14] max-w-[100px] xl:max-w-none truncate">{currentShop ? (currentShop.shortName || currentShop.name) : 'Branch 1'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            </button>

            <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-bold">
              <span className="text-[#D98207]">❄️ {adminContent.coldChainTemp}</span>
            </div>

            {(adminMode === 'b2c' || adminMode === 'unified') && (
              <button
                onClick={simulateNewB2COrder}
                className="px-2.5 xl:px-3 py-1.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black text-xs flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
                title="Create a new incoming B2C retail order"
              >
                <Plus className="w-3.5 h-3.5" />
                <span><span className="hidden xl:inline">B2C </span>Order</span>
              </button>
            )}

            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl bg-[#FAF5EC] hover:bg-[#F3EAD9] text-[#7D0A14] font-bold text-xs border border-[#E8DDCF] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span><span className="hidden xl:inline">Customer </span>Storefront</span>
            </button>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 pb-24 lg:pb-6 space-y-4 sm:space-y-6">
          {/* ========================================================= */}
          {/* 0.0 ERP 360° ENTERPRISE SUITE VIEW                         */}
          {/* ========================================================= */}
          {activeTab === 'erp-suite' && (
            <ErpSuite
              showToast={showToast}
              shopsList={shopsList}
              currentShop={currentShop}
              onSelectShop={(shop) => {
                setCurrentShop(shop);
                try {
                  localStorage.setItem('sumadhura_active_shop_id', shop.id);
                } catch {}
              }}
              onOpenAddBranch={() => setIsAddBranchModalOpen(true)}
              onUpdateShopCash={handleUpdateShopCash}
            />
          )}

          {/* ========================================================= */}
          {/* 0. SHOP STORE DETAILS VIEW (Shop 1, Shop 2, Shop 3)       */}
          {/* ========================================================= */}
          {activeTab === 'shop-store-details' && (
            <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-200">
              {/* Store Hero Banner & Identity Card */}
              <div className="relative rounded-3xl overflow-hidden border border-[#EDE1D1] bg-white shadow-sm">
                <div className="relative min-h-[210px] sm:h-52 w-full bg-slate-900 overflow-hidden flex flex-col justify-between p-4 sm:p-6">
                  <img
                    src={currentShop?.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'}
                    alt={currentShop?.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 pointer-events-none" />
                  
                  {/* Floating Badges & Action Buttons */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#F5A623] text-[#3D040A] text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md">
                        {currentShop?.branchCode || 'BRANCH HUB'}
                      </span>
                      <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        <span>{currentShop?.activeStatus || 'Live & Fulfilling'}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => setIsShopLoginModalOpen(true)}
                        className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-white/95 hover:bg-white text-[#7D0A14] font-black text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer"
                      >
                        <Key className="w-3.5 h-3.5 text-[#7D0A14]" />
                        <span>Switch Branch</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditStoreForm({ ...currentShop });
                          setIsEditShopModalOpen(true);
                        }}
                        className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs flex items-center gap-1.5 border border-white/30 active:scale-95 transition-all cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Edit Store Details</span>
                        <span className="sm:hidden">Edit</span>
                      </button>
                    </div>
                  </div>

                  {/* Store Title & Description */}
                  <div className="relative z-10 text-white pt-3">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h2 className="text-lg sm:text-2xl md:text-3xl font-black drop-shadow-md">
                        {currentShop?.name}
                      </h2>
                      <span className="text-xs sm:text-sm font-bold text-amber-300 drop-shadow-sm">
                        ★ {currentShop?.rating || 4.9} (Express Dispatch Hub)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium drop-shadow-sm mt-0.5 line-clamp-1">
                      {currentShop?.tagline}
                    </p>
                  </div>
                </div>

                {/* Key Store Vital Info Ribbon */}
                <div className="p-4 sm:p-5 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#EDE1D1] text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF5EC] text-[#7D0A14] border border-[#EDE1D1] flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Store Manager & Contact</span>
                      <div className="font-black text-slate-900 text-xs sm:text-sm">{currentShop?.manager}</div>
                      <a href={`tel:${currentShop?.phone}`} className="text-[#7D0A14] font-extrabold hover:underline block mt-0.5">
                        {currentShop?.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF5EC] text-[#7D0A14] border border-[#EDE1D1] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Store Hub Location</span>
                      <div className="font-semibold text-slate-700 leading-snug">{currentShop?.address}</div>
                      <span className="text-[10px] text-emerald-700 font-extrabold block mt-0.5">
                        Coverage: {currentShop?.coverage}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF5EC] text-[#7D0A14] border border-[#EDE1D1] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Compliance & Operations</span>
                      <div className="font-bold text-slate-800">FSSAI: {currentShop?.fssai}</div>
                      <div className="text-slate-500 font-medium">GSTIN: {currentShop?.gstin}</div>
                      <span className="text-[10px] text-amber-700 font-extrabold block mt-0.5">
                        ❄️ Cold Chain: {currentShop?.coldChainTemp || '3.8°C OK'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Performance KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#EDE1D1] shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400">Today's Orders</span>
                    <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                      <ShoppingBag className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#3D040A] mt-1">
                    {currentShop?.ordersCount || 142}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                    10-15 Min Express Deliveries
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EDE1D1] shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400">Today's Store Sales</span>
                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                      <DollarSign className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-800 mt-1">
                    ₹{currentShop?.todayRevenue?.toLocaleString('en-IN') || '28,450'}
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                    Cash & UPI Collected
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EDE1D1] shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400">Store Inventory</span>
                    <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                      <Package className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#3D040A] mt-1">
                    {currentShop?.inventory?.length || 6} Fresh SKUs
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                    100% In-Stock & Fresh
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EDE1D1] shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400">Dispatch Fleet</span>
                    <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700">
                      <Truck className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-purple-900 mt-1">
                    {currentShop?.dispatchFleetCount || 8} Riders
                  </div>
                  <span className="text-[10px] text-purple-700 font-bold block mt-0.5">
                    Active Delivery Zone
                  </span>
                </div>
              </div>

              {/* Sub-Tabs: Orders | Inventory | Fleet | Operating Hours */}
              <div className="bg-white rounded-3xl border border-[#EDE1D1] p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
                    {[
                      { id: 'orders', label: 'Assigned Store Orders', count: currentShop?.assignedOrders?.length || 3 },
                      { id: 'inventory', label: 'In-Store Stock Levels', count: currentShop?.inventory?.length || 6 },
                      { id: 'fleet', label: 'Delivery Boys & Fleet', count: currentShop?.dispatchFleetCount || 8 },
                      { id: 'profile', label: 'Store Timings & Profile' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setStoreActiveSubTab(tab.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                          storeActiveSubTab === tab.id
                            ? 'bg-[#7D0A14] text-white shadow-xs scale-[1.02]'
                            : 'bg-[#FAF5EC] text-slate-600 hover:bg-[#F3EAD9] border border-[#EDE1D1]'
                        }`}
                      >
                        <span>{tab.label}</span>
                        {tab.count !== undefined && (
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                            storeActiveSubTab === tab.id ? 'bg-amber-300 text-[#3D040A]' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-slate-500 font-bold shrink-0">
                    Operating Branch: <span className="text-[#7D0A14]">{currentShop?.shortName}</span>
                  </div>
                </div>

                {/* SubTab 1: Assigned Orders */}
                {storeActiveSubTab === 'orders' && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                        Live Express Orders Assigned to {currentShop?.shortName}
                      </h4>
                      <span className="text-[11px] text-emerald-700 font-bold">● Auto-routed from customer orders</span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-100">
                      <table className="w-full min-w-[650px] text-left text-xs">
                        <thead>
                          <tr className="bg-[#FAF5EC] text-slate-700 font-extrabold border-b border-[#EDE1D1]">
                            <th className="p-3 rounded-l-xl">Order ID</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Items Ordered</th>
                            <th className="p-3">Total Amount</th>
                            <th className="p-3">Assigned Partner</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 rounded-r-xl text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {(currentShop?.assignedOrders || []).map((ord) => (
                            <tr key={ord.id} className="hover:bg-[#FAF5EC]/40 transition-colors">
                              <td className="p-3 font-black text-[#7D0A14]">{ord.id}</td>
                              <td className="p-3 font-bold text-slate-900">{ord.customer}</td>
                              <td className="p-3 text-slate-600">{ord.items}</td>
                              <td className="p-3 font-black text-slate-900">₹{ord.total}</td>
                              <td className="p-3 font-semibold text-slate-700">{ord.partner}</td>
                              <td className="p-3 text-slate-400 text-[11px]">{ord.time}</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                  ord.status === 'Delivered'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : ord.status === 'Dispatched'
                                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                    : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                                }`}>
                                  {ord.status}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    showToast(`Order ${ord.id} status updated for ${currentShop.shortName}!`);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-[#7D0A14] hover:bg-[#60060E] text-white text-[10px] font-black shadow-2xs active:scale-95 cursor-pointer"
                                >
                                  Update Status
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SubTab 2: In-Store Inventory */}
                {storeActiveSubTab === 'inventory' && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                        Current Store Inventory & Shelf Stocks
                      </h4>
                      <span className="text-[11px] text-slate-500 font-bold">Fast-Moving Daily Fresh Stocks</span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-100">
                      <table className="w-full min-w-[580px] text-left text-xs">
                        <thead>
                          <tr className="bg-[#FAF5EC] text-slate-700 font-extrabold border-b border-[#EDE1D1]">
                            <th className="p-3 rounded-l-xl">Product Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">In-Store Stock</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 rounded-r-xl text-center">Quick Restock</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {(currentShop?.inventory || []).map((item) => (
                            <tr key={item.id} className="hover:bg-[#FAF5EC]/40 transition-colors">
                              <td className="p-3 font-bold text-slate-900">{item.name}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded-md bg-[#FAF5EC] text-[#7D0A14] border border-[#EDE1D1] text-[10px] font-bold">
                                  {item.category}
                                </span>
                              </td>
                              <td className="p-3 font-black text-slate-900 text-sm">
                                {item.stock} {item.unit}
                              </td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                  item.inStock
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {item.inStock ? 'In Stock' : 'Low Stock'}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleRestockStoreItem(currentShop.id, item.id)}
                                  className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] shadow-xs active:scale-95 transition-all cursor-pointer"
                                >
                                  + Restock (+20)
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SubTab 3: Delivery Fleet */}
                {storeActiveSubTab === 'fleet' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                          Delivery Partners Assigned to {currentShop?.shortName}
                        </h4>
                        <span className="text-[11px] text-purple-700 font-bold">10-15 Min Express SLA</span>
                      </div>
                      <a
                        href="/partner"
                        className="px-3.5 py-1.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black text-xs flex items-center gap-1.5 shadow-xs w-fit"
                      >
                        <Bike className="w-4 h-4 text-[#F5A623]" />
                        <span>Open Delivery Partner Portal (/partner)</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      {[
                        { name: 'Ramesh Kumar', phone: '+91 98450 77123', rating: '4.9 ★', vehicle: 'TS09-EG-4412', status: 'On Delivery', id: 'partner1' },
                        { name: 'Kiran Goud', phone: '+91 98450 77124', rating: '4.8 ★', vehicle: 'TS09-EG-5589', status: 'At Store Bay', id: 'partner2' },
                        { name: 'Suresh Varma', phone: '+91 98450 77125', rating: '4.95 ★', vehicle: 'TS09-EG-6623', status: 'Packing Orders', id: 'partner3' },
                        { name: 'Anil Reddy', phone: '+91 98450 77126', rating: '4.9 ★', vehicle: 'TS09-EG-7741', status: 'On Delivery', id: 'partner4' }
                      ].map((rider, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF5EC]/60 border border-[#EDE1D1] space-y-2 flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-slate-900">{rider.name}</span>
                              <span className="text-amber-600 font-black text-[11px]">{rider.rating}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">Bike: {rider.vehicle}</div>
                            <div className="text-[11px] text-[#7D0A14] font-bold">{rider.phone}</div>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                              rider.status === 'On Delivery'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {rider.status}
                            </span>
                          </div>

                          <a
                            href={`/partner${rider.id.replace('partner', '')}`}
                            className="w-full py-1.5 rounded-xl bg-white hover:bg-[#FAF5EC] text-[#7D0A14] font-black text-[11px] flex items-center justify-center gap-1 border border-[#EDE1D1] shadow-2xs active:scale-95 transition-all text-center"
                          >
                            <Bike className="w-3 h-3 text-[#7D0A14]" />
                            <span>Launch /partner{rider.id.replace('partner', '')}</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SubTab 4: Store Profile & Timings */}
                {storeActiveSubTab === 'profile' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1] space-y-2">
                      <div className="font-black text-slate-900 text-sm">{currentShop?.name}</div>
                      <p className="text-slate-600">{currentShop?.tagline}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EDE1D1]">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Operating Hours</span>
                          <span className="font-bold text-slate-800">{currentShop?.timings}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Daily Dispatch Capacity</span>
                          <span className="font-bold text-slate-800">{currentShop?.dailyCapacity} Orders per Day</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">FSSAI Central Food License</span>
                          <span className="font-bold text-slate-800">{currentShop?.fssai}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">State GSTIN Number</span>
                          <span className="font-bold text-slate-800">{currentShop?.gstin}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 1. DASHBOARD OVERVIEW                                     */}
          {/* ========================================================= */}
          {(activeTab === 'dashboard' || activeTab === 'overview') && (
            <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
              {/* Mobile Search Bar (Exact Match to User Mockup) */}
              <div className="lg:hidden relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search customers (name, phone, email)..."
                  value={customerSearchTerm}
                  onChange={(e) => {
                    setCustomerSearchTerm(e.target.value);
                    if (activeTab !== 'b2c-customers' && activeTab !== 'b2b-customers' && activeTab !== 'customers') {
                      setActiveTab('b2c-customers');
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF5EC] border border-[#E8DDCF] rounded-full text-xs font-semibold text-[#3D040A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]/20 shadow-2xs"
                />
              </div>

              {/* Mobile Shop Branch Card (Exact Match to User Mockup) */}
              <div
                onClick={() => setIsShopLoginModalOpen(true)}
                className="lg:hidden w-full p-3 bg-[#FAF5EC] border border-[#E8DDCF] rounded-2xl flex flex-col items-center justify-center gap-1 shadow-2xs cursor-pointer active:scale-[0.99] transition-transform hover:border-[#7D0A14]/30"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-amber-100 text-[#7D0A14]">
                    <Store className="w-4 h-4 text-[#7D0A14]" />
                  </span>
                  <span className="font-extrabold text-xs text-slate-500">Branch:</span>
                  <span className="font-black text-xs text-[#7D0A14]">
                    {currentShop ? (currentShop.shortName || currentShop.name) : 'Branch 1 (Madhapur)'}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-[10px] font-bold text-amber-900 border border-amber-200">
                  <span>❄️ {currentShop?.coldChainTemp || '3.8°C Cold-Chain OK'}</span>
                </div>
              </div>

              {/* Mobile Scope Switcher Segmented Control (Exact Match to User Mockup) */}
              <div className="lg:hidden w-full flex items-center bg-[#FAF5EC] p-1 rounded-2xl border-2 border-[#E8DDCF] shadow-xs">
                <button
                  type="button"
                  onClick={() => {
                    setAdminMode('b2c');
                    setCustomerScope('b2c');
                    if (activeTab === 'b2b-customers') setActiveTab('b2c-customers');
                    showToast('Switched to B2C Retail Operations');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    adminMode === 'b2c'
                      ? 'bg-[#7D0A14] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                  <span>B2C Retail</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAdminMode('b2b');
                    setCustomerScope('b2b');
                    if (activeTab === 'b2c-customers') setActiveTab('b2b-customers');
                    showToast('Switched to B2B Wholesale Portal');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    adminMode === 'b2b'
                      ? 'bg-[#7D0A14] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span>B2B Wholesale</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAdminMode('unified');
                    setCustomerScope('all');
                    if (activeTab === 'b2c-customers' || activeTab === 'b2b-customers') setActiveTab('customers');
                    showToast('Switched to Unified View (B2C + B2B)');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    adminMode === 'unified'
                      ? 'bg-[#7D0A14] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span>Unified</span>
                </button>
              </div>

              {/* Dashboard Sub-Header with Date Filter (Desktop View) */}
              <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#EDE1D1] shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7D0A14] text-[#F5A623] flex items-center justify-center shrink-0 shadow-xs">
                    <Home className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-[#3D040A] tracking-tight">
                      Store Performance & Live Operations
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Real-time revenue, order dispatch volume, customer activity, and inventory health.
                    </p>
                  </div>
                </div>

                {/* Calendar Daily-Wise Order Filter & Manifest Launcher */}
                <div className="relative flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  {/* Calendar Filter Dropdown Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCalendarDropdownOpen((prev) => !prev)}
                      className="flex items-center gap-2 px-3.5 py-2 bg-[#FAF5EC] border border-[#EDE1D1] rounded-xl text-xs font-bold text-[#3D040A] hover:bg-amber-100/60 shadow-2xs transition-colors cursor-pointer"
                      title="Filter orders daily-wise by date"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#7D0A14]" />
                      <span>
                        {orderDateRange === 'today'
                          ? `Today (${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})`
                          : orderDateRange === 'yesterday'
                          ? 'Yesterday'
                          : orderDateRange === 'week'
                          ? 'This Week'
                          : orderDateRange === 'custom'
                          ? `Date: ${selectedCustomDate}`
                          : 'Last 30 Days'}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full bg-[#7D0A14] text-white text-[10px] font-black">
                        {dateFilteredOrders.length}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Interactive Calendar Dropdown Menu */}
                    {isCalendarDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-[#EDE1D1] p-4 z-50 space-y-3 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <div className="text-xs font-black text-[#3D040A] flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-[#7D0A14]" />
                            <span>Daily Order Filter & Calendar</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsCalendarDropdownOpen(false)}
                            className="text-slate-400 hover:text-slate-600 p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Quick Presets */}
                        <div className="grid grid-cols-2 gap-1.5 text-xs">
                          <button
                            type="button"
                            onClick={() => {
                              setOrderDateRange('today');
                              setIsCalendarDropdownOpen(false);
                              showToast("Showing Today's Live Orders");
                            }}
                            className={`py-2 px-2.5 rounded-xl font-bold text-left transition-colors flex items-center justify-between ${
                              orderDateRange === 'today'
                                ? 'bg-[#7D0A14] text-white shadow-xs'
                                : 'bg-[#FAF5EC] text-slate-700 hover:bg-[#F3EAD9]'
                            }`}
                          >
                            <span>📅 Today</span>
                            <span className="text-[10px] opacity-80">
                              {orders.filter((o) => matchesOrderDate(o, 'today', selectedCustomDate)).length} ords
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setOrderDateRange('yesterday');
                              setIsCalendarDropdownOpen(false);
                              showToast("Showing Yesterday's Orders");
                            }}
                            className={`py-2 px-2.5 rounded-xl font-bold text-left transition-colors flex items-center justify-between ${
                              orderDateRange === 'yesterday'
                                ? 'bg-[#7D0A14] text-white shadow-xs'
                                : 'bg-[#FAF5EC] text-slate-700 hover:bg-[#F3EAD9]'
                            }`}
                          >
                            <span>⏱️ Yesterday</span>
                            <span className="text-[10px] opacity-80">
                              {orders.filter((o) => matchesOrderDate(o, 'yesterday', selectedCustomDate)).length} ords
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setOrderDateRange('week');
                              setIsCalendarDropdownOpen(false);
                              showToast("Showing This Week's Orders");
                            }}
                            className={`py-2 px-2.5 rounded-xl font-bold text-left transition-colors flex items-center justify-between ${
                              orderDateRange === 'week'
                                ? 'bg-[#7D0A14] text-white shadow-xs'
                                : 'bg-[#FAF5EC] text-slate-700 hover:bg-[#F3EAD9]'
                            }`}
                          >
                            <span>📊 This Week</span>
                            <span className="text-[10px] opacity-80">
                              {orders.filter((o) => matchesOrderDate(o, 'week', selectedCustomDate)).length} ords
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setOrderDateRange('all');
                              setIsCalendarDropdownOpen(false);
                              showToast('Showing Last 30 Days (All Orders)');
                            }}
                            className={`py-2 px-2.5 rounded-xl font-bold text-left transition-colors flex items-center justify-between ${
                              orderDateRange === 'all'
                                ? 'bg-[#7D0A14] text-white shadow-xs'
                                : 'bg-[#FAF5EC] text-slate-700 hover:bg-[#F3EAD9]'
                            }`}
                          >
                            <span>🗓️ Last 30 Days</span>
                            <span className="text-[10px] opacity-80">{orders.length} ords</span>
                          </button>
                        </div>

                        {/* Pick Specific Calendar Date */}
                        <div className="pt-2 border-t border-slate-100 space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-600 block">
                            Pick Calendar Date to Check Orders:
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="date"
                              value={selectedCustomDate}
                              onChange={(e) => {
                                setSelectedCustomDate(e.target.value);
                                setOrderDateRange('custom');
                              }}
                              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#EDE1D1] bg-[#FAF5EC] font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#7D0A14]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setOrderDateRange('custom');
                                setIsCalendarDropdownOpen(false);
                                showToast(`Filtered to Orders on ${selectedCustomDate}`);
                              }}
                              className="px-3 py-1.5 bg-[#7D0A14] hover:bg-[#60060E] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                            >
                              Check
                            </button>
                          </div>
                        </div>

                        {/* Open Daily Order Manifest Modal Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setIsCalendarDropdownOpen(false);
                            setIsDailyOrdersModalOpen(true);
                          }}
                          className="w-full py-2 bg-[#F5A623] hover:bg-[#E09215] text-[#3D040A] rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Daily Manifest ({dateFilteredOrders.length} orders)</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 1-Click Open Daily Order Check Modal */}
                  <button
                    type="button"
                    onClick={() => setIsDailyOrdersModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7D0A14] hover:bg-[#60060E] text-white rounded-xl text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                    title="Check daily orders manifest"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-300" />
                    <span>Daily Order Check</span>
                  </button>
                </div>
              </div>

              {/* 2. Top 6 KPI Metric Cards in Live Website Colors */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {/* Total Sales */}
                <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:border-[#7D0A14]/30 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#F5A623] flex items-center justify-center text-[#3D040A] font-black text-sm shrink-0 shadow-2xs">
                      ₹
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-500 truncate">Total Sales</div>
                      <div className="text-base sm:text-lg lg:text-xl font-black text-[#3D040A] tracking-tight mt-0.5 truncate">
                        {orders.length > 0 ? `₹${orders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString('en-IN')}` : '₹0'}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700 mt-2">
                    ↑ 12% <span className="text-slate-400 font-normal">vs last mo</span>
                  </div>
                  {/* Saffron Gold Sparkline */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="salesGradLive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F5A623" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#F5A623" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,20 Q15,10 30,16 T60,8 T85,14 T100,6 L100,25 L0,25 Z" fill="url(#salesGradLive)" />
                    <path d="M0,20 Q15,10 30,16 T60,8 T85,14 T100,6" fill="none" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* B2C Orders */}
                <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:border-[#7D0A14]/30 hover:shadow-xs transition-all">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-900">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#F5A623] text-[#3D040A]">
                        B2C Retail
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-500 mt-2">B2C Orders</div>
                    <div className="text-base sm:text-lg lg:text-xl font-black text-[#3D040A] tracking-tight mt-0.5">
                      {orders.filter(o => o.type === 'b2c').length}
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700 mt-1">
                    ↑ 15% <span className="text-slate-400 font-normal">vs last mo</span>
                  </div>
                  {/* Saffron Gold Sparkline */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path d="M0,22 Q20,15 40,18 T70,10 T100,5 L100,25 L0,25 Z" fill="url(#salesGradLive)" />
                    <path d="M0,22 Q20,15 40,18 T70,10 T100,5" fill="none" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* B2B Orders */}
                <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:border-[#7D0A14]/30 hover:shadow-xs transition-all">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#7D0A14]">
                        <Handshake className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#7D0A14] text-white">
                        B2B Wholesale
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-500 mt-2">B2B Orders</div>
                    <div className="text-base sm:text-lg lg:text-xl font-black text-[#3D040A] tracking-tight mt-0.5">
                      {orders.filter(o => o.type === 'b2b').length}
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700 mt-1">
                    ↑ 10% <span className="text-slate-400 font-normal">vs last mo</span>
                  </div>
                  {/* Royal Maroon Sparkline */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="maroonGradLive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7D0A14" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7D0A14" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,20 Q20,12 45,17 T75,9 T100,7 L100,25 L0,25 Z" fill="url(#maroonGradLive)" />
                    <path d="M0,20 Q20,12 45,17 T75,9 T100,7" fill="none" stroke="#7D0A14" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Total Customers */}
                <div
                  onClick={() => setActiveTab('b2c-customers')}
                  className="cursor-pointer bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:border-[#7D0A14] hover:shadow-sm transition-all group"
                  title="Click to open Customer Management & Search"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] flex items-center justify-center text-[#7D0A14] shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-500 truncate">Total Customers</div>
                      <div className="text-base sm:text-lg lg:text-xl font-black text-[#3D040A] tracking-tight mt-0.5">
                        {customers.length}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700 mt-2">
                    ↑ 14% <span className="text-slate-400 font-normal">vs last mo</span>
                  </div>
                  {/* Blue/Navy Sparkline */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="custGradLive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,22 Q25,18 50,15 T75,8 T100,5 L100,25 L0,25 Z" fill="url(#custGradLive)" />
                    <path d="M0,22 Q25,18 50,15 T75,8 T100,5" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Low Stock */}
                <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:border-[#7D0A14]/30 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-500 truncate">Low Stock</div>
                      <div className="text-base sm:text-lg lg:text-xl font-black text-[#3D040A] tracking-tight mt-0.5">
                        18
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-rose-600 mt-2 flex items-center gap-1">
                    <span>⚠ Needs Attention</span>
                  </div>
                  {/* Amber Sparkline */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <path d="M0,20 Q20,14 45,18 T80,11 T100,8 L100,25 L0,25 Z" fill="url(#salesGradLive)" />
                    <path d="M0,20 Q20,14 45,18 T80,11 T100,8" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Pending Deliveries */}
                <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:border-[#7D0A14]/30 hover:shadow-xs transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-500 truncate">Pending Delivery</div>
                      <div className="text-base sm:text-lg lg:text-xl font-black text-[#3D040A] tracking-tight mt-0.5">
                        {orders.filter(o => o.status !== 'Delivered').length}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700 mt-2">
                    ↑ 5% <span className="text-slate-400 font-normal">vs last mo</span>
                  </div>
                  {/* Emerald Sparkline */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="delGradLive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,21 Q25,17 50,13 T80,8 T100,4 L100,25 L0,25 Z" fill="url(#delGradLive)" />
                    <path d="M0,21 Q25,17 50,13 T80,8 T100,4" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* 3. Middle Section: Sales & Orders Overview + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Sales & Orders Overview Chart in Website Theme */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE1D1] pb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#7D0A14]" />
                      <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
                        Sales & Orders Overview
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
                        <span>Sales (₹)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#7D0A14]" />
                        <span>Orders</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Line Chart */}
                  <div className="relative pt-2">
                    <div className="h-56 w-full flex items-end">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200">
                        {/* Grid lines and Y-axis labels */}
                        <g className="text-slate-400 text-[10px] font-bold">
                          <line x1="40" y1="20" x2="680" y2="20" stroke="#F8F3EA" strokeWidth="1" strokeDasharray="4 4" />
                          <text x="5" y="24" fill="#8C7A6B">₹6L</text>

                          <line x1="40" y1="75" x2="680" y2="75" stroke="#F8F3EA" strokeWidth="1" strokeDasharray="4 4" />
                          <text x="5" y="79" fill="#8C7A6B">₹4L</text>

                          <line x1="40" y1="130" x2="680" y2="130" stroke="#F8F3EA" strokeWidth="1" strokeDasharray="4 4" />
                          <text x="5" y="134" fill="#8C7A6B">₹2L</text>

                          <line x1="40" y1="185" x2="680" y2="185" stroke="#E8DDCF" strokeWidth="1" />
                          <text x="5" y="189" fill="#8C7A6B">₹0</text>
                        </g>

                        {/* Yellow/Saffron Gold Line: Sales (₹) */}
                        <path
                          d="M60,140 L160,105 L260,80 L360,75 L460,35 L560,55 L660,65"
                          fill="none"
                          stroke="#F5A623"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Sales Circles */}
                        {[
                          { x: 60, y: 140, val: '₹2.2L' },
                          { x: 160, y: 105, val: '₹3.4L' },
                          { x: 260, y: 80, val: '₹4.0L' },
                          { x: 360, y: 75, val: '₹4.1L' },
                          { x: 460, y: 35, val: '₹5.2L' },
                          { x: 560, y: 55, val: '₹4.6L' },
                          { x: 660, y: 65, val: '₹4.4L' }
                        ].map((pt, i) => (
                          <g key={i}>
                            <circle cx={pt.x} cy={pt.y} r="5" fill="#F5A623" stroke="#FFFFFF" strokeWidth="2.5" className="cursor-pointer" />
                          </g>
                        ))}

                        {/* Royal Maroon Line: Orders */}
                        <path
                          d="M60,170 L160,145 L260,148 L360,148 L460,125 L560,145 L660,140"
                          fill="none"
                          stroke="#7D0A14"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Orders Circles */}
                        {[
                          { x: 60, y: 170, val: '120 Orders' },
                          { x: 160, y: 145, val: '185 Orders' },
                          { x: 260, y: 148, val: '174 Orders' },
                          { x: 360, y: 148, val: '176 Orders' },
                          { x: 460, y: 125, val: '240 Orders' },
                          { x: 560, y: 145, val: '188 Orders' },
                          { x: 660, y: 140, val: '194 Orders' }
                        ].map((pt, i) => (
                          <g key={i}>
                            <circle cx={pt.x} cy={pt.y} r="4.5" fill="#7D0A14" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer" />
                          </g>
                        ))}

                        {/* X-axis labels */}
                        <g className="text-slate-500 text-[11px] font-bold">
                          <text x="60" y="202" textAnchor="middle" fill="#64748B">Oct 26</text>
                          <text x="160" y="202" textAnchor="middle" fill="#64748B">Oct 27</text>
                          <text x="260" y="202" textAnchor="middle" fill="#64748B">Oct 28</text>
                          <text x="360" y="202" textAnchor="middle" fill="#64748B">Oct 29</text>
                          <text x="460" y="202" textAnchor="middle" fill="#64748B">Oct 30</text>
                          <text x="560" y="202" textAnchor="middle" fill="#64748B">Oct 31</text>
                          <text x="660" y="202" textAnchor="middle" fill="#64748B">Nov 1</text>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Quick Actions in Website Warm Cream Theme */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-[#EDE1D1] p-5 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center gap-2 border-b border-[#EDE1D1] pb-3 mb-4">
                    <Zap className="w-5 h-5 text-[#F5A623] fill-[#F5A623]/30" />
                    <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
                      Quick Actions
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {/* Add Product */}
                    <button
                      onClick={() => setIsAddProductModalOpen(true)}
                      className="p-4 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] border border-[#EDE1D1] flex flex-col items-center justify-center gap-2 text-xs font-bold text-[#3D040A] transition-all active:scale-95 shadow-2xs group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE1D1] flex items-center justify-center text-[#7D0A14] group-hover:scale-110 transition-transform shadow-2xs">
                        <Package className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-[#3D040A]">Add Product</span>
                    </button>

                    {/* Add B2B Customer */}
                    <button
                      onClick={() => setActiveTab('b2b-customers')}
                      className="p-4 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] border border-[#EDE1D1] flex flex-col items-center justify-center gap-2 text-xs font-bold text-[#3D040A] transition-all active:scale-95 shadow-2xs group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE1D1] flex items-center justify-center text-[#7D0A14] group-hover:scale-110 transition-transform shadow-2xs">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-[#3D040A]">Add B2B Customer</span>
                    </button>

                    {/* Create Offer */}
                    <button
                      onClick={() => setActiveTab('offers-coupons')}
                      className="p-4 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] border border-[#EDE1D1] flex flex-col items-center justify-center gap-2 text-xs font-bold text-[#3D040A] transition-all active:scale-95 shadow-2xs group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE1D1] flex items-center justify-center text-[#7D0A14] group-hover:scale-110 transition-transform shadow-2xs">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-[#3D040A]">Create Offer</span>
                    </button>

                    {/* Generate Invoice */}
                    <button
                      onClick={() => setActiveTab('invoices')}
                      className="p-4 rounded-2xl bg-[#FAF5EC] hover:bg-[#F3EAD9] border border-[#EDE1D1] flex flex-col items-center justify-center gap-2 text-xs font-bold text-[#3D040A] transition-all active:scale-95 shadow-2xs group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE1D1] flex items-center justify-center text-[#7D0A14] group-hover:scale-110 transition-transform shadow-2xs">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-[#3D040A]">Generate Invoice</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Lower Section: Recent Orders + Low Stock Products */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Recent Orders Table */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-[#7D0A14]" />
                      <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
                        Recent Orders
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-black text-[#7D0A14] hover:text-[#52060E] flex items-center gap-1 hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left border-collapse text-xs">
                      <thead className="bg-[#FAF5EC] border-b border-[#EDE1D1] text-[#3D040A] font-extrabold uppercase tracking-wider">
                        <tr>
                          <th className="py-2.5 px-3">Order ID</th>
                          <th className="py-2.5 px-3">Customer</th>
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Amount</th>
                          <th className="py-2.5 px-3">Payment</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EDE1D1]/60 font-medium">
                        {orders.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="py-8 text-center text-slate-500">
                              <ShoppingCart className="w-8 h-8 text-[#7D0A14]/30 mx-auto mb-2" />
                              <div className="font-extrabold text-[#3D040A] text-sm">No live orders placed yet</div>
                              <p className="text-xs text-slate-500 mt-0.5 max-w-sm mx-auto">
                                All fake demo orders have been removed. Only real orders placed by authentic customers on the live website will appear here.
                              </p>
                              <div className="flex items-center justify-center gap-2 mt-3">
                                <button
                                  onClick={() => navigateTo('home')}
                                  className="px-3.5 py-1.5 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-[#7D0A14] font-bold text-xs hover:bg-[#F3EAD9] transition-colors"
                                >
                                  Go to Storefront →
                                </button>
                                {user && (
                                  <button
                                    onClick={simulateNewB2COrder}
                                    className="px-3.5 py-1.5 rounded-xl bg-[#7D0A14] text-white font-bold text-xs hover:bg-[#60060E] transition-colors shadow-2xs"
                                  >
                                    + Place Test Order for {user.name || 'You'}
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ) : (
                          orders.slice(0, 6).map((order) => {
                            const isB2B = order.type === 'b2b';
                            const statusColor =
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'Processing'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'Shipped'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-amber-100 text-amber-800';
                            return (
                              <tr key={order.id} className="hover:bg-[#FAF5EC]/40 transition-colors">
                                <td className="py-3 px-3 font-mono font-bold text-[#7D0A14]">{order.id}</td>
                                <td className="py-3 px-3 font-bold text-[#3D040A]">{order.customer || order.name || order.shippingAddress?.fullName || 'Customer'}</td>
                                <td className="py-3 px-3">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                    isB2B
                                      ? 'bg-[#7D0A14] text-white'
                                      : 'bg-[#FEE2E2] text-[#991B1B]'
                                  }`}>
                                    {isB2B ? 'B2B' : 'B2C'}
                                  </span>
                                </td>
                                <td className="py-3 px-3 font-black text-[#3D040A]">
                                  ₹{(order.total || 0).toLocaleString('en-IN')}
                                </td>
                                <td className="py-3 px-3 text-slate-600 font-semibold">
                                  {order.paymentMethod || order.payment || 'UPI / COD'}
                                </td>
                                <td className="py-3 px-3">
                                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusColor}`}>
                                    {order.status || 'Processing'}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-slate-500 text-[11px]">
                                  {order.date || order.createdAt || 'Today'}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Low Stock Products in Website Theme */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-[#7D0A14]" />
                      <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
                        Low Stock Products
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('inventory')}
                      className="text-xs font-black text-[#7D0A14] hover:text-[#52060E] flex items-center gap-1 hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="space-y-3 flex-1">
                    {[
                      { name: 'Tata Salt 1kg', left: 'Only 5 left', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&auto=format&fit=crop&q=80' },
                      { name: 'Sunflower Oil 1L', left: 'Only 8 left', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&auto=format&fit=crop&q=80' },
                      { name: 'Aashirvaad Atta 5kg', left: 'Only 10 left', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&auto=format&fit=crop&q=80' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-[#EDE1D1] bg-[#FAF5EC]/30 hover:bg-[#FAF5EC] transition-all">
                        <div className="flex items-center gap-3">
                          <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-[#EDE1D1]" />
                          <div>
                            <div className="font-bold text-xs text-[#3D040A]">{item.name}</div>
                            <div className="text-[11px] font-bold text-rose-600">{item.left}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => showToast(`Stock replenished for ${item.name}! +50 units added.`, 'success')}
                          className="px-3 py-1 rounded-full border border-[#7D0A14] text-[#7D0A14] hover:bg-[#7D0A14] hover:text-white text-xs font-black active:scale-95 transition-all shadow-2xs"
                        >
                          Restock
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Morning Subscriptions Banner */}
              <div className="bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
                <div className="text-xs font-black text-[#7D0A14] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#7D0A14]" />
                    <span className="font-black text-sm text-[#3D040A]">Morning Milk Subscriptions (Doorstep Daily)</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Before 7:00 AM SLA
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('subscriptions')}
                    className="text-xs font-black text-[#7D0A14] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Subscriptions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 text-xs">
                    <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-amber-200/60 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-900 font-black">
                        🥛
                      </div>
                      <div>
                        <div className="font-black text-sm text-[#3D040A]">{subscriptions.length}</div>
                        <div className="text-[10px] text-slate-500 font-semibold">Active Subscriptions</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-amber-200/60 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#3D040A]">Daily 6:00 - 7:00 AM</div>
                        <div className="text-[10px] text-slate-500">Automated Route Dispatch</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-amber-200/60 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#3D040A]">Live Dispatch Run-Sheet</div>
                        <div className="text-[10px] text-slate-500">Printable Gate Slips</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-amber-200/60 shadow-2xs">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-800">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#3D040A]">Pure A2 & Farm Fresh</div>
                        <div className="text-[10px] text-slate-500">Vacation Pause & Resume</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('subscriptions')}
                    className="px-4 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Manage Subscriptions</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>

              {/* 5. Bottom Banner: B2B Section in Signature Royal Maroon Theme */}
              <div className="bg-gradient-to-r from-[#FAF5EC] via-[#FDF7F2] to-[#FAF5EC] border border-[#EDE1D1] rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
                <div className="text-xs font-black text-[#7D0A14] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#7D0A14]" />
                  <span>B2B Section – Business Customers</span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 flex-1 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#EDE1D1] flex items-center justify-center text-[#7D0A14]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-black text-sm text-[#3D040A]">124</div>
                        <div className="text-[10px] text-slate-500 font-semibold">B2B Customers</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#EDE1D1] flex items-center justify-center text-[#7D0A14]">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#3D040A]">Wholesale Price Lists</div>
                        <div className="text-[10px] text-slate-500">Manage B2B Pricing</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#EDE1D1] flex items-center justify-center text-[#7D0A14]">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#3D040A]">Min. Order Quantity</div>
                        <div className="text-[10px] text-slate-500">Set MOQ Rules</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#EDE1D1] flex items-center justify-center text-[#7D0A14]">
                        <Handshake className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#3D040A]">Credit / Payment Terms</div>
                        <div className="text-[10px] text-slate-500">Net 30 / Net 45</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#EDE1D1] flex items-center justify-center text-[#7D0A14]">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#3D040A]">GST / Business Details</div>
                        <div className="text-[10px] text-slate-500">Manage Business Info</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('b2b-customers')}
                    className="px-5 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 active:scale-95"
                  >
                    <span>Manage B2B →</span>
                  </button>
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
                          ? 'bg-[#7D0A14] text-white shadow-xs'
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

                  {/* Date Filter in Orders Console */}
                  <div className="flex items-center gap-1.5 bg-[#FAF5EC] px-2 py-1 rounded-xl border border-[#EDE1D1] text-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#7D0A14]" />
                    <select
                      value={orderDateRange}
                      onChange={(e) => setOrderDateRange(e.target.value)}
                      className="bg-transparent font-bold text-slate-700 focus:outline-none text-xs cursor-pointer"
                    >
                      <option value="all">Last 30 Days (All)</option>
                      <option value="today">Today Only</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="week">This Week</option>
                      <option value="custom">Specific Date</option>
                    </select>
                    {orderDateRange === 'custom' && (
                      <input
                        type="date"
                        value={selectedCustomDate}
                        onChange={(e) => setSelectedCustomDate(e.target.value)}
                        className="px-2 py-0.5 rounded-lg border border-[#EDE1D1] bg-white text-xs font-semibold text-slate-800"
                      />
                    )}
                  </div>

                  {orders.length > 0 && (
                    <button
                      onClick={clearAllOrders}
                      className="px-2.5 py-1.5 text-xs rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold flex items-center gap-1 transition-colors"
                      title="Clear All Orders"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Clear All Orders</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full min-w-[680px] text-left text-xs">
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
                                className="px-2.5 py-1 rounded-lg bg-[#7D0A14] hover:bg-[#60060E] text-white text-[10px] font-black shadow-xs"
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
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors shadow-2xs"
                              title="Delete this order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
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
                              Only real orders placed by verified logged-in customers are shown here. Place an order on the storefront or click below to create an order for the logged-in customer.
                            </p>
                            <button
                              onClick={simulateNewB2COrder}
                              className="px-3.5 py-1.5 rounded-xl bg-[#7D0A14] text-white text-xs font-bold shadow-xs hover:bg-[#60060E] transition-colors"
                            >
                              + Create Order for Current Customer
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
                    {(activeTab === 'b2c-customers' || activeTab === 'b2b-customers' || activeTab === 'customers') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* 1. Header Section matching Screenshot */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs border ${
                    effectiveScope === 'b2b'
                      ? 'bg-[#7D0A14]/10 border-[#7D0A14]/20 text-[#7D0A14]'
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                  }`}>
                    {effectiveScope === 'b2b' ? (
                      <Store className="w-7 h-7 text-[#7D0A14]" />
                    ) : (
                      <Users className="w-7 h-7 text-amber-500 fill-amber-500/30" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl sm:text-3xl font-black text-[#5A070E] tracking-tight">
                        {effectiveScope === 'b2c'
                          ? 'Daily Customers Management'
                          : effectiveScope === 'b2b'
                          ? 'Shopkeepers & Commercial Registry'
                          : 'Customer Management'}
                      </h2>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        effectiveScope === 'b2b'
                          ? 'bg-[#7D0A14] text-white shadow-xs'
                          : effectiveScope === 'b2c'
                          ? 'bg-[#F5A623] text-[#3D040A] shadow-xs'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {effectiveScope === 'b2b' ? 'B2B Wholesale' : effectiveScope === 'b2c' ? 'B2C Retail' : 'Unified'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                      {effectiveScope === 'b2c'
                        ? 'View and manage residential household accounts, morning pure cow milk & grocery subscribers'
                        : effectiveScope === 'b2b'
                        ? 'View and manage registered kirana stores, supermarket partners, restaurants, and bulk GST buyers'
                        : 'View and manage all registered customers, shopkeepers and subscribers easily'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetDefaultCustomers}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                    title="Reset to standard reference customers (1 Daily Customer + 1 Shopkeeper)"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Defaults</span>
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen && setIsAuthModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#5A070E] hover:bg-[#430409] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <User className="w-3.5 h-3.5 text-amber-300" />
                    <span>{user ? `Logged in as ${user.name || 'User'}` : 'Sign In as Customer'}</span>
                  </button>
                </div>
              </div>

              {/* 2. Top 4 KPI Metric Cards (Context-aware based on active tab) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {effectiveScope === 'b2b' ? (
                  <>
                    {/* B2B KPI 1: Total Shopkeepers */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#5A070E] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Store className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {b2bCustomerCount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Shopkeepers
                        </div>
                      </div>
                      <Store className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>

                    {/* B2B KPI 2: Verified GST Accounts */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#F59E0B] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {(customers.filter(c => c.isBusiness && c.gstin).length || b2bCustomerCount).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Verified GST Accounts
                        </div>
                      </div>
                      <ShieldCheck className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>

                    {/* B2B KPI 3: Commercial Wholesale Orders */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#059669] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Truck className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {customers.filter(c => c.isBusiness || c.customerType === 'Shopkeeper').reduce((acc, c) => acc + (c.ordersCount || 0), 0).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Wholesale Orders
                        </div>
                      </div>
                      <Truck className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>

                    {/* B2B KPI 4: Commercial Volume */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#7D0A14] flex items-center justify-center text-amber-300 shrink-0 shadow-sm">
                        <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
                          ₹{customers.filter(c => c.isBusiness || c.customerType === 'Shopkeeper').reduce((acc, c) => acc + (c.totalSpent || 0), 0).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Commercial B2B Spend
                        </div>
                      </div>
                      <Building2 className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>
                  </>
                ) : effectiveScope === 'b2c' ? (
                  <>
                    {/* B2C KPI 1: Daily Customers */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F59E0B] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <User className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {b2cCustomerCount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Daily Customers
                        </div>
                      </div>
                      <User className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>

                    {/* B2C KPI 2: Milk Subscribers */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#5A070E] flex items-center justify-center text-amber-300 shrink-0 shadow-sm">
                        <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {customers.filter(c => !c.isBusiness && c.customerType !== 'Shopkeeper' && c.subscription && c.subscription !== 'None').length.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Milk Subscribers
                        </div>
                      </div>
                      <Clock className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>

                    {/* B2C KPI 3: Active Household Accounts */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#059669] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Check className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {customers.filter(c => !c.isBusiness && c.customerType !== 'Shopkeeper' && c.status === 'Active').length.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Active Accounts
                        </div>
                      </div>
                      <CheckCircle2 className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>

                    {/* B2C KPI 4: Household Retail Orders */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#7D0A14] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {customers.filter(c => !c.isBusiness && c.customerType !== 'Shopkeeper').reduce((acc, c) => acc + (c.ordersCount || 0), 0).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Retail Orders Placed
                        </div>
                      </div>
                      <ShoppingBag className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Unified KPI 1 */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#5A070E] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {totalCustomerCount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Total Customers
                        </div>
                      </div>
                      <Users className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>

                    {/* Unified KPI 2 */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F59E0B] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <User className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {b2cCustomerCount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Daily Customers
                        </div>
                      </div>
                      <User className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>

                    {/* Unified KPI 3 */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#5A070E] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Store className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {b2bCustomerCount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Shopkeepers
                        </div>
                      </div>
                      <Store className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>

                    {/* Unified KPI 4 */}
                    <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#059669] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Check className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                          {activeCustomerCount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">
                          Active Customers
                        </div>
                      </div>
                      <CheckCircle2 className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                    </div>
                  </>
                )}
              </div>

              {/* 3. Scope Segment Switcher */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <div className="inline-flex p-1 bg-white rounded-full border border-[#EDE1D1] shadow-2xs">
                  <button
                    onClick={() => {
                      setActiveTab('b2c-customers');
                      setCustomerScope('b2c');
                      setAdminMode('b2c');
                      setCustomerPage(1);
                    }}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      effectiveScope === 'b2c'
                        ? 'bg-[#5A070E] text-white shadow-xs'
                        : 'text-[#5A070E] hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Daily Customers</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      effectiveScope === 'b2c' ? 'bg-amber-400 text-[#3D040A]' : 'bg-amber-100 text-[#854D0E]'
                    }`}>
                      {b2cCustomerCount}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('b2b-customers');
                      setCustomerScope('b2b');
                      setAdminMode('b2b');
                      setCustomerPage(1);
                    }}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      effectiveScope === 'b2b'
                        ? 'bg-[#5A070E] text-white shadow-xs'
                        : 'text-[#5A070E] hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Shopkeepers</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      effectiveScope === 'b2b' ? 'bg-amber-400 text-[#3D040A]' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {b2bCustomerCount}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('customers');
                      setCustomerScope('all');
                      setAdminMode('unified');
                      setCustomerPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      effectiveScope === 'all'
                        ? 'bg-[#5A070E] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>All Customers</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      effectiveScope === 'all' ? 'bg-amber-400 text-[#3D040A]' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {totalCustomerCount}
                    </span>
                  </button>
                </div>
              </div>

              {/* 4. Search and Filter Bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, phone or email..."
                    value={customerSearchTerm}
                    onChange={(e) => setCustomerSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-8 py-2.5 bg-white border border-[#EDE1D1] rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5A070E]/20 focus:border-[#5A070E] shadow-2xs"
                  />
                  {customerSearchTerm && (
                    <button
                      onClick={() => setCustomerSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="relative">
                  <select
                    value={customerStatusFilter}
                    onChange={(e) => setCustomerStatusFilter(e.target.value)}
                    className="appearance-none w-full md:w-auto px-4 pr-10 py-2.5 bg-white border border-[#EDE1D1] rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5A070E]/20 shadow-2xs cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={customerSubFilter}
                    onChange={(e) => setCustomerSubFilter(e.target.value)}
                    className="appearance-none w-full md:w-auto px-4 pr-10 py-2.5 bg-white border border-[#EDE1D1] rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5A070E]/20 shadow-2xs cursor-pointer"
                  >
                    <option value="all">All Subscriptions</option>
                    <option value="subscribed">Subscribed</option>
                    <option value="none">No Subscription</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <button
                  onClick={() => showToast(`Filtered ${filteredCustomers.length} customer(s)`)}
                  className="px-6 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all shrink-0"
                >
                  <Search className="w-4 h-4 text-white" />
                  <span>Search</span>
                </button>
              </div>

              {/* 5. Customer Management Table */}
              <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAF5EC] border-b border-[#EDE1D1]">
                        <th className="py-3.5 px-4 sm:px-6 text-xs font-bold text-slate-800 tracking-wider">
                          {effectiveScope === 'b2b' ? 'Store & Owner Name' : effectiveScope === 'b2c' ? 'Daily Customer Name' : 'Customer Name'}
                        </th>
                        <th className="py-3.5 px-4 text-xs font-bold text-slate-800 tracking-wider">
                          {effectiveScope === 'b2b' ? 'Trade / GSTIN' : 'Account Type'}
                        </th>
                        <th className="py-3.5 px-4 text-xs font-bold text-slate-800 tracking-wider">
                          Phone Number
                        </th>
                        <th className="py-3.5 px-4 text-xs font-bold text-slate-800 tracking-wider">
                          Email Address
                        </th>
                        <th className="py-3.5 px-4 text-center text-xs font-bold text-slate-800 tracking-wider">
                          {effectiveScope === 'b2b' ? 'Bulk Orders' : 'Orders'}
                        </th>
                        <th className="py-3.5 px-4 text-xs font-bold text-slate-800 tracking-wider">
                          {effectiveScope === 'b2b' ? 'Wholesale Spent' : 'Total Spent'}
                        </th>
                        <th className="py-3.5 px-4 text-xs font-bold text-slate-800 tracking-wider">
                          Status
                        </th>
                        <th className="py-3.5 px-4 sm:px-6 text-right text-xs font-bold text-slate-800 tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0E6D8]">
                      {filteredCustomers.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="py-14 text-center">
                            {effectiveScope === 'b2b' ? (
                              <>
                                <Store className="w-12 h-12 text-[#7D0A14]/30 mx-auto mb-3" />
                                <h4 className="font-black text-[#3D040A] text-base">No Shopkeeper Accounts Found</h4>
                                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                                  Commercial grocery stores, kirana partners, and wholesale buyers registered on Sumadhura Foods will appear here. Click below to load standard verified reference accounts.
                                </p>
                                <div className="flex items-center justify-center gap-2 mt-4">
                                  <button
                                    onClick={resetDefaultCustomers}
                                    className="px-4 py-2 rounded-xl bg-[#7D0A14] text-white text-xs font-black shadow-sm hover:bg-[#60060E] transition-all inline-flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                                    <span>Reset Standard Reference Accounts</span>
                                  </button>
                                  <button
                                    onClick={() => navigateTo('b2b')}
                                    className="px-4 py-2 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-[#7D0A14] text-xs font-bold hover:bg-[#F3EAD9] transition-all inline-flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <span>Go to B2B Wholesale Portal</span>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <Users className="w-12 h-12 text-[#7D0A14]/30 mx-auto mb-3" />
                                <h4 className="font-black text-[#3D040A] text-base">No Daily Customers Found</h4>
                                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                                  Residential household customers and daily morning pure cow milk subscribers will appear here.
                                </p>
                                <div className="flex items-center justify-center gap-2 mt-4">
                                  <button
                                    onClick={resetDefaultCustomers}
                                    className="px-4 py-2 rounded-xl bg-[#7D0A14] text-white text-xs font-black shadow-sm hover:bg-[#60060E] transition-all inline-flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                                    <span>Reset Standard Reference Accounts</span>
                                  </button>
                                  <button
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className="px-4 py-2 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-[#7D0A14] text-xs font-bold hover:bg-[#F3EAD9] transition-all inline-flex items-center gap-1.5 cursor-pointer"
                                  >
                                    <User className="w-3.5 h-3.5" />
                                    <span>Sign In as Customer Now</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      ) : (
                        filteredCustomers.slice((customerPage - 1) * 10, customerPage * 10).map((c) => {
                          const isCurrentUser = user && ((user.email && user.email === c.email) || (user.phone && user.phone === c.phone));
                          return (
                            <tr
                              key={c.id || c.phone || c.email}
                              className={`hover:bg-[#FDFBF7] transition-colors ${
                                isCurrentUser ? 'bg-amber-50/40' : ''
                              }`}
                            >
                              {/* Customer Name + Avatar */}
                              <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  {c.isBusiness ? (
                                    <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] border border-[#FECACA] flex items-center justify-center shrink-0">
                                      <Building2 className="w-4 h-4 text-[#991B1B]" />
                                    </div>
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-[#5A070E] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-2xs">
                                      {c.name ? c.name[0].toUpperCase() : 'C'}
                                    </div>
                                  )}
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold text-[#1E293B] text-sm">
                                        {c.name}
                                      </span>
                                      {isCurrentUser && (
                                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                                          You
                                        </span>
                                      )}
                                    </div>
                                    {c.isBusiness && c.companyName && c.companyName !== c.name && (
                                      <div className="text-[11px] text-slate-400 font-medium">
                                        {c.companyName}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Type Badge & Meta */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                {(c.isBusiness || c.customerType === 'Shopkeeper') ? (
                                  <div className="space-y-1">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#FEF3C7] text-[#92400E] border border-amber-200 inline-flex items-center gap-1">
                                      <Store className="w-3 h-3 text-[#92400E]" />
                                      <span>Shopkeeper</span>
                                    </span>
                                    {c.gstin && (
                                      <div className="font-mono text-[9px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded w-fit font-bold">
                                        GSTIN: {c.gstin}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="space-y-1">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#FEE2E2]/70 text-[#991B1B] border border-rose-200 inline-flex items-center gap-1">
                                      <User className="w-3 h-3 text-[#991B1B]" />
                                      <span>Daily Customer</span>
                                    </span>
                                    {c.subscription && c.subscription !== 'None' && (
                                      <div className="text-[9.5px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1 w-fit">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="truncate max-w-[125px]">{c.subscription}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </td>

                              {/* Phone */}
                              <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-slate-700">
                                {c.phone}
                              </td>

                              {/* Email */}
                              <td className="py-4 px-4 whitespace-nowrap text-sm text-slate-600">
                                {c.email}
                              </td>

                              {/* Orders */}
                              <td className="py-4 px-4 whitespace-nowrap text-center text-sm font-semibold text-slate-800">
                                {c.ordersCount || 0}
                              </td>

                              {/* Total Spent */}
                              <td className="py-4 px-4 whitespace-nowrap text-sm font-extrabold text-slate-900">
                                ₹{(c.totalSpent || 0).toLocaleString('en-IN')}
                              </td>

                              {/* Status Badge */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                <span
                                  className={`px-3 py-0.5 rounded-full text-xs font-bold ${
                                    c.status === 'Active'
                                      ? 'bg-[#DEF7EC] text-[#03543F] border border-emerald-200'
                                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                                  }`}
                                >
                                  {c.status || 'Active'}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end gap-1.5 relative">
                                  <button
                                    onClick={() => setSelectedCustomerForView(c)}
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-[#5A070E] hover:bg-[#FAF5EC] transition-colors"
                                    title="View Customer Profile"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setCustomerActionMenuId(customerActionMenuId === c.id ? null : c.id)}
                                    className="p-1.5 rounded-lg text-slate-500 hover:text-[#5A070E] hover:bg-[#FAF5EC] transition-colors"
                                    title="More Options"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteCustomer(c)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                    title="Delete Customer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>

                                  {/* Action Dropdown Menu */}
                                  {customerActionMenuId === c.id && (
                                    <div className="absolute right-0 top-9 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-left animate-in fade-in zoom-in-95 duration-150">
                                      <button
                                        onClick={() => {
                                          setSelectedCustomerForView(c);
                                          setCustomerActionMenuId(null);
                                        }}
                                        className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                      >
                                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                                        <span>View Full Profile</span>
                                      </button>
                                      <button
                                        onClick={() => {
                                          toggleCustomerStatus(c);
                                          setCustomerActionMenuId(null);
                                        }}
                                        className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                      >
                                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Set as {c.status === 'Active' ? 'Inactive' : 'Active'}</span>
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (login) login(c);
                                          showToast(`Switched active session to ${c.name}`);
                                          setCustomerActionMenuId(null);
                                        }}
                                        className="w-full px-4 py-2 text-xs font-semibold text-[#5A070E] hover:bg-[#FAF5EC] flex items-center gap-2"
                                      >
                                        <User className="w-3.5 h-3.5 text-[#5A070E]" />
                                        <span>Switch Account Session</span>
                                      </button>
                                      <div className="border-t border-slate-100 my-1" />
                                      <button
                                        onClick={() => {
                                          deleteCustomer(c);
                                          setCustomerActionMenuId(null);
                                        }}
                                        className="w-full px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                        <span>Delete Customer</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 6. Pagination Footer Bar */}
              {/* Dynamic Customer Pagination (No fake 568) */}
              <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm font-semibold text-slate-600">
                  {filteredCustomers.length === 0 ? (
                    'Showing 0 customers'
                  ) : (
                    <>
                      Showing {((customerPage - 1) * 10) + 1} – {Math.min(filteredCustomers.length, customerPage * 10)} of {filteredCustomers.length} customer{filteredCustomers.length === 1 ? '' : 's'}
                    </>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCustomerPage((p) => Math.max(1, p - 1))}
                    disabled={customerPage === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Math.max(1, Math.ceil(filteredCustomers.length / 10)) }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCustomerPage(pageNum)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                        customerPage === pageNum
                          ? 'bg-[#5A070E] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() => setCustomerPage((p) => Math.min(Math.max(1, Math.ceil(filteredCustomers.length / 10)), p + 1))}
                    disabled={customerPage >= Math.max(1, Math.ceil(filteredCustomers.length / 10))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 7. Customer Profile Details Modal */}
              {selectedCustomerForView && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-[#EDE1D1] shadow-2xl relative">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        {selectedCustomerForView.isBusiness ? (
                          <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] border border-[#FECACA] flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-[#991B1B]" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-[#5A070E] text-white flex items-center justify-center text-lg font-black shadow-xs">
                            {selectedCustomerForView.name[0].toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-black text-[#1E293B]">
                              {selectedCustomerForView.name}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                selectedCustomerForView.isBusiness
                                  ? 'bg-[#FEF3C7] text-[#92400E]'
                                  : 'bg-[#FEE2E2] text-[#991B1B]'
                              }`}
                            >
                              {selectedCustomerForView.type || (selectedCustomerForView.isBusiness ? 'B2B' : 'B2C')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            Customer ID: {selectedCustomerForView.id}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCustomerForView(null)}
                        className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1]">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</div>
                        <div className="font-bold text-slate-900 mt-0.5">{selectedCustomerForView.phone}</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1]">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Email Address</div>
                        <div className="font-bold text-slate-900 mt-0.5 truncate">{selectedCustomerForView.email || 'N/A'}</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1]">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Total Orders</div>
                        <div className="font-bold text-slate-900 mt-0.5">{selectedCustomerForView.ordersCount || 0} Orders</div>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1]">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Total Spend</div>
                        <div className="font-bold text-slate-900 mt-0.5">₹{(selectedCustomerForView.totalSpent || 0).toLocaleString('en-IN')}</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs">
                      <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Subscription Status</div>
                      <div className="font-bold text-amber-950 mt-1 flex items-center justify-between">
                        <span>{selectedCustomerForView.subscription || 'Morning Pure Cow Milk (Daily 1L)'}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => {
                          if (login) login(selectedCustomerForView);
                          showToast(`Switched active session to ${selectedCustomerForView.name}`);
                          setSelectedCustomerForView(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#5A070E] hover:bg-[#430409] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                      >
                        <User className="w-3.5 h-3.5 text-amber-300" />
                        <span>Switch Session to Customer</span>
                      </button>
                      <button
                        onClick={() => setSelectedCustomerForView(null)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. MORNING SUBSCRIPTIONS (B2C) - AUTHENTIC CUSTOMERS ONLY */}
          {/* ========================================================= */}
          {(activeTab === 'subscriptions') && (
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
                  {subscriptions.length > 0 && (
                    <button
                      onClick={clearAllSubscriptions}
                      className="px-3 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      title="Clear all subscriptions"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Clear All Subscriptions</span>
                    </button>
                  )}
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

              {/* Live Customer Subscriptions Hub Banner */}
              <div className="bg-[#FAF5EC] p-4 sm:p-5 rounded-2xl border border-[#EDE1D1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#7D0A14] text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-xs">
                    🥛
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-[#3D040A]">
                        Live Customer Subscriptions Registry
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Feed Active
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Subscribed customers receive automatic morning dispatch before 7:00 AM daily.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                  <div className="text-right hidden md:block pr-2 border-r border-[#EDE1D1]">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Live Active</div>
                    <div className="font-black text-sm text-[#7D0A14]">{subscriptions.filter(s => s.status === 'Active').length} Subscribers</div>
                  </div>

                  <button
                    onClick={() => {
                      try {
                        const savedSubs = localStorage.getItem('sumadhura_subscriptions');
                        if (savedSubs) setSubscriptions(JSON.parse(savedSubs));
                        const savedCusts = localStorage.getItem('sumadhura_registered_customers');
                        if (savedCusts) setCustomers(JSON.parse(savedCusts));
                        showToast('🔄 Real-time customer subscriptions refreshed!', 'success');
                      } catch {}
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#EDE1D1] hover:bg-slate-50 text-[#3D040A] text-xs font-black flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    title="Force refresh live feed"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#7D0A14]" />
                    <span>Sync Live Feed</span>
                  </button>

                  <button
                    onClick={() => setIsManualSubModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" />
                    <span>+ New Subscription</span>
                  </button>
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
                        <div className="flex items-center gap-2">
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
                            onClick={() => handleDeleteSubscription(sub.id)}
                            className="p-1.5 rounded-lg text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors shadow-2xs"
                            title="Delete subscription"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

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
                <div className="py-14 text-center bg-[#FAF5EC]/50 rounded-2xl border border-dashed border-[#EDE1D1] p-6 space-y-3">
                  <Clock className="w-12 h-12 text-[#7D0A14]/30 mx-auto" />
                  <h4 className="font-black text-[#3D040A] text-base">No Customer Subscriptions Placed Yet</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    When a customer logs into the live storefront website and activates a morning milk or veggie subscription, their order and delivery run-sheet will automatically appear here in real time.
                  </p>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      onClick={() => navigateTo('home')}
                      className="px-4 py-2 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-[#7D0A14] text-xs font-bold hover:bg-[#F3EAD9] transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>Open Customer Storefront</span>
                    </button>
                    <button
                      onClick={() => setIsManualSubModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-[#7D0A14] text-white text-xs font-black shadow-sm hover:bg-[#60060E] transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-amber-300" />
                      <span>+ Create Subscription for Customer</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 3B. MORNING DISPATCH & DELIVERY OPERATIONS (DELIVERY TAB)  */}
          {/* ========================================================= */}
          {activeTab === 'delivery' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-6 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-black text-[#3D040A] flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#7D0A14]" />
                    <span>Morning Dispatch & Delivery Operations</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live delivery slots, cold-chain temperature SLA, and automated driver route allocation.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>6 Vans Active on Route</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('subscriptions')}
                    className="px-3.5 py-2 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-[#7D0A14] hover:bg-[#F3EAD9] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Morning Subscriptions ({subscriptions.length})</span>
                  </button>
                </div>
              </div>

              {/* Delivery Slots Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wide">Slot 1 • Early Morning</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                      Dispatched
                    </span>
                  </div>
                  <div className="text-lg font-black text-[#3D040A]">6:00 AM – 7:00 AM</div>
                  <p className="text-xs text-slate-600">Daily Milk & Morning Veggies Subscriptions</p>
                  <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-amber-200/60 flex items-center justify-between">
                    <span>Active Subscriptions:</span>
                    <strong className="text-[#7D0A14]">{subscriptions.length}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wide">Slot 2 • Standard Morning</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800">
                      In Transit
                    </span>
                  </div>
                  <div className="text-lg font-black text-[#3D040A]">7:00 AM – 9:00 AM</div>
                  <p className="text-xs text-slate-600">Retail B2C Orders & Quick Grocery Deliveries</p>
                  <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-blue-200/60 flex items-center justify-between">
                    <span>Pending Orders:</span>
                    <strong className="text-blue-800">{orders.filter(o => o.status !== 'Delivered').length}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-purple-900 uppercase tracking-wide">Slot 3 • B2B Bulk Afternoon</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800">
                      Scheduled
                    </span>
                  </div>
                  <div className="text-lg font-black text-[#3D040A]">1:00 PM – 3:00 PM</div>
                  <p className="text-xs text-slate-600">Commercial Wholesale Bulk Crates to Kitchens & Hotels</p>
                  <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-purple-200/60 flex items-center justify-between">
                    <span>B2B Fleet:</span>
                    <strong className="text-purple-800">Heavy Van 02 & 04</strong>
                  </div>
                </div>
              </div>

              {/* Delivery Fleet & Cold Chain Tracker */}
              <div className="bg-[#FAF5EC] rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <h4 className="font-black text-[#3D040A] text-sm sm:text-base">
                      Cold-Chain Fleet & Driver Assignment
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    Temp Standard: <strong className="text-emerald-700">3.8°C (Optimal)</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { driver: 'Ramesh Kumar', vehicle: 'KA-04-E-1042', status: 'Delivering HSR Layout', time: '5:45 AM', temp: '3.6°C', rating: '4.9 ★' },
                    { driver: 'Suresh Gowda', vehicle: 'KA-04-E-2190', status: 'Delivering Indiranagar', time: '6:10 AM', temp: '3.8°C', rating: '4.8 ★' },
                    { driver: 'Vijay Kumar', vehicle: 'KA-04-E-3381', status: 'Delivering Whitefield', time: '6:15 AM', temp: '3.9°C', rating: '5.0 ★' }
                  ].map((f, i) => (
                    <div key={i} className="bg-white p-3.5 rounded-xl border border-[#EDE1D1] space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-[#3D040A]">{f.driver}</span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {f.rating}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {f.vehicle} • Cold: {f.temp}
                      </div>
                      <div className="text-xs font-bold text-emerald-700">
                        ● {f.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. B2B COMMERCIAL QUOTES & RFPs                           */}
          {/* ========================================================= */}
          {(activeTab === 'b2b-pricing' || activeTab === 'b2b-quotes') && (
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

                <div className="flex items-center gap-2">
                  {b2bQuotes.length > 0 && (
                    <button
                      onClick={clearAllQuotes}
                      className="px-3 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      title="Clear all commercial RFPs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Clear All RFPs</span>
                    </button>
                  )}
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    <Building2 className="w-4 h-4 text-amber-700" />
                    <span>{b2bQuotes.length} Commercial Leads Active</span>
                  </div>
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
                              className="px-3 py-1.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold text-xs"
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
                          <button
                            onClick={() => deleteQuote(quote.id)}
                            className="p-1.5 rounded-lg text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors shadow-2xs"
                            title="Delete quote inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
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
                    <span>+ Create Commercial RFP</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* CATEGORIES & AISLE TAXONOMY MANAGEMENT                    */}
          {/* ========================================================= */}
          {activeTab === 'categories' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-6 shadow-xs animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-[#7D0A14]" />
                    <h3 className="text-xl font-black text-[#3D040A]">
                      Category & Aisle Taxonomy Management
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure customer storefront aisles, category banners, product mapping, and B2C/B2B visibility
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategory(null);
                      setCategoryForm({
                        name: '',
                        slug: '',
                        emoji: '🛒',
                        image: '',
                        description: '',
                        subCategories: '',
                        featured: true,
                        active: true,
                        channel: 'all'
                      });
                      setIsCategoryModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" />
                    <span>+ Add New Category</span>
                  </button>
                </div>
              </div>

              {/* KPI Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1]">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Total Aisles</span>
                  <div className="text-xl font-black text-[#3D040A] mt-0.5">{categoriesList.length} Categories</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
                  <span className="text-[10px] font-bold text-emerald-700 block uppercase">Active in Storefront</span>
                  <div className="text-xl font-black text-emerald-800 mt-0.5">
                    {categoriesList.filter(c => c.active).length} Active
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                  <span className="text-[10px] font-bold text-amber-800 block uppercase">Catalog Items</span>
                  <div className="text-xl font-black text-amber-900 mt-0.5">
                    {inventoryList.length} Products Mapped
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/60">
                  <span className="text-[10px] font-bold text-rose-700 block uppercase">Featured Aisles</span>
                  <div className="text-xl font-black text-rose-800 mt-0.5">
                    {categoriesList.filter(c => c.featured).length} Featured
                  </div>
                </div>
              </div>

              {/* Categories Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoriesList
                  .filter((cat) => {
                    if (adminMode === 'b2c' && cat.channel === 'b2b') return false;
                    if (adminMode === 'b2b' && cat.channel === 'b2c') return false;
                    return true;
                  })
                  .map((cat) => {
                  const matchingProducts = inventoryList.filter(p => {
                    const cName = (p.category || '').toLowerCase();
                    const target = cat.name.toLowerCase();
                    return cName.includes(target) || target.includes(cName);
                  });
                  return (
                    <div
                      key={cat.id}
                      className="rounded-2xl border border-[#EDE1D1] bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      {/* Image Banner */}
                      <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <span className="absolute top-2.5 left-2.5 text-2xl filter drop-shadow">
                          {cat.emoji}
                        </span>
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                          {cat.channel === 'b2c' ? (
                            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase shadow-xs">
                              B2C Retail
                            </span>
                          ) : cat.channel === 'b2b' ? (
                            <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase shadow-xs">
                              B2B Wholesale
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white text-[9px] font-black uppercase shadow-xs">
                              All Channels
                            </span>
                          )}
                          {cat.featured && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-[#3D040A] text-[9px] font-black uppercase shadow-xs">
                              Featured
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase shadow-xs ${
                            cat.active ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
                          }`}>
                            {cat.active ? 'Live' : 'Hidden'}
                          </span>
                        </div>
                        <div className="absolute bottom-2 left-3 right-3 text-white">
                          <h4 className="font-black text-base drop-shadow-sm flex items-center gap-1.5">
                            <span>{cat.name}</span>
                          </h4>
                          <span className="text-[10px] text-amber-200 font-mono font-medium drop-shadow-sm">
                            /{cat.slug} • {matchingProducts.length} in stock
                          </span>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {cat.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {cat.subCategories?.map((sub, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md bg-[#FAF5EC] border border-[#EDE1D1] text-[10px] font-semibold text-[#7D0A14]"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery(cat.name);
                              setActiveTab('inventory');
                            }}
                            className="flex-1 py-1.5 px-2 rounded-xl bg-[#FAF5EC] hover:bg-[#F3EAD9] text-[#7D0A14] text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Package className="w-3.5 h-3.5" />
                            <span>View Products ({matchingProducts.length})</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingCategory(cat);
                              setCategoryForm({
                                name: cat.name,
                                slug: cat.slug,
                                emoji: cat.emoji,
                                image: cat.image,
                                description: cat.description,
                                subCategories: cat.subCategories?.join(', ') || '',
                                featured: cat.featured,
                                active: cat.active,
                                channel: cat.channel || 'all'
                              });
                              setIsCategoryModalOpen(true);
                            }}
                            className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer transition-colors"
                            title="Edit Category"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleCategoryActive(cat.id)}
                            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                              cat.active
                                ? 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                                : 'border-slate-200 text-slate-400 hover:bg-slate-50'
                            }`}
                            title={cat.active ? 'Hide from storefront' : 'Show on storefront'}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="p-1.5 rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 cursor-pointer transition-colors"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. INVENTORY & PRICING (RETAIL vs WHOLESALE)              */}
          {/* ========================================================= */}
          {(activeTab === 'inventory' || activeTab === 'products') && (
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

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetInventory}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors"
                  >
                    Reset Defaults
                  </button>
                  <button
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" />
                    <span>+ Add Product</span>
                  </button>
                </div>
              </div>

              {/* Inventory Quick KPI Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1]">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Total Products</span>
                  <div className="text-xl font-black text-[#3D040A] mt-0.5">{inventoryList.length}</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
                  <span className="text-[10px] font-bold text-emerald-700 block uppercase">In Stock (Active)</span>
                  <div className="text-xl font-black text-emerald-800 mt-0.5">
                    {inventoryList.filter((p) => p.inStock).length}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/60">
                  <span className="text-[10px] font-bold text-rose-700 block uppercase">Out of Stock</span>
                  <div className="text-xl font-black text-rose-800 mt-0.5">
                    {inventoryList.filter((p) => !p.inStock).length}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                  <span className="text-[10px] font-bold text-amber-800 block uppercase">B2B Wholesale Margin</span>
                  <div className="text-xl font-black text-amber-900 mt-0.5">Avg 26% Bulk Off</div>
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                    placeholder="Search products by name, category, stock..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 bg-[#FAF5EC]/40 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                  {['All', 'In Stock', 'Out of Stock', 'Dairy', 'Vegetables', 'Staples'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setInventoryCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl transition-all ${
                        inventoryCategoryFilter === cat
                          ? 'bg-[#7D0A14] text-white shadow-xs'
                          : 'bg-[#FAF5EC] text-slate-600 hover:bg-[#F3EAD9] border border-[#EDE1D1]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full min-w-[700px] text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAF5EC] text-slate-600 font-extrabold border-b border-[#EDE1D1]">
                      <th className="p-3 rounded-l-xl">Product & Category</th>
                      <th className="p-3">Current Stock</th>
                      <th className="p-3">B2C Retail Price</th>
                      <th className="p-3">B2B Wholesale Price</th>
                      <th className="p-3">Available Quantity</th>
                      <th className="p-3 text-right">Stock Status</th>
                      <th className="p-3 rounded-r-xl text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {inventoryList
                      .filter((prod) => {
                        if (adminMode === 'b2c' && prod.channel === 'b2b') return false;
                        if (adminMode === 'b2b' && prod.channel === 'b2c') return false;
                        if (inventoryCategoryFilter === 'In Stock') return prod.inStock;
                        if (inventoryCategoryFilter === 'Out of Stock') return !prod.inStock;
                        if (inventoryCategoryFilter !== 'All' && prod.category !== inventoryCategoryFilter)
                          return false;
                        if (inventorySearch.trim()) {
                          const q = inventorySearch.toLowerCase();
                          return (
                            prod.name.toLowerCase().includes(q) ||
                            prod.category.toLowerCase().includes(q) ||
                            (prod.stock && prod.stock.toLowerCase().includes(q))
                          );
                        }
                        return true;
                      })
                      .map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF5EC]/50 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-slate-900">{prod.name}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-slate-400">{prod.category}</span>
                            <span className="text-slate-300">•</span>
                            {prod.channel === 'b2c' ? (
                              <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-extrabold">
                                B2C Retail
                              </span>
                            ) : prod.channel === 'b2b' ? (
                              <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[9px] font-extrabold">
                                B2B Wholesale
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-extrabold">
                                All Channels
                              </span>
                            )}
                          </div>
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
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setEditingProduct({ ...prod })}
                              className="p-1.5 rounded-lg text-blue-600 hover:text-white hover:bg-[#7D0A14] border border-blue-200 transition-colors shadow-2xs"
                              title="Edit product details & prices"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors shadow-2xs"
                              title="Delete product from catalog"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
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

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="px-3.5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                          >
                            <Eye className="w-3.5 h-3.5 text-amber-300" />
                            <span>View & Print</span>
                          </button>
                          <button
                            onClick={() => deleteInvoice(inv.invoiceNo)}
                            className="p-2 rounded-xl text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors shadow-2xs"
                            title="Delete GST Invoice"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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

          {/* ========================================================= */}
          {/* 7. STORE CONTENT & CMS (EDIT ADMIN & STORE CONTENT)       */}
          {/* ========================================================= */}
          {/* ========================================================= */}
          {/* 7. HERO SECTION BANNERS & IMAGES CMS                      */}
          {/* ========================================================= */}
          {activeTab === 'hero-banners' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-6 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#7D0A14]" />
                    <h3 className="text-xl font-black text-[#3D040A]">
                      Hero Section Banners & Image Carousel
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize the top hero banners, upload custom images, edit titles, and reorder homepage slides
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetHeroSlides}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors"
                  >
                    Reset Defaults
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHeroSlideForm({
                        badge: 'Special Feature',
                        titleLine1: 'Fresh Farm Goodness',
                        titleLine2: 'Delivered to your',
                        highlight: 'Doorstep 🥛',
                        highlightColor: 'text-amber-300',
                        description: '100% natural, hygienic daily morning essentials delivered before 7:00 AM.',
                        buttonText: 'Order Now',
                        buttonBg: 'bg-[#F5A623] hover:bg-[#E09215] text-[#55070E]',
                        actionType: 'categories',
                        actionCategory: '',
                        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
                        imageAlt: 'Hero Banner Image',
                        borderColor: 'border-amber-400/80',
                        gradient: 'from-[#60060E] via-[#7D0A14] to-[#91131E]',
                        borderWrapper: 'border-[#8B121C]'
                      });
                      setIsAddHeroModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" />
                    <span>+ Add New Hero Banner</span>
                  </button>
                </div>
              </div>

              {/* Status bar */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-extrabold text-[#3D040A]">
                    {heroSlides.length} Hero Slides Active
                  </span>
                  <span className="text-slate-500 hidden sm:inline">
                    • Auto-rotating every 4.5 seconds on the customer storefront
                  </span>
                </div>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-xs font-bold text-[#7D0A14] hover:underline flex items-center gap-1"
                >
                  <span>Preview on Homepage</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Slides Grid */}
              <div className="space-y-4">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="bg-[#FAF5EC]/60 rounded-2xl p-4 sm:p-5 border border-[#EDE1D1] hover:border-[#7D0A14]/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    {/* Left: Visual Preview of Banner Card */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative flex-shrink-0">
                        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 ${slide.borderColor || 'border-amber-400'} shadow-md bg-slate-900`}>
                          <img
                            src={slide.image}
                            alt={slide.imageAlt || 'Slide image'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-[#3D040A] text-amber-300 text-[10px] font-black rounded-full border border-amber-400/50">
                          #{index + 1}
                        </span>
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#7D0A14]/10 text-[#7D0A14] font-black text-[10px] uppercase tracking-wider border border-[#7D0A14]/20">
                            {slide.badge}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Action: {slide.actionType === 'subscription' ? 'Morning Subscriptions' : 'Browse Catalog'}
                          </span>
                        </div>
                        <h4 className="font-black text-sm sm:text-base text-slate-900 tracking-tight">
                          {slide.titleLine1} {slide.titleLine2}{' '}
                          <span className="text-[#7D0A14] font-serif italic">
                            {slide.highlight}
                          </span>
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-1 max-w-lg">
                          {slide.description}
                        </p>
                        <div className="pt-1 flex items-center gap-2 text-[11px]">
                          <span className="font-bold text-slate-500">CTA:</span>
                          <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-extrabold text-slate-800">
                            {slide.buttonText}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Controls (Reorder, Edit, Delete) */}
                    <div className="flex items-center gap-1.5 self-end md:self-center flex-shrink-0">
                      <button
                        onClick={() => handleMoveHeroSlide(index, -1)}
                        disabled={index === 0}
                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Move slide earlier in rotation"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveHeroSlide(index, 1)}
                        disabled={index === heroSlides.length - 1}
                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Move slide later in rotation"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingHeroSlide({ ...slide })}
                        className="p-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-[#7D0A14] hover:text-white transition-colors"
                        title="Edit banner content & image"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteHeroSlide(slide.id)}
                        className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete banner slide"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 8. STORE CONTENT & CMS (EDIT ADMIN & STORE CONTENT)       */}
          {/* ========================================================= */}
          {(activeTab === 'content' || activeTab === 'settings') && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-6 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#7D0A14]" />
                    <h3 className="text-xl font-black text-[#3D040A]">
                      Admin & Store Content Management (CMS)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live editor to customize storefront banners, announcements, facility locations, and B2B procurement details
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetAdminContent}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors"
                  >
                    Reset Defaults
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAdminContent}
                    className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <Save className="w-3.5 h-3.5 text-amber-300" />
                    <span>Save Content Changes</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveAdminContent} className="space-y-6">
                {/* 1. Facility & Operational Dark Store Hub */}
                <div className="bg-[#FAF5EC]/60 rounded-2xl p-5 border border-[#EDE1D1] space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#E8DDCF] pb-2">
                    <Store className="w-4 h-4 text-[#7D0A14]" />
                    <h4 className="font-extrabold text-sm text-[#3D040A]">
                      1. Facility & Operations Hub Settings
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Active Dark Store / Fulfillment Center Name
                      </label>
                      <input
                        type="text"
                        value={contentFormData.hubName}
                        onChange={(e) =>
                          setContentFormData({ ...contentFormData, hubName: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="e.g. Dark Store: Bengaluru South"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Displayed in the Admin status badge and dispatch route run-sheets.
                      </span>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Operations Supervisor Name / Role
                      </label>
                      <input
                        type="text"
                        value={contentFormData.supervisorName}
                        onChange={(e) =>
                          setContentFormData({ ...contentFormData, supervisorName: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="e.g. Operations Supervisor - Bangalore South Hub"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Identifies the supervisor signing off on daily morning deliveries.
                      </span>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Ops Center Version Badge
                      </label>
                      <input
                        type="text"
                        value={contentFormData.hqVersion}
                        onChange={(e) =>
                          setContentFormData({ ...contentFormData, hqVersion: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="e.g. HQ v2.4"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Cold-Chain Temperature Status
                      </label>
                      <input
                        type="text"
                        value={contentFormData.coldChainTemp}
                        onChange={(e) =>
                          setContentFormData({ ...contentFormData, coldChainTemp: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="e.g. 3.8°C Cold-Chain OK"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Customer Storefront Announcements & Banners */}
                <div className="bg-[#FAF5EC]/60 rounded-2xl p-5 border border-[#EDE1D1] space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#E8DDCF] pb-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <h4 className="font-extrabold text-sm text-[#3D040A]">
                      2. Customer Storefront Announcements & Delivery SLA
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="md:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">
                        Top Header Announcement Bar (Marquee Notice)
                      </label>
                      <input
                        type="text"
                        value={contentFormData.announcementBar}
                        onChange={(e) =>
                          setContentFormData({ ...contentFormData, announcementBar: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="e.g. ⚡ 10-15 Min Express Delivery | Free delivery above ₹99"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Morning Subscription Guarantee SLA
                      </label>
                      <input
                        type="text"
                        value={contentFormData.morningDeliveryGuarantee}
                        onChange={(e) =>
                          setContentFormData({
                            ...contentFormData,
                            morningDeliveryGuarantee: e.target.value
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="e.g. Automated doorstep delivery before 7:00 AM every single morning."
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Free Delivery Minimum Order (₹)
                      </label>
                      <input
                        type="number"
                        value={contentFormData.freeDeliveryThreshold}
                        onChange={(e) =>
                          setContentFormData({
                            ...contentFormData,
                            freeDeliveryThreshold: Number(e.target.value) || 0
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="99"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">
                        Subscription Vacation & Pause Guarantee Notice
                      </label>
                      <textarea
                        rows="2"
                        value={contentFormData.vacationGuarantee}
                        onChange={(e) =>
                          setContentFormData({ ...contentFormData, vacationGuarantee: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="Going out of town? Pause or modify your delivery anytime without charges."
                      />
                    </div>
                  </div>
                </div>

                {/* 3. B2B Commercial Procurement & Support */}
                <div className="bg-[#FAF5EC]/60 rounded-2xl p-5 border border-[#EDE1D1] space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#E8DDCF] pb-2">
                    <Building2 className="w-4 h-4 text-amber-700" />
                    <h4 className="font-extrabold text-sm text-[#3D040A]">
                      3. B2B Wholesale Desk & Customer Support
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Procurement Desk WhatsApp & Phone
                      </label>
                      <input
                        type="text"
                        value={contentFormData.supportPhone}
                        onChange={(e) =>
                          setContentFormData({ ...contentFormData, supportPhone: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="+91 98450 99888"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Operations & Billing Email
                      </label>
                      <input
                        type="email"
                        value={contentFormData.supportEmail}
                        onChange={(e) =>
                          setContentFormData({ ...contentFormData, supportEmail: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="ops@sumadhurafoods.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">
                        B2B Wholesale Portal Welcome Callout
                      </label>
                      <textarea
                        rows="2"
                        value={contentFormData.b2bNotice}
                        onChange={(e) =>
                          setContentFormData({ ...contentFormData, b2bNotice: e.target.value })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                        placeholder="Wholesale bulk rates, GST tax invoices & recurring morning kitchen supplies..."
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleResetAdminContent}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    Reset Defaults
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] active:scale-95 text-white font-black text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    <Save className="w-4 h-4 text-amber-300" />
                    <span>Save All Admin & Store Content</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* OFFERS & COUPONS MANAGEMENT                               */}
          {/* ========================================================= */}
          {activeTab === 'offers-coupons' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-6 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-[#7D0A14]" />
                    <h3 className="text-xl font-black text-[#3D040A]">
                      Discounts, Coupons & Commercial Promotions
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage active coupon codes, minimum order value thresholds, and customer savings
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Coupon creator ready! Fill details below.')}
                  className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>+ Create Promo Code</span>
                </button>
              </div>

              {/* KPI Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1]">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Active Campaigns</span>
                  <div className="text-xl font-black text-[#3D040A] mt-0.5">4 Coupons</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
                  <span className="text-[10px] font-bold text-emerald-700 block uppercase">Total Redeemed</span>
                  <div className="text-xl font-black text-emerald-800 mt-0.5">1,248 Orders</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                  <span className="text-[10px] font-bold text-amber-800 block uppercase">Avg Order Boost</span>
                  <div className="text-xl font-black text-amber-900 mt-0.5">+34% Basket Size</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/60">
                  <span className="text-[10px] font-bold text-rose-700 block uppercase">Customer Savings</span>
                  <div className="text-xl font-black text-rose-800 mt-0.5">₹48,500 Saved</div>
                </div>
              </div>

              {/* Coupons List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    code: 'WELCOME50',
                    title: '50% Off First Morning Delivery',
                    discount: '50% OFF (Up to ₹100)',
                    minOrder: 'Min. Order ₹199',
                    type: 'B2C Retail',
                    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    validity: 'Valid till 31 Dec 2026',
                    uses: '540 uses'
                  },
                  {
                    code: 'B2BFREESHIP',
                    title: 'Free Express Commercial Delivery',
                    discount: 'Free Logistics Dispatch',
                    minOrder: 'Min. Order ₹2,000',
                    type: 'B2B Wholesale',
                    badge: 'bg-rose-100 text-rose-800 border-rose-300',
                    validity: 'Permanent Wholesale Partner Benefit',
                    uses: '312 uses'
                  },
                  {
                    code: 'HEALTHY10',
                    title: '10% Off All Organic Farm Greens',
                    discount: 'Flat 10% OFF',
                    minOrder: 'Min. Order ₹299',
                    type: 'Vegetables & Fruits',
                    badge: 'bg-amber-100 text-amber-800 border-amber-300',
                    validity: 'Valid on fresh greens & fruits',
                    uses: '215 uses'
                  },
                  {
                    code: 'MILKPASS20',
                    title: '20% Off Monthly Milk Pass',
                    discount: '20% OFF 1st Month',
                    minOrder: '30-Day Subscription',
                    type: 'Subscriptions',
                    badge: 'bg-blue-100 text-blue-800 border-blue-300',
                    validity: 'Applicable on Cow & Buffalo Milk',
                    uses: '181 uses'
                  }
                ].map((cpn, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-[#EDE1D1] bg-[#FAF5EC]/40 hover:bg-[#FAF5EC] transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm px-2.5 py-1 rounded-lg bg-[#3D040A] text-[#F5A623] tracking-wider border border-[#52060E]">
                            {cpn.code}
                          </span>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${cpn.badge}`}>
                            {cpn.type}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-[#3D040A] mt-2">{cpn.title}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{cpn.discount} • {cpn.minOrder}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#EDE1D1] flex items-center justify-between text-[11px] text-slate-500">
                      <span>📅 {cpn.validity}</span>
                      <span className="font-bold text-[#7D0A14]">{cpn.uses}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* PAYMENTS & GATEWAY SETTLEMENTS                            */}
          {/* ========================================================= */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-6 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#7D0A14]" />
                    <h3 className="text-xl font-black text-[#3D040A]">
                      Payments & Gateway Settlements
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    UPI, Net Banking, Razorpay Settlements, Cash on Delivery collections, and B2B Net-30 credit
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Razorpay & UPI Webhook Active</span>
                  </span>
                </div>
              </div>

              {/* Payment Methods Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800">UPI & Online Banking</span>
                    <span className="text-base">⚡</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-950">64%</div>
                  <p className="text-[11px] text-emerald-700">₹1,84,200 settled today via Instant QR & UPI AutoPay</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800">Cash on Delivery (COD)</span>
                    <span className="text-base">💵</span>
                  </div>
                  <div className="text-2xl font-black text-amber-950">21%</div>
                  <p className="text-[11px] text-amber-700">₹58,400 collected by morning route delivery riders</p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-800">B2B Corporate Net-30</span>
                    <span className="text-base">🏢</span>
                  </div>
                  <div className="text-2xl font-black text-purple-950">15%</div>
                  <p className="text-[11px] text-purple-700">₹44,150 invoiced with 30-day payment cycle</p>
                </div>
              </div>

              {/* Transactions Ledger */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-sm text-[#3D040A]">Recent Gateway Transactions</h4>
                <div className="rounded-2xl border border-slate-200 overflow-x-auto text-xs">
                  <table className="w-full min-w-[550px] text-left">
                    <thead className="bg-[#FAF5EC] text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Transaction ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Method</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { id: 'TXN-98412', name: 'Verified Citizen User', method: 'UPI Instant (GPay)', amount: '₹480', status: 'Captured' },
                        { id: 'TXN-98411', name: 'B2B Food & Catering Partner', method: 'Net-30 Invoiced', amount: '₹8,400', status: 'Invoiced' },
                        { id: 'TXN-98410', name: 'Monthly Milk Subscriber', method: 'UPI AutoPay Recurring', amount: '₹1,950', status: 'Captured' },
                        { id: 'TXN-98409', name: 'Retail Customer', method: 'Cash on Delivery', amount: '₹340', status: 'Collected' }
                      ].map((t, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-700">{t.id}</td>
                          <td className="p-3 font-semibold text-slate-900">{t.name}</td>
                          <td className="p-3 text-slate-600">{t.method}</td>
                          <td className="p-3 font-mono font-black text-slate-900">{t.amount}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              ✓ {t.status}
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

          {/* ========================================================= */}
          {/* REPORTS & OPERATIONS ANALYTICS                            */}
          {/* ========================================================= */}
          {activeTab === 'reports' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-6 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#7D0A14]" />
                    <h3 className="text-xl font-black text-[#3D040A]">
                      Operations, GMV & Sales Analytics
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live performance reports across morning doorstep dispatches, commercial bulk sales & repeat rates
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    showToast('Generating official analytics report...');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FAF5EC] hover:bg-[#F3EAD9] text-[#7D0A14] text-xs font-bold border border-[#EDE1D1] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Report PDF</span>
                </button>
              </div>

              {/* KPI Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1]">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Monthly GMV</span>
                  <div className="text-xl font-black text-[#3D040A] mt-0.5">₹4,82,600</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
                  <span className="text-[10px] font-bold text-emerald-700 block uppercase">On-Time Dispatch Rate</span>
                  <div className="text-xl font-black text-emerald-800 mt-0.5">99.4% &lt; 7:00 AM</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                  <span className="text-[10px] font-bold text-amber-800 block uppercase">Repeat Customer Rate</span>
                  <div className="text-xl font-black text-amber-900 mt-0.5">78.2% Retention</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/60">
                  <span className="text-[10px] font-bold text-purple-700 block uppercase">B2B Wholesale Share</span>
                  <div className="text-xl font-black text-purple-800 mt-0.5">32.6% of Volume</div>
                </div>
              </div>

              {/* Category Sales Breakdown */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-sm text-[#3D040A]">Category Demand & Sales Volume</h4>
                <div className="space-y-2">
                  {[
                    { name: '🥛 Dairy Products (Milk, Ghee, Paneer)', share: 44, color: 'bg-emerald-500' },
                    { name: '🥬 Fresh Vegetables & Leafy Greens', share: 26, color: 'bg-green-600' },
                    { name: '🌾 Rice, Atta and Dals', share: 15, color: 'bg-amber-500' },
                    { name: '🍎 Fresh Fruits', share: 9, color: 'bg-rose-500' },
                    { name: '🍿 Munchies & Popular Dishes', share: 6, color: 'bg-purple-500' }
                  ].map((cat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>{cat.name}</span>
                        <span className="font-mono">{cat.share}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.share}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* REVIEWS & QUALITY RATINGS                                 */}
          {/* ========================================================= */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-6 shadow-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                    <h3 className="text-xl font-black text-[#3D040A]">
                      Customer Quality Reviews & Feedback (4.9 ★)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified feedback from daily milk subscribers, organic produce buyers, and B2B kitchen partners
                  </p>
                </div>
              </div>

              {/* Review Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    author: 'Ananya Sharma (Koramangala, Bangalore)',
                    rating: 5,
                    title: 'Best Cow Milk in Bangalore!',
                    text: 'The milk is delivered sharp at 6:15 AM every single morning. The cream layer is thick and tastes just like village farm milk.',
                    badge: 'Verified Daily Subscriber'
                  },
                  {
                    author: 'Chef Raghuveer (South Grand Catering)',
                    rating: 5,
                    title: 'Top Wholesale Paneer Quality',
                    text: 'We order 20kg fresh malai paneer blocks every alternate day. Consistency, softness, and moisture level are world-class.',
                    badge: 'Verified B2B Partner'
                  },
                  {
                    author: 'Suresh Kumar (Indiranagar, Bangalore)',
                    rating: 5,
                    title: 'Fresh Crisp Vegetables',
                    text: 'Never had spinach and tomatoes this fresh. Delivered in hygienic temperature-controlled crates.',
                    badge: 'Verified Customer'
                  }
                ].map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-[#EDE1D1] bg-[#FAF5EC]/40 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-amber-500 text-sm">
                        {'★'.repeat(rev.rating)}
                      </div>
                      <h4 className="font-bold text-sm text-[#3D040A]">{rev.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.text}</p>
                    </div>

                    <div className="pt-2 border-t border-[#EDE1D1]">
                      <span className="font-bold text-[11px] text-[#7D0A14] block">{rev.author}</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">{rev.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
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

      {/* ------------------------------------------------------------- */}
      {/* EDIT PRODUCT MODAL                                        */}
      {/* ------------------------------------------------------------- */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-[#7D0A14]" />
                <h3 className="font-black text-base text-slate-900">
                  Edit Product: {editingProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={saveEditedProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  required
                />
              </div>

              {/* Product Image Input with Live Preview & File Upload */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Product Image (Upload File or Paste Image Link)
                </label>
                <div className="flex items-center gap-3 p-3 rounded-2xl border border-dashed border-[#EDE1D1] bg-[#FAF5EC]/40">
                  {/* Image Preview Box */}
                  <div className="w-16 h-16 rounded-xl border border-[#EDE1D1] bg-white overflow-hidden shrink-0 flex items-center justify-center relative shadow-xs">
                    {editingProduct.image ? (
                      <>
                        <img
                          src={editingProduct.image}
                          alt="Product Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setEditingProduct({ ...editingProduct, image: '' })}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-[#7D0A14] text-white rounded-full flex items-center justify-center text-[10px] shadow-xs cursor-pointer"
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-1 text-slate-400">
                        <ImageIcon className="w-5 h-5 mx-auto text-[#7D0A14]" />
                        <span className="text-[8px] font-bold block mt-0.5">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Upload from Device & URL input */}
                  <div className="flex-1 space-y-1.5">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EDE1D1] text-[#7D0A14] font-bold text-xs hover:bg-[#FAF5EC] cursor-pointer shadow-2xs transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (uploadEvent) => {
                              setEditingProduct({
                                ...editingProduct,
                                image: uploadEvent.target.result
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <input
                      type="url"
                      value={editingProduct.image || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      placeholder="Or paste image web link (https://...)"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-medium text-[11px] placeholder:text-slate-400 text-slate-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Product Storefront Channel Visibility Selector */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Storefront Visibility (Select Target Audience) *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, channel: 'all' })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      (editingProduct.channel || 'all') === 'all'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Globe className={`w-4 h-4 ${(editingProduct.channel || 'all') === 'all' ? 'text-amber-300' : 'text-[#7D0A14]'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">All (B2C & B2B)</span>
                    <span className={`text-[9px] ${(editingProduct.channel || 'all') === 'all' ? 'text-amber-100' : 'text-slate-400'}`}>
                      Both Storefronts
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, channel: 'b2c' })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      editingProduct.channel === 'b2c'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Users className={`w-4 h-4 ${editingProduct.channel === 'b2c' ? 'text-amber-300' : 'text-blue-600'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">B2C Retail Only</span>
                    <span className={`text-[9px] ${editingProduct.channel === 'b2c' ? 'text-amber-100' : 'text-slate-400'}`}>
                      Daily Customers
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, channel: 'b2b' })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      editingProduct.channel === 'b2b'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Building2 className={`w-4 h-4 ${editingProduct.channel === 'b2b' ? 'text-amber-300' : 'text-purple-600'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">B2B Wholesale Only</span>
                    <span className={`text-[9px] ${editingProduct.channel === 'b2b' ? 'text-amber-100' : 'text-slate-400'}`}>
                      Shopkeepers
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Category *</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditCustomCategory(!isEditCustomCategory);
                        if (!isEditCustomCategory) setEditCustomCategoryInput('');
                      }}
                      className="text-[11px] font-extrabold text-[#7D0A14] hover:underline"
                    >
                      {isEditCustomCategory ? '← Choose from list' : '+ Add Custom'}
                    </button>
                  </div>
                  {isEditCustomCategory ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={editCustomCategoryInput}
                        onChange={(e) => setEditCustomCategoryInput(e.target.value)}
                        placeholder="e.g. Fruits, Beverages, Sweets"
                        className="w-full px-3 py-2 rounded-xl border-2 border-[#7D0A14] font-semibold text-xs bg-amber-50/20 focus:outline-none"
                        autoFocus
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditCustomCategory(false)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                        title="Back to list"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <select
                      value={editingProduct.category}
                      onChange={(e) => {
                        if (e.target.value === '__add_custom__') {
                          setIsEditCustomCategory(true);
                          setEditCustomCategoryInput('');
                        } else {
                          setEditingProduct({ ...editingProduct, category: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-xs bg-white"
                    >
                      {availableCategoryNames.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="__add_custom__" className="font-bold text-[#7D0A14]">
                        ➕ + Add Custom Category...
                      </option>
                    </select>
                  )}
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current Stock Count</label>
                  <input
                    type="text"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. 240 Litres"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">B2C Retail Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.retailPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, retailPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold text-blue-700"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Retail Unit</label>
                  <input
                    type="text"
                    value={editingProduct.retailUnit}
                    onChange={(e) => setEditingProduct({ ...editingProduct, retailUnit: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. Per Litre"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">B2B Wholesale Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.wholesalePrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, wholesalePrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold text-[#7D0A14]"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Available Quantity</label>
                  <input
                    type="text"
                    value={editingProduct.moq}
                    onChange={(e) => setEditingProduct({ ...editingProduct, moq: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. 50 units / 100 kg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.inStock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-[#7D0A14] accent-[#7D0A14]"
                  />
                  <span className="font-bold text-slate-700">Currently In Stock & Available for Order</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Save className="w-3.5 h-3.5 text-amber-300" />
                  <span>Save Product Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* DAILY ORDERS CHECK MODAL */}
      {isDailyOrdersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-6 space-y-4 border border-[#EDE1D1] shadow-2xl relative max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#7D0A14] text-[#F5A623] flex items-center justify-center font-black shadow-xs">
                  <Calendar className="w-5 h-5 text-[#F5A623]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#3D040A]">
                    Daily Orders Manifest
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Order check and dispatch review for{' '}
                    <span className="font-bold text-[#7D0A14]">
                      {orderDateRange === 'today'
                        ? `Today (${new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })})`
                        : orderDateRange === 'yesterday'
                        ? 'Yesterday'
                        : orderDateRange === 'week'
                        ? 'This Week'
                        : orderDateRange === 'custom'
                        ? selectedCustomDate
                        : 'Last 30 Days'}
                    </span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDailyOrdersModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Date Switcher Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1] shrink-0 text-xs font-bold">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 text-[11px] font-semibold">Select Day:</span>
                <button
                  type="button"
                  onClick={() => setOrderDateRange('today')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    orderDateRange === 'today'
                      ? 'bg-[#7D0A14] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-amber-100 border border-[#EDE1D1]'
                  }`}
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setOrderDateRange('yesterday')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    orderDateRange === 'yesterday'
                      ? 'bg-[#7D0A14] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-amber-100 border border-[#EDE1D1]'
                  }`}
                >
                  Yesterday
                </button>
                <button
                  type="button"
                  onClick={() => setOrderDateRange('week')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    orderDateRange === 'week'
                      ? 'bg-[#7D0A14] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-amber-100 border border-[#EDE1D1]'
                  }`}
                >
                  This Week
                </button>
                <button
                  type="button"
                  onClick={() => setOrderDateRange('all')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    orderDateRange === 'all'
                      ? 'bg-[#7D0A14] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-amber-100 border border-[#EDE1D1]'
                  }`}
                >
                  All (30D)
                </button>
              </div>

              {/* Custom Date Picker */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-500">Pick Date:</span>
                <input
                  type="date"
                  value={selectedCustomDate}
                  onChange={(e) => {
                    setSelectedCustomDate(e.target.value);
                    setOrderDateRange('custom');
                  }}
                  className="px-2.5 py-1 text-xs rounded-xl border border-[#EDE1D1] bg-white font-semibold text-slate-800"
                />
              </div>
            </div>

            {/* Daily KPI Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#EDE1D1] shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500">Total Orders</div>
                <div className="text-lg font-black text-[#3D040A] mt-0.5">{dateFilteredOrders.length}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EDE1D1] shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500">Day Revenue</div>
                <div className="text-lg font-black text-[#7D0A14] mt-0.5">
                  ₹{dateFilteredOrders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EDE1D1] shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500">B2C Retail</div>
                <div className="text-lg font-black text-amber-900 mt-0.5">
                  {dateFilteredOrders.filter((o) => o.type !== 'b2b').length}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EDE1D1] shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500">B2B Wholesale</div>
                <div className="text-lg font-black text-blue-900 mt-0.5">
                  {dateFilteredOrders.filter((o) => o.type === 'b2b').length}
                </div>
              </div>
            </div>

            {/* Daily Orders Table Content */}
            <div className="flex-1 overflow-auto border border-[#EDE1D1] rounded-2xl">
              {dateFilteredOrders.length === 0 ? (
                <div className="py-12 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto text-xl">
                    📅
                  </div>
                  <h4 className="text-sm font-bold text-[#3D040A]">
                    No Orders Recorded for This Selected Date
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    There are no customer orders on this date. Switch to Today or pick another date to inspect orders.
                  </p>
                  <button
                    type="button"
                    onClick={() => setOrderDateRange('today')}
                    className="px-4 py-2 bg-[#7D0A14] hover:bg-[#60060E] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Today's Orders
                  </button>
                </div>
              ) : (
                <table className="w-full min-w-[620px] text-left text-xs">
                  <thead className="bg-[#FAF5EC] text-slate-600 font-extrabold sticky top-0 border-b border-[#EDE1D1]">
                    <tr>
                      <th className="p-3">Order ID & Type</th>
                      <th className="p-3">Customer Details</th>
                      <th className="p-3">Ordered Items</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {dateFilteredOrders.map((order) => {
                      const isB2B = order.type === 'b2b';
                      return (
                        <tr key={order.id} className="hover:bg-[#FAF5EC]/40 transition-colors">
                          <td className="p-3">
                            <div className="font-mono font-bold text-[#7D0A14]">{order.id}</div>
                            <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-black uppercase mt-1 ${
                              isB2B ? 'bg-[#7D0A14] text-white' : 'bg-amber-100 text-amber-900'
                            }`}>
                              {isB2B ? 'B2B Wholesale' : 'B2C Retail'}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {order.date || order.timestamp || 'Today'}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-slate-800">
                              {order.customer || order.name || 'Customer'}
                            </div>
                            <div className="text-[11px] text-slate-500">{order.contact || order.phone || '+91 98450 12345'}</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-xs">{order.address}</div>
                            {(order.slot || order.deliverySlot) && (
                              <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                                <span>⏰ {order.slot || order.deliverySlot}</span>
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            {Array.isArray(order.items) ? (
                              <div className="space-y-0.5">
                                {order.items.slice(0, 3).map((it, idx) => (
                                  <div key={idx} className="text-[11px] text-slate-700">
                                    • {typeof it === 'string' ? it : `${it.name || it.title} × ${it.qty || it.quantity || 1}`}
                                  </div>
                                ))}
                                {order.items.length > 3 && (
                                  <div className="text-[10px] text-slate-400">
                                    +{order.items.length - 3} more items
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-600">{order.items || 'Standard Basket'}</span>
                            )}
                          </td>
                          <td className="p-3 font-black text-[#3D040A]">
                            ₹{(order.total || 0).toLocaleString('en-IN')}
                            <div className="text-[10px] text-slate-400 font-normal">
                              {order.paymentMethod || 'UPI • Paid'}
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : order.status === 'Dispatched'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}>
                              {order.status || 'Packing'}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {order.status !== 'Delivered' && (
                                <button
                                  type="button"
                                  onClick={() => updateOrderStatus(order.id, 'Delivered')}
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold shadow-2xs transition-colors cursor-pointer"
                                  title="Mark order Delivered"
                                >
                                  Delivered
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedInvoice({
                                    invoiceNo: `INV-${order.id}`,
                                    date: order.date || 'Today',
                                    client: order.customer || 'Customer',
                                    gstin: order.gstin || '36AABCU9603R1ZM',
                                    orderId: order.id,
                                    taxableAmount: Math.round(((order.total || 0) / 1.05) * 100) / 100,
                                    cgst: Math.round((((order.total || 0) - (order.total || 0) / 1.05) / 2) * 100) / 100,
                                    sgst: Math.round((((order.total || 0) - (order.total || 0) / 1.05) / 2) * 100) / 100,
                                    totalAmount: order.total || 0,
                                    status: 'Paid',
                                    dueDate: 'Immediate'
                                  });
                                }}
                                className="p-1 rounded-lg border border-[#EDE1D1] text-slate-600 hover:bg-amber-50 cursor-pointer"
                                title="View Order Bill"
                              >
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 shrink-0 text-xs">
              <div className="text-slate-500 font-medium">
                Showing {dateFilteredOrders.length} orders for selected date
              </div>
              <button
                type="button"
                onClick={() => setIsDailyOrdersModalOpen(false)}
                className="px-4 py-2 bg-[#7D0A14] hover:bg-[#60060E] text-white rounded-xl font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Subscription Creation Modal (Admin to Customer) */}
      {isManualSubModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-[#7D0A14] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-black text-base">Create Morning Subscription</h3>
                  <p className="text-xs text-amber-100/90">Manually enroll customer into daily 6 AM doorstep milk delivery</p>
                </div>
              </div>
              <button
                onClick={() => setIsManualSubModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualSub} className="p-5 sm:p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-900 font-extrabold">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={manualSubForm.customerName}
                    onChange={(e) => setManualSubForm({ ...manualSubForm, customerName: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EDE1D1] rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-slate-900 font-extrabold">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={manualSubForm.phone}
                    onChange={(e) => setManualSubForm({ ...manualSubForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EDE1D1] rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-slate-900 font-extrabold">Delivery Items & Quantity *</label>
                <select
                  value={manualSubForm.items}
                  onChange={(e) => setManualSubForm({ ...manualSubForm, items: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EDE1D1] rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#7D0A14]"
                >
                  <option value="Farm Fresh Pure Cow Milk (500ml) (2)">Farm Fresh Pure Cow Milk (500ml) × 2</option>
                  <option value="A2 Buffalo Milk (500ml) (2) + Curd (400g) (1)">A2 Buffalo Milk (500ml) × 2 + Curd (400g) × 1</option>
                  <option value="Morning Fresh Veggie Harvest Basket (1.5 kg)">Morning Fresh Veggie Harvest Basket (1.5 kg)</option>
                  <option value="Farm Fresh Cow Milk (1L) + Farm Veggie Basket (1.5kg)">Combo: Cow Milk (1L) + Veggie Basket</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-slate-900 font-extrabold">Delivery Address & Apartment *</label>
                <input
                  type="text"
                  required
                  value={manualSubForm.address}
                  onChange={(e) => setManualSubForm({ ...manualSubForm, address: e.target.value })}
                  placeholder="e.g. Flat 302, Sai Residency, Madhapur, Hyderabad"
                  className="w-full px-3 py-2 bg-slate-50 border border-[#EDE1D1] rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#7D0A14]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-slate-900 font-extrabold">Frequency</label>
                  <select
                    value={manualSubForm.frequency}
                    onChange={(e) => setManualSubForm({ ...manualSubForm, frequency: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EDE1D1] rounded-xl text-xs font-bold text-slate-900"
                  >
                    <option value="daily">Daily Morning</option>
                    <option value="alternate">Alternate Days</option>
                    <option value="weekdays">Weekdays Only (Mon-Fri)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-slate-900 font-extrabold">Time Slot</label>
                  <select
                    value={manualSubForm.slot}
                    onChange={(e) => setManualSubForm({ ...manualSubForm, slot: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-[#EDE1D1] rounded-xl text-xs font-bold text-slate-900"
                  >
                    <option value="6:00 AM - 7:00 AM">6:00 AM - 7:00 AM (Early)</option>
                    <option value="7:00 AM - 8:00 AM">7:00 AM - 8:00 AM</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualSubModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white text-xs font-black shadow-xs cursor-pointer"
                >
                  Activate Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

            {/* ADD NEW PRODUCT MODAL                                     */}
      {/* ------------------------------------------------------------- */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#7D0A14]" />
                <h3 className="font-black text-base text-slate-900">
                  Add New Product
                </h3>
              </div>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Name *</label>
                <input
                  type="text"
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  placeholder="e.g. Pure Buffalo Milk (1L)"
                  required
                />
              </div>

              {/* Product Image Input with Live Preview & File Upload */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Product Image (Upload File or Paste Image Link)
                </label>
                <div className="flex items-center gap-3 p-3 rounded-2xl border border-dashed border-[#EDE1D1] bg-[#FAF5EC]/40">
                  {/* Image Preview Box */}
                  <div className="w-16 h-16 rounded-xl border border-[#EDE1D1] bg-white overflow-hidden shrink-0 flex items-center justify-center relative shadow-xs">
                    {newProductForm.image ? (
                      <>
                        <img
                          src={newProductForm.image}
                          alt="Product Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setNewProductForm({ ...newProductForm, image: '' })}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-[#7D0A14] text-white rounded-full flex items-center justify-center text-[10px] shadow-xs cursor-pointer"
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-1 text-slate-400">
                        <ImageIcon className="w-5 h-5 mx-auto text-[#7D0A14]" />
                        <span className="text-[8px] font-bold block mt-0.5">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Upload from Device & URL input */}
                  <div className="flex-1 space-y-1.5">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EDE1D1] text-[#7D0A14] font-bold text-xs hover:bg-[#FAF5EC] cursor-pointer shadow-2xs transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (uploadEvent) => {
                              setNewProductForm({
                                ...newProductForm,
                                image: uploadEvent.target.result
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <input
                      type="url"
                      value={newProductForm.image || ''}
                      onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                      placeholder="Or paste image web link (https://...)"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-medium text-[11px] placeholder:text-slate-400 text-slate-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Product Storefront Channel Visibility Selector */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Storefront Visibility (Select Target Audience) *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewProductForm({ ...newProductForm, channel: 'all' })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      (newProductForm.channel || 'all') === 'all'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Globe className={`w-4 h-4 ${(newProductForm.channel || 'all') === 'all' ? 'text-amber-300' : 'text-[#7D0A14]'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">All (B2C & B2B)</span>
                    <span className={`text-[9px] ${(newProductForm.channel || 'all') === 'all' ? 'text-amber-100' : 'text-slate-400'}`}>
                      Both Storefronts
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewProductForm({ ...newProductForm, channel: 'b2c' })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      newProductForm.channel === 'b2c'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Users className={`w-4 h-4 ${newProductForm.channel === 'b2c' ? 'text-amber-300' : 'text-blue-600'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">B2C Retail Only</span>
                    <span className={`text-[9px] ${newProductForm.channel === 'b2c' ? 'text-amber-100' : 'text-slate-400'}`}>
                      Daily Customers
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewProductForm({ ...newProductForm, channel: 'b2b' })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      newProductForm.channel === 'b2b'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Building2 className={`w-4 h-4 ${newProductForm.channel === 'b2b' ? 'text-amber-300' : 'text-purple-600'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">B2B Wholesale Only</span>
                    <span className={`text-[9px] ${newProductForm.channel === 'b2b' ? 'text-amber-100' : 'text-slate-400'}`}>
                      Shopkeepers
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Category *</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomCategory(!isCustomCategory);
                        if (!isCustomCategory) setCustomCategoryInput('');
                      }}
                      className="text-[11px] font-extrabold text-[#7D0A14] hover:underline"
                    >
                      {isCustomCategory ? '← Choose from list' : '+ Add Custom'}
                    </button>
                  </div>
                  {isCustomCategory ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={customCategoryInput}
                        onChange={(e) => setCustomCategoryInput(e.target.value)}
                        placeholder="e.g. Fruits, Beverages, Sweets"
                        className="w-full px-3 py-2 rounded-xl border-2 border-[#7D0A14] font-semibold text-xs bg-amber-50/20 focus:outline-none"
                        autoFocus
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setIsCustomCategory(false)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                        title="Back to list"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <select
                      value={newProductForm.category}
                      onChange={(e) => {
                        if (e.target.value === '__add_custom__') {
                          setIsCustomCategory(true);
                          setCustomCategoryInput('');
                        } else {
                          setNewProductForm({ ...newProductForm, category: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-xs bg-white"
                    >
                      {availableCategoryNames.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="__add_custom__" className="font-bold text-[#7D0A14]">
                        ➕ + Add Custom Category...
                      </option>
                    </select>
                  )}
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Stock</label>
                  <input
                    type="text"
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. 100 Litres"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">B2C Retail Price (₹) *</label>
                  <input
                    type="number"
                    value={newProductForm.retailPrice}
                    onChange={(e) => setNewProductForm({ ...newProductForm, retailPrice: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold text-blue-700"
                    placeholder="64"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Retail Unit</label>
                  <input
                    type="text"
                    value={newProductForm.retailUnit}
                    onChange={(e) => setNewProductForm({ ...newProductForm, retailUnit: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="Per Litre"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">B2B Wholesale Price (₹)</label>
                  <input
                    type="number"
                    value={newProductForm.wholesalePrice}
                    onChange={(e) => setNewProductForm({ ...newProductForm, wholesalePrice: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold text-[#7D0A14]"
                    placeholder="e.g. 45"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Available Quantity</label>
                  <input
                    type="text"
                    value={newProductForm.moq}
                    onChange={(e) => setNewProductForm({ ...newProductForm, moq: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. 50 units / 100 kg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>Create Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ADD NEW HERO SECTION BANNER MODAL                             */}
      {/* ------------------------------------------------------------- */}
      {isAddHeroModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#7D0A14]" />
                <h3 className="font-black text-base text-slate-900">
                  Add Hero Section Banner & Image
                </h3>
              </div>
              <button
                onClick={() => setIsAddHeroModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewHeroSlide} className="space-y-4 text-xs">
              {/* Image Input: File Upload or Web URL */}
              <div className="p-3.5 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1] space-y-3">
                <label className="font-bold text-slate-800 block">
                  1. Hero Banner Image (Upload from Computer or Web URL) *
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all">
                    <Upload className="w-4 h-4 text-amber-300" />
                    <span>Upload Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleHeroFileUpload(e, 'add')}
                    />
                  </label>

                  <span className="text-slate-400 font-bold">OR</span>

                  <input
                    type="url"
                    value={heroSlideForm.image}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, image: e.target.value })}
                    className="flex-1 w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                    placeholder="Paste image link: https://images.unsplash.com/..."
                    required
                  />
                </div>

                {heroSlideForm.image && (
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#7D0A14] bg-slate-100 flex-shrink-0 shadow-sm">
                      <img
                        src={heroSlideForm.image}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-emerald-700 font-bold">
                      ✓ Image preview loaded successfully!
                    </span>
                  </div>
                )}
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={heroSlideForm.badge}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. Festival Special"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Highlight Word</label>
                  <input
                    type="text"
                    value={heroSlideForm.highlight}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, highlight: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold text-[#7D0A14]"
                    placeholder="e.g. 100% Pure 🥛"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title Line 1</label>
                  <input
                    type="text"
                    value={heroSlideForm.titleLine1}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, titleLine1: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. Pure Cow Milk"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title Line 2</label>
                  <input
                    type="text"
                    value={heroSlideForm.titleLine2}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, titleLine2: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. Crafted with"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Description</label>
                <textarea
                  rows="2"
                  value={heroSlideForm.description}
                  onChange={(e) => setHeroSlideForm({ ...heroSlideForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  placeholder="Traditional authentic taste prepared with 100% pure desi ghee & heritage recipes."
                  required
                />
              </div>

              {/* Button & Action */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Button CTA Text</label>
                  <input
                    type="text"
                    value={heroSlideForm.buttonText}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, buttonText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. Explore Menu / Subscribe Daily"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Button Action Target</label>
                  <select
                    value={heroSlideForm.actionType}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, actionType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold bg-white"
                  >
                    <option value="categories">Browse Store Catalog</option>
                    <option value="subscription">Open Morning Subscription Modal</option>
                    <option value="cart">Open Shopping Cart</option>
                  </select>
                </div>
              </div>

              {/* Color Gradient Theme */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Banner Background Theme</label>
                <select
                  value={heroSlideForm.gradient}
                  onChange={(e) => {
                    const g = e.target.value;
                    let border = 'border-[#8B121C]';
                    let circle = 'border-[#F5A623]/80';
                    if (g.includes('064E3B')) {
                      border = 'border-emerald-600';
                      circle = 'border-emerald-400/80';
                    } else if (g.includes('1E3A8A')) {
                      border = 'border-blue-600';
                      circle = 'border-amber-400/80';
                    } else if (g.includes('4C1D95')) {
                      border = 'border-purple-600';
                      circle = 'border-purple-300/80';
                    }
                    setHeroSlideForm({
                      ...heroSlideForm,
                      gradient: g,
                      borderWrapper: border,
                      borderColor: circle
                    });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold bg-white"
                >
                  <option value="from-[#60060E] via-[#7D0A14] to-[#91131E]">Royal Maroon (Sumadhura Signature)</option>
                  <option value="from-[#064E3B] via-[#047857] to-[#059669]">Farm Emerald Green (Vegetables & Greens)</option>
                  <option value="from-[#1E3A8A] via-[#1D4ED8] to-[#2563EB]">Dairy Blue (Morning Milk & Ghee)</option>
                  <option value="from-[#4C1D95] via-[#6D28D9] to-[#7C3AED]">Royal Purple (Staples & Groceries)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddHeroModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-300" />
                  <span>Add to Hero Carousel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EDIT HERO SECTION BANNER MODAL                                */}
      {/* ------------------------------------------------------------- */}
      {editingHeroSlide && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-[#7D0A14]" />
                <h3 className="font-black text-base text-slate-900">
                  Edit Hero Banner: {editingHeroSlide.badge}
                </h3>
              </div>
              <button
                onClick={() => setEditingHeroSlide(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedHeroSlide} className="space-y-4 text-xs">
              {/* Image Input: File Upload or Web URL */}
              <div className="p-3.5 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1] space-y-3">
                <label className="font-bold text-slate-800 block">
                  1. Hero Banner Image (Upload from Computer or Web URL) *
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all">
                    <Upload className="w-4 h-4 text-amber-300" />
                    <span>Upload New Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleHeroFileUpload(e, 'edit')}
                    />
                  </label>

                  <span className="text-slate-400 font-bold">OR</span>

                  <input
                    type="url"
                    value={editingHeroSlide.image}
                    onChange={(e) =>
                      setEditingHeroSlide({ ...editingHeroSlide, image: e.target.value })
                    }
                    className="flex-1 w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800"
                    placeholder="Paste image link: https://images.unsplash.com/..."
                    required
                  />
                </div>

                {editingHeroSlide.image && (
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#7D0A14] bg-slate-100 flex-shrink-0 shadow-sm">
                      <img
                        src={editingHeroSlide.image}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] text-emerald-700 font-bold">
                      ✓ Active Image Preview
                    </span>
                  </div>
                )}
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingHeroSlide.badge}
                    onChange={(e) =>
                      setEditingHeroSlide({ ...editingHeroSlide, badge: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Highlight Word</label>
                  <input
                    type="text"
                    value={editingHeroSlide.highlight}
                    onChange={(e) =>
                      setEditingHeroSlide({ ...editingHeroSlide, highlight: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold text-[#7D0A14]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title Line 1</label>
                  <input
                    type="text"
                    value={editingHeroSlide.titleLine1}
                    onChange={(e) =>
                      setEditingHeroSlide({ ...editingHeroSlide, titleLine1: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title Line 2</label>
                  <input
                    type="text"
                    value={editingHeroSlide.titleLine2}
                    onChange={(e) =>
                      setEditingHeroSlide({ ...editingHeroSlide, titleLine2: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Description</label>
                <textarea
                  rows="2"
                  value={editingHeroSlide.description}
                  onChange={(e) =>
                    setEditingHeroSlide({ ...editingHeroSlide, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  required
                />
              </div>

              {/* Button & Action */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Button CTA Text</label>
                  <input
                    type="text"
                    value={editingHeroSlide.buttonText}
                    onChange={(e) =>
                      setEditingHeroSlide({ ...editingHeroSlide, buttonText: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Button Action Target</label>
                  <select
                    value={editingHeroSlide.actionType || 'categories'}
                    onChange={(e) =>
                      setEditingHeroSlide({ ...editingHeroSlide, actionType: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold bg-white"
                  >
                    <option value="categories">Browse Store Catalog</option>
                    <option value="subscription">Open Morning Subscription Modal</option>
                    <option value="cart">Open Shopping Cart</option>
                  </select>
                </div>
              </div>

              {/* Color Gradient Theme */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Banner Background Theme</label>
                <select
                  value={editingHeroSlide.gradient}
                  onChange={(e) => {
                    const g = e.target.value;
                    let border = 'border-[#8B121C]';
                    let circle = 'border-[#F5A623]/80';
                    if (g.includes('064E3B')) {
                      border = 'border-emerald-600';
                      circle = 'border-emerald-400/80';
                    } else if (g.includes('1E3A8A')) {
                      border = 'border-blue-600';
                      circle = 'border-amber-400/80';
                    } else if (g.includes('4C1D95')) {
                      border = 'border-purple-600';
                      circle = 'border-purple-300/80';
                    }
                    setEditingHeroSlide({
                      ...editingHeroSlide,
                      gradient: g,
                      borderWrapper: border,
                      borderColor: circle
                    });
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold bg-white"
                >
                  <option value="from-[#60060E] via-[#7D0A14] to-[#91131E]">Royal Maroon (Sumadhura Signature)</option>
                  <option value="from-[#064E3B] via-[#047857] to-[#059669]">Farm Emerald Green (Vegetables & Greens)</option>
                  <option value="from-[#1E3A8A] via-[#1D4ED8] to-[#2563EB]">Dairy Blue (Morning Milk & Ghee)</option>
                  <option value="from-[#4C1D95] via-[#6D28D9] to-[#7C3AED]">Royal Purple (Staples & Groceries)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingHeroSlide(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Save className="w-3.5 h-3.5 text-amber-300" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ADD / EDIT CATEGORY MODAL                                     */}
      {/* ------------------------------------------------------------- */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-[#7D0A14]" />
                <h3 className="font-black text-base text-slate-900">
                  {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Add New Category Aisle'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  setEditingCategory(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                    placeholder="e.g. Organic Dairy & Ghee"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Emoji Icon</label>
                  <input
                    type="text"
                    value={categoryForm.emoji}
                    onChange={(e) => setCategoryForm({ ...categoryForm, emoji: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                    placeholder="🥛"
                  />
                </div>
              </div>

              {/* Category Image Upload & Preview */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Category Banner Image (Upload from Device or Web URL)
                </label>
                <div className="flex items-center gap-3 p-3 rounded-2xl border border-dashed border-[#EDE1D1] bg-[#FAF5EC]/40">
                  {/* Live Preview Box */}
                  <div className="w-16 h-16 rounded-xl border border-[#EDE1D1] bg-white overflow-hidden shrink-0 flex items-center justify-center relative shadow-xs">
                    {categoryForm.image ? (
                      <>
                        <img
                          src={categoryForm.image}
                          alt="Category Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setCategoryForm({ ...categoryForm, image: '' })}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-[#7D0A14] text-white rounded-full flex items-center justify-center text-[10px] shadow-xs cursor-pointer hover:bg-rose-700"
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-1 text-slate-400">
                        <ImageIcon className="w-5 h-5 mx-auto text-[#7D0A14]" />
                        <span className="text-[8px] font-bold block mt-0.5">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Upload from Device & URL input */}
                  <div className="flex-1 space-y-1.5">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EDE1D1] text-[#7D0A14] font-bold text-xs hover:bg-[#FAF5EC] cursor-pointer shadow-2xs transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Choose Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (uploadEvent) => {
                              setCategoryForm({
                                ...categoryForm,
                                image: uploadEvent.target.result
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <input
                      type="url"
                      value={categoryForm.image || ''}
                      onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                      placeholder="Or paste image web link (https://...)"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-medium text-[11px] placeholder:text-slate-400 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#7D0A14]"
                    />
                  </div>
                </div>
              </div>

              {/* Target Channel / Storefront Visibility Selector */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Storefront Visibility (Select B2C, B2B or All) *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCategoryForm({ ...categoryForm, channel: 'all' })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      (categoryForm.channel || 'all') === 'all'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Globe className={`w-4 h-4 ${(categoryForm.channel || 'all') === 'all' ? 'text-amber-300' : 'text-[#7D0A14]'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">All (B2C & B2B)</span>
                    <span className={`text-[9px] ${(categoryForm.channel || 'all') === 'all' ? 'text-amber-100' : 'text-slate-400'}`}>
                      Both Storefronts
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategoryForm({ ...categoryForm, channel: 'b2c' })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      categoryForm.channel === 'b2c'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Users className={`w-4 h-4 ${categoryForm.channel === 'b2c' ? 'text-amber-300' : 'text-blue-600'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">B2C Retail Only</span>
                    <span className={`text-[9px] ${categoryForm.channel === 'b2c' ? 'text-amber-100' : 'text-slate-400'}`}>
                      Daily Customers
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategoryForm({ ...categoryForm, channel: 'b2b' })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      categoryForm.channel === 'b2b'
                        ? 'bg-[#7D0A14] text-white border-[#7D0A14] shadow-sm font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    <Building2 className={`w-4 h-4 ${categoryForm.channel === 'b2b' ? 'text-amber-300' : 'text-purple-600'}`} />
                    <span className="text-[11px] font-extrabold leading-tight">B2B Wholesale Only</span>
                    <span className={`text-[9px] ${categoryForm.channel === 'b2b' ? 'text-amber-100' : 'text-slate-400'}`}>
                      Shopkeepers
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows="2"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  placeholder="Short description shown to customers..."
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subcategories (Comma separated)</label>
                <input
                  type="text"
                  value={categoryForm.subCategories}
                  onChange={(e) => setCategoryForm({ ...categoryForm, subCategories: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  placeholder="e.g. A2 Milk, Paneer Blocks, Bilona Ghee"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categoryForm.featured}
                    onChange={(e) => setCategoryForm({ ...categoryForm, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#7D0A14] rounded"
                  />
                  <span>Featured on Storefront</span>
                </label>

                <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categoryForm.active}
                    onChange={(e) => setCategoryForm({ ...categoryForm, active: e.target.checked })}
                    className="w-4 h-4 accent-emerald-600 rounded"
                  />
                  <span>Active in Store</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCategoryModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-amber-300" />
                  <span>{editingCategory ? 'Save Category' : 'Create Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* BRANCH STORE LOGIN & SWITCHER MODAL (Branch 1, Branch 2, Branch 3) */}
      {/* ------------------------------------------------------------- */}
      {isShopLoginModalOpen && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={() => setIsShopLoginModalOpen(false)}
        >
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-7 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 space-y-4 sm:space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">
                    Branch Store Login & Switcher
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Select or login to Branch 1, Branch 2, or Branch 3 to open /branch store details.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsShopLoginModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick 1-Click Fast Login Cards for Branch 1, Branch 2, Branch 3 */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                Quick 1-Click Fast Branch Login & Open /branch1, /branch2, /branch3
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {shopsList.map((shop, idx) => {
                  const bNum = getBranchNum(shop, idx + 1);
                  return (
                    <button
                      key={shop.id}
                      type="button"
                      onClick={() => handleShopLogin(shop)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        currentShop?.id === shop.id
                          ? 'border-[#7D0A14] bg-[#FAF5EC] ring-2 ring-[#7D0A14]/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-black text-slate-900 text-xs">{shop.shortName}</span>
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-white border border-[#EDE1D1] text-[#7D0A14]">
                            {shop.branchCode}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{shop.manager}</p>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-black text-[#7D0A14]">
                        <span>Open /branch{bNum}</span>
                        <ArrowRight className="w-3 h-3" />
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
                Or Enter Branch Login Credentials
              </span>
            </div>

            {/* Credential Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleShopLogin(shopLoginForm.loginId, shopLoginForm.password);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Branch Login ID / Username *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={shopLoginForm.loginId}
                    onChange={(e) => {
                      setShopLoginForm({ ...shopLoginForm, loginId: e.target.value });
                      setShopLoginError('');
                    }}
                    placeholder="e.g. branch1, branch2, branch3 (or shop1)"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                    required
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Tip: Enter <strong>branch1</strong>, <strong>branch2</strong>, or <strong>branch3</strong> (password: <strong>password123</strong>)
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={shopLoginForm.password}
                    onChange={(e) => {
                      setShopLoginForm({ ...shopLoginForm, password: e.target.value });
                      setShopLoginError('');
                    }}
                    placeholder="Enter branch password (default: password123)"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                    required
                  />
                </div>
              </div>

              {shopLoginError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{shopLoginError}</span>
                </div>
              )}

              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsShopLoginModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black flex items-center justify-center gap-2 shadow-md shadow-[#7D0A14]/25 active:scale-95 transition-all cursor-pointer text-center"
                >
                  <Key className="w-3.5 h-3.5 text-amber-300" />
                  <span>Verify Login & Open /branch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EDIT STORE DETAILS MODAL                                      */}
      {/* ------------------------------------------------------------- */}
      {isEditShopModalOpen && editStoreForm && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={() => setIsEditShopModalOpen(false)}
        >
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-7 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-[#7D0A14]" />
                <h3 className="font-black text-base text-slate-900">
                  Edit {editStoreForm.shortName} Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditShopModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStoreDetails} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Store Name *</label>
                <input
                  type="text"
                  value={editStoreForm.name || ''}
                  onChange={(e) => setEditStoreForm({ ...editStoreForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Manager Name *</label>
                  <input
                    type="text"
                    value={editStoreForm.manager || ''}
                    onChange={(e) => setEditStoreForm({ ...editStoreForm, manager: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Manager Phone *</label>
                  <input
                    type="text"
                    value={editStoreForm.phone || ''}
                    onChange={(e) => setEditStoreForm({ ...editStoreForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Store Address *</label>
                <textarea
                  rows={2}
                  value={editStoreForm.address || ''}
                  onChange={(e) => setEditStoreForm({ ...editStoreForm, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Operating Timings</label>
                  <input
                    type="text"
                    value={editStoreForm.timings || ''}
                    onChange={(e) => setEditStoreForm({ ...editStoreForm, timings: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Daily Capacity</label>
                  <input
                    type="number"
                    value={editStoreForm.dailyCapacity || ''}
                    onChange={(e) => setEditStoreForm({ ...editStoreForm, dailyCapacity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditShopModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer text-center"
                >
                  <Save className="w-3.5 h-3.5 text-amber-300" />
                  <span>Save Store Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* ADD NEW BRANCH MODAL                                                  */}
      {/* ===================================================================== */}
      {isAddBranchModalOpen && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={() => setIsAddBranchModalOpen(false)}
        >
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-[#EDE1D1] relative animate-in zoom-in-95 duration-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#3D040A]">
                    Add New Store Branch (Branch {shopsList.length + 1})
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Auto-creates route /branch{shopsList.length + 1} & inventory hub
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddBranchModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBranch} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Branch Area / Location Name *
                </label>
                <input
                  type="text"
                  value={newBranchForm.area}
                  onChange={(e) => setNewBranchForm({ ...newBranchForm, area: e.target.value })}
                  placeholder="e.g. Kondapur, Banjara Hills, Kukatpally"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Manager Name *</label>
                  <input
                    type="text"
                    value={newBranchForm.manager}
                    onChange={(e) => setNewBranchForm({ ...newBranchForm, manager: e.target.value })}
                    placeholder="e.g. Srinivas Rao"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    value={newBranchForm.phone}
                    onChange={(e) => setNewBranchForm({ ...newBranchForm, phone: e.target.value })}
                    placeholder="+91 98450 44004"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Hub Address *</label>
                <textarea
                  rows={2}
                  value={newBranchForm.address}
                  onChange={(e) => setNewBranchForm({ ...newBranchForm, address: e.target.value })}
                  placeholder="Plot / Shop #, Main Road, Area, Hyderabad, Telangana"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="font-bold text-slate-700 block mb-1">Daily Capacity</label>
                  <input
                    type="number"
                    min="50"
                    value={newBranchForm.dailyCapacity}
                    onChange={(e) => setNewBranchForm({ ...newBranchForm, dailyCapacity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="font-bold text-slate-700 block mb-1">Fleet Riders</label>
                  <input
                    type="number"
                    min="1"
                    value={newBranchForm.dispatchFleetCount}
                    onChange={(e) => setNewBranchForm({ ...newBranchForm, dispatchFleetCount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="font-bold text-slate-700 block mb-1">Direct URL</label>
                  <input
                    type="text"
                    readOnly
                    value={`/branch${shopsList.length + 1}`}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold text-[#7D0A14]"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddBranchModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer text-center"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Create Branch {shopsList.length + 1}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
