import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/foodData';
import { ProductCard } from './ProductCard';
import { 
  X, 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  Leaf, 
  RotateCcw, 
  Truck,
  Heart
} from 'lucide-react';

export const ProductDetailsModal = () => {
  const { 
    activeProductModal, 
    setActiveProductModal, 
    addToCart, 
    updateQuantity, 
    cart 
  } = useCart();

  const [selectedWeight, setSelectedWeight] = useState('');
  const [modalQty, setModalQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (activeProductModal) {
      setSelectedWeight(activeProductModal.weight || (activeProductModal.weights && activeProductModal.weights[0]) || "Standard");
      setModalQty(1);
      setIsWishlisted(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeProductModal]);

  if (!activeProductModal) return null;

  const product = activeProductModal;

  // Calculate dynamic price based on selected weight ratio if applicable
  const getCalculatedPrice = () => {
    if (!product.weights || product.weights.length <= 1) return product.price;
    const baseWeight = product.weight;
    if (selectedWeight === baseWeight) return product.price;
    if (selectedWeight.includes('1kg') && baseWeight.includes('500g')) {
      return Math.round(product.price * 1.85); // 1kg pack discount
    }
    if (selectedWeight.includes('250g') && baseWeight.includes('500g')) {
      return Math.round(product.price * 0.55);
    }
    return product.price;
  };

  const currentPrice = getCalculatedPrice();

  const handleAddToCart = () => {
    addToCart({ ...product, price: currentPrice }, modalQty, selectedWeight);
    setActiveProductModal(null);
  };

  // Related products from the same category or general bestsellers (excluding current)
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.isBestseller)).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <span>Sumadhura Foods</span>
            <span>/</span>
            <span className="text-neutral-900">{product.categoryName || product.category}</span>
          </div>

          <button
            onClick={() => setActiveProductModal(null)}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                {/* Veg mark */}
                <div className="absolute top-3 left-3 bg-white/95 p-1.5 rounded-lg border border-neutral-200 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-emerald-600" />
                </div>
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-neutral-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.discount}
                  </div>
                )}
              </div>

              {/* Purity Assurance Strip */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 grid grid-cols-2 gap-3 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-800" />
                  <span className="font-medium">100% Purity Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-neutral-800" />
                  <span className="font-medium">No Artificial Additives</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-neutral-800" />
                  <span className="font-medium">Morning 7 AM Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-neutral-800" />
                  <span className="font-medium">Zero Hassle Replacement</span>
                </div>
              </div>
            </div>

            {/* Right: Details & Buying Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 bg-neutral-900 text-white px-2 py-0.5 rounded-md text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs font-semibold text-neutral-500">
                    {product.reviewCount?.toLocaleString() || 340} verified reviews
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    In Stock
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                  {product.name}
                </h2>
                
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Taxes */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-neutral-900">
                      ₹{currentPrice}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-neutral-400 line-through">
                        ₹{Math.round(product.originalPrice * (currentPrice / product.price))}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Price inclusive of all taxes. Free shipping on orders above ₹499.
                  </p>
                </div>

                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isWishlisted 
                      ? 'bg-neutral-900 text-white border-neutral-900' 
                      : 'bg-white text-neutral-600 border-neutral-200 hover:text-black'
                  }`}
                  title="Save to wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Weight Selector */}
              {product.weights && product.weights.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                    Select Pack Size / Quantity:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.weights.map((wt) => (
                      <button
                        key={wt}
                        onClick={() => setSelectedWeight(wt)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                          selectedWeight === wt
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {wt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart button */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-neutral-300 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <button
                      onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                      className="p-3 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-bold text-neutral-900 min-w-[32px] text-center">
                      {modalQty}
                    </span>
                    <button
                      onClick={() => setModalQty(modalQty + 1)}
                      className="p-3 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base shadow-lg transition-all active:scale-95"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart • ₹{currentPrice * modalQty}</span>
                  </button>
                </div>
              </div>

              {/* Highlights & Nutrition */}
              {product.highlights && (
                <div className="border-t border-neutral-200 pt-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Product Highlights:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Storage Instruction */}
              {product.storage && (
                <div className="bg-neutral-100 rounded-xl p-3 text-xs text-neutral-600">
                  <span className="font-semibold text-neutral-900">Storage: </span>
                  {product.storage}
                </div>
              )}

            </div>
          </div>

          {/* Related Products Section */}
          <div className="border-t border-neutral-200 pt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900">
                You May Also Like
              </h3>
              <span className="text-xs font-semibold text-neutral-500">
                Fresh & handcrafted favorites
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((relProd) => (
                <ProductCard key={relProd.id} product={relProd} showCategory={false} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
