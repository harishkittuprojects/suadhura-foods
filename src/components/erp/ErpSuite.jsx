import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Building2,
  Factory,
  Store,
  Utensils,
  Wheat,
  ShieldAlert,
  DollarSign,
  TrendingUp,
  PieChart,
  Users,
  Truck,
  Calendar,
  Scale,
  Receipt,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Search,
  Filter,
  Clock,
  Sparkles,
  RefreshCw,
  FileText,
  Check,
  ChevronRight,
  Download,
  Plus,
  X,
  Printer,
  Package,
  Layers,
  ThermometerSnowflake,
  Bike,
  ShieldCheck,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';

export const BUSINESS_ENTITIES = [
  {
    id: 'group',
    name: 'Sumadhura Group (Consolidated 360°)',
    shortName: 'Holding Group',
    type: 'Multi-Brand Holding & Governance',
    icon: Building2,
    badgeColor: 'bg-amber-100 text-[#7D0A14] border-amber-300',
    todayTurnover: '₹2,48,200',
    margin: '38.8%',
    activeOutlets: '8 Outlets & Kitchens',
    staffCount: 142,
    cashInCounters: '₹84,250'
  },
  {
    id: 'central-kitchen',
    name: 'Central Kitchen Mega Hub (Madhapur)',
    shortName: 'Central Kitchen',
    type: 'Bulk Processing & Recipe Production',
    icon: Factory,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    todayTurnover: '₹1,12,000 (Transfers)',
    margin: '42.1%',
    activeOutlets: 'Dispatches to 6 Outlets',
    staffCount: 38,
    cashInCounters: '₹0 (Internal Transfer Hub)'
  },
  {
    id: 'palle-ruchulu',
    name: 'Palle Ruchulu Outlets (Traditional Telugu Dining)',
    shortName: 'Palle Ruchulu Outlets',
    type: 'Curries Sold by Weight & Fast POS',
    icon: Utensils,
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    todayTurnover: '₹86,400',
    margin: '36.5%',
    activeOutlets: '3 Prime Locations (Madhapur, Gachibowli, Jubilee)',
    staffCount: 46,
    cashInCounters: '₹52,800'
  },
  {
    id: 'poshakalu',
    name: 'Poshakalu Retail (Organic Staples & Millets)',
    shortName: 'Poshakalu Retail',
    type: 'Bulk Repacking & Barcode Labeling',
    icon: Wheat,
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    todayTurnover: '₹34,600',
    margin: '41.0%',
    activeOutlets: '2 Retail Stores & Online',
    staffCount: 22,
    cashInCounters: '₹21,450'
  },
  {
    id: 'catering',
    name: 'Sumadhura Catering & Banquet Desk',
    shortName: 'Catering & Banquets',
    type: 'Per-Plate Event Menus & Utensil Return',
    icon: Users,
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    todayTurnover: '₹75,000 (Advances)',
    margin: '45.0%',
    activeOutlets: '4 Events Booked this week',
    staffCount: 18,
    cashInCounters: '₹10,000'
  },
  {
    id: 'foco',
    name: 'FOCO Franchise Outlets (Partner Hubs)',
    shortName: 'FOCO Outlets',
    type: 'Contract Payouts & Investor Split',
    icon: Store,
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    todayTurnover: '₹42,200',
    margin: '34.2%',
    activeOutlets: '2 Franchise Hubs (Kokapet, Kondapur)',
    staffCount: 18,
    cashInCounters: '₹0'
  }
];

export const RECIPES_MASTER = [
  {
    id: 'REC-01',
    name: 'Gongura Mutton Curry',
    category: 'Curries Sold by Weight',
    standardPortionSize: '10 portions (1.5 kg)',
    targetUnitRate: 90, // ₹ per 100g
    rawToCookedYieldRatio: 1.45, // 1kg raw meat + leaves yields ~1.45kg curry
    ingredients: [
      { name: 'Fresh Tender Mutton (Cleaned)', stdQty: 1.0, unit: 'kg', inStock: 35 },
      { name: 'Fresh Gongura Leaves (Picked)', stdQty: 0.5, unit: 'kg', inStock: 22 },
      { name: 'Cold-Pressed Groundnut Oil', stdQty: 0.15, unit: 'L', inStock: 40 },
      { name: 'Traditional Guntur Spices & Masala', stdQty: 0.1, unit: 'kg', inStock: 15 }
    ]
  },
  {
    id: 'REC-02',
    name: 'Andhra Country Chicken Curry (Natu Kodi)',
    category: 'Curries Sold by Weight',
    standardPortionSize: '10 portions (2.0 kg)',
    targetUnitRate: 75,
    rawToCookedYieldRatio: 1.6,
    ingredients: [
      { name: 'Natu Kodi Chicken Cut', stdQty: 1.2, unit: 'kg', inStock: 45 },
      { name: 'Shallots & Onion Paste', stdQty: 0.6, unit: 'kg', inStock: 80 },
      { name: 'Cold-Pressed Sesame Oil', stdQty: 0.2, unit: 'L', inStock: 30 },
      { name: 'Signature Garam Masala Blend', stdQty: 0.08, unit: 'kg', inStock: 18 }
    ]
  },
  {
    id: 'REC-03',
    name: 'Paneer Butter Masala (Organic Buffalo Milk Paneer)',
    category: 'Curries Sold by Weight',
    standardPortionSize: '10 portions (2.0 kg)',
    targetUnitRate: 60,
    rawToCookedYieldRatio: 1.85,
    ingredients: [
      { name: 'Fresh Malai Paneer Cubes', stdQty: 0.8, unit: 'kg', inStock: 60 },
      { name: 'Fresh Tomato Puree', stdQty: 1.0, unit: 'kg', inStock: 120 },
      { name: 'Pure Bilona Desi Ghee & Butter', stdQty: 0.25, unit: 'kg', inStock: 25 },
      { name: 'Cashew & Melon Seed Paste', stdQty: 0.2, unit: 'kg', inStock: 14 }
    ]
  },
  {
    id: 'REC-04',
    name: 'Homestyle Tomato Pappu (Dal)',
    category: 'Curries Sold by Weight',
    standardPortionSize: '10 portions (2.2 kg)',
    targetUnitRate: 35,
    rawToCookedYieldRatio: 2.4, // Dal expands when cooked
    ingredients: [
      { name: 'Organic Toor Dal (Polished)', stdQty: 0.7, unit: 'kg', inStock: 150 },
      { name: 'Farm Fresh Tomatoes', stdQty: 0.8, unit: 'kg', inStock: 95 },
      { name: 'Tempering Mix (Mustard, Cumin, Ghee)', stdQty: 0.15, unit: 'kg', inStock: 30 }
    ]
  }
];

