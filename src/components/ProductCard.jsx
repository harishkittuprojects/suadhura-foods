import React from 'react';
import { useCart } from '../context/CartContext';
import { Star, Plus, Minus, Eye } from 'lucide-react';

export const ProductCard = ({ product, showCategory = true }) => {
  const { 
    addToCart, 
    updateQuantity, 
    cart, 
    setActiveProductModal 
  } = useCart();

  // Find if this product is in cart (any weight variation)
  const cartItem = cart.find(item => item.id === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1, product.weight);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.cartItemId, 1);
    } else {
      addToCart(product, 1, product.weight);
    }
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.cartItemId, -1);
    }
  };

  const openDetails = () => {
    setActiveProductModal(product);
  };

  return (
    <div 
      onClick={openDetails}
      className="group relative bg-white border border-neutral-200 hover:border-neutral-400 rounded-2xl p-3.5 transition-all duration-200 hover:shadow-subtle flex flex-col justify-between cursor-pointer"
      data-aos="fade-up"
    >
      {/* Top Badges */}
      <div className="relative w-full aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-3">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Veg badge */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm p-1 rounded border border-neutral-200 shadow-sm flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
        </div>

        {/* Discount or Bestseller Badge */}
        {product.discount && (
          <div className="absolute top-2.5 right-2.5 bg-neutral-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full tracking-wide">
            {product.discount}
          </div>
        )}

        {/* Quick View overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openDetails();
          }}
          className="absolute bottom-2.5 right-2.5 bg-white/90 hover:bg-neutral-900 hover:text-white text-neutral-800 p-2 rounded-xl shadow-md transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Weight */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            {showCategory && (
              <span className="font-medium tracking-wide uppercase text-[10px] text-neutral-400">
                {product.categoryName || product.category}
              </span>
            )}
            <span className="bg-neutral-100 px-2 py-0.5 rounded text-[11px] font-medium text-neutral-600">
              {product.weight}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-sm sm:text-base text-neutral-900 line-clamp-2 leading-snug group-hover:text-black mb-1.5">
            {product.name}
          </h3>

          {/* Short Description */}
          {product.description && (
            <p className="text-xs text-neutral-500 line-clamp-1 mb-2">
              {product.description}
            </p>
          )}

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-1 bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded text-[11px] font-semibold">
              <Star className="w-3 h-3 fill-neutral-800 text-neutral-800" />
              <span>{product.rating}</span>
            </div>
            <span className="text-[11px] text-neutral-400">
              ({product.reviewCount?.toLocaleString() || 120})
            </span>
          </div>
        </div>

        {/* Price and Add to Cart Section */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-neutral-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-400 font-normal">Inclusive of all taxes</span>
          </div>

          {/* Add to Cart button or Country Delight style stepper */}
          <div onClick={(e) => e.stopPropagation()}>
            {cartQty === 0 ? (
              <button
                onClick={handleAdd}
                className="flex items-center gap-1 bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white border-2 border-neutral-900 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors duration-150 shadow-sm"
              >
                <span>ADD</span>
                <Plus className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center bg-neutral-900 text-white rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={handleDecrement}
                  className="px-2 py-1.5 hover:bg-neutral-800 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2.5 text-xs font-bold text-center min-w-[24px]">
                  {cartQty}
                </span>
                <button
                  onClick={handleIncrement}
                  className="px-2 py-1.5 hover:bg-neutral-800 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
