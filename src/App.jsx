import React, { useEffect } from 'react';
import AOS from 'aos';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingCartBar } from './components/FloatingCartBar';
import { LiveOrderTrackingModal } from './components/LiveOrderTrackingModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LocationModal } from './components/LocationModal';
import { AuthModal } from './components/AuthModal';
import { SubscriptionModal } from './components/SubscriptionModal';

import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ServicesPage } from './pages/ServicesPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { B2BPage } from './pages/B2BPage';
import { AdminPage } from './pages/AdminPage';

const MainLayout = () => {
  const { activeTab, setActiveTab } = useShop();

  // Detect #admin or /admin in URL
  useEffect(() => {
    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      setActiveTab('admin');
    }
  }, [setActiveTab]);

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30,
    });
  }, []);

  // Refresh AOS animations when switching views
  useEffect(() => {
    AOS.refresh();
  }, [activeTab]);

  // SEPARATE STANDALONE ADMIN PORTAL LAYOUT (No customer navbar, cart bar, or footer)
  if (activeTab === 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
        <AdminPage />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EC] text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-clip w-full">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 pb-24 sm:pb-28 lg:pb-8">
        {activeTab === 'home' && <HomePage />}
        {(activeTab === 'categories' || activeTab === 'menu') && <CategoriesPage />}
        {(activeTab === 'services' || activeTab === 'bookings') && <ServicesPage />}
        {activeTab === 'b2b' && <B2BPage />}
        {activeTab === 'wishlist' && <WishlistPage />}
        {activeTab === 'cart' && <CartPage />}
        {activeTab === 'login' && <LoginPage />}
      </main>

      {/* Sticky Floating Bottom Cart Bar */}
      <FloatingCartBar />

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation (App-like experience) */}
      <MobileBottomNav />

      {/* Modals, Drawers & Notifications */}
      <LiveOrderTrackingModal />
      <ProductQuickViewModal />
      <CartDrawer />
      <CheckoutModal />
      <LocationModal />
      <AuthModal />
      <SubscriptionModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