export const INITIAL_DISPATCH_BATCHES = [
  {
    id: 'BATCH-894',
    recipeName: 'Gongura Mutton Curry',
    batchSizeKg: 30,
    portions: 200,
    cookedYieldKg: 29.4,
    yieldVariance: '-2.0% (Normal Evaporation)',
    status: 'Ready for Dispatch',
    cookTime: '06:00 AM – 08:30 AM',
    chef: 'Head Chef Venkat Rao',
    temp: '68°C Hot Sealed',
    allocations: [
      { outlet: 'Palle Ruchulu Madhapur', qtyKg: 14, status: 'Departed (Van TS09-4412)' },
      { outlet: 'Palle Ruchulu Gachibowli', qtyKg: 10, status: 'Packed & Weighed' },
      { outlet: 'Palle Ruchulu Jubilee Hills', qtyKg: 6, status: 'Loaded at Hub' }
    ]
  },
  {
    id: 'BATCH-895',
    recipeName: 'Paneer Butter Masala',
    batchSizeKg: 40,
    portions: 220,
    cookedYieldKg: 39.8,
    yieldVariance: '-0.5% (Optimal)',
    status: 'Cooking in Progress',
    cookTime: '08:00 AM – 10:15 AM',
    chef: 'Sous Chef Anil',
    temp: '82°C Simmering',
    allocations: [
      { outlet: 'Palle Ruchulu Madhapur', qtyKg: 18, status: 'Allocated' },
      { outlet: 'Palle Ruchulu Gachibowli', qtyKg: 14, status: 'Allocated' },
      { outlet: 'Sumadhura Express Subscriptions', qtyKg: 8, status: 'Allocated' }
    ]
  }
];

