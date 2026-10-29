import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-xl text-sm font-medium transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-3 ${
            toast.type === 'error'
              ? 'bg-rose-600 text-white'
              : toast.type === 'info'
              ? 'bg-slate-800 text-white'
              : 'bg-blue-600 text-white shadow-blue-500/20'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-white" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 flex-shrink-0 text-blue-300" />
            ) : (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-300" />
            )}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors ml-2"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white/80" />
          </button>
        </div>
      ))}
    </div>
  );
};
