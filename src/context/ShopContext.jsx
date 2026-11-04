import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as rawCatalogProducts, categories as rawCatalogCategories } from '../data/products';

const ShopContext = createContext();

// Cross-tab real-time communication channel for instant Storefront <-> Admin sync
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('sumadhura_sync_channel')
  : null;


const normalizeProduct = (item, idx = 0) => {
  const retailPrice = Number(item.retailPrice ?? item.price ?? 0);
  const wholesalePrice = Number(item.wholesalePrice ?? Math.round(retailPrice * 0.75));
  const categoryName = item.category || 'Dairy Products';
  const slug = (item.slug || categoryName).toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const categoryImages = {
    dairy: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    vegetables: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    fruits: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
    groceries: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    staples: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    dishes: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    snacks: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
    munchies: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80',
    oils: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    masalas: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
  };

  const matchedCatKey = Object.keys(categoryImages).find((k) => slug.includes(k)) || 'groceries';
  const fallbackImage = categoryImages[matchedCatKey];

  return {
    ...item,
    id: item.id || ('p-custom-' + idx + '-' + Date.now()),
    name: item.name || 'Fresh Item',
    category: categoryName,
    subCategory: item.subCategory || 'Daily Fresh',
    price: retailPrice,
    retailPrice: retailPrice,
    originalPrice: Number(item.originalPrice) || Math.round(retailPrice * 1.25),
    unit: item.retailUnit || item.unit || 'Per Unit',
    retailUnit: item.retailUnit || item.unit || 'Per Unit',
    wholesalePrice: wholesalePrice,
    wholesaleUnit: item.wholesaleUnit || 'Bulk Pack',
    moq: item.moq || '1 Unit',
    stock: item.stock || '50 Units',
    rating: item.rating || 4.9,
    reviewsCount: item.reviewsCount || 1,
    badge: item.badge || 'Fresh',
    deliveryTime: item.deliveryTime || '10-15 mins',
    isVeg: item.isVeg !== undefined ? item.isVeg : true,
    image: item.image && String(item.image).startsWith('http') ? item.image : fallbackImage,
    description: item.description || (item.name || 'Fresh farm-direct product') + ' delivered fresh within 10-15 minutes.',
    organic: item.organic !== undefined ? item.organic : true,
    inStock: item.inStock !== undefined ? item.inStock : true,
    tags: Array.isArray(item.tags) ? item.tags : ['fresh', 'popular', slug],
    aisles: Array.isArray(item.aisles) && item.aisles.length > 0 ? item.aisles : [slug, 'all', categoryName.toLowerCase()]
  };
};

