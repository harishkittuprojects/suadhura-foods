import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Tag, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    totalItemsCount, 
    subtotal, 
    deliveryFee, 
    discountAmount, 
    totalAmount, 
    isFreeDelivery, 
    amountToFreeDelivery, 
    updateQuantity, 
    removeFromCart, 
    couponCode, 
    setCouponCode, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    setIsCheckoutModalOpen, 
    navigateTo,
    deliveryLocation
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-neutral-200">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <div>
                <h2 className="text-base font-bold text-neutral-900">Your Shopping Cart</h2>
                <p className="text-xs text-neutral-500">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in basket
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors border border-neutral-200"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery threshold bar */}
          <div className="bg-neutral-100 px-6 py-2.5 border-b border-neutral-200 text-xs">
            {isFreeDelivery ? (
              <div className="flex items-center gap-2 text-neutral-900 font-semibold">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>You qualify for FREE Morning Delivery!</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center font-medium text-neutral-700 mb-1">
                  <span>Add ₹{amountToFreeDelivery} more for FREE Delivery</span>
                  <span>Goal: ₹499</span>
                </div>
                <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-neutral-900 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Your cart is empty</h3>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                    Explore our traditional pickles, pure ghee sweets, stone-ground flours and spices.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('categories');
                  }}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md"
                >
                  Explore Foods Now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div 
                    key={item.cartItemId}
                    className="flex gap-3 bg-white p-3 rounded-2xl border border-neutral-200 hover:border-neutral-300 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[11px] font-medium text-neutral-500">
                          {item.selectedWeight || item.weight}
                        </span>
                      </div>

                      {/* Controls and Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            className="px-2 py-1 text-neutral-600 hover:bg-neutral-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-neutral-900 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            className="px-2 py-1 text-neutral-600 hover:bg-neutral-200 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-neutral-900">
                            ₹{item.price * item.quantity}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-neutral-400 block">
                              (₹{item.price} each)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Bill Details */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-4">
              
              {/* Coupon Code Section */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-white border border-neutral-300 px-3 py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-neutral-700" />
                    <span className="font-bold text-neutral-900">{appliedCoupon.code}</span>
                    <span className="text-neutral-500">({appliedCoupon.discountPct}% OFF)</span>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Coupon: SUMADHURA10"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full bg-white text-xs text-neutral-900 pl-8 pr-3 py-2 rounded-xl border border-neutral-200 focus:border-neutral-900 focus:outline-none uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Bill Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-medium text-neutral-900">₹{subtotal}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-neutral-900 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee (Morning 7 AM)</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    <span className="font-medium text-neutral-900">₹{deliveryFee}</span>
                  )}
                </div>
                <div className="border-t border-neutral-200 pt-2 flex justify-between text-sm font-extrabold text-neutral-900">
                  <span>To Pay</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              {/* Delivery info */}
              <div className="text-[11px] text-neutral-500 bg-white p-2.5 rounded-xl border border-neutral-200 flex items-center justify-between">
                <span>Deliver to: <strong>{deliveryLocation.area}</strong></span>
                <span className="text-neutral-900 font-semibold">Tomorrow 7 AM</span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigateTo('cart');
                    }}
                    className="text-neutral-600 hover:text-black font-semibold underline underline-offset-2"
                  >
                    View Full Cart Page
                  </button>

                  <button
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="text-neutral-500 hover:text-black font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
