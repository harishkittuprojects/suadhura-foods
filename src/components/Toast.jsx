import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 bg-neutral-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-neutral-700 max-w-md">
        {type === 'error' ? (
          <AlertCircle className="w-5 h-5 text-neutral-300 flex-shrink-0" />
        ) : type === 'info' ? (
          <Info className="w-5 h-5 text-neutral-300 flex-shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-neutral-200 flex-shrink-0" />
        )}
        <p className="text-sm font-medium tracking-tight text-neutral-100">{message}</p>
      </div>
    </div>
  );
};
