import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    showToast
  } = useShop();

  // Mode: 'user' | 'business'
  const [accountType, setAccountType] = useState(
    authModalTab === 'business' ? 'business' : 'user'
  );

  React.useEffect(() => {
    if (authModalTab === 'business') {
      setAccountType('business');
    }
  }, [authModalTab]);

  // Personal user fields
  const [identifier, setIdentifier] = useState('rajesh.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Rajesh Sharma');
  const [phone, setPhone] = useState('+91 98450 12345');

  // Business user fields
  const [businessIdentifier, setBusinessIdentifier] = useState('procurement@srikrishnagrand.com');
  const [businessPassword, setBusinessPassword] = useState('business2026');
  const [companyName, setCompanyName] = useState('Sri Krishna Grand Hotels & Banquets');
  const [contactPerson, setContactPerson] = useState('K. S. Narayana');
  const [businessPhone, setBusinessPhone] = useState('+91 98450 99888');
  const [gstin, setGstin] = useState('36AABCU9603R1ZM');
  const [businessType, setBusinessType] = useState('Restaurant & Hotel');

  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordView, setForgotPasswordView] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (accountType === 'business') {
      if (authModalTab === 'login') {
        login({
          name: contactPerson || 'Procurement Officer',
          companyName: companyName || 'Commercial Partner',
          email: businessIdentifier.includes('@') ? businessIdentifier : `${businessIdentifier}@business.com`,
          phone: businessPhone || '+91 98450 99888',
          gstin: gstin || '36AABCU9603R1ZM',
          businessType: businessType || 'Restaurant & Hotel',
          isBusiness: true
        });
      } else {
        login({
          name: contactPerson || 'Business Partner',
          companyName: companyName || 'New Commercial Enterprise',
          email: businessIdentifier,
          phone: businessPhone,
          gstin: gstin || '36AABCU9603R1ZM',
          businessType: businessType,
          isBusiness: true
        });
      }
    } else {
      if (authModalTab === 'login') {
        login({
          name: identifier.includes('@') ? identifier.split('@')[0].replace('.', ' ') : 'Customer',
          email: identifier.includes('@') ? identifier : `${identifier}@customer.com`,
          phone: identifier.includes('@') ? '+91 98450 12345' : identifier,
          isBusiness: false
        });
      } else {
        login({
          name: name || 'New Shopper',
          email: identifier,
          phone: phone,
          isBusiness: false
        });
      }
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setResetSent(true);
    showToast('Password reset link sent to your email/mobile!', 'info');
    setTimeout(() => {
      setForgotPasswordView(false);
      setResetSent(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#EDE1D1] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-black/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Banner */}
        <div className="bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] p-6 text-white text-center border-b border-[#8B121C]">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner">
            {accountType === 'business' ? (
              <Building2 className="w-6 h-6 text-amber-300" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            )}
          </div>
          <h2 className="text-xl font-black">
            {accountType === 'business' ? 'B2B Wholesale Portal' : 'B2C Customer Login'}
          </h2>
          <p className="text-xs text-amber-100/90 mt-1 max-w-xs mx-auto">
            {accountType === 'business'
              ? 'Wholesale bulk rates, GST invoices & commercial recurring supplies'
              : 'Access fresh dairy, farm veggies, express delivery & exclusive discounts'}
          </p>
        </div>

        {/* Account Type Toggle */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 bg-[#FAF5EC] p-1.5 rounded-2xl border border-[#EDE1D1] gap-1.5">
            <button
              type="button"
              onClick={() => {
                setAccountType('user');
                setAuthModalTab('login');
              }}
              className={`py-2 px-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                accountType === 'user'
                  ? 'bg-[#7D0A14] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>B2C Customer</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAccountType('business');
                setAuthModalTab('login');
              }}
              className={`py-2 px-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                accountType === 'business'
                  ? 'bg-[#7D0A14] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B Wholesale</span>
            </button>
          </div>
        </div>

        {forgotPasswordView ? (
          /* Forgot Password View */
          <div className="p-6">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">Reset Your Password</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your {accountType === 'business' ? 'work email or business phone' : 'registered email address or mobile number'} to receive a secure login link.
            </p>

            {resetSent ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Verification code sent! Redirecting to login...</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {accountType === 'business' ? 'Work Email or Business Mobile' : 'Email or Mobile Number'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. yourname@example.com or 9876543210"
                    value={accountType === 'business' ? businessIdentifier : identifier}
                    onChange={(e) =>
                      accountType === 'business'
                        ? setBusinessIdentifier(e.target.value)
                        : setIdentifier(e.target.value)
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#7D0A14] hover:bg-[#680811] text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setForgotPasswordView(false)}
                  className="w-full text-center text-xs font-semibold text-slate-600 hover:text-[#7D0A14]"
                >
                  Back to Sign In
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Main Login / Register View */
          <div className="p-6 pt-3">
            {/* Tabs */}
            <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl mb-4">
              <button
                type="button"
                onClick={() => setAuthModalTab('login')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  authModalTab === 'login'
                    ? 'bg-white text-[#7D0A14] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthModalTab('register')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  authModalTab === 'register'
                    ? 'bg-white text-[#7D0A14] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {accountType === 'business' ? 'Register Business' : 'Create Account'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {accountType === 'business' ? (
                /* Business Modal Fields */
                <>
                  {authModalTab === 'register' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Company / Business Name *</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sri Krishna Grand Hotels"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                          />
                          <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Business Type</label>
                          <select
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            className="w-full px-2.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:outline-none"
                          >
                            <option>Restaurant & Hotel</option>
                            <option>Catering & Banquets</option>
                            <option>Cloud Kitchen</option>
                            <option>Corporate Office</option>
                            <option>Supermarket</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">GSTIN (Optional)</label>
                          <input
                            type="text"
                            placeholder="36AABCU9603R1ZM"
                            value={gstin}
                            onChange={(e) => setGstin(e.target.value.toUpperCase())}
                            className="w-full px-2.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] uppercase"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Work Email or Business Mobile *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. procurement@srikrishnagrand.com"
                        value={businessIdentifier}
                        onChange={(e) => setBusinessIdentifier(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">Password</label>
                      {authModalTab === 'login' && (
                        <button
                          type="button"
                          onClick={() => setForgotPasswordView(true)}
                          className="text-[11px] font-semibold text-[#7D0A14] hover:underline"
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
                        value={businessPassword}
                        onChange={(e) => setBusinessPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
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
                </>
              ) : (
                /* Personal User Modal Fields */
                <>
                  {authModalTab === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
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
                        placeholder="Enter email or 10-digit mobile"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {authModalTab === 'register' && (
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
                          className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">Password</label>
                      {authModalTab === 'login' && (
                        <button
                          type="button"
                          onClick={() => setForgotPasswordView(true)}
                          className="text-[11px] font-semibold text-[#7D0A14] hover:underline"
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
                        className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#7D0A14] focus:bg-white focus:outline-none font-medium"
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
                </>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#7D0A14] hover:bg-[#680811] active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg shadow-[#7D0A14]/25 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>
                  {accountType === 'business'
                    ? authModalTab === 'login'
                      ? 'Sign In to Business Portal'
                      : 'Register Business Account'
                    : authModalTab === 'login'
                    ? 'Sign In to Account'
                    : 'Create My Account'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  {authModalTab === 'login' ? "Don't have an account? " : 'Already registered? '}
                  <button
                    type="button"
                    onClick={() => setAuthModalTab(authModalTab === 'login' ? 'register' : 'login')}
                    className="text-[#7D0A14] font-bold hover:underline"
                  >
                    {authModalTab === 'login' ? 'Create an account' : 'Sign in here'}
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
