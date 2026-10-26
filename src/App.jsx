import React, { useEffect } from 'react';
import AOS from 'aos';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LocationModal } from './components/LocationModal';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { ProfilePage } from './pages/ProfilePage';

function AppContent() {
  const { currentPage } = useCart();

  useEffect(() => {
    AOS.init({
      duration: 650,
      once: true,
      easing: 'ease-out-cubic',
      offset: 30,
      disable: () => window.innerWidth < 768,
    });
  }, []);

  // Refresh AOS on page change
  useEffect(() => {
    AOS.refresh();
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'categories':
        return <CategoriesPage />;
      case 'services':
        return <ServicesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage />;
      case 'profile':
      case 'login':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Sticky Responsive Header */}
      <Navbar />

      {/* Main Dynamic Page Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {renderCurrentPage()}
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductDetailsModal />
      <CheckoutModal />
      <LocationModal />
      <AuthModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
