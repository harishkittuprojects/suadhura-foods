import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_cart');
      return saved ? JSON.parse(saved) : [
        { ...products[0], quantity: 2 }, // Nandini Cow Milk default
        { ...products[6], quantity: 1 }, // Farm Fresh Tomatoes default
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_wishlist');
      return saved ? JSON.parse(saved) : [products[1].id, products[8].id];
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

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Added ${product.name} to cart!`);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
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

  // User auth simulation
  const login = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${userData.name}! 🌟`);
  };

  const logout = () => {
    setUser(null);
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
        // actions
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