export const ErpSuite = ({
  showToast,
  shopsList = [],
  currentShop = null,
  onSelectShop,
  onOpenAddBranch
}) => {
  // Active branch for ERP drill-down (falls back to first real branch)
  const activeBranch = currentShop || shopsList[0] || null;
  const [selectedEntity, setSelectedEntity] = useState(BUSINESS_ENTITIES[0]);

  // ERP Functional Sub-Tabs
  const [activeErpTab, setActiveErpTab] = useState('overview'); 
  // 'overview' | 'kitchen-production' | 'curries-weight-pos' | 'stock-reconciliation' | 'procure-to-pay' | 'traceability' | 'exceptions'

  // -------------------------------------------------------------
  // SUB-MODULE 1: CURRIES SOLD BY WEIGHT LIVE POS SIMULATOR
  // -------------------------------------------------------------
  const [selectedCurry, setSelectedCurry] = useState(RECIPES_MASTER[0]);
  const [scaleGrossWeight, setScaleGrossWeight] = useState(480); // grams
  const [containerTareWeight, setContainerTareWeight] = useState(30); // grams (standard food container)
  const [weightBillingHistory, setWeightBillingHistory] = useState([
    {
      id: 'WB-1042',
      time: '12:14 PM',
      outlet: 'Palle Ruchulu Madhapur',
      curryName: 'Gongura Mutton Curry',
      netWeight: '450g',
      rate: '₹90 / 100g',
      total: 405,
      payMode: 'UPI QR',
      cashier: 'Bhanu (Shift 1)'
    },
    {
      id: 'WB-1041',
      time: '12:08 PM',
      outlet: 'Palle Ruchulu Gachibowli',
      curryName: 'Paneer Butter Masala',
      netWeight: '380g',
      rate: '₹60 / 100g',
      total: 228,
      payMode: 'Cash',
      cashier: 'Praveen'
    }
  ]);

  const netWeightGrams = Math.max(0, scaleGrossWeight - containerTareWeight);
  const calculatedCurryPrice = Math.round((netWeightGrams / 100) * selectedCurry.targetUnitRate);

  const handleCompleteWeightBill = (payMethod) => {
    if (netWeightGrams <= 0) {
      showToast('⚠️ Please place item on scale before generating bill.', 'error');
      return;
    }

    const newBill = {
      id: `WB-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      outlet: 'Palle Ruchulu (Counter #1)',
      curryName: selectedCurry.name,
      netWeight: `${netWeightGrams}g`,
      rate: `₹${selectedCurry.targetUnitRate} / 100g`,
      total: calculatedCurryPrice,
      payMode: payMethod,
      cashier: 'Current Cashier'
    };

    setWeightBillingHistory([newBill, ...weightBillingHistory]);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    showToast(`✅ Bill #${newBill.id} generated! ${netWeightGrams}g of ${selectedCurry.name} billed for ₹${calculatedCurryPrice} (${payMethod}). Kitchen batch inventory deducted!`, 'success');
  };

  // -------------------------------------------------------------
  // SUB-MODULE 2: CENTRAL KITCHEN RECIPE SCALING CALCULATOR
  // -------------------------------------------------------------
  const [scalingRecipe, setScalingRecipe] = useState(RECIPES_MASTER[2]); // Paneer Butter Masala
  const [targetPortions, setTargetPortions] = useState(250); // 250 portions
  const [batchesList, setBatchesList] = useState(INITIAL_DISPATCH_BATCHES);

  const scaleMultiplier = targetPortions / 10;
  const scaledFinishedWeightKg = (2.0 * scaleMultiplier).toFixed(1);

  const handleLaunchProductionBatch = () => {
    const newBatchId = `BATCH-${Math.floor(896 + Math.random() * 50)}`;
    const newBatch = {
      id: newBatchId,
      recipeName: scalingRecipe.name,
      batchSizeKg: parseFloat(scaledFinishedWeightKg),
      portions: targetPortions,
      cookedYieldKg: (scaledFinishedWeightKg * 0.98).toFixed(1),
      yieldVariance: 'Cooking Batch Initialized',
      status: 'Cooking in Progress',
      cookTime: `${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} – ETA 2 Hours`,
      chef: 'Executive Chef Venkat',
      temp: '78°C Cooking Chamber',
      allocations: [
        { outlet: 'Palle Ruchulu Madhapur', qtyKg: Math.round(scaledFinishedWeightKg * 0.45), status: 'Indented' },
        { outlet: 'Palle Ruchulu Gachibowli', qtyKg: Math.round(scaledFinishedWeightKg * 0.35), status: 'Indented' },
        { outlet: 'Palle Ruchulu Jubilee Hills', qtyKg: Math.round(scaledFinishedWeightKg * 0.20), status: 'Indented' }
      ]
    };

    setBatchesList([newBatch, ...batchesList]);
    showToast(`🍳 Central Kitchen Production Job Card #${newBatchId} created for ${targetPortions} portions of ${scalingRecipe.name}!`, 'success');
  };

  // -------------------------------------------------------------
  // SUB-MODULE 3: DAILY STOCK RECONCILIATION CALCULATOR (Page 10 Formula)
  // Formula: Opening + Receipts + Production - Sales - Transfers - Waste = Expected Closing
  // -------------------------------------------------------------
  const [reconciliationItems, setReconciliationItems] = useState([
    {
      id: 'REC-STOCK-1',
      itemName: 'Gongura Mutton Curry',
      outlet: 'Palle Ruchulu Madhapur',
      unit: 'kg',
      unitRate: 900, // ₹ per kg
      openingStock: 2.5,
      receivedFromKitchen: 14.0,
      inStoreProduction: 0.0,
      salesConsumption: 12.8,
      transfersOut: 0.0,
      recordedWastage: 0.3,
      physicalCount: 3.2,
      varianceReason: 'Minor portioning allowance',
      verified: true
    },
    {
      id: 'REC-STOCK-2',
      itemName: 'Andhra Chicken Curry',
      outlet: 'Palle Ruchulu Gachibowli',
      unit: 'kg',
      unitRate: 750,
      openingStock: 1.8,
      receivedFromKitchen: 12.0,
      inStoreProduction: 0.0,
      salesConsumption: 10.4,
      transfersOut: 0.0,
      recordedWastage: 0.2,
      physicalCount: 2.8,
      varianceReason: 'Pending evening check',
      verified: false
    },
    {
      id: 'REC-STOCK-3',
      itemName: 'Tomato Pappu (Dal)',
      outlet: 'Palle Ruchulu Jubilee Hills',
      unit: 'kg',
      unitRate: 350,
      openingStock: 3.0,
      receivedFromKitchen: 16.0,
      inStoreProduction: 0.0,
      salesConsumption: 14.2,
      transfersOut: 0.0,
      recordedWastage: 0.6,
      physicalCount: 4.1,
      varianceReason: 'Verified with kitchen supervisor',
      verified: true
    }
  ]);

  // -------------------------------------------------------------
  // SUB-MODULE 4: CONNECTED PROCURE-TO-PAY & TRACEABILITY
  // -------------------------------------------------------------
  const [traceSearchQuery, setTraceSearchQuery] = useState('BATCH-894');
  const [traceResult, setTraceResult] = useState({
    supplierLot: 'SUP-LOT #Dairy-992 (Farm Fresh Co-operative)',
    grnReceipt: 'GRN-Gate-4410 (Inspected & Cleared at 05:15 AM)',
    qualityCheck: 'PASSED • 3.8% Fat, Cold Temp 3.6°C, Zero Adulteration',
    productionBatch: 'BATCH-894 (Cooked at Madhapur Central Kitchen)',
    dispatchNote: 'DN-VAN-12 (Departed at 08:45 AM)',
    receivingOutlets: 'Palle Ruchulu Madhapur & Gachibowli',
    customerInvoices: 'INV-90412 (Deepak Varma) & POS Bills #1040-1045'
  });

  // -------------------------------------------------------------
  // SUB-MODULE 5: ACTION & RISK EXCEPTIONS INBOX
  // -------------------------------------------------------------
  const [exceptions, setExceptions] = useState([
    {
      id: 'EXP-101',
      title: 'Batch Yield Deviation Alert',
      detail: 'Batch #CK-894 Gongura Mutton yield is 2% below standard due to extra reduction simmer.',
      severity: 'Medium',
      assignedOwner: 'Head Chef Venkat Rao',
      deadline: 'Today, 2:00 PM',
      status: 'Open'
    },
    {
      id: 'EXP-102',
      title: 'Supplier 3-Way Invoice Mismatch',
      detail: 'Supplier Farm Fresh PO #PO-441 rate ₹68/L vs Invoice bill ₹72/L (₹420 difference).',
      severity: 'High',
      assignedOwner: 'Rajesh K. (Procurement Officer)',
      deadline: 'Today, 4:00 PM',
      status: 'Pending Approval'
    },
    {
      id: 'EXP-103',
      title: 'Food Safety Temperature Log Verification',
      detail: 'Gachibowli Hub Cold Room sensor logged 4.2°C at 4:00 AM (Target <4.0°C). Normalcy restored.',
      severity: 'Low',
      assignedOwner: 'Quality Auditor Sneha',
      deadline: 'Tomorrow, 10:00 AM',
      status: 'Verified'
    }
  ]);

  const resolveException = (expId) => {
    setExceptions(exceptions.map(e => e.id === expId ? { ...e, status: 'Resolved & Signed Off' } : e));
    showToast('✅ Exception signed off with audit log entry.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: MASTER MULTI-BRAND & LOCATION ENTITY SELECTOR          */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-white rounded-3xl border border-[#EDE1D1] p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE1D1] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7D0A14] text-amber-300 flex items-center justify-center font-black shadow-sm shrink-0">
              <Building2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-[#3D040A]">
                  Sumadhura 360° Enterprise Operations Suite
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                  ERP v4.2 Live
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Unified multi-entity visibility across Central Kitchens, Outlets, Retail, Catering & Delivery.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Active Branch:</span>
            <span className="px-3 py-1 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-[#7D0A14] font-black text-xs flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{activeBranch ? activeBranch.shortName : selectedEntity.shortName}</span>
            </span>
          </div>
        </div>

        {/* Active Branches & Add Branch Option */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {shopsList.map((shop) => {
            const isSelected = activeBranch?.id === shop.id;
            return (
              <button
                key={shop.id}
                type="button"
                onClick={() => {
                  if (onSelectShop) onSelectShop(shop);
                  showToast(`🏪 Switched ERP view to ${shop.shortName}`);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'border-[#7D0A14] bg-[#FAF5EC] ring-2 ring-[#7D0A14]/20 shadow-xs scale-[1.01]'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`p-1.5 rounded-xl ${isSelected ? 'bg-[#7D0A14] text-amber-300' : 'bg-slate-100 text-slate-700'}`}>
                      <Store className="w-4 h-4" />
                    </span>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-white border border-[#EDE1D1] text-[#7D0A14]">
                      {shop.branchCode}
                    </span>
                  </div>
                  <div className="font-black text-slate-900 text-xs truncate leading-snug">
                    {shop.shortName}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    Mgr: {shop.manager} • {shop.dispatchFleetCount || 6} Riders
                  </p>
                </div>

                <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold">
                  <span className="text-[#7D0A14]">₹{(shop.todayRevenue || 0).toLocaleString('en-IN')}</span>
                  <span className="text-emerald-700">{shop.ordersCount || 0} Orders</span>
                </div>
              </button>
            );
          })}

          {/* Add New Branch Card */}
          <button
            type="button"
            onClick={() => {
              if (onOpenAddBranch) onOpenAddBranch();
            }}
            className="p-3.5 rounded-2xl border-2 border-dashed border-[#7D0A14]/35 hover:border-[#7D0A14] bg-[#FAF5EC]/50 hover:bg-[#FAF5EC] text-left transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 min-h-[112px] group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <div className="font-black text-[#7D0A14] text-xs">Add Branch</div>
            <p className="text-[10px] text-slate-500 font-semibold">
              Create Branch {shopsList.length + 1}
            </p>
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: ERP FUNCTIONAL MODULE NAVIGATION TABS                  */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-[#EDE1D1] rounded-2xl shadow-2xs overflow-x-auto">
        {[
          { id: 'overview', label: "Owner's 360° Cockpit", icon: TrendingUp },
          { id: 'kitchen-production', label: 'Central Kitchen & Recipes', icon: Factory, badge: `${batchesList.length} Batches` },
          { id: 'curries-weight-pos', label: 'Curries-by-Weight POS', icon: Scale, badge: 'Tare Scale' },
          { id: 'stock-reconciliation', label: 'Daily Stock Audit Formula', icon: FileText, badge: 'Closing Audit' },
          { id: 'procure-to-pay', label: 'Procure-to-Pay & Traceability', icon: ShieldCheck },
          { id: 'exceptions', label: 'Risk & Action Inbox', icon: AlertTriangle, badge: `${exceptions.filter(e => e.status !== 'Resolved & Signed Off').length} Alert` }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeErpTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveErpTab(tab.id)}
              className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#7D0A14] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#FAF5EC]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-[#F5A623] text-[#3D040A]' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* TAB 1: OWNER'S 360° COMMAND COCKPIT                               */}
      {/* ----------------------------------------------------------------- */}
      {activeErpTab === 'overview' && (
        <div className="space-y-6">
          {/* Executive KPI Metric Tiles (PDF Section 4 Essential Information) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {/* Sales */}
            <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black text-slate-400">Today's Net Sales</span>
                <span className="p-1.5 rounded-lg bg-amber-100 text-[#7D0A14]">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#3D040A] mt-1">
                {activeBranch ? `₹${(activeBranch.todayRevenue || 0).toLocaleString('en-IN')}` : selectedEntity.todayTurnover}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-1">
                {activeBranch ? `${activeBranch.ordersCount || 0} Orders Today` : '↑ 14.2% vs target'} <span className="text-slate-400 font-normal">({activeBranch?.branchCode || 'MTD: ₹62.4L'})</span>
              </div>
            </div>

            {/* Profit Margin */}
            <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black text-slate-400">Gross Margin & Profit</span>
                <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-800 mt-1">
                {selectedEntity.margin}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-1">
                Food Cost: 31.8% <span className="text-slate-400 font-normal">(Target: 33%)</span>
              </div>
            </div>

            {/* Cash in Counter & Bank */}
            <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black text-slate-400">Cash in Counters</span>
                <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
                  <Receipt className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-blue-900 mt-1">
                {activeBranch ? `₹${Math.round((activeBranch.todayRevenue || 0) * 0.42).toLocaleString('en-IN')}` : selectedEntity.cashInCounters}
              </div>
              <div className="text-[11px] text-blue-700 font-bold mt-1">
                Fleet: {activeBranch?.dispatchFleetCount || 8} Riders • {activeBranch?.coldChainTemp || '3.8°C OK'}
              </div>
            </div>

            {/* Recorded Food Waste */}
            <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black text-slate-400">Daily Food Waste</span>
                <span className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
                  <AlertTriangle className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-rose-800 mt-1">
                ₹3,180
              </div>
              <div className="text-[11px] text-emerald-700 font-bold mt-1">
                1.28% of turnover <span className="text-slate-400 font-normal">(Benchmark &lt;2%)</span>
              </div>
            </div>
          </div>

          {/* Section: Outlets Ranking & Kitchen Dispatch Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Outlet Ranking & Financial Performance */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-[#7D0A14]" />
                  <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
                    Branches Live Sales & Cash Counter Summary
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-700">All {shopsList.length} Branches Active</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAF5EC] text-slate-700 font-extrabold border-b border-[#EDE1D1]">
                      <th className="p-2.5">Branch Location</th>
                      <th className="p-2.5">Today Sales</th>
                      <th className="p-2.5">Cash in Counter</th>
                      <th className="p-2.5">UPI / Card</th>
                      <th className="p-2.5">Orders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(shopsList.length > 0 ? shopsList : []).map((shop) => {
                      const rev = shop.todayRevenue || 0;
                      const cash = Math.round(rev * 0.42);
                      const digital = rev - cash;
                      return (
                        <tr
                          key={shop.id}
                          onClick={() => onSelectShop && onSelectShop(shop)}
                          className={`hover:bg-slate-50 cursor-pointer ${
                            activeBranch?.id === shop.id ? 'bg-[#FAF5EC]/70' : ''
                          }`}
                        >
                          <td className="p-2.5 font-black text-slate-900">
                            <div>{shop.shortName}</div>
                            <div className="text-[10px] font-medium text-slate-500">{shop.manager} • {shop.branchCode}</div>
                          </td>
                          <td className="p-2.5 font-extrabold text-[#7D0A14]">₹{rev.toLocaleString('en-IN')}</td>
                          <td className="p-2.5 font-bold text-slate-700">₹{cash.toLocaleString('en-IN')}</td>
                          <td className="p-2.5 font-bold text-slate-700">₹{digital.toLocaleString('en-IN')}</td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px]">
                              {shop.ordersCount || 0} / {shop.dailyCapacity || 400}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Branch Sales Contribution Breakdown */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#F5A623]" />
                  <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
                    Branch Sales Contribution
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-500">Today</span>
              </div>

              <div className="space-y-3 text-xs">
                {(() => {
                  const totalBranchRev = shopsList.reduce((acc, s) => acc + (s.todayRevenue || 0), 0);
                  const barColors = ['bg-[#7D0A14]', 'bg-[#F5A623]', 'bg-emerald-600', 'bg-blue-600', 'bg-purple-600'];
                  return shopsList.map((shop, idx) => {
                    const rev = shop.todayRevenue || 0;
                    const pct = totalBranchRev > 0 ? Math.round((rev / totalBranchRev) * 100) : 0;
                    const barColor = barColors[idx % barColors.length];
                    return (
                      <div
                        key={shop.id}
                        onClick={() => onSelectShop && onSelectShop(shop)}
                        className="space-y-1 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span className={`group-hover:text-[#7D0A14] transition-colors ${activeBranch?.id === shop.id ? 'text-[#7D0A14] font-black' : 'text-slate-800'}`}>
                            {shop.shortName}
                          </span>
                          <span className="text-[#3D040A] font-black">
                            ₹{rev.toLocaleString('en-IN')} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`${barColor} h-full rounded-full transition-all duration-300`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 2: CENTRAL KITCHEN RECIPES & BATCH PRODUCTION                 */}
      {/* ----------------------------------------------------------------- */}
      {activeErpTab === 'kitchen-production' && (
        <div className="space-y-6">
          {/* Recipe Scaling Calculator Tool */}
          <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE1D1] pb-3">
              <div>
                <h3 className="text-base font-black text-[#3D040A] flex items-center gap-2">
                  <Factory className="w-5 h-5 text-[#7D0A14]" />
                  <span>Central Kitchen Recipe Scaling & Ingredient Explosion</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Dynamically scales standard portion formulations to bulk kg batches with raw-to-cooked yield prediction.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Pick Recipe:</span>
                <select
                  value={scalingRecipe.id}
                  onChange={(e) => {
                    const found = RECIPES_MASTER.find(r => r.id === e.target.value);
                    if (found) setScalingRecipe(found);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-[#EDE1D1] bg-[#FAF5EC] font-bold text-xs text-[#7D0A14] focus:outline-none"
                >
                  {RECIPES_MASTER.map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.category})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scaling Control Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FAF5EC]/70 p-4 rounded-2xl border border-[#EDE1D1] text-xs">
              <div>
                <label className="font-extrabold text-slate-700 block mb-1">
                  Target Production Portions:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={targetPortions}
                    onChange={(e) => setTargetPortions(Math.max(10, parseInt(e.target.value) || 10))}
                    className="w-32 px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-black text-sm text-[#7D0A14] focus:outline-none"
                  />
                  <span className="font-bold text-slate-500">Portions</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Raw-to-Cooked Yield Ratio</span>
                <div className="font-black text-slate-900 text-sm mt-1">
                  {scalingRecipe.rawToCookedYieldRatio}x Expected cooked volume
                </div>
                <span className="text-[11px] text-emerald-700 font-bold">
                  Estimated Finished Batch: ~{scaledFinishedWeightKg} kg
                </span>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleLaunchProductionBatch}
                  className="px-5 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black text-xs flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <Factory className="w-4 h-4 text-amber-300" />
                  <span>Launch Batch #{Math.floor(896 + Math.random() * 20)}</span>
                </button>
              </div>
            </div>

            {/* Required Raw Ingredients Explosion Table */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                Required Raw Ingredients for {targetPortions} portions ({scaledFinishedWeightKg} kg)
              </span>
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAF5EC] text-slate-700 font-extrabold border-b border-[#EDE1D1]">
                      <th className="p-3">Raw Material / Ingredient</th>
                      <th className="p-3">Standard 10-Portion Qty</th>
                      <th className="p-3">Calculated Batch Requirement</th>
                      <th className="p-3">Current Warehouse Stock</th>
                      <th className="p-3">Inventory Clearance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scalingRecipe.ingredients.map((ing, idx) => {
                      const requiredAmount = (ing.stdQty * scaleMultiplier).toFixed(2);
                      const isStockSufficient = ing.inStock >= parseFloat(requiredAmount);
                      return (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{ing.name}</td>
                          <td className="p-3 text-slate-600 font-medium">{ing.stdQty} {ing.unit}</td>
                          <td className="p-3 font-black text-[#7D0A14] text-sm">{requiredAmount} {ing.unit}</td>
                          <td className="p-3 font-bold text-slate-800">{ing.inStock} {ing.unit}</td>
                          <td className="p-3">
                            {isStockSufficient ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] flex items-center gap-1 w-fit">
                                <Check className="w-3 h-3" /> Available in Store
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-black text-[10px] flex items-center gap-1 w-fit">
                                <AlertTriangle className="w-3 h-3" /> Shortfall (Indent Required)
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Active Production Batches & Outlet Dispatch Matrix */}
          <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#F5A623]" />
                <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
                  Central Kitchen Cooking Batches & Outlet Dispatch Allocation
                </h3>
              </div>
              <span className="text-xs font-bold text-purple-700">Lunch Shift Wave departing in 25 mins</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batchesList.map((batch) => (
                <div key={batch.id} className="p-4 rounded-2xl bg-[#FAF5EC]/60 border border-[#EDE1D1] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-md bg-[#7D0A14] text-amber-200 text-[10px] font-black">
                        {batch.id}
                      </span>
                      <h4 className="font-black text-slate-900 text-sm mt-1">{batch.recipeName}</h4>
                      <p className="text-[11px] text-slate-500">Cooked by: {batch.chef} • {batch.cookTime}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-[#7D0A14]">{batch.cookedYieldKg} kg</span>
                      <div className="text-[10px] text-slate-500 font-bold">{batch.portions} Portions</div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-800 mt-1">
                        ❄️ {batch.temp}
                      </span>
                    </div>
                  </div>

                  {/* Dispatch Notes Allocations */}
                  <div className="space-y-1.5 pt-2 border-t border-[#EDE1D1] text-xs">
                    <span className="text-[10px] uppercase font-black text-slate-400 block">
                      Hub-to-Outlet Dispatch Distribution:
                    </span>
                    {batch.allocations.map((alloc, i) => (
                      <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-[#EDE1D1]">
                        <span className="font-bold text-slate-800">{alloc.outlet}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-[#7D0A14]">{alloc.qtyKg} kg</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-900 border border-amber-200">
                            {alloc.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 3: CURRIES SOLD BY WEIGHT (PALLE RUCHULU POS TERMINAL)         */}
      {/* ----------------------------------------------------------------- */}
      {activeErpTab === 'curries-weight-pos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Weighing Scale Touch POS Terminal (Col 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#7D0A14]" />
                <div>
                  <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
                    Palle Ruchulu • Curries Sold by Weight POS
                  </h3>
                  <p className="text-[11px] text-slate-500">Live digital scale tare weight deduction & gram-based billing</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
                ● Scale Connected
              </span>
            </div>

            {/* Quick Item Selection Buttons */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase text-slate-500">Select Curry / Dish:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RECIPES_MASTER.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedCurry(item)}
                    className={`p-2.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      selectedCurry.id === item.id
                        ? 'border-[#7D0A14] bg-[#FAF5EC] ring-2 ring-[#7D0A14]/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-black text-xs text-slate-900 line-clamp-1">{item.name}</div>
                    <div className="text-[11px] font-black text-[#7D0A14] mt-1">₹{item.targetUnitRate} / 100g</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Weighing Scale Cockpit Box */}
            <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-4 shadow-inner">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>DIGITAL LOAD CELL SIMULATION</span>
                <span className="text-emerald-400 font-mono">PORT: COM4 (USB-SCALE)</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Gross Weight</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-amber-400 mt-1">
                    {scaleGrossWeight} g
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <button
                      type="button"
                      onClick={() => setScaleGrossWeight(prev => Math.max(50, prev - 50))}
                      className="px-2 py-0.5 rounded bg-slate-700 text-xs hover:bg-slate-600"
                    >-50g</button>
                    <button
                      type="button"
                      onClick={() => setScaleGrossWeight(prev => prev + 50)}
                      className="px-2 py-0.5 rounded bg-slate-700 text-xs hover:bg-slate-600"
                    >+50g</button>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Container Tare</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-rose-400 mt-1">
                    - {containerTareWeight} g
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-1">Auto-deducted</span>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-600/50">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Net Food Weight</span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-1">
                    {netWeightGrams} g
                  </div>
                  <span className="text-[10px] text-emerald-300 font-semibold block mt-1">
                    ({(netWeightGrams / 1000).toFixed(3)} kg)
                  </span>
                </div>
              </div>

              {/* Price Calculation Ribbon */}
              <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-300 block">Item: {selectedCurry.name}</span>
                  <span className="text-[11px] text-amber-300 font-bold">
                    Rate: ₹{selectedCurry.targetUnitRate} per 100g (₹{(selectedCurry.targetUnitRate * 10).toFixed(0)}/kg)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Total Payable</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">₹{calculatedCurryPrice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleCompleteWeightBill('Cash Counter')}
                  className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Pay Cash & Print Bill</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCompleteWeightBill('UPI Dynamic QR')}
                  className="py-3 rounded-2xl bg-[#F5A623] hover:bg-[#D98207] text-[#3D040A] font-black text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>UPI QR & Print Bill</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Real-time Weight Billing History & Batch Deductions (Col 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#7D0A14]" />
                <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
                  Recent Weight Bills & Stock Deduction
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500">Live Feed</span>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto">
              {weightBillingHistory.map((bill) => (
                <div key={bill.id} className="p-3.5 rounded-2xl bg-[#FAF5EC]/70 border border-[#EDE1D1] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-[#7D0A14] text-white text-[10px] font-black">
                      {bill.id}
                    </span>
                    <span className="text-xs font-black text-[#7D0A14]">₹{bill.total}</span>
                  </div>

                  <div className="font-bold text-slate-900 text-xs">{bill.curryName}</div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
                    <span>Net Wt: <strong className="text-slate-900">{bill.netWeight}</strong> ({bill.rate})</span>
                    <span className="text-emerald-700 font-bold">{bill.payMode}</span>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-200">
                    <span>{bill.outlet}</span>
                    <span>{bill.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 4: DAILY STOCK RECONCILIATION AUDIT (Formula from Page 10)     */}
      {/* ----------------------------------------------------------------- */}
      {activeErpTab === 'stock-reconciliation' && (
        <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE1D1] pb-3">
            <div>
              <h3 className="text-base font-black text-[#3D040A] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#7D0A14]" />
                <span>Daily Outlet Stock Reconciliation & Loss Investigation</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Mandatory formula: Opening + Inward Receipts + Cooking − Sales − Waste = Expected Closing Stock.
              </p>
            </div>

            <button
              type="button"
              onClick={() => showToast('📥 Daily Stock Reconciliation Report exported as CSV/PDF.')}
              className="px-3.5 py-1.5 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-[#7D0A14] font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer hover:bg-[#F3EAD9]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full min-w-[750px] text-left text-xs">
              <thead>
                <tr className="bg-[#FAF5EC] text-slate-700 font-extrabold border-b border-[#EDE1D1]">
                  <th className="p-3">Item & Location</th>
                  <th className="p-3">Opening</th>
                  <th className="p-3">+ Kitchen Inward</th>
                  <th className="p-3">- Billed Sales</th>
                  <th className="p-3">- Recorded Waste</th>
                  <th className="p-3">= Expected Closing</th>
                  <th className="p-3">Physical Count</th>
                  <th className="p-3">Variance</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reconciliationItems.map((row) => {
                  const expectedClosing = (
                    row.openingStock +
                    row.receivedFromKitchen +
                    row.inStoreProduction -
                    row.salesConsumption -
                    row.transfersOut -
                    row.recordedWastage
                  ).toFixed(1);

                  const diff = (row.physicalCount - parseFloat(expectedClosing)).toFixed(1);
                  const varianceValue = Math.round(parseFloat(diff) * row.unitRate);
                  const isMatch = Math.abs(parseFloat(diff)) < 0.1;

                  return (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">
                        <div>{row.itemName}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{row.outlet}</div>
                      </td>
                      <td className="p-3 text-slate-700">{row.openingStock} {row.unit}</td>
                      <td className="p-3 text-emerald-700 font-bold">+{row.receivedFromKitchen} {row.unit}</td>
                      <td className="p-3 text-blue-700 font-bold">-{row.salesConsumption} {row.unit}</td>
                      <td className="p-3 text-rose-700 font-bold">-{row.recordedWastage} {row.unit}</td>
                      <td className="p-3 font-black text-slate-900 bg-slate-50/50">{expectedClosing} {row.unit}</td>
                      <td className="p-3 font-black text-[#7D0A14]">{row.physicalCount} {row.unit}</td>
                      <td className="p-3">
                        <span className={`font-black text-xs ${parseFloat(diff) < 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                          {diff} {row.unit}
                          <span className="block text-[10px] font-medium">({varianceValue < 0 ? `-₹${Math.abs(varianceValue)}` : `+₹${varianceValue}`})</span>
                        </span>
                      </td>
                      <td className="p-3">
                        {isMatch ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                            ✓ Balanced
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
                            ⚠️ Under Review
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 5: CONNECTED PROCURE-TO-PAY & BATCH TRACEABILITY              */}
      {/* ----------------------------------------------------------------- */}
      {activeErpTab === 'procure-to-pay' && (
        <div className="space-y-6">
          {/* Visual End-to-End Pipeline */}
          <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4">
            <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
              Connected Workflow Audit: Procure-to-Pay (3-Way Invoice Match)
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              {[
                { step: '1. Requisition', title: 'Indent #PR-881', desc: 'Central Kitchen Milk', status: 'Completed' },
                { step: '2. Approval', title: 'Tier 2 Approved', desc: 'By Purchase Head', status: 'Completed' },
                { step: '3. Purchase Order', title: 'PO #PO-4412', desc: 'Farm Fresh Dairy', status: 'Completed' },
                { step: '4. Gate Receipt', title: 'GRN #GR-1044', desc: '1,200L Inward', status: 'Completed' },
                { step: '5. Quality Check', title: 'QC Passed', desc: '3.8% Fat Verified', status: 'Completed' },
                { step: '6. Payment Match', title: '3-Way Match OK', desc: 'Passed to Bank Voucher', status: 'Ready for Payout' }
              ].map((st, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#FAF5EC]/70 border border-[#EDE1D1] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{st.step}</span>
                  <div className="font-black text-slate-900">{st.title}</div>
                  <p className="text-[10px] text-slate-500">{st.desc}</p>
                  <span className="inline-block px-2 py-0.2 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-800">
                    {st.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instant Batch Traceability Tree */}
          <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE1D1] pb-3">
              <div>
                <h3 className="font-black text-sm sm:text-base text-[#3D040A] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>1-Click Backward & Forward Traceability Engine</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Trace any complaint or defect instantly from supplier lot to kitchen batch to customer invoice.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={traceSearchQuery}
                  onChange={(e) => setTraceSearchQuery(e.target.value)}
                  placeholder="Enter Batch ID or Order ID..."
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => showToast(`🔍 Traceability Tree loaded for ${traceSearchQuery}`)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#7D0A14] text-white font-black text-xs cursor-pointer shadow-xs"
                >
                  Trace
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>TRACE RESULT FOR BATCH #{traceSearchQuery}</span>
              </div>
              <div className="space-y-2 border-l-2 border-slate-700 pl-4 ml-2">
                <div>🌾 <span className="text-slate-400">Supplier Lot:</span> <strong className="text-amber-300">{traceResult.supplierLot}</strong></div>
                <div>📦 <span className="text-slate-400">Gate Receipt:</span> <strong className="text-white">{traceResult.grnReceipt}</strong></div>
                <div>🔬 <span className="text-slate-400">Quality Check:</span> <strong className="text-emerald-400">{traceResult.qualityCheck}</strong></div>
                <div>🍳 <span className="text-slate-400">Kitchen Cooking:</span> <strong className="text-amber-300">{traceResult.productionBatch}</strong></div>
                <div>🚚 <span className="text-slate-400">Dispatch Note:</span> <strong className="text-white">{traceResult.dispatchNote}</strong></div>
                <div>🏪 <span className="text-slate-400">Destination:</span> <strong className="text-white">{traceResult.receivingOutlets}</strong></div>
                <div>🧾 <span className="text-slate-400">Customer Bills:</span> <strong className="text-cyan-300">{traceResult.customerInvoices}</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* TAB 6: RISK, INTERNAL CONTROL & ACTION EXCEPTIONS INBOX          */}
      {/* ----------------------------------------------------------------- */}
      {activeErpTab === 'exceptions' && (
        <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
            <div>
              <h3 className="font-black text-sm sm:text-base text-[#3D040A] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-700" />
                <span>Action & Risk Exceptions Inbox</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Every exception has an assigned owner, deadline, impact analysis, and audit tracking.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {exceptions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-[#FAF5EC]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[#7D0A14]">{item.id}</span>
                    <span className={`px-2 py-0.2 rounded-md font-black text-[9px] ${
                      item.severity === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {item.severity} Severity
                    </span>
                    <h4 className="font-black text-slate-900">{item.title}</h4>
                  </div>
                  <p className="text-slate-600">{item.detail}</p>
                  <div className="text-[11px] text-slate-500 font-bold flex items-center gap-3 pt-1">
                    <span>Owner: <strong className="text-slate-800">{item.assignedOwner}</strong></span>
                    <span>•</span>
                    <span>Deadline: <strong className="text-[#7D0A14]">{item.deadline}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.status === 'Resolved & Signed Off' ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs">
                      ✓ Resolved
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => resolveException(item.id)}
                      className="px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black text-xs shadow-xs cursor-pointer active:scale-95 transition-all"
                    >
                      Sign-Off & Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ErpSuite;

