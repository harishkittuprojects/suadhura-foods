import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  User, 
  Package, 
  MapPin, 
  Clock, 
  LogOut, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const ProfilePage = () => {
  const { 
    user, 
    loginUser, 
    logoutUser, 
    orders, 
    addToCart, 
    setIsCartDrawerOpen, 
    deliveryLocation, 
    navigateTo, 
    showToast 
  } = useCart();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses'

  // If not logged in, show login prompt with 1-click login
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Sign in to your account</h1>
          <p className="text-xs text-neutral-500 mt-2">
            View your order tracking, past food deliveries, and saved delivery addresses.
          </p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 space-y-4">
          <button
            onClick={() => loginUser('ramesh.rao@example.com', 'password123')}
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>One-Click Demo Login</span>
          </button>
          <p className="text-[11px] text-neutral-400">
            Instantly loads realistic order history and customer profile.
          </p>
        </div>
      </div>
    );
  }

  const handleReorder = (order) => {
    order.items.forEach(item => {
      // Create a mock product object to add to cart
      addToCart({
        id: `reorder-${item.name}`,
        name: item.name,
        price: item.price,
        image: item.image || "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
        weight: "Standard"
      }, item.qty || 1);
    });
    showToast(`Items from order ${order.orderId} added to cart!`);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10">
      
      {/* Header Profile Summary Card */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white text-neutral-950 font-black text-2xl flex items-center justify-center shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-neutral-800 text-neutral-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-1 border border-neutral-700">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{user.vipStatus || "Sumadhura Club Member"}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-xs text-neutral-400">{user.email} • {user.phone}</p>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold px-4 py-2.5 rounded-xl border border-neutral-700 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 text-red-400" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'orders' 
              ? 'border-neutral-950 text-neutral-950' 
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'profile' 
              ? 'border-neutral-950 text-neutral-950' 
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>User Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'addresses' 
              ? 'border-neutral-950 text-neutral-950' 
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>
      </div>

      {/* Tab 1: Order History */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-neutral-50 rounded-3xl p-12 text-center border border-neutral-200 space-y-4">
              <Package className="w-12 h-12 text-neutral-400 mx-auto" />
              <h3 className="text-base font-bold text-neutral-900">No orders yet</h3>
              <p className="text-xs text-neutral-500">Your placed food orders will appear here with live tracking.</p>
              <button
                onClick={() => navigateTo('categories')}
                className="bg-neutral-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.orderId}
                  className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-4 hover:border-neutral-400 transition-all"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100 text-xs">
                    <div>
                      <span className="font-extrabold text-neutral-900 text-sm">{order.orderId}</span>
                      <span className="text-neutral-400 ml-2">Placed on {order.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2.5 py-1 rounded-full text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{order.status}</span>
                      </span>
                      <span className="font-extrabold text-neutral-900 text-base">₹{order.total}</span>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="text-xs text-neutral-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-neutral-700" />
                      <span className="font-semibold text-neutral-900">{order.deliveryDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-neutral-700" />
                      <span className="truncate max-w-xs">{order.address}</span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-neutral-700 uppercase tracking-wider text-[10px]">
                      Items in this delivery:
                    </span>
                    <ul className="divide-y divide-neutral-100">
                      {order.items.map((it, idx) => (
                        <li key={idx} className="py-1.5 flex justify-between items-center text-neutral-800">
                          <span>{it.name} × <strong>{it.qty}</strong></span>
                          <span className="font-bold">₹{it.price * it.qty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Actions */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Payment: {order.paymentMode || "Paid Online"}</span>
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-4 py-2 rounded-xl transition-colors shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder Items</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 max-w-2xl shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg text-neutral-900">Personal Information</h3>
            <p className="text-xs text-neutral-500">Manage your contact details and communication preferences</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-neutral-600 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                readOnly
                value={user.name}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-neutral-600 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                readOnly
                value={user.email}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-neutral-600 font-semibold mb-1">Phone Number</label>
              <input
                type="tel"
                readOnly
                value={user.phone}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-neutral-600 font-semibold mb-1">Member Since</label>
              <input
                type="text"
                readOnly
                value={user.memberSince || "October 2026"}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-neutral-900 font-medium"
              />
            </div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-600">
            <span className="font-bold text-neutral-900 block mb-1">Sumadhura Club Purity Assurance:</span>
            Your account is verified for priority 6:00 AM delivery batches and free packaging waiver on all seasonal festive orders.
          </div>
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-4 max-w-2xl">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-neutral-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                Primary Delivery Address
              </span>
              <span className="text-xs font-semibold text-emerald-700">7 AM Verified Hub</span>
            </div>
            <h4 className="font-bold text-neutral-900 text-sm">Home (Jubilee Hills)</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Flat 402, Sai Residency, Road No. 36, Jubilee Hills,<br />
              Hyderabad, Telangana - 500033
            </p>
            <div className="text-xs text-neutral-500 pt-1">
              Contact: {user.phone}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
