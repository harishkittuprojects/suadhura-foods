import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/foodData';
import { ProductCard } from '../components/ProductCard';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const CartPage = () => {
  const { 
    cart, 
    totalItemsCount, 
    subtotal, 
    discountAmount, 
    deliveryFee, 
    totalAmount, 
    isFreeDelivery, 
    amountToFreeDelivery, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    setIsCheckoutModalOpen, 
    navigateTo, 
    deliveryLocation 
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  // Recommended quick add-ons (snacks / sweets / pickles not currently in cart)
  const quickAddons = PRODUCTS.filter(p => !cart.some(c => c.id === p.id)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            Sumadhura Checkout Hub
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 mt-1">
            Shopping Cart ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          onClick={() => navigateTo('categories')}
          className="flex items-center gap-2 text-xs font-bold text-neutral-800 hover:text-black py-2 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-neutral-50 rounded-3xl p-12 sm:p-20 border border-neutral-200 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto text-neutral-400 shadow-sm">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Your basket is currently empty</h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-md mx-auto leading-relaxed">
              Looks like you haven't added anything yet. Discover our fresh batches of heirloom mango pickles, pure desi cow ghee laddus, and cold-stone ground flours.
            </p>
          </div>
          <button
            onClick={() => navigateTo('categories')}
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm px-8 py-3.5 rounded-2xl transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Start Shopping Foods</span>
          </button>
        </div>
      ) : (
        /* Active Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Free Delivery Bar */}
            <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200">
              {isFreeDelivery ? (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-900">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span>Congratulations! Your order qualifies for FREE Morning Delivery.</span>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center font-semibold text-neutral-800">
                    <span>Add ₹{amountToFreeDelivery} more to enjoy FREE Delivery</span>
                    <span>Goal: ₹499</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-neutral-900 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Items Table / Cards */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden divide-y divide-neutral-100">
              {cart.map((item) => (
                <div 
                  key={item.cartItemId}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
                >
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-20 h-20 rounded-2xl bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                        {item.categoryName || item.category}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-neutral-900 leading-snug truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-neutral-100 text-neutral-700 text-xs font-semibold px-2 py-0.5 rounded">
                          {item.selectedWeight || item.weight}
                        </span>
                        <span className="text-xs text-neutral-400">
                          ₹{item.price} each
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-neutral-100">
                    <div className="flex items-center border border-neutral-300 rounded-xl bg-white shadow-sm overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-neutral-900 min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <span className="text-base sm:text-lg font-extrabold text-neutral-900">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-neutral-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="flex justify-between items-center text-xs">
              <button
                onClick={() => navigateTo('categories')}
                className="text-neutral-600 hover:text-black font-semibold underline underline-offset-4"
              >
                ← Back to Food Catalog
              </button>

              <button
                onClick={clearCart}
                className="text-neutral-400 hover:text-red-600 font-semibold transition-colors"
              >
                Clear Entire Basket
              </button>
            </div>

          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            <div className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-neutral-900 pb-3 border-b border-neutral-200">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-white border border-neutral-300 px-3.5 py-2.5 rounded-2xl text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-neutral-800" />
                    <div>
                      <span className="font-bold text-neutral-900 block">{appliedCoupon.code}</span>
                      <span className="text-[11px] text-neutral-500">{appliedCoupon.discountPct}% Discount Applied</span>
                    </div>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Apply Promo Coupon:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Use SUMADHURA10"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 font-mono uppercase"
                    />
                    <button
                      type="submit"
                      className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              )}

              {/* Pricing Breakdown */}
              <div className="space-y-2.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
                <div className="flex justify-between">
                  <span>Item Subtotal ({totalItemsCount} items)</span>
                  <span className="font-bold text-neutral-900">₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-neutral-900 font-semibold">
                    <span>Coupon Savings</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Morning 7 AM Delivery</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    <span className="font-bold text-neutral-900">₹{deliveryFee}</span>
                  )}
                </div>

                <div className="flex justify-between text-neutral-400 text-[11px]">
                  <span>GST & Kitchen Packaging</span>
                  <span>Included</span>
                </div>

                <div className="pt-3 border-t border-neutral-300 flex justify-between items-baseline text-base font-extrabold text-neutral-900">
                  <span>Total Amount</span>
                  <span className="text-2xl font-black">₹{totalAmount}</span>
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="text-xs text-neutral-600 bg-white p-3.5 rounded-2xl border border-neutral-200 space-y-1">
                <div className="flex justify-between text-neutral-900 font-semibold">
                  <span>Delivering to:</span>
                  <span>{deliveryLocation.area}</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  {deliveryLocation.city} - {deliveryLocation.pincode} • Morning 7 AM
                </p>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all shadow-lg active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                <span>Zero Adulteration & 100% Purity Guarantee</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Suggested Food Items Section */}
      <div className="pt-12 border-t border-neutral-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Frequently Bought Together
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 mt-0.5">
              Popular Additions for Your Kitchen
            </h2>
          </div>
          <button
            onClick={() => navigateTo('categories')}
            className="text-xs font-bold text-neutral-900 hover:underline"
          >
            Browse Catalog
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickAddons.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};
