import React, { useState, useEffect } from 'react';
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
  Star
} from 'lucide-react';

import { DEFAULT_HERO_SLIDES } from './HomePage';

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
    deleteOrder
  } = useShop();

  const orders = contextOrders || [];
  const subscriptions = contextSubs || [];
  const setOrders = setContextOrders;
  const setSubscriptions = setContextSubs;

  // Mode: 'unified' | 'b2c' | 'b2b'
  const [adminMode, setAdminMode] = useState('unified');
  // Tabs: 'overview' | 'orders' | 'subscriptions' | 'b2b-quotes' | 'inventory' | 'invoices'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mobile sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Selected invoice for Modal viewing
  const [selectedInvoice, setSelectedInvoice] = useState(null);

    // -------------------------------------------------------------------
  // CUSTOMER MANAGEMENT SYSTEM (EXACT REFERENCE DATA + DYNAMIC CUSTOMERS)
  // -------------------------------------------------------------------
  const REFERENCE_CUSTOMERS = [
    {
      id: 'cust-ref-1',
      name: 'Ravi Kumar',
      type: 'B2C',
      isBusiness: false,
      phone: '+91 98765 43210',
      email: 'ravi@gmail.com',
      ordersCount: 5,
      totalSpent: 4850,
      status: 'Active',
      subscription: 'Morning Pure Cow Milk (Daily 1L)',
      registeredAt: '12 Jan 2026'
    },
    {
      id: 'cust-ref-2',
      name: 'Sneha Reddy',
      type: 'B2C',
      isBusiness: false,
      phone: '+91 91234 56789',
      email: 'sneha@yahoo.com',
      ordersCount: 3,
      totalSpent: 2700,
      status: 'Active',
      subscription: 'A2 Buffalo Milk (Alternate Days)',
      registeredAt: '24 Jan 2026'
    },
    {
      id: 'cust-ref-3',
      name: 'Sri Venkateshwara Foods Pvt Ltd',
      companyName: 'Sri Venkateshwara Foods Pvt Ltd',
      type: 'B2B',
      isBusiness: true,
      phone: '+91 99887 76655',
      email: 'info@svfoods.in',
      ordersCount: 8,
      totalSpent: 28500,
      status: 'Active',
      subscription: 'B2B Bulk Paneer & Ghee Wholesale',
      registeredAt: '05 Feb 2026'
    },
    {
      id: 'cust-ref-4',
      name: 'Prakash Rao',
      type: 'B2C',
      isBusiness: false,
      phone: '+91 90011 22334',
      email: 'prakash@gmail.com',
      ordersCount: 2,
      totalSpent: 1200,
      status: 'Active',
      subscription: 'Morning Pure Cow Milk',
      registeredAt: '18 Feb 2026'
    },
    {
      id: 'cust-ref-5',
      name: 'Andromeda Finance Solutions',
      companyName: 'Andromeda Finance Solutions',
      type: 'B2B',
      isBusiness: true,
      phone: '+91 88999 77661',
      email: 'support@andromeda.in',
      ordersCount: 12,
      totalSpent: 52300,
      status: 'Active',
      subscription: 'Corporate Dairy Pantry Supply',
      registeredAt: '27 Feb 2026'
    }
  ];

  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_customer_registry');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}

    try {
      const realSaved = localStorage.getItem('sumadhura_registered_customers');
      const realList = realSaved ? JSON.parse(realSaved) : [];
      const combined = [...REFERENCE_CUSTOMERS];
      realList.forEach(rc => {
        if (!combined.some(c => (rc.email && c.email === rc.email) || (rc.phone && c.phone === rc.phone))) {
          combined.unshift({
            id: rc.id || `CUST-${rc.isBusiness ? 'B2B' : 'B2C'}-${Date.now()}`,
            name: rc.name || (rc.isBusiness ? rc.companyName : 'Customer'),
            type: rc.isBusiness ? 'B2B' : 'B2C',
            isBusiness: Boolean(rc.isBusiness),
            companyName: rc.companyName || null,
            phone: rc.phone || '+91 98888 11111',
            email: rc.email || 'customer@sumadhura.com',
            ordersCount: 1,
            totalSpent: 950,
            status: rc.status || 'Active',
            subscription: 'Morning Pure Cow Milk',
            registeredAt: rc.registeredAt || 'Today'
          });
        }
      });
      return combined;
    } catch {
      return REFERENCE_CUSTOMERS;
    }
  });

  // Keep customer list in sync if live user signs in
  React.useEffect(() => {
    if (user) {
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
            phone: phone || '+91 98765 00000',
            email: email || 'user@sumadhura.com',
            ordersCount: 1,
            totalSpent: 850,
            status: 'Active',
            subscription: 'Morning Pure Cow Milk (Daily 1L)',
            registeredAt: 'Just Now'
          };
          const updated = [newCust, ...prev];
          try {
            localStorage.setItem('sumadhura_customer_registry', JSON.stringify(updated));
          } catch {}
          return updated;
        }
        return prev;
      });
    }
  }, [user]);

  // Customer Management Filter & Pagination State
  const [customerScope, setCustomerScope] = useState('all'); // 'all' | 'b2c' | 'b2b'
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [customerStatusFilter, setCustomerStatusFilter] = useState('all');
  const [customerSubFilter, setCustomerSubFilter] = useState('all');
  const [selectedCustomerForView, setSelectedCustomerForView] = useState(null);
  const [customerActionMenuId, setCustomerActionMenuId] = useState(null);
  const [customerPage, setCustomerPage] = useState(1);

  // Computed KPI Metrics matching reference figures
  const totalCustomerCount = 2840 + (customers.length - 5);
  const b2cCustomerCount = 1950 + (customers.filter(c => !c.isBusiness).length - 3);
  const b2bCustomerCount = 890 + (customers.filter(c => c.isBusiness).length - 2);
  const activeCustomerCount = 2620 + (customers.filter(c => c.status === 'Active').length - 5);

  // Filtered customer list
  const filteredCustomers = customers.filter(c => {
    // Scope filter
    if (customerScope === 'b2c' && c.isBusiness) return false;
    if (customerScope === 'b2b' && !c.isBusiness) return false;

    // Search filter
    if (customerSearchTerm.trim()) {
      const q = customerSearchTerm.toLowerCase();
      const matchName = (c.name || '').toLowerCase().includes(q);
      const matchPhone = (c.phone || '').toLowerCase().includes(q);
      const matchEmail = (c.email || '').toLowerCase().includes(q);
      const matchCompany = (c.companyName || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchEmail && !matchCompany) return false;
    }

    // Status filter
    if (customerStatusFilter !== 'all' && c.status !== customerStatusFilter) return false;

    // Subscription filter
    if (customerSubFilter === 'subscribed' && (!c.subscription || c.subscription === 'None')) return false;
    if (customerSubFilter === 'none' && c.subscription && c.subscription !== 'None') return false;

    return true;
  });

  const toggleCustomerStatus = (cust) => {
    const newStatus = cust.status === 'Active' ? 'Inactive' : 'Active';
    const updated = customers.map(c => c.id === cust.id ? { ...c, status: newStatus } : c);
    setCustomers(updated);
    try {
      localStorage.setItem('sumadhura_customer_registry', JSON.stringify(updated));
    } catch {}
    showToast(`Status for ${cust.name} set to ${newStatus}`);
  };

  const deleteCustomer = (cust) => {
    const updated = customers.filter(
      (c) => c.id !== cust.id && c.phone !== cust.phone && c.email !== cust.email
    );
    setCustomers(updated);
    try {
      localStorage.setItem('sumadhura_customer_registry', JSON.stringify(updated));
      localStorage.setItem('sumadhura_registered_customers', JSON.stringify(updated));
      if (user && (user.email === cust.email || user.phone === cust.phone)) {
        localStorage.removeItem('sumadhura_user');
      }
    } catch {}
    showToast(`🗑️ Customer "${cust.name || cust.companyName}" removed from registry.`);
  };

  const clearAllCustomers = () => {
    if (window.confirm('Are you sure you want to reset customer database to reference standards?')) {
      setCustomers(REFERENCE_CUSTOMERS);
      try {
        localStorage.setItem('sumadhura_customer_registry', JSON.stringify(REFERENCE_CUSTOMERS));
      } catch {}
      showToast('Customer database reset to standard defaults.', 'info');
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
    if (window.confirm('Reset inventory catalog to default core SKUs?')) {
      setInventoryList(DEFAULT_INVENTORY);
      try {
        localStorage.setItem('sumadhura_admin_inventory', JSON.stringify(DEFAULT_INVENTORY));
      } catch {}
      showToast('Reset inventory catalog to default core SKUs');
    }
  };

  // Inventory Editor Modals
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Dairy',
    stock: '50 Units',
    retailPrice: '',
    retailUnit: 'Per pack',
    wholesalePrice: '',
    wholesaleUnit: 'Bulk pack',
    moq: '10 units',
    inStock: true
  });

  const saveEditedProduct = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingProduct) return;
    const updated = inventoryList.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    setInventoryList(updated);
    try {
      localStorage.setItem('sumadhura_admin_inventory', JSON.stringify(updated));
    } catch {}
    setEditingProduct(null);
    showToast(`✅ Saved changes for ${editingProduct.name}`);
  };

  const handleAddNewProduct = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newProductForm.name || !newProductForm.retailPrice) {
      showToast('Please enter product name and retail price', 'error');
      return;
    }
    const newProd = {
      id: `p-${Date.now().toString().slice(-4)}`,
      name: newProductForm.name,
      category: newProductForm.category,
      stock: newProductForm.stock || '100 Units',
      retailPrice: Number(newProductForm.retailPrice) || 0,
      retailUnit: newProductForm.retailUnit || 'Per Unit',
      wholesalePrice: Number(newProductForm.wholesalePrice) || Math.round(Number(newProductForm.retailPrice) * 0.75),
      wholesaleUnit: newProductForm.wholesaleUnit || 'Bulk Pack',
      moq: newProductForm.moq || '10 Units',
      inStock: newProductForm.inStock
    };
    const updated = [newProd, ...inventoryList];
    setInventoryList(updated);
    try {
      localStorage.setItem('sumadhura_admin_inventory', JSON.stringify(updated));
    } catch {}
    setIsAddProductModalOpen(false);
    setNewProductForm({
      name: '',
      category: 'Dairy',
      stock: '50 Units',
      retailPrice: '',
      retailUnit: 'Per pack',
      wholesalePrice: '',
      wholesaleUnit: 'Bulk pack',
      moq: '10 units',
      inStock: true
    });
    showToast(`✅ Added new product: ${newProd.name}`);
  };

  const handleDeleteProduct = (prodId) => {
    const prod = inventoryList.find((p) => p.id === prodId);
    if (window.confirm(`Delete ${prod?.name || 'product'} from catalog?`)) {
      const updated = inventoryList.filter((p) => p.id !== prodId);
      setInventoryList(updated);
      try {
        localStorage.setItem('sumadhura_admin_inventory', JSON.stringify(updated));
      } catch {}
      showToast(`Removed product from catalog`);
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
      id: 'b2c-customers',
      label: 'B2C Customers',
      icon: User,
      badge: null,
      customBadge: {
        text: 'B2C Retail',
        className: 'bg-[#FEF08A] text-[#854D0E] border border-amber-300'
      }
    },
    {
      id: 'b2b-customers',
      label: 'B2B Customers',
      icon: Users,
      badge: null,
      customBadge: {
        text: 'B2B Wholesale',
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
      badge: 6,
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
      {/* 1. STANDALONE LEFT SIDEBAR (EXACT MATCH TO REFERENCE DESIGN)   */}
      {/* ============================================================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white text-[#1E2544] border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 shadow-sm ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Brand Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FACC15] text-[#1E2544] flex items-center justify-center font-black text-xl shadow-xs">
                <Store className="w-5 h-5 text-[#1E2544]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-extrabold text-sm text-[#1E2544] tracking-tight">Sumadhura Foods</h2>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-100 text-[#854D0E] border border-amber-200">
                    Admin
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Operations Portal</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links matching Screenshot */}
          <div className="p-3 flex-1 overflow-y-auto space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'dashboard' && activeTab === 'overview');
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all text-left ${
                    isActive
                      ? 'bg-[#FACC15] text-[#1E2544] font-black shadow-xs'
                      : 'text-[#1E2544] hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${isActive ? 'text-[#1E2544]' : 'text-[#1E2544]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.customBadge && (
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${item.customBadge.className}`}>
                        {item.customBadge.text}
                      </span>
                    )}
                    {item.badge !== null && !item.customBadge && (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-[#1E2544] text-[#FACC15]'
                            : 'bg-slate-100 text-slate-700'
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

          {/* Bottom Card as seen in Screenshot */}
          <div className="p-3 border-t border-slate-100 bg-white">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#7D0A14] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Storefront
                </span>
                <span className="text-[10px] font-bold text-amber-900">v2.4 Production</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                Connected to Bangalore Daily Morning Dispatch Hub.
              </p>
              <button
                onClick={() => navigateTo('home')}
                className="w-full py-1.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#1E2544] font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Storefront</span>
              </button>
            </div>
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
              <span className="text-[#D98207]">❄️ {adminContent.coldChainTemp}</span>
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
                    {(activeTab === 'dashboard' || activeTab === 'overview') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* 1. Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Home className="w-5 h-5 text-slate-800" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#1E2544] tracking-tight">
                      Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Welcome back! Here's what's happening with your store today.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                      onClick={() => showToast('Date range: Last 30 Days selected')}
                      className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Last 30 Days</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. Top 6 KPI Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {/* Total Sales */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#FBBF24] flex items-center justify-center text-slate-900 font-black text-sm shrink-0 shadow-2xs">
                      ₹
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-600">Total Sales</div>
                      <div className="text-xl font-black text-[#1E2544] tracking-tight mt-0.5">₹4,75,250</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-600 mt-2">
                    ↑ 12% <span className="text-slate-400 font-normal">vs last month</span>
                  </div>
                  {/* Sparkline Wave */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,20 Q15,10 30,16 T60,8 T85,14 T100,6 L100,25 L0,25 Z" fill="url(#salesGrad)" />
                    <path d="M0,20 Q15,10 30,16 T60,8 T85,14 T100,6" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* B2C Orders */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#FEF08A] text-[#854D0E]">
                        B2C Retail
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-600 mt-2">B2C Orders</div>
                    <div className="text-xl font-black text-[#1E2544] tracking-tight mt-0.5">628</div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-600 mt-1">
                    ↑ 15% <span className="text-slate-400 font-normal">vs last month</span>
                  </div>
                  {/* Sparkline Wave */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="b2cGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,22 Q20,15 40,18 T70,10 T100,5 L100,25 L0,25 Z" fill="url(#b2cGrad)" />
                    <path d="M0,22 Q20,15 40,18 T70,10 T100,5" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* B2B Orders */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
                        <Handshake className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#F43F5E] text-white">
                        B2B Wholesale
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-600 mt-2">B2B Orders</div>
                    <div className="text-xl font-black text-[#1E2544] tracking-tight mt-0.5">124</div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-600 mt-1">
                    ↑ 10% <span className="text-slate-400 font-normal">vs last month</span>
                  </div>
                  {/* Sparkline Wave */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="b2bGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,20 Q20,12 45,17 T75,9 T100,7 L100,25 L0,25 Z" fill="url(#b2bGrad)" />
                    <path d="M0,20 Q20,12 45,17 T75,9 T100,7" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Total Customers */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-600">Total Customers</div>
                      <div className="text-xl font-black text-[#1E2544] tracking-tight mt-0.5">3,250</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-600 mt-2">
                    ↑ 14% <span className="text-slate-400 font-normal">vs last month</span>
                  </div>
                  {/* Sparkline Wave */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,22 Q25,18 50,15 T75,8 T100,5 L100,25 L0,25 Z" fill="url(#custGrad)" />
                    <path d="M0,22 Q25,18 50,15 T75,8 T100,5" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Low Stock */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-600">Low Stock</div>
                      <div className="text-xl font-black text-[#1E2544] tracking-tight mt-0.5">18</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-rose-600 mt-2">
                    ⚠ Needs Attention
                  </div>
                  {/* Sparkline Wave */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,20 Q20,14 45,18 T80,11 T100,8 L100,25 L0,25 Z" fill="url(#stockGrad)" />
                    <path d="M0,20 Q20,14 45,18 T80,11 T100,8" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Pending Deliveries */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 relative overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-600">Pending Deliveries</div>
                      <div className="text-xl font-black text-[#1E2544] tracking-tight mt-0.5">42</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-600 mt-2">
                    ↑ 5% <span className="text-slate-400 font-normal">vs last month</span>
                  </div>
                  {/* Sparkline Wave */}
                  <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="delGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,21 Q25,17 50,13 T80,8 T100,4 L100,25 L0,25 Z" fill="url(#delGrad)" />
                    <path d="M0,21 Q25,17 50,13 T80,8 T100,4" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* 3. Middle Section: Sales & Orders Overview + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Sales & Orders Overview Chart */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-slate-700" />
                      <h3 className="font-extrabold text-sm sm:text-base text-[#1E2544]">
                        Sales & Orders Overview
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                        <span>Sales (₹)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
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
                          <line x1="40" y1="20" x2="680" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                          <text x="5" y="24" fill="#94A3B8">₹6L</text>

                          <line x1="40" y1="75" x2="680" y2="75" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                          <text x="5" y="79" fill="#94A3B8">₹4L</text>

                          <line x1="40" y1="130" x2="680" y2="130" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                          <text x="5" y="134" fill="#94A3B8">₹2L</text>

                          <line x1="40" y1="185" x2="680" y2="185" stroke="#CBD5E1" strokeWidth="1" />
                          <text x="5" y="189" fill="#94A3B8">₹0</text>
                        </g>

                        {/* Yellow Line: Sales (₹) */}
                        {/* Points: Oct26: 140, Oct27: 105, Oct28: 80, Oct29: 75, Oct30: 35, Oct31: 55, Nov1: 65 */}
                        <path
                          d="M60,140 L160,105 L260,80 L360,75 L460,35 L560,55 L660,65"
                          fill="none"
                          stroke="#EAB308"
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
                            <circle cx={pt.x} cy={pt.y} r="5" fill="#EAB308" stroke="#FFFFFF" strokeWidth="2.5" className="cursor-pointer hover:r-7 transition-all" />
                          </g>
                        ))}

                        {/* Red Line: Orders */}
                        {/* Points: Oct26: 170, Oct27: 145, Oct28: 148, Oct29: 148, Oct30: 125, Oct31: 145, Nov1: 140 */}
                        <path
                          d="M60,170 L160,145 L260,148 L360,148 L460,125 L560,145 L660,140"
                          fill="none"
                          stroke="#E11D48"
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
                            <circle cx={pt.x} cy={pt.y} r="4.5" fill="#E11D48" stroke="#FFFFFF" strokeWidth="2" className="cursor-pointer hover:r-6 transition-all" />
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

                {/* Quick Actions (2x2 Grid) */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                    <Zap className="w-5 h-5 text-amber-500 fill-amber-500/30" />
                    <h3 className="font-extrabold text-sm sm:text-base text-[#1E2544]">
                      Quick Actions
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {/* Add Product */}
                    <button
                      onClick={() => setIsAddProductModalOpen(true)}
                      className="p-4 rounded-2xl bg-[#FFFBEB] hover:bg-amber-100/70 border border-amber-200/80 flex flex-col items-center justify-center gap-2 text-xs font-bold text-slate-800 transition-all active:scale-95 shadow-2xs group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform shadow-2xs">
                        <Package className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-[#1E2544]">Add Product</span>
                    </button>

                    {/* Add B2B Customer */}
                    <button
                      onClick={() => setActiveTab('b2b-customers')}
                      className="p-4 rounded-2xl bg-[#FFFBEB] hover:bg-amber-100/70 border border-amber-200/80 flex flex-col items-center justify-center gap-2 text-xs font-bold text-slate-800 transition-all active:scale-95 shadow-2xs group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform shadow-2xs">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-[#1E2544]">Add B2B Customer</span>
                    </button>

                    {/* Create Offer */}
                    <button
                      onClick={() => setActiveTab('offers-coupons')}
                      className="p-4 rounded-2xl bg-[#FFFBEB] hover:bg-amber-100/70 border border-amber-200/80 flex flex-col items-center justify-center gap-2 text-xs font-bold text-slate-800 transition-all active:scale-95 shadow-2xs group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform shadow-2xs">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-[#1E2544]">Create Offer</span>
                    </button>

                    {/* Generate Invoice */}
                    <button
                      onClick={() => setActiveTab('invoices')}
                      className="p-4 rounded-2xl bg-[#FFFBEB] hover:bg-amber-100/70 border border-amber-200/80 flex flex-col items-center justify-center gap-2 text-xs font-bold text-slate-800 transition-all active:scale-95 shadow-2xs group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform shadow-2xs">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-[#1E2544]">Generate Invoice</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Lower Section: Recent Orders + Low Stock Products */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Recent Orders Table */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-rose-600" />
                      <h3 className="font-extrabold text-sm sm:text-base text-[#1E2544]">
                        Recent Orders
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-[#FAF5EC]/70 border-b border-[#EDE1D1] text-slate-800 font-bold uppercase tracking-wider">
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
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {[
                          { id: '#MNK10045', name: 'Ramesh Kumar', type: 'B2C', amt: '₹1,250', pay: 'UPI', status: 'Delivered', statusColor: 'bg-emerald-100 text-emerald-800', date: 'Nov 02, 2026 5:12 PM' },
                          { id: '#MNK10044', name: 'Sri Sai Traders', type: 'B2B', amt: '₹12,800', pay: 'Bank Transfer', status: 'Processing', statusColor: 'bg-blue-100 text-blue-800', date: 'Nov 02, 2026 3:45 PM' },
                          { id: '#MNK10043', name: 'Lakshmi Devi', type: 'B2C', amt: '₹650', pay: 'UPI', status: 'Delivered', statusColor: 'bg-emerald-100 text-emerald-800', date: 'Nov 02, 2026 1:20 PM' },
                          { id: '#MNK10042', name: 'Vijaya Mart', type: 'B2B', amt: '₹25,600', pay: 'Net Banking', status: 'Pending', statusColor: 'bg-amber-100 text-amber-800', date: 'Nov 01, 2026 7:30 PM' },
                          { id: '#MNK10041', name: 'Mahesh Reddy', type: 'B2C', amt: '₹890', pay: 'COD', status: 'Delivered', statusColor: 'bg-emerald-100 text-emerald-800', date: 'Nov 01, 2026 6:15 PM' }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3 font-mono font-bold text-slate-800">{row.id}</td>
                            <td className="py-3 px-3 font-bold text-[#1E2544]">{row.name}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                row.type === 'B2B'
                                  ? 'bg-[#F43F5E] text-white'
                                  : 'bg-[#FEF08A] text-[#854D0E]'
                              }`}>
                                {row.type}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-black text-slate-900">{row.amt}</td>
                            <td className="py-3 px-3 text-slate-600 font-semibold">{row.pay}</td>
                            <td className="py-3 px-3">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.statusColor}`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-slate-500 text-[11px]">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Low Stock Products */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                      <h3 className="font-extrabold text-sm sm:text-base text-[#1E2544]">
                        Low Stock Products
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('inventory')}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="space-y-3.5 flex-1">
                    {[
                      { name: 'Tata Salt 1kg', left: 'Only 5 left', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&auto=format&fit=crop&q=80' },
                      { name: 'Sunflower Oil 1L', left: 'Only 8 left', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&auto=format&fit=crop&q=80' },
                      { name: 'Aashirvaad Atta 5kg', left: 'Only 10 left', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&auto=format&fit=crop&q=80' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50/70 transition-all">
                        <div className="flex items-center gap-3">
                          <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                          <div>
                            <div className="font-bold text-xs text-[#1E2544]">{item.name}</div>
                            <div className="text-[11px] font-bold text-rose-600">{item.left}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => showToast(`Stock replenished for ${item.name}! +50 units added.`, 'success')}
                          className="px-3 py-1 rounded-full border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold active:scale-95 transition-all"
                        >
                          Restock
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. Bottom Banner: B2B Section - Business Customers */}
              <div className="bg-[#FFFBEB] border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
                <div className="text-xs font-extrabold text-[#7D0A14] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#7D0A14]" />
                  <span>B2B Section – Business Customers</span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 flex-1 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-[#1E2544]">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-black text-sm text-[#1E2544]">124</div>
                        <div className="text-[10px] text-slate-500 font-semibold">B2B Customers</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-[#1E2544]">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1E2544]">Wholesale Price Lists</div>
                        <div className="text-[10px] text-slate-500">Manage B2B Pricing</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-[#1E2544]">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1E2544]">Min. Order Quantity</div>
                        <div className="text-[10px] text-slate-500">Set MOQ Rules</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-[#1E2544]">
                        <Handshake className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1E2544]">Credit / Payment Terms</div>
                        <div className="text-[10px] text-slate-500">Net 30 / Net 45</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-[#1E2544]">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1E2544]">GST / Business Details</div>
                        <div className="text-[10px] text-slate-500">Manage Business Info</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('b2b-customers')}
                    className="px-5 py-2.5 rounded-xl bg-[#1E2544] hover:bg-[#0F172A] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 active:scale-95"
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
                    {(activeTab === 'b2c-customers' || activeTab === 'b2b-customers' || activeTab === 'customers') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* 1. Header Section matching Screenshot */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 shadow-2xs">
                    <Users className="w-7 h-7 text-amber-500 fill-amber-500/30" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#5A070E] tracking-tight">
                      Customer Management
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                      View and manage your customers easily
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={clearAllCustomers}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                    title="Reset to standard reference customers"
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

              {/* 2. Top 4 KPI Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Customers */}
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

                {/* B2C Customers */}
                <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F59E0B] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <User className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                      {b2cCustomerCount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs font-bold text-slate-500 mt-0.5">
                      B2C Customers
                    </div>
                  </div>
                  <User className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                </div>

                {/* B2B Customers */}
                <div className="bg-white rounded-2xl border border-[#EDE1D1] p-4 sm:p-5 shadow-xs relative overflow-hidden flex items-center gap-3.5 sm:gap-4 transition-all hover:shadow-sm">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#5A070E] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
                      {b2bCustomerCount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs font-bold text-slate-500 mt-0.5">
                      B2B Customers
                    </div>
                  </div>
                  <Building2 className="w-16 h-16 text-slate-100 absolute -right-3 -bottom-3 pointer-events-none opacity-50" />
                </div>

                {/* Active Customers */}
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
              </div>

              {/* 3. Scope Segment Switcher */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <div className="inline-flex p-1 bg-white rounded-full border border-[#EDE1D1] shadow-2xs">
                  <button
                    onClick={() => {
                      setCustomerScope(customerScope === 'b2c' ? 'all' : 'b2c');
                      setCustomerPage(1);
                    }}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      customerScope === 'b2c'
                        ? 'bg-[#5A070E] text-white shadow-xs'
                        : 'text-[#5A070E] hover:bg-[#FAF5EC]'
                    }`}
                  >
                    B2C Customers (Individual)
                  </button>
                  <button
                    onClick={() => {
                      setCustomerScope(customerScope === 'b2b' ? 'all' : 'b2b');
                      setCustomerPage(1);
                    }}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      customerScope === 'b2b'
                        ? 'bg-[#5A070E] text-white shadow-xs'
                        : 'text-[#5A070E] hover:bg-[#FAF5EC]'
                    }`}
                  >
                    B2B Customers (Business)
                  </button>
                  <button
                    onClick={() => {
                      setCustomerScope('all');
                      setCustomerPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      customerScope === 'all'
                        ? 'bg-[#5A070E] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-[#FAF5EC]'
                    }`}
                  >
                    All Customers
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
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAF5EC] border-b border-[#EDE1D1]">
                        <th className="py-3.5 px-4 sm:px-6 text-xs font-bold text-slate-800 tracking-wider">
                          Customer Name
                        </th>
                        <th className="py-3.5 px-4 text-xs font-bold text-slate-800 tracking-wider">
                          Type
                        </th>
                        <th className="py-3.5 px-4 text-xs font-bold text-slate-800 tracking-wider">
                          Phone
                        </th>
                        <th className="py-3.5 px-4 text-xs font-bold text-slate-800 tracking-wider">
                          Email
                        </th>
                        <th className="py-3.5 px-4 text-center text-xs font-bold text-slate-800 tracking-wider">
                          Orders
                        </th>
                        <th className="py-3.5 px-4 text-xs font-bold text-slate-800 tracking-wider">
                          Total Spent
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
                          <td colSpan="8" className="py-12 text-center text-slate-500 text-sm">
                            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                            No matching customers found. Try clearing filters or searching another keyword.
                          </td>
                        </tr>
                      ) : (
                        filteredCustomers.map((c) => {
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

                              {/* Type Badge */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                {c.isBusiness ? (
                                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#FEF3C7] text-[#92400E] border border-amber-200">
                                    B2B
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#FEE2E2]/70 text-[#991B1B] border border-rose-200">
                                    B2C
                                  </span>
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
              <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm font-semibold text-slate-600">
                  Showing 1 – {filteredCustomers.length} of {totalCustomerCount.toLocaleString('en-IN')} customers
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCustomerPage((p) => Math.max(1, p - 1))}
                    disabled={customerPage === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCustomerPage(1)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                      customerPage === 1
                        ? 'bg-[#5A070E] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    1
                  </button>
                  <button
                    onClick={() => setCustomerPage(2)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                      customerPage === 2
                        ? 'bg-[#5A070E] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    2
                  </button>
                  <button
                    onClick={() => setCustomerPage(3)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                      customerPage === 3
                        ? 'bg-[#5A070E] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    3
                  </button>
                  <span className="px-1 text-slate-400 font-bold text-xs">...</span>
                  <button
                    onClick={() => setCustomerPage(568)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                      customerPage === 568
                        ? 'bg-[#5A070E] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    568
                  </button>
                  <button
                    onClick={() => setCustomerPage((p) => Math.min(568, p + 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
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
          {(activeTab === 'delivery' || activeTab === 'subscriptions') && (
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
                    <span>+ Add Product SKU</span>
                  </button>
                </div>
              </div>

              {/* Inventory Quick KPI Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1]">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Total SKUs</span>
                  <div className="text-xl font-black text-[#3D040A] mt-0.5">{inventoryList.length} Items</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
                  <span className="text-[10px] font-bold text-emerald-700 block uppercase">In Stock (Active)</span>
                  <div className="text-xl font-black text-emerald-800 mt-0.5">
                    {inventoryList.filter((p) => p.inStock).length} SKUs
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/60">
                  <span className="text-[10px] font-bold text-rose-700 block uppercase">Out of Stock</span>
                  <div className="text-xl font-black text-rose-800 mt-0.5">
                    {inventoryList.filter((p) => !p.inStock).length} SKUs
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
                    placeholder="Search SKU by name, category, stock..."
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

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAF5EC] text-slate-600 font-extrabold border-b border-[#EDE1D1]">
                      <th className="p-3 rounded-l-xl">Product & Category</th>
                      <th className="p-3">Current Stock</th>
                      <th className="p-3">B2C Retail Price</th>
                      <th className="p-3">B2B Wholesale Price</th>
                      <th className="p-3">Wholesale MOQ</th>
                      <th className="p-3 text-right">Stock Status</th>
                      <th className="p-3 rounded-r-xl text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {inventoryList
                      .filter((prod) => {
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
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setEditingProduct({ ...prod })}
                              className="p-1.5 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 transition-colors shadow-2xs"
                              title="Edit product details & prices"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors shadow-2xs"
                              title="Delete SKU from catalog"
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
                        className="p-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
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
          {activeTab === 'content' && (
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
      {/* EDIT PRODUCT SKU MODAL                                        */}
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
                  Edit SKU: {editingProduct.name}
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Dairy">Dairy</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Staples">Staples</option>
                    <option value="Oils & Ghee">Oils & Ghee</option>
                    <option value="Bakery">Bakery</option>
                  </select>
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
                  <label className="font-bold text-slate-700 block mb-1">Wholesale MOQ</label>
                  <input
                    type="text"
                    value={editingProduct.moq}
                    onChange={(e) => setEditingProduct({ ...editingProduct, moq: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. 20L / 15kg Tin"
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
                  <span>Save SKU Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ADD NEW PRODUCT SKU MODAL                                     */}
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
                  Add New Product SKU
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                  >
                    <option value="Dairy">Dairy</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Staples">Staples</option>
                    <option value="Oils & Ghee">Oils & Ghee</option>
                    <option value="Bakery">Bakery</option>
                  </select>
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
                    placeholder="Auto-calculated (25% off)"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Wholesale MOQ</label>
                  <input
                    type="text"
                    value={newProductForm.moq}
                    onChange={(e) => setNewProductForm({ ...newProductForm, moq: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold"
                    placeholder="e.g. 20 Litres"
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
                  <span>Create SKU</span>
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

    </div>
  );
};
