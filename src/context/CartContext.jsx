import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_ORDERS } from '../data/foodData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User State (Persisted in localStorage)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Orders State (Persisted in localStorage)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_orders');
      return saved ? JSON.parse(saved) : SAMPLE_ORDERS;
    } catch {
      return SAMPLE_ORDERS;
    }
  });

  // Location State
  const [deliveryLocation, setDeliveryLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('sumadhura_location');
      return saved ? JSON.parse(saved) : {
        area: "Jubilee Hills",
        city: "Hyderabad",
        pincode: "500033",
        slot: "Tomorrow Morning 6:00 AM - 7:30 AM"
      };
    } catch {
      return {
        area: "Jubilee Hills",
        city: "Hyderabad",
        pincode: "500033",
        slot: "Tomorrow Morning 6:00 AM - 7:30 AM"
      };
    }
  });

  // UI Modals & Drawers
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code: 'SUMADHURA10', discountPct: 10 }
  const [toastMessage, setToastMessage] = useState(null);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem('sumadhura_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist User
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('sumadhura_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('sumadhura_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Persist Orders
  useEffect(() => {
    try {
      localStorage.setItem('sumadhura_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Persist Location
  useEffect(() => {
    try {
      localStorage.setItem('sumadhura_location', JSON.stringify(deliveryLocation));
    } catch (e) {
      console.error(e);
    }
  }, [deliveryLocation]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart Operations
  const addToCart = (product, quantity = 1, selectedWeight = null) => {
    const weightToUse = selectedWeight || product.weight || "Standard";
    const cartItemId = `${product.id}-${weightToUse}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prev,
          {
            ...product,
            cartItemId,
            selectedWeight: weightToUse,
            quantity: quantity
          }
        ];
      }
    });

    showToast(`Added ${product.name} to cart`);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) => {
      return prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter(item => item.cartItemId !== cartItemId));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  // Get quantity of a product currently in cart (for Country Delight style inline quantity stepper)
  const getProductCartQty = (productId) => {
    const match = cart.find(item => item.id === productId);
    return match ? match.quantity : 0;
  };

  // Apply Coupon
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SUMADHURA10' || clean === 'FRESH10') {
      setAppliedCoupon({ code: clean, discountPct: 10 });
      showToast("Coupon 'SUMADHURA10' applied! 10% discount added.");
      return { success: true, message: "10% discount applied!" };
    } else if (clean === 'FIRSTORDER') {
      setAppliedCoupon({ code: clean, discountPct: 15 });
      showToast("Welcome coupon applied! 15% discount added.");
      return { success: true, message: "15% discount applied!" };
    } else {
      showToast("Invalid coupon code. Try 'SUMADHURA10'", "error");
      return { success: false, message: "Invalid coupon code." };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    showToast("Coupon removed", "info");
  };

  // Cart Calculations
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPct) / 100) : 0;
  const isFreeDelivery = subtotal >= 499;
  const deliveryFee = subtotal === 0 ? 0 : (isFreeDelivery ? 0 : 49);
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);
  const amountToFreeDelivery = Math.max(0, 499 - subtotal);

  // Authentication Mock
  const loginUser = (emailOrPhone, password = '') => {
    const mockUser = {
      id: "usr-" + Date.now(),
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : "Ramesh Rao",
      email: emailOrPhone.includes('@') ? emailOrPhone : "ramesh.rao@example.com",
      phone: emailOrPhone.includes('@') ? "+91 98490 12345" : emailOrPhone,
      address: `${deliveryLocation.area}, ${deliveryLocation.city} - ${deliveryLocation.pincode}`,
      memberSince: "October 2026",
      vipStatus: "Sumadhura Club Member"
    };
    setUser(mockUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${mockUser.name}!`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast("You have been logged out", "info");
    if (currentPage === 'profile') {
      setCurrentPage('home');
    }
  };

  // Complete Order
  const placeOrder = (orderDetails) => {
    const newOrder = {
      orderId: `SMD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: "Confirmed",
      deliveryDate: "Tomorrow by 7:00 AM",
      items: cart.map(item => ({
        name: `${item.name} (${item.selectedWeight || item.weight})`,
        qty: item.quantity,
        price: item.price,
        image: item.image
      })),
      total: totalAmount,
      address: orderDetails.address || `${deliveryLocation.area}, ${deliveryLocation.city} - ${deliveryLocation.pincode}`,
      paymentMode: orderDetails.paymentMode || "Cash on Delivery",
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutModalOpen(false);
    setIsCartDrawerOpen(false);
    showToast("🎉 Order placed successfully! Check Order History in your Profile.");
    setCurrentPage('profile');
  };

  // Router navigation helper
  const navigateTo = (page, categorySlug = null) => {
    setCurrentPage(page);
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigateTo,
        selectedCategorySlug,
        setSelectedCategorySlug,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getProductCartQty,
        totalItemsCount,
        subtotal,
        discountAmount,
        deliveryFee,
        totalAmount,
        isFreeDelivery,
        amountToFreeDelivery,
        couponCode,
        setCouponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        user,
        setUser,
        loginUser,
        logoutUser,
        orders,
        placeOrder,
        deliveryLocation,
        setDeliveryLocation,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        activeProductModal,
        setActiveProductModal,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
