import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES, PRODUCTS } from '../data/foodData';
import { ProductCard } from '../components/ProductCard';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  ChevronDown, 
  Sparkles,
  ShoppingBag,
  ArrowUpDown
} from 'lucide-react';

export const CategoriesPage = () => {
  const { 
    selectedCategorySlug, 
    setSelectedCategorySlug, 
    searchQuery, 
    setSearchQuery 
  } = useCart();

  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'under200', '200to500', 'above500'
  const [tagFilter, setTagFilter] = useState('all'); // 'all', 'bestseller', 'new'
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'priceAsc', 'priceDesc', 'newest'
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Active category details
  const activeCategory = CATEGORIES.find(c => c.slug === selectedCategorySlug);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategorySlug !== 'all' && item.category !== selectedCategorySlug) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) {
          return false;
        }
      }

      // Price filter
      if (priceFilter === 'under200' && item.price >= 200) return false;
      if (priceFilter === '200to500' && (item.price < 200 || item.price > 500)) return false;
      if (priceFilter === 'above500' && item.price <= 500) return false;

      // Tag filter
      if (tagFilter === 'bestseller' && !item.isBestseller) return false;
      if (tagFilter === 'new' && !item.isNew) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // Popular (rating * reviewCount)
      return (b.rating * (b.reviewCount || 100)) - (a.rating * (a.reviewCount || 100));
    });
  }, [selectedCategorySlug, searchQuery, priceFilter, tagFilter, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategorySlug('all');
    setSearchQuery('');
    setPriceFilter('all');
    setTagFilter('all');
    setSortBy('popular');
  };

  const hasActiveFilters = selectedCategorySlug !== 'all' || searchQuery || priceFilter !== 'all' || tagFilter !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-200">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            Sumadhura Food Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mt-1">
            {activeCategory ? activeCategory.name : 'All Food Categories & Products'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            {activeCategory 
              ? activeCategory.description 
              : 'Browse our entire selection of traditional pickles, stone-ground flours, pure ghee sweets, spices, and wholesome groceries.'}
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by product name, ingredient or spice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-900 appearance-none pr-9 focus:outline-none focus:border-neutral-900 shadow-sm cursor-pointer"
              >
                <option value="popular">Sort: Popular First</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="newest">Newest Batches</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3.5 top-4 pointer-events-none" />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className="lg:hidden flex items-center gap-2 bg-neutral-900 text-white px-4 py-3 rounded-2xl text-xs font-bold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Sidebar Filters (Desktop) */}
        <aside className={`lg:block ${isFilterDrawerOpen ? 'block' : 'hidden'} lg:col-span-1 bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-6 sticky top-28`}>
          
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
              <Filter className="w-4 h-4" />
              <span>Filter Catalog</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
              Categories ({CATEGORIES.length})
            </h4>
            <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategorySlug('all')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedCategorySlug === 'all'
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <span>All Categories</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  selectedCategorySlug === 'all' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {PRODUCTS.length}
                </span>
              </button>

              {CATEGORIES.map((cat) => {
                const count = PRODUCTS.filter(p => p.category === cat.slug).length;
                const isSelected = selectedCategorySlug === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategorySlug(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="border-t border-neutral-100 pt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
              Price Range
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under200', label: 'Under ₹200' },
                { id: '200to500', label: '₹200 to ₹500' },
                { id: 'above500', label: 'Above ₹500' },
              ].map((p) => (
                <label 
                  key={p.id}
                  className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-colors ${
                    priceFilter === p.id ? 'bg-neutral-100 font-bold text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={priceFilter === p.id}
                    onChange={() => setPriceFilter(p.id)}
                    className="text-neutral-900"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          <div className="border-t border-neutral-100 pt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
              Curated Collections
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'bestseller', label: 'Daily Bestsellers' },
                { id: 'new', label: 'New Fresh Batches' },
              ].map((t) => (
                <label 
                  key={t.id}
                  className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-colors ${
                    tagFilter === t.id ? 'bg-neutral-100 font-bold text-neutral-900' : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="tagFilter"
                    checked={tagFilter === t.id}
                    onChange={() => setTagFilter(t.id)}
                    className="text-neutral-900"
                  />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pb-2 border-b border-neutral-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-neutral-900">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </span>

              {selectedCategorySlug !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-full font-medium">
                  <span>Category: {activeCategory ? activeCategory.name : selectedCategorySlug}</span>
                  <button onClick={() => setSelectedCategorySlug('all')}>
                    <X className="w-3 h-3 hover:text-black" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-full font-medium">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 hover:text-black" />
                  </button>
                </span>
              )}

              {priceFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-full font-medium">
                  <span>Price: {priceFilter}</span>
                  <button onClick={() => setPriceFilter('all')}>
                    <X className="w-3 h-3 hover:text-black" />
                  </button>
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-neutral-500 hover:text-neutral-900 font-semibold underline underline-offset-2"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-neutral-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">No matching food products found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                We couldn't find any items matching your active search or filters. Try adjusting your search term or resetting the filter options.
              </p>
              <button
                onClick={resetAllFilters}
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