export const ShopProvider = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_cart');
      return saved ? JSON.parse(saved) : [
        { ...rawCatalogProducts[0], quantity: 2 }, // Nandini Cow Milk default
        { ...rawCatalogProducts[6], quantity: 1 }, // Farm Fresh Tomatoes default
      ];
    } catch {
      return [];
    }
  });


  // Dynamic Products and Categories synced with Admin & LocalStorage
  const [customProducts, setCustomProducts] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('sumadhura_custom_products');
      const customList = savedCustom ? JSON.parse(savedCustom) : [];
      const savedInv = localStorage.getItem('sumadhura_admin_inventory');
      const invList = savedInv ? JSON.parse(savedInv) : [];

      const map = new Map();
      customList.forEach((p, idx) => map.set(p.id, normalizeProduct(p, idx)));
      invList.forEach((p, idx) => {
        if (!map.has(p.id)) map.set(p.id, normalizeProduct(p, idx));
      });
      return Array.from(map.values());
    } catch {
      return [];
    }
  });

  const [customCategories, setCustomCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_admin_categories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const allProducts = React.useMemo(() => {
    const map = new Map();
    rawCatalogProducts.forEach((p, idx) => {
      map.set(p.id, normalizeProduct(p, idx));
    });
    customProducts.forEach((p, idx) => {
      map.set(p.id, normalizeProduct(p, idx));
    });
    return Array.from(map.values());
  }, [customProducts]);

  const allCategories = React.useMemo(() => {
    const map = new Map();
    rawCatalogCategories.forEach((c) => map.set(c.name.toLowerCase(), c));
    if (Array.isArray(customCategories)) {
      customCategories.forEach((c) => {
        if (!c || !c.name) return;
        const key = c.name.toLowerCase();
        if (!map.has(key)) {
          map.set(key, {
            id: c.id || ('cat-' + (c.slug || key)),
            name: c.name,
            slug: c.slug || key.replace(/[^a-z0-9]+/g, '-'),
            description: c.description || (c.name + ' fresh products'),
            image: c.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
            itemCount: 'Fresh Daily',
            deliveryTime: '10-15 mins',
            icon: 'ShoppingBasket',
            subCategories: c.subCategories || ['General'],
            color: 'from-amber-600/20 to-amber-800/40',
            badgeColor: 'bg-[#7D0A14] text-white',
            cardBorder: 'hover:border-[#7D0A14]',
            featured: c.featured !== undefined ? c.featured : true,
            active: c.active !== undefined ? c.active : true,
            emoji: c.emoji || '🛒'
          });
        } else {
          const existing = map.get(key);
          map.set(key, { ...existing, ...c });
        }
      });
    }
    return Array.from(map.values()).filter((c) => c.active !== false);
  }, [customCategories]);

  // Listen to cross-tab & admin changes
  useEffect(() => {
    const handleSync = (e) => {
      const data = e.data || {};
      if (
        data.type === 'PRODUCTS_UPDATED' ||
        e.key === 'sumadhura_custom_products' ||
        e.key === 'sumadhura_admin_inventory'
      ) {
        try {
          const savedCustom = localStorage.getItem('sumadhura_custom_products');
          const customList = savedCustom ? JSON.parse(savedCustom) : [];
          const savedInv = localStorage.getItem('sumadhura_admin_inventory');
          const invList = savedInv ? JSON.parse(savedInv) : [];
          const map = new Map();
          customList.forEach((p, idx) => map.set(p.id, normalizeProduct(p, idx)));
          invList.forEach((p, idx) => {
            if (!map.has(p.id)) map.set(p.id, normalizeProduct(p, idx));
          });
          setCustomProducts(Array.from(map.values()));
        } catch {}
      }
      if (data.type === 'CATEGORIES_UPDATED' || e.key === 'sumadhura_admin_categories') {
        try {
          const saved = localStorage.getItem('sumadhura_admin_categories');
          if (saved) setCustomCategories(JSON.parse(saved));
        } catch {}
      }
    };

    if (syncChannel) {
      syncChannel.onmessage = handleSync;
    }
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const addProduct = (newProd) => {
    const normalized = normalizeProduct(newProd, customProducts.length);
    setCustomProducts((prev) => {
      const updated = [normalized, ...prev.filter((p) => p.id !== normalized.id)];
      try {
        localStorage.setItem('sumadhura_custom_products', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    if (syncChannel) {
      syncChannel.postMessage({ type: 'PRODUCTS_UPDATED' });
    }
  };

  const deleteProduct = (prodId) => {
    setCustomProducts((prev) => {
      const updated = prev.filter((p) => p.id !== prodId);
      try {
        localStorage.setItem('sumadhura_custom_products', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    if (syncChannel) {
      syncChannel.postMessage({ type: 'PRODUCTS_UPDATED' });
    }
  };

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_wishlist');
      return saved ? JSON.parse(saved) : [rawCatalogProducts[1].id, rawCatalogProducts[8].id];
    } catch {
      return [];
    }
  });

  // User state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Active navigation view: 'home' | 'categories' | 'services' | 'wishlist' | 'cart' | 'login'
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Service Mode: 'grocery' (10-15m grocery) | 'food' (kitchen meals) | 'genie' (custom courier)
  const [serviceMode, setServiceMode] = useState('grocery');

  // Pricing Mode: strictly 'wholesale' ONLY FOR VERIFIED B2B LOGIN
  // If user is not logged in or is not a business account, always 'retail'
  const [pricingMode, setPricingModeState] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sumadhura_user');
      if (savedUser && JSON.parse(savedUser)?.isBusiness) return 'wholesale';
    } catch {}
    return 'retail';
  });

  // Keep pricingMode strictly in sync with user login state
  useEffect(() => {
    if (user?.isBusiness) {
      setPricingModeState('wholesale');
    } else {
      setPricingModeState('retail');
    }
  }, [user]);

  const setPricingMode = (mode) => {
    if (mode === 'wholesale' && (!user || !user.isBusiness)) {
      setAuthModalTab('business');
      setIsAuthModalOpen(true);
      showToast('🔒 B2B Login Required: Please login with a verified Business account to access wholesale rates', 'info');
      return;
    }
    setPricingModeState(mode);
    try {
      localStorage.setItem('sumadhura_pricing_mode', mode);
    } catch {}

    // Dynamically update existing cart item prices to match selected pricing rate
    setCart((prevCart) =>
      prevCart.map((item) => {
        const prod = allProducts.find((p) => p.id === item.id) || item;
        const newPrice = mode === 'wholesale' ? (prod.wholesalePrice || Math.round(prod.price * 0.74)) : prod.price;
        const newUnit = mode === 'wholesale' ? (prod.wholesaleUnit || prod.unit) : prod.unit;
        const newQty = mode === 'wholesale' ? Math.max(5, item.quantity) : item.quantity;
        return {
          ...item,
          price: newPrice,
          unit: newUnit,
          quantity: newQty,
          isWholesale: mode === 'wholesale'
        };
      })
    );

    showToast(
      mode === 'wholesale'
        ? '🏢 B2B Wholesale Rates Active! Up to 35% bulk savings applied across all products'
        : '🛍️ B2C Retail Rates Active'
    );
  };

  const togglePricingMode = () => {
    if (!user || !user.isBusiness) {
      setAuthModalTab('business');
      setIsAuthModalOpen(true);
      showToast('🔒 B2B Login Required: Login with your business account to unlock wholesale rates', 'info');
      return;
    }
    setPricingMode(pricingMode === 'wholesale' ? 'retail' : 'wholesale');
  };

  // Sumadhura VIP Membership
  const [isOneMember, setIsOneMember] = useState(() => {
    try {
      return localStorage.getItem('sumadhura_one') === 'true';
    } catch {
      return true; // Activated by default to showcase VIP benefits!
    }
  });

  // Cart Extras: Tips, Instructions, No Contact
  const [deliveryPartnerTip, setDeliveryPartnerTip] = useState(0);
  const [noContactDelivery, setNoContactDelivery] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState(['dont-ring-bell']);

  // Active Order for Live Order Tracking simulation
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLiveTrackingOpen, setIsLiveTrackingOpen] = useState(false);

  // Persistent Orders for Real Logged-in Customers (Zero Fake Orders)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        const fakeKeywords = [
          'priya sharma',
          'vikram reddy',
          'ananya rao',
          'sri krishna grand',
          'spice valley',
          'royal orchid',
          'deepak verma',
          'rajesh sharma',
          'ramesh kumar',
          'sri sai traders',
          'lakshmi devi',
          'vijaya mart',
          'mahesh reddy',
          'ravi kumar',
          'sneha reddy',
          'sri venkateshwara',
          'svfoods',
          'prakash rao',
          'andromeda',
          'b2b-smd-99104',
          'b2b-smd-98842',
          'smd-739201',
          'smd-684192',
          '#mnk10045',
          '#mnk10044',
          '#mnk10043',
          '#mnk10042',
          '#mnk10041'
        ];
        return parsed.filter((o) => {
          const cust = (o.customer || '').toLowerCase();
          const comp = (o.companyName || '').toLowerCase();
          const id = (o.id || '').toLowerCase();
          return !fakeKeywords.some((fk) => cust.includes(fk) || comp.includes(fk) || id.includes(fk));
        });
      }
      return [];
    } catch {
      return [];
    }
  });

  const addOrder = (newOrder) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev.filter((o) => o.id !== newOrder.id)];
      try {
        localStorage.setItem('sumadhura_orders', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setActiveOrder(newOrder);
  };

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_subscription');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persistent Subscriptions for Real Logged-in Customers (Zero Fake Subscriptions)
  const [subscriptions, setSubscriptions] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_subscriptions');
      if (saved) {
        const parsed = JSON.parse(saved);
        const fakeKeywords = [
          'rajesh sharma',
          'sunita venkatesh',
          'karthik balan',
          'deepa kulkarni',
          'sub-101',
          'sub-102',
          'sub-103',
          'sub-104'
        ];
        return parsed.filter((s) => {
          const cust = (s.customer || '').toLowerCase();
          const id = (s.id || '').toLowerCase();
          return !fakeKeywords.some((fk) => cust.includes(fk) || id.includes(fk));
        });
      }
      return [];
    } catch {
      return [];
    }
  });

  const addSubscription = (newSub) => {
    setSubscriptions((prev) => {
      const updated = [newSub, ...prev.filter((s) => s.id !== newSub.id)];
      try {
        localStorage.setItem('sumadhura_subscriptions', JSON.stringify(updated));
        localStorage.setItem('sumadhura_subscription', JSON.stringify(newSub));
      } catch {}
      return updated;
    });
    setActiveSubscription(newSub);

    // Sync customer record into sumadhura_registered_customers
    try {
      const savedCusts = localStorage.getItem('sumadhura_registered_customers');
      let custs = savedCusts ? JSON.parse(savedCusts) : [];
      const matchIdx = custs.findIndex(c => 
        (newSub.email && c.email === newSub.email) || 
        (newSub.phone && c.phone === newSub.phone) ||
        (newSub.customer && c.name === newSub.customer)
      );
      if (matchIdx >= 0) {
        custs[matchIdx] = {
          ...custs[matchIdx],
          subscription: newSub.items,
          subscriptionId: newSub.id,
          subscriptionStatus: 'Active',
          status: 'Active',
          totalSpent: (custs[matchIdx].totalSpent || 0) + (newSub.totalPaid || 0),
          ordersCount: (custs[matchIdx].ordersCount || 0) + 1
        };
      } else {
        custs.unshift({
          id: `CUST-B2C-${Date.now()}`,
          name: newSub.customer || 'Customer',
          phone: newSub.phone || '',
          email: newSub.email || '',
          type: newSub.isBusiness ? 'B2B' : 'B2C',
          isBusiness: Boolean(newSub.isBusiness),
          subscription: newSub.items,
          subscriptionId: newSub.id,
          status: 'Active',
          totalSpent: newSub.totalPaid || 0,
          ordersCount: 1,
          registeredAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        });
      }
      localStorage.setItem('sumadhura_registered_customers', JSON.stringify(custs));
    } catch {}

    // Broadcast live event across all open tabs (Instant Admin UI update)
    try {
      if (syncChannel) {
        syncChannel.postMessage({ type: 'SUBSCRIPTION_ADDED', newSub });
      }
    } catch {}
  };

  const toggleSubscriptionStatus = (subId) => {
    let nextStatus = 'Active';
    setSubscriptions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === subId) {
          nextStatus = s.status === 'Active' ? 'Paused' : 'Active';
          return { ...s, status: nextStatus };
        }
        return s;
      });
      try {
        localStorage.setItem('sumadhura_subscriptions', JSON.stringify(updated));
        const matched = updated.find((s) => s.id === subId);
        if (matched && activeSubscription && activeSubscription.id === subId) {
          setActiveSubscription(matched);
          localStorage.setItem('sumadhura_subscription', JSON.stringify(matched));
        }
      } catch {}
      return updated;
    });

    try {
      if (syncChannel) {
        syncChannel.postMessage({ type: 'SUBSCRIPTION_STATUS_CHANGED', subId, nextStatus });
      }
    } catch {}
  };

  const cancelSubscription = (subId) => {
    setSubscriptions((prev) => {
      const updated = prev.filter((s) => s.id !== subId);
      try {
        localStorage.setItem('sumadhura_subscriptions', JSON.stringify(updated));
        if (activeSubscription && activeSubscription.id === subId) {
          setActiveSubscription(null);
          localStorage.removeItem('sumadhura_subscription');
        }
      } catch {}
      return updated;
    });

    try {
      if (syncChannel) {
        syncChannel.postMessage({ type: 'SUBSCRIPTION_CANCELLED', subId });
      }
    } catch {}
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => {
      const updated = prev.filter((o) => o.id !== orderId);
      try {
        localStorage.setItem('sumadhura_orders', JSON.stringify(updated));
        if (activeOrder && activeOrder.id === orderId) {
          setActiveOrder(null);
          localStorage.removeItem('sumadhura_active_order');
        }
      } catch {}
      return updated;
    });
  };

  // Saved Addresses (Hyderabad default matching Sumadhura Caterers reference)
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-hyd',
      tag: 'Hyderabad',
      title: 'Madhapur / Hitec City',
      area: 'Hyderabad, Telangana',
      pincode: '500081',
      isDefault: true
    },
    {
      id: 'addr-1',
      tag: 'Home',
      title: 'Flat 402, Green Meadows',
      area: '5th Block, Koramangala, Bengaluru',
      pincode: '560034',
      isDefault: false
    },
    {
      id: 'addr-2',
      tag: 'Work',
      title: 'Tower B, RMZ Ecoworld',
      area: 'Outer Ring Road, Bellandur, Bengaluru',
      pincode: '560103',
      isDefault: false
    }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // Toasts
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('sumadhura_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sumadhura_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('sumadhura_one', isOneMember ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isOneMember]);

  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('sumadhura_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('sumadhura_active_order');
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeOrder]);

  useEffect(() => {
    try {
      if (activeSubscription) {
        localStorage.setItem('sumadhura_subscription', JSON.stringify(activeSubscription));
      } else {
        localStorage.removeItem('sumadhura_subscription');
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeSubscription]);

  useEffect(() => {
    try {
      localStorage.setItem('sumadhura_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('sumadhura_subscriptions', JSON.stringify(subscriptions));
    } catch (e) {
      console.error(e);
    }
  }, [subscriptions]);

  // Real-time synchronization across browser tabs (Admin <-> Storefront)
  useEffect(() => {
    const reloadFromStorage = () => {
      try {
        const subs = localStorage.getItem('sumadhura_subscriptions');
        if (subs) setSubscriptions(JSON.parse(subs));
        const actSub = localStorage.getItem('sumadhura_subscription');
        if (actSub) setActiveSubscription(JSON.parse(actSub));
        const ords = localStorage.getItem('sumadhura_orders');
        if (ords) setOrders(JSON.parse(ords));
        const usr = localStorage.getItem('sumadhura_user');
        if (usr) setUser(JSON.parse(usr));
      } catch {}
    };

    const handleStorage = (e) => {
      if (e.key === 'sumadhura_subscriptions') {
        try {
          setSubscriptions(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {}
      }
      if (e.key === 'sumadhura_subscription') {
        try {
          setActiveSubscription(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {}
      }
      if (e.key === 'sumadhura_orders') {
        try {
          setOrders(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {}
      }
      if (e.key === 'sumadhura_user') {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {}
      }
    };

    if (syncChannel) {
      syncChannel.onmessage = () => {
        reloadFromStorage();
      };
    }

    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', reloadFromStorage);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') reloadFromStorage();
    });

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', reloadFromStorage);
    };
  }, []);

  const toggleOneMember = () => {
    setIsOneMember((prev) => {
      const next = !prev;
      showToast(next ? 'Sumadhura VIP Activated! Enjoy FREE Delivery on all orders 🎉' : 'Sumadhura VIP Deactivated', 'info');
      return next;
    });
  };

  const toggleDeliveryInstruction = (tag) => {
    setDeliveryInstructions((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Toast helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };


  // Helper to extract minimum required B2B order quantity (minimum 5)
  const getProductMinOrderQty = (product) => {
    if (!product) return 5;
    if (product.moq) {
      const match = String(product.moq).match(/\d+/);
      if (match) {
        const parsed = parseInt(match[0], 10);
        if (!isNaN(parsed) && parsed > 0) return Math.max(5, parsed);
      }
    }
    return 5;
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    const isWholesale = Boolean((user && user.isBusiness) || pricingMode === 'wholesale');
    const minQty = isWholesale ? getProductMinOrderQty(product) : 1;
    const finalQuantity = isWholesale && quantity === 1 ? minQty : Math.max(isWholesale ? minQty : 1, quantity);
    const activePrice = isWholesale
      ? product.wholesalePrice || Math.round(product.price * 0.74)
      : product.price;
    const activeUnit = isWholesale
      ? product.wholesaleUnit || product.unit
      : product.unit;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        const addedQty = isWholesale && quantity === 1 ? minQty : quantity;
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, price: activePrice, unit: activeUnit, quantity: item.quantity + addedQty }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...product,
          price: activePrice,
          unit: activeUnit,
          retailPrice: product.price,
          wholesalePrice: product.wholesalePrice || Math.round(product.price * 0.74),
          isWholesale,
          quantity: finalQuantity
        }
      ];
    });
    showToast(
      isWholesale
        ? `Added ${product.name} (B2B Min. ${finalQuantity} units • ₹${activePrice}/unit)`
        : `Added ${product.name} to cart!`
    );
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      const targetItem = prevCart.find((i) => i.id === productId);
      if (!targetItem) return prevCart;

      const isWholesale = Boolean(targetItem.isWholesale || pricingMode === 'wholesale' || (user && user.isBusiness));
      const minQty = isWholesale ? getProductMinOrderQty(targetItem) : 1;
      const newQty = targetItem.quantity + delta;

      if (isWholesale && delta < 0 && newQty < minQty) {
        showToast(`⚠️ B2B Wholesale requires a minimum order of ${minQty} units for ${targetItem.name}`, 'warning');
        return prevCart;
      }

      return prevCart
        .map((item) => {
          if (item.id === productId) {
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prevCart) => prevCart.filter((i) => i.id !== productId));
    if (item) {
      showToast(`Removed ${item.name} from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setDeliveryPartnerTip(0);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    if (wishlist.includes(product.id)) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed ${product.name} from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product.id]);
      showToast(`Saved ${product.name} to wishlist! ❤️`);
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const moveToCartFromWishlist = (product) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
  };

  // Promo Code calculation
  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SUMADHURA50' || clean === 'FRESH50') {
      if (cartSubtotal < 199) {
        setPromoError('Minimum order of ₹199 required for this coupon');
        return false;
      }
      setAppliedPromo({ code: clean, discountAmount: 50, desc: '₹50 Flat Off' });
      setPromoError('');
      showToast(`Coupon applied: ₹50 saved! 🎉`);
      return true;
    } else if (clean === 'SUMADHURA10' || clean === 'SUMADHURAVIP') {
      const discount = Math.round(cartSubtotal * 0.15);
      setAppliedPromo({ code: clean, discountAmount: discount, desc: '15% Member Discount' });
      setPromoError('');
      showToast(`Coupon applied: ₹${discount} saved! 🎉`);
      return true;
    } else {
      setPromoError('Invalid coupon code. Try SUMADHURA50, FRESH50 or SUMADHURAVIP');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError('');
    showToast('Coupon removed', 'info');
  };

  // Bill Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWholesaleSavings = cart.reduce((sum, item) => {
    const retailP = item.retailPrice || (item.wholesalePrice ? Math.round(item.wholesalePrice / 0.74) : item.price);
    const saved = Math.max(0, retailP - item.price);
    return sum + Math.round(saved * item.quantity);
  }, 0);
  const platformFee = cart.length > 0 ? 5 : 0; // Standard packaging & handling fee
  
  // Free delivery logic: If VIP Member & subtotal >= 99 -> FREE! Else standard rules
  const isEligibleForFreeDelivery = isOneMember ? cartSubtotal >= 99 : cartSubtotal >= 299;
  const deliveryFee = cartSubtotal === 0 ? 0 : isEligibleForFreeDelivery ? 0 : 25;
  const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
  
  // Total
  const cartTotal = Math.max(
    0,
    cartSubtotal + deliveryFee + platformFee + deliveryPartnerTip - discountAmount
  );
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Save customer to persistent real customer registry
  const saveCustomerToRegistry = (userData) => {
    if (!userData) return;
    try {
      const saved = localStorage.getItem('sumadhura_registered_customers');
      let list = saved ? JSON.parse(saved) : [];
      const email = userData.email || '';
      const phone = userData.phone || '';
      const isShop = Boolean(userData.isBusiness || userData.customerType === 'Shopkeeper');
      const idx = list.findIndex(
        (c) => (email && c.email === email) || (phone && c.phone === phone)
      );
      const record = {
        id: userData.id || `CUST-${isShop ? 'SHOP' : 'DAILY'}-${Math.floor(100 + Math.random() * 900)}`,
        name: userData.name || (isShop ? userData.companyName : 'Customer'),
        email,
        phone,
        isBusiness: isShop,
        customerType: isShop ? 'Shopkeeper' : 'Daily Customer',
        companyName: userData.companyName || null,
        gstin: userData.gstin || null,
        businessType: userData.businessType || (isShop ? 'Kirana & General Store' : null),
        registeredAt: userData.registeredAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        lastLogin: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'Active'
      };
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...record };
      } else {
        list.unshift(record);
      }
      localStorage.setItem('sumadhura_registered_customers', JSON.stringify(list));
      try {
        const channel = new BroadcastChannel('sumadhura_sync_channel');
        channel.postMessage({ type: 'SYNC_CUSTOMERS', data: list });
        channel.close();
      } catch (err) {}
    } catch (e) {
      console.error(e);
    }
  };

  // Sync current user into registry on boot
  useEffect(() => {
    if (user) {
      saveCustomerToRegistry(user);
    }
  }, [user]);

  // User auth simulation
  const login = (userData) => {
    // Check if customer already exists in registry to preserve shopkeeper/customer type
    let resolvedData = { ...userData };
    try {
      const saved = localStorage.getItem('sumadhura_registered_customers');
      if (saved) {
        const list = JSON.parse(saved);
        const match = list.find(
          (c) =>
            (userData.email && c.email === userData.email) ||
            (userData.phone && c.phone === userData.phone)
        );
        if (match) {
          resolvedData = {
            ...match,
            ...userData,
            isBusiness: match.isBusiness ?? userData.isBusiness,
            customerType: match.customerType ?? (match.isBusiness ? 'Shopkeeper' : 'Daily Customer'),
            companyName: match.companyName || userData.companyName,
            businessType: match.businessType || userData.businessType
          };
        }
      }
    } catch (e) {}

    const isShop = Boolean(resolvedData.isBusiness || resolvedData.customerType === 'Shopkeeper');
    resolvedData.isBusiness = isShop;
    resolvedData.customerType = isShop ? 'Shopkeeper' : 'Daily Customer';

    setUser(resolvedData);
    try {
      localStorage.setItem('sumadhura_user', JSON.stringify(resolvedData));
    } catch (e) {
      console.error(e);
    }
    saveCustomerToRegistry(resolvedData);
    if (isShop) {
      setPricingMode('wholesale');
    }
    setIsAuthModalOpen(false);
    showToast(
      isShop
        ? `Welcome, ${resolvedData.companyName || resolvedData.name}! Shopkeeper Wholesale Portal Active 🏪`
        : `Welcome back, ${resolvedData.name}! 🌟`
    );
  };

  const logout = () => {
    setUser(null);
    setPricingModeState('retail');
    try {
      localStorage.removeItem('sumadhura_user');
      localStorage.setItem('sumadhura_pricing_mode', 'retail');
    } catch (e) {
      console.error(e);
    }
    // Revert existing cart items to retail rates
    setCart((prevCart) =>
      prevCart.map((item) => {
        const prod = allProducts.find((p) => p.id === item.id) || item;
        return {
          ...item,
          price: prod.price,
          unit: prod.unit,
          isWholesale: false
        };
      })
    );
    showToast('Logged out successfully', 'info');
  };

  const navigateTo = (tab, category = null) => {
    setActiveTab(tab);
    if (category) {
      setSelectedCategoryFilter(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        user,
        activeTab,
        selectedCategoryFilter,
        searchQuery,
        serviceMode,
        isOneMember,
        deliveryPartnerTip,
        noContactDelivery,
        deliveryInstructions,
        activeOrder,
        orders,
        setOrders,
        addOrder,
        isLiveTrackingOpen,
        isCartOpen,
        isLocationModalOpen,
        isAuthModalOpen,
        authModalTab,
        quickViewProduct,
        isCheckoutModalOpen,
        savedAddresses,
        selectedAddress,
        appliedPromo,
        promoError,
        toasts,
        cartSubtotal,
        platformFee,
        deliveryFee,
        discountAmount,
        cartTotal,
        totalCartCount,
        pricingMode,
        totalWholesaleSavings,
        // actions
        setPricingMode,
        togglePricingMode,
        setActiveTab,
        setSelectedCategoryFilter,
        setSearchQuery,
        setServiceMode,
        toggleOneMember,
        setDeliveryPartnerTip,
        setNoContactDelivery,
        toggleDeliveryInstruction,
        setActiveOrder,
        setIsLiveTrackingOpen,
        setIsCartOpen,
        setIsLocationModalOpen,
        setIsAuthModalOpen,
        setAuthModalTab,
        setQuickViewProduct,
        setIsCheckoutModalOpen,
        isSubscriptionModalOpen,
        setIsSubscriptionModalOpen,
        activeSubscription,
        setActiveSubscription,
        subscriptions,
        setSubscriptions,
        addSubscription,
        toggleSubscriptionStatus,
        cancelSubscription,
        deleteOrder,
        setSelectedAddress,
        setSavedAddresses,
        showToast,
        removeToast,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        applyPromoCode,
        removePromoCode,
        login,
        logout,
        navigateTo,
        products: allProducts,
        categories: allCategories,
        addProduct,
        deleteProduct,
        customCategories,
        setCustomCategories,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
