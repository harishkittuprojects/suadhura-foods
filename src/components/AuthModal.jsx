import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, User, Lock, Mail, Phone, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    loginUser, 
    showToast 
  } = useCart();

  const [identifier, setIdentifier] = useState('ramesh.rao@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Ramesh Rao');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      loginUser(identifier, password);
    }, 600);
  };

  const handleDemoLogin = () => {
    loginUser('demo.customer@sumadhurafoods.com', 'demo123');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900">
              {authMode === 'login' ? 'Customer Login' : 'Create Customer Account'}
            </h2>
            <p className="text-xs text-neutral-500">Welcome to Sumadhura Foods</p>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors border border-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-200 bg-neutral-100">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-3 text-xs font-bold transition-all text-center ${
              authMode === 'login'
                ? 'bg-white text-neutral-900 border-b-2 border-neutral-950 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-3 text-xs font-bold transition-all text-center ${
              authMode === 'register'
                ? 'bg-white text-neutral-900 border-b-2 border-neutral-950 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Register New Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Quick Demo Login Banner */}
          <div className="bg-neutral-100 rounded-2xl p-3.5 border border-neutral-200 flex items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-bold text-neutral-900 block">Want to test quickly?</span>
              <span className="text-neutral-500">Instant login with preloaded orders</span>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Login</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Rao"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Email Address or Phone Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="name@example.com or 10-digit mobile"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-neutral-700">
                  Password
                </label>
                {authMode === 'login' && (
                  <button 
                    type="button"
                    onClick={() => showToast("Password reset link sent to registered email.", "info")}
                    className="text-[11px] text-neutral-500 hover:text-black underline underline-offset-2"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md active:scale-95"
            >
              <span>{authMode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-[11px] text-neutral-400 pt-2">
            By proceeding, you agree to Sumadhura Foods' Terms of Service & Privacy Policy.
          </p>
        </div>

      </div>
    </div>
  );
};
