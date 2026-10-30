import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowLeft,
  Search,
  Zap,
  Sparkles,
  ChevronRight,
  Filter,
  X
} from 'lucide-react';

export const CategoriesPage = () => {
  const {
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    navigateTo,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [searchFilter, setSearchFilter] = useState(searchQuery || '');
  const [searchScope, setSearchScope] = useState('all'); // 'all' (Fast Search for ALL items) | 'current' (Only in current category)
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high' | 'rating'
  const [organicOnly, setOrganicOnly] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Sync with global searchQuery if updated outside
  useEffect(() => {
    if (searchQuery !== undefined && searchQuery !== searchFilter) {
      setSearchFilter(searchQuery);
    }
  }, [searchQuery]);

  // Fast animated search placeholders
  const searchPlaceholders = [
    'Fast Search all items (e.g. "Pure Cow Milk")...',
    'Fast Search all items (e.g. "Sweet Alphonso Mangoes")...',
    'Fast Search all items (e.g. "Fresh Malai Paneer")...',
    'Fast Search all items (e.g. "Organic Hybrid Tomatoes")...',
    'Fast Search all items (e.g. "A2 Desi Cow Ghee")...',
    'Fast Search all items (e.g. "Kashmiri Ruby Pomegranate")...',
    'Fast Search all items (e.g. "Aged Basmati Rice")...',
    'Fast Search all items (e.g. "Crunchy Banana Chips")...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  // Quick 1-click popular search tags
  const quickSearchTags = [
    { label: '🥛 Pure Milk', query: 'milk' },
    { label: '🥭 Alphonso Mangoes', query: 'mango' },
    { label: '🍅 Fresh Tomatoes', query: 'tomato' },
    { label: '🧈 Malai Paneer', query: 'paneer' },
    { label: '☕ Filter Coffee', query: 'coffee' },
    { label: '🌾 Basmati Rice', query: 'basmati' },
    { label: '🫒 Desi Ghee', query: 'ghee' },
    { label: '🍿 Banana Chips', query: 'banana chips' }
  ];

  const activeCategory = selectedCategoryFilter || 'All';

  // All category / aisle options for the quick switcher
  const aisleOptions = [
    { name: 'All', emoji: '🛒', shortName: 'All', aliases: ['All', 'all'] },
    {
      name: 'Fresh Vegetables',
      emoji: '🥬',
      shortName: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&q=80',
      aliases: ['Fresh Vegetables', 'Vegetables', 'Fresh Veggies', 'vegetables', 'fresh-veg']
    },
    {
      name: 'Fresh Fruits',
      emoji: '🍎',
      shortName: 'Fruits',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=120&q=80',
      aliases: ['Fresh Fruits', 'Fruits', 'fruits', 'Fresh Fruit', 'fresh-fruits']
    },
    {
      name: 'Dairy Products',
      emoji: '🥛',
      shortName: 'Dairy Products',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=120&q=80',
      aliases: ['Dairy Products', 'Dairy, Bread and Eggs', 'Dairy & Eggs', 'Dairy & Milk', 'dairy', 'dairy-products', 'dairy-bread-eggs']
    },
    {
      name: 'Rice, Atta and Dals',
      emoji: '🌾',
      shortName: 'Rice & Atta',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=120&q=80',
      aliases: ['Rice, Atta and Dals', 'Rice & Atta', 'Atta & Flours', 'Rice & Dals', 'rice-atta-dals']
    },
    {
      name: 'Masalas and Dry Fruits',
      emoji: '🌶️',
      shortName: 'Masalas & Nuts',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=120&q=80',
      aliases: ['Masalas and Dry Fruits', 'Masalas & Nuts', 'Spices & Masalas', 'Dry Fruits & Nuts', 'masalas-dry-fruits']
    },
    {
      name: 'Oils and Ghee',
      emoji: '🫒',
      shortName: 'Oils & Ghee',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=120&q=80',
      aliases: ['Oils and Ghee', 'Oils & Ghee', 'Cold Pressed Oils', 'oils-ghee']
    },
    {
      name: 'Munchies and Snacks',
      emoji: '🍿',
      shortName: 'Munchies',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=120&q=80',
      aliases: ['Munchies and Snacks', 'Munchies', 'Snacks', 'munchies', 'Munchies & Snacks']
    }
  ];

  // Helper to match products strictly to selected category or aisle
  const matchesCategory = (prod) => {
    // 1. Resolve canonical aisle option
    const canonical = aisleOptions.find(
      (o) =>
        o.name === activeCategory ||
        o.shortName === activeCategory ||
        o.aliases?.includes(activeCategory)
    );

    const target = canonical ? canonical.name : activeCategory;

    if (target === 'All') return true;

    // Strict Fresh Vegetables: only actual vegetables (fresh-veg aisle), never fruits
    if (target === 'Fresh Vegetables') {
      return prod.aisles?.includes('fresh-veg');
    }

    // Strict Fresh Fruits: only actual fresh fruits (fresh-fruits aisle or category)
    if (target === 'Fresh Fruits') {
      return prod.aisles?.includes('fresh-fruits') || prod.category === 'Fresh Fruits';
    }

    // Strict Dairy Products: ONLY 100% pure dairy items (Milk, Paneer, Ghee, Curd, Butter, Cheese, Buttermilk)
    // Strictly NO eggs, NO bread
    if (target === 'Dairy Products') {
      return (
        (prod.category === 'Dairy Products' || prod.aisles?.includes('dairy')) &&
        prod.category !== 'Eggs & Poultry' &&
        prod.category !== 'Bakery & Bread' &&
        prod.subCategory !== 'Eggs & Bread' &&
        !prod.name.toLowerCase().includes('egg') &&
        !prod.name.toLowerCase().includes('bread')
      );
    }

    // Strict Rice, Atta and Dals
    if (target === 'Rice, Atta and Dals') {
      return prod.aisles?.includes('rice-atta-dals');
    }

    // Strict Masalas and Dry Fruits
    if (target === 'Masalas and Dry Fruits') {
      return prod.aisles?.includes('masalas-dry-fruits');
    }

    // Strict Oils and Ghee
    if (target === 'Oils and Ghee') {
      return prod.aisles?.includes('oils-ghee');
    }

    // Strict Munchies and Snacks
    if (target === 'Munchies and Snacks') {
      return prod.aisles?.includes('munchies') || prod.category === 'Munchies & Snacks';
    }

    // Generic Groceries fallback
    if (activeCategory === 'Groceries' || activeCategory === 'Daily Groceries') {
      return prod.category === 'Groceries' || prod.aisles?.includes('rice-atta-dals');
    }

    return prod.category === activeCategory || prod.subCategory === activeCategory;
  };

  const hasSearch = searchFilter.trim().length > 0;
  const q = searchFilter.trim().toLowerCase();

  // Filter products
  let filtered = products.filter((prod) => {
    // When user types in search with searchScope === 'all' (Fast Search for ALL items):
    // Search across ALL products across all categories!
    // When search is empty or scope is 'current', strictly isolate to active category
    const isCatMatch =
      hasSearch && searchScope === 'all'
        ? true
        : matchesCategory(prod);

    const matchesSearch =
      !hasSearch ||
      prod.name.toLowerCase().includes(q) ||
      prod.description.toLowerCase().includes(q) ||
      prod.category.toLowerCase().includes(q) ||
      prod.subCategory?.toLowerCase().includes(q) ||
      prod.tags?.some((t) => t.toLowerCase().includes(q));

    const matchesOrganic = organicOnly ? prod.organic : true;

    return isCatMatch && matchesSearch && matchesOrganic;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const currentOption =
    aisleOptions.find(
      (o) =>
        o.name === activeCategory ||
        o.shortName === activeCategory ||
        o.aliases?.includes(activeCategory)
    ) || {
      name: activeCategory,
      emoji: '⚡',
      shortName: activeCategory
    };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-5 space-y-3 sm:space-y-4">
      {/* 1. Header Bar: Back Button + Direct Category Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#4A060C] via-[#680811] to-[#7D0A14] text-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-md border border-[#8B121C]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all text-white flex-shrink-0 border border-white/20"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">{currentOption.emoji}</span>
              <h1 className="text-base sm:text-xl font-black tracking-tight text-white leading-tight">
                {currentOption.name}
              </h1>
              <span className="bg-[#F5A623] text-[#3D040A] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 fill-[#3D040A]" />
                10-15 MINS
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-amber-100/90 mt-0.5 font-medium">
              Showing {filtered.length} products • Farm fresh & delivered in 10-15 mins
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedCategoryFilter('All')}
          className={`self-start sm:self-auto px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeCategory === 'All'
              ? 'bg-[#F5A623] text-[#3D040A] shadow-sm font-black'
              : 'bg-white/15 hover:bg-white/25 text-white'
          }`}
        >
          View All Products ({products.length})
        </button>
      </div>

      {/* 2. Fast Horizontal Category Aisle Switcher Strip */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x', overscrollBehaviorX: 'contain' }}
      >
        {aisleOptions.map((opt) => {
          const isSelected =
            activeCategory === opt.name ||
            activeCategory === opt.shortName ||
            opt.aliases?.includes(activeCategory);
          return (
            <button
              key={opt.name}
              onClick={() => setSelectedCategoryFilter(opt.name)}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-[#FAF5EC] border border-[#E8DDCF]'
              }`}
            >
              {opt.image ? (
                <img
                  src={opt.image}
                  alt={opt.shortName}
                  className="w-4 h-4 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <span>{opt.emoji}</span>
              )}
              <span>{opt.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Fast Toolbar: Quick Search across all items, Sort, Organic Filter */}
      <div className="bg-white p-2.5 sm:p-3.5 rounded-2xl border border-[#E8DDCF] shadow-2xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Fast Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder={searchPlaceholders[placeholderIndex]}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#FAF5EC]/50 border border-[#E8DDCF] rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none font-medium text-slate-800 placeholder:text-slate-400 transition-all"
            />
            <Search className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchFilter && (
              <button
                onClick={() => {
                  setSearchFilter('');
                  setSearchQuery?.('');
                }}
                className="text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2 p-1"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="popular">Popular First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Organic Only */}
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl hover:bg-slate-100">
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span>Organic</span>
            </label>
          </div>
        </div>

        {/* Quick Fast Search Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 hide-scrollbar touch-pan-x">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Fast Search:
          </span>
          {quickSearchTags.map((tag) => (
            <button
              key={tag.query}
              onClick={() => {
                setSearchFilter(tag.query);
                setSearchScope('all');
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border flex-shrink-0 ${
                searchFilter.toLowerCase() === tag.query.toLowerCase()
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200/80 shadow-2xs'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Live Search Scope Indicator when search query is entered */}
        {hasSearch && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="font-bold text-slate-800">
                Found {filtered.length} products for "{searchFilter}"
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[11px] font-semibold hidden sm:inline">Scope:</span>
              <button
                onClick={() => setSearchScope('all')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                  searchScope === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                ⚡ All Products ({products.length})
              </button>
              {currentOption.name !== 'All' && (
                <button
                  onClick={() => setSearchScope('current')}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    searchScope === 'current'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Only in {currentOption.shortName}
                </button>
              )}
              <button
                onClick={() => {
                  setSearchFilter('');
                  setSearchQuery?.('');
                }}
                className="text-blue-600 hover:underline text-[11px] font-bold ml-1"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. DIRECT PRODUCTS GRID - SHOWN IMMEDIATELY AT TOP, NOT DOWN */}
      <div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {filtered.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 space-y-3">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">No items found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No products match "{searchFilter}". Try clearing your search or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchFilter('');
                setSelectedCategoryFilter('All');
                setOrganicOnly(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 transition-colors"
            >
              Reset Filters & Show All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
