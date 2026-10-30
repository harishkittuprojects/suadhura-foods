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
  ArrowRight
} from 'lucide-react';

export const LoginPage = () => {
  const { user, login, logout, navigateTo, wishlist, cart, showToast } = useShop();

  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [identifier, setIdentifier] = useState('rajesh.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Rajesh Sharma');
  const [phone, setPhone] = useState('+91 98450 12345');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 'login') {
      login({
        name: identifier.includes('@') ? identifier.split('@')[0].replace('.', ' ') : 'Rajesh Sharma',
        email: identifier.includes('@') ? identifier : `${identifier}@customer.com`,
        phone: identifier.includes('@') ? '+91 98450 12345' : identifier
      });
    } else {
      login({
        name: name || 'New Customer',
        email: identifier,
        phone: phone
      });
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetSent(true);
    showToast('Password reset link sent to your phone/email!');
    setTimeout(() => {
      setForgotPasswordActive(false);
      setResetSent(false);
    }, 2500);
  };

  // If already logged in, show user account dashboard
  if (user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/25">
              {user.name.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Active Member
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <h2 className="font-extrabold text-slate-900 text-base">Recent Food Orders</h2>
            </div>
            <span className="text-xs text-slate-400">Order history</span>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">#SMD-739201</span>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Delivered
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Farm Fresh Cow Milk (2x), Crisp Onions (1kg), A2 Cow Ghee (500ml)
                </p>
                <span className="text-[11px] text-slate-400">Delivered Yesterday at 6:42 AM</span>
              </div>
              <div className="text-right">
                <span className="font-black text-slate-900 text-sm">₹695</span>
                <span className="block text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
                  Reorder Items
                </span>
              </div>
            </div>

            <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">#SMD-684192</span>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Delivered
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fresh Malai Paneer (200g), Mountain Potatoes (1kg), Sharbati Atta (5kg)
                </p>
                <span className="text-[11px] text-slate-400">Delivered 4 days ago</span>
              </div>
              <div className="text-right">
                <span className="font-black text-slate-900 text-sm">₹380</span>
                <span className="block text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
                  Reorder Items
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login & Registration view
  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-3xl border border-[#E8DDCF] shadow-soft overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] p-6 text-white text-center border-b border-[#8B121C]">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6 text-amber-300" />
          </div>
          <h1 className="text-xl font-black">User Login</h1>
          <p className="text-xs text-amber-100/90 mt-1">
            Sign in to track orders, manage dairy subscriptions & save your favorites
          </p>
        </div>

        {forgotPasswordActive ? (
          <div className="p-6 sm:p-8 space-y-4">
            <h2 className="font-extrabold text-slate-900 text-base">Forgot Your Password?</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your email or phone number and we will send you a one-time OTP login code.
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
                    Email or Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter email or 10-digit number"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Send OTP Code
                </button>
                <button
                  type="button"
                  onClick={() => setForgotPasswordActive(false)}
                  className="w-full text-center text-xs font-semibold text-slate-500 hover:text-blue-600"
                >
                  Return to Login
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* Tabs */}
            <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setTab('login')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  tab === 'login' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab('register')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  tab === 'register' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none font-medium"
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
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none font-medium"
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
                      className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none font-medium"
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
                      className="text-[11px] font-semibold text-blue-600 hover:underline"
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
                    className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none font-medium"
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

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span>Remember me</span>
                </label>
                <span className="text-[11px] text-slate-400">256-Bit SSL Secure</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>{tab === 'login' ? 'Sign In to Account' : 'Create My Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  {tab === 'login' ? "New to Sumadhura Foods? " : 'Already registered? '}
                  <button
                    type="button"
                    onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    {tab === 'login' ? 'Create an account' : 'Sign in here'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
