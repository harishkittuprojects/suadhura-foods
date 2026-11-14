import React, { useState, useMemo, useEffect } from 'react';
import {
  Landmark,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Receipt,
  FileText,
  Calendar,
  Filter,
  Search,
  Plus,
  Printer,
  CheckCircle2,
  Clock,
  Building2,
  Store,
  PieChart,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  X,
  Save,
  Wallet
} from 'lucide-react';

const STORAGE_KEY = 'sumadhura_finance_ledger_v1';

// Initial realistic ledger entries for Sumadhura Foods
const INITIAL_LEDGER = [
  {
    id: 'TXN-9021',
    date: '2026-11-13',
    type: 'income',
    category: 'B2B Wholesale Sales',
    description: 'Bulk Organic Ghee & Masalas Supply — Taj Vivanta Hotels',
    branch: 'Branch 3 (Jubilee Hills)',
    account: 'HDFC Corporate Current A/C',
    amount: 84500,
    refNo: 'INV-2026-1102',
    status: 'reconciled'
  },
  {
    id: 'TXN-9020',
    date: '2026-11-13',
    type: 'income',
    category: 'B2C Counter Retail',
    description: 'Daily Cash Counter & UPI Net Collections',
    branch: 'Branch 1 (Madhapur)',
    account: 'Cash Till Register',
    amount: 28450,
    refNo: 'POS-SMD-001-20261113',
    status: 'reconciled'
  },
  {
    id: 'TXN-9019',
    date: '2026-11-12',
    type: 'expense',
    category: 'Dairy & Milk Procurement',
    description: 'Fresh Grass-fed Milk 450L & Butter — Vijaya Dairy Co-op',
    branch: 'Branch 1 (Madhapur)',
    account: 'ICICI Operations A/C',
    amount: 32400,
    refNo: 'BILL-VIJ-8842',
    status: 'reconciled'
  },
  {
    id: 'TXN-9018',
    date: '2026-11-12',
    type: 'expense',
    category: 'Biodegradable Packaging',
    description: 'Eco Sweet Boxes, Food Grade Liners & Pouches (5,000 pcs)',
    branch: 'Branch 2 (Gachibowli)',
    account: 'HDFC Corporate Current A/C',
    amount: 18500,
    refNo: 'PO-PKG-2026-44',
    status: 'reconciled'
  },
  {
    id: 'TXN-9017',
    date: '2026-11-11',
    type: 'income',
    category: 'B2C Online Deliveries',
    description: 'Payment Gateway Settlement — Razorpay Online Orders',
    branch: 'Branch 2 (Gachibowli)',
    account: 'Razorpay Escrow A/C',
    amount: 41200,
    refNo: 'RZP-SETTLE-88190',
    status: 'reconciled'
  },
  {
    id: 'TXN-9016',
    date: '2026-11-10',
    type: 'expense',
    category: 'Staff Wages & Payroll',
    description: 'Bi-Weekly Shift Wages Payout for Production Staff (6 Members)',
    branch: 'Branch 3 (Jubilee Hills)',
    account: 'HDFC Corporate Current A/C',
    amount: 62400,
    refNo: 'PAYROLL-NOV-W1',
    status: 'reconciled'
  },
  {
    id: 'TXN-9015',
    date: '2026-11-09',
    type: 'expense',
    category: 'Kitchen Fuel & Utilities',
    description: 'Commercial Gas Cylinders & Cold Room Power Tariff',
    branch: 'Branch 1 (Madhapur)',
    account: 'HDFC Corporate Current A/C',
    amount: 14800,
    refNo: 'UTIL-HYD-5512',
    status: 'reconciled'
  },
  {
    id: 'TXN-9014',
    date: '2026-11-08',
    type: 'income',
    category: 'Catering Advance',
    description: '50% Advance for Corporate Banquet (Infosys Hyderabad Campus)',
    branch: 'Branch 2 (Gachibowli)',
    account: 'HDFC Corporate Current A/C',
    amount: 65000,
    refNo: 'CAT-2026-092',
    status: 'reconciled'
  },
  {
    id: 'TXN-9013',
    date: '2026-11-07',
    type: 'expense',
    category: 'Fleet Fuel & EV Charging',
    description: 'Weekly Express Rider Fleet Fuel & Battery Swaps',
    branch: 'Branch 2 (Gachibowli)',
    account: 'ICICI Operations A/C',
    amount: 8600,
    refNo: 'FLEET-LOG-102',
    status: 'reconciled'
  },
  {
    id: 'TXN-9012',
    date: '2026-11-06',
    type: 'expense',
    category: 'Farm Produce & Sourcing',
    description: 'Direct Farm Guntur Red Chillies, Organic Jaggery & Dry Fruits',
    branch: 'Branch 3 (Jubilee Hills)',
    account: 'HDFC Corporate Current A/C',
    amount: 48900,
    refNo: 'FARM-DIR-4421',
    status: 'reconciled'
  }
];

// Branch Specific Financial Baselines (audited November 2026)
const BRANCH_FINANCIALS = {
  'Branch 1': {
    name: 'Branch 1 (Madhapur)',
    branchCode: 'SMD-HYD-001',
    area: 'Tech District (Hitech City)',
    turnover: 542000,
    retailRev: 340000,
    wholesaleRev: 162000,
    cateringRev: 40000,
    cogs: 238000,
    rawProduce: 115000,
    dairyGhee: 78000,
    packaging: 45000,
    opex: 148000,
    payroll: 88000,
    utilities: 19000,
    fleetFuel: 24000,
    rent: 17000,
    netProfit: 156000,
    margin: '28.8%',
    receivables: 48000,
    payables: 31000
  },
  'Branch 2': {
    name: 'Branch 2 (Gachibowli)',
    branchCode: 'SMD-HYD-002',
    area: 'Financial District & Residential Hub',
    turnover: 488000,
    retailRev: 280000,
    wholesaleRev: 158000,
    cateringRev: 50000,
    cogs: 214000,
    rawProduce: 102000,
    dairyGhee: 71000,
    packaging: 41000,
    opex: 136000,
    payroll: 81000,
    utilities: 17400,
    fleetFuel: 22000,
    rent: 15600,
    netProfit: 138000,
    margin: '28.3%',
    receivables: 52000,
    payables: 28500
  },
  'Branch 3': {
    name: 'Branch 3 (Jubilee Hills)',
    branchCode: 'SMD-HYD-003',
    area: 'Gourmet Flagship & Heritage Sourcing',
    turnover: 455200,
    retailRev: 195400,
    wholesaleRev: 225800,
    cateringRev: 34000,
    cogs: 200000,
    rawProduce: 93000,
    dairyGhee: 66000,
    packaging: 41000,
    opex: 131400,
    payroll: 76600,
    utilities: 16000,
    fleetFuel: 22400,
    rent: 16400,
    netProfit: 123800,
    margin: '27.2%',
    receivables: 42000,
    payables: 26000
  }
};

export const FinanceAccounts = ({ shopsList = [], currentShop = null, showToast = () => {} }) => {
  // Persistence for ledger entries
  const [ledger, setLedger] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_LEDGER;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ledger));
    } catch {}
  }, [ledger]);

  // Active view inside Finance: 'overview' (P&L Summary), 'ledger' (Transactions), 'branches' (Branch P&L), 'gst' (Tax Filing)
  const [activeTab, setActiveTab] = useState('overview');

  // Branch Scope Selection: 'all' | 'Branch 1' | 'Branch 2' | 'Branch 3'
  const [selectedBranch, setSelectedBranch] = useState('all');

  // Search & Type Filters for Ledger
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // New Transaction Modal
  const [isNewTxnOpen, setIsNewTxnOpen] = useState(false);
  const [newTxn, setNewTxn] = useState({
    type: 'expense',
    category: 'Dairy & Milk Procurement',
    description: '',
    branch: 'Branch 1 (Madhapur)',
    account: 'HDFC Corporate Current A/C',
    amount: '',
    refNo: '',
    date: '2026-11-14'
  });

  // Calculate dynamic metrics based on selected branch
  const currentMetrics = useMemo(() => {
    if (selectedBranch !== 'all' && BRANCH_FINANCIALS[selectedBranch]) {
      const b = BRANCH_FINANCIALS[selectedBranch];
      const grossProfit = b.turnover - b.cogs;
      return {
        isConsolidated: false,
        branchName: b.name,
        branchCode: b.branchCode,
        area: b.area,
        turnover: b.turnover,
        retailRev: b.retailRev,
        wholesaleRev: b.wholesaleRev,
        cateringRev: b.cateringRev,
        cogs: b.cogs,
        rawProduce: b.rawProduce,
        dairyGhee: b.dairyGhee,
        packaging: b.packaging,
        grossProfit,
        grossMargin: '56.1%',
        opex: b.opex,
        payroll: b.payroll,
        utilities: b.utilities,
        fleetFuel: b.fleetFuel,
        rent: b.rent,
        netProfit: b.netProfit,
        netMargin: b.margin,
        receivables: b.receivables,
        payables: b.payables
      };
    }

    // Consolidated across all branches
    const totalTurnover = 1485200;
    const totalCogs = 652000;
    const totalOpex = 415400;
    const grossProfit = totalTurnover - totalCogs;
    const netProfit = grossProfit - totalOpex;
    const netMargin = ((netProfit / totalTurnover) * 100).toFixed(1);

    return {
      isConsolidated: true,
      branchName: 'All Branches Consolidated',
      branchCode: 'SMD-GROUP-HYD',
      area: 'Unified Multi-Branch Operations',
      turnover: totalTurnover,
      retailRev: 815400,
      wholesaleRev: 545800,
      cateringRev: 124000,
      cogs: totalCogs,
      rawProduce: 310000,
      dairyGhee: 215000,
      packaging: 127000,
      grossProfit,
      grossMargin: '56.1%',
      opex: totalOpex,
      payroll: 245600,
      utilities: 52400,
      fleetFuel: 68400,
      rent: 49000,
      netProfit,
      netMargin: `${netMargin}%`,
      receivables: 142000,
      payables: 85500
    };
  }, [selectedBranch]);

  // Filtered Ledger based on branch and search
  const filteredLedger = useMemo(() => {
    return ledger.filter((item) => {
      const matchSearch =
        searchQuery === '' ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = typeFilter === 'all' || item.type === typeFilter;
      const matchBranch = selectedBranch === 'all' || item.branch.includes(selectedBranch);

      return matchSearch && matchType && matchBranch;
    });
  }, [ledger, searchQuery, typeFilter, selectedBranch]);

  // Handle Add Transaction
  const handleAddTxn = (e) => {
    e.preventDefault();
    if (!newTxn.description.trim() || !newTxn.amount) {
      showToast('⚠️ Please enter description and amount', 'error');
      return;
    }

    const nextId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    const created = {
      id: nextId,
      date: newTxn.date || new Date().toISOString().split('T')[0],
      type: newTxn.type,
      category: newTxn.category,
      description: newTxn.description.trim(),
      branch: newTxn.branch,
      account: newTxn.account,
      amount: Number(newTxn.amount),
      refNo: newTxn.refNo || `VOUCH-${nextId}`,
      status: 'reconciled'
    };

    setLedger([created, ...ledger]);
    showToast(`✅ Successfully posted ${newTxn.type === 'income' ? 'Income' : 'Expense'} record (₹${created.amount.toLocaleString()}) for ${newTxn.branch}!`, 'success');
    setIsNewTxnOpen(false);
    setNewTxn({
      type: 'expense',
      category: 'Dairy & Milk Procurement',
      description: '',
      branch: 'Branch 1 (Madhapur)',
      account: 'HDFC Corporate Current A/C',
      amount: '',
      refNo: '',
      date: '2026-11-14'
    });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Top Header Banner */}
      <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs shrink-0">
            <Wallet className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#3D040A] tracking-tight">
                Finance & Corporate Accounts
              </h2>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                FY 2026-27 Active
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Audited P&L statements, branch profitability breakdowns, general ledger journals, and GST filing reconciliation.
            </p>
          </div>
        </div>

        {/* View Switcher & Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-[#FAF5EC] p-1 rounded-2xl border border-[#EDE1D1]">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#7D0A14] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#7D0A14]'
              }`}
            >
              P&L Statement
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ledger')}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeTab === 'ledger'
                  ? 'bg-[#7D0A14] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#7D0A14]'
              }`}
            >
              General Ledger
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('branches')}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeTab === 'branches'
                  ? 'bg-[#7D0A14] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#7D0A14]'
              }`}
            >
              Branch Comparison
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('gst')}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeTab === 'gst'
                  ? 'bg-[#7D0A14] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#7D0A14]'
              }`}
            >
              GST Tax Audit
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsNewTxnOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Record Entry</span>
          </button>
        </div>
      </div>

      {/* 2. DEDICATED BRANCH-WISE SEPARATION CONTROLLER ("separately after branch wise") */}
      <div className="bg-[#FAF5EC] rounded-2xl border border-[#EDE1D1] p-3.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4 text-[#7D0A14] shrink-0" />
          <span className="text-xs font-black text-[#3D040A]">
            Branch Accounting Scope:
          </span>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            (Filter all finances by individual branch or consolidated)
          </span>
        </div>

        {/* Branch Scope Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedBranch('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
              selectedBranch === 'all'
                ? 'bg-[#7D0A14] text-amber-300 border-[#7D0A14] shadow-xs scale-102'
                : 'bg-white text-slate-700 hover:text-[#7D0A14] border-[#EDE1D1]'
            }`}
          >
            🌐 All Branches Consolidated
          </button>

          <button
            type="button"
            onClick={() => setSelectedBranch('Branch 1')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
              selectedBranch === 'Branch 1'
                ? 'bg-[#7D0A14] text-amber-300 border-[#7D0A14] shadow-xs scale-102'
                : 'bg-white text-slate-700 hover:text-[#7D0A14] border-[#EDE1D1]'
            }`}
          >
            🏪 Branch 1 (Madhapur)
          </button>

          <button
            type="button"
            onClick={() => setSelectedBranch('Branch 2')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
              selectedBranch === 'Branch 2'
                ? 'bg-[#7D0A14] text-amber-300 border-[#7D0A14] shadow-xs scale-102'
                : 'bg-white text-slate-700 hover:text-[#7D0A14] border-[#EDE1D1]'
            }`}
          >
            🏪 Branch 2 (Gachibowli)
          </button>

          <button
            type="button"
            onClick={() => setSelectedBranch('Branch 3')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
              selectedBranch === 'Branch 3'
                ? 'bg-[#7D0A14] text-amber-300 border-[#7D0A14] shadow-xs scale-102'
                : 'bg-white text-slate-700 hover:text-[#7D0A14] border-[#EDE1D1]'
            }`}
          >
            🏪 Branch 3 (Jubilee Hills)
          </button>
        </div>
      </div>

      {/* 3. Top Summary KPI Cards (Dynamic to Selected Branch) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Gross Revenue */}
        <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black text-slate-400">
              {currentMetrics.isConsolidated ? 'Total Turnover' : `${currentMetrics.branchName.split(' ')[0]} ${currentMetrics.branchName.split(' ')[1]} Sales`}
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#3D040A] mt-1">
            ₹{currentMetrics.turnover.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            {currentMetrics.isConsolidated ? '+14.8% MTD Growth' : currentMetrics.area}
          </div>
        </div>

        {/* Operating Costs */}
        <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black text-slate-400">Operating Expenses</span>
            <span className="p-1.5 rounded-lg bg-amber-100 text-[#7D0A14]">
              <Receipt className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-amber-900 mt-1">
            ₹{currentMetrics.opex.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Payroll: ₹{currentMetrics.payroll.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Net Profit & Margin */}
        <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black text-slate-400">Net Branch Profit</span>
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-800">
              <PieChart className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-purple-900 mt-1">
            ₹{currentMetrics.netProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-purple-700 font-black mt-1">
            {currentMetrics.netMargin} Operating Margin
          </div>
        </div>

        {/* Working Capital / Receivables */}
        <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black text-slate-400">Branch Cashflow</span>
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
              <Wallet className="w-4 h-4" />
            </span>
          </div>
          <div className="text-xs font-black text-slate-800 mt-1 space-y-0.5">
            <div className="flex justify-between">
              <span className="text-emerald-700 font-bold">A/R Dues:</span>
              <span>₹{currentMetrics.receivables.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-700 font-bold">A/P Vendor:</span>
              <span>₹{currentMetrics.payables.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="text-[10px] text-emerald-700 font-bold mt-1">
            +₹{(currentMetrics.receivables - currentMetrics.payables).toLocaleString('en-IN')} Liquidity Buffer
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW 1: PROFIT & LOSS STATEMENT (FILTERED BY BRANCH)     */}
      {/* ========================================================= */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE1D1] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-[#3D040A]">
                  Profit & Loss Statement: {currentMetrics.branchName}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF5EC] border border-[#EDE1D1] text-[#7D0A14] font-bold">
                  {currentMetrics.branchCode}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Audited statement for November 2026. Reflects revenue, direct COGS, and localized operating expenses.
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EDE1D1] bg-[#FAF5EC] text-[#7D0A14] font-bold text-xs hover:bg-[#F3EAD9] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print {selectedBranch === 'all' ? 'Consolidated' : selectedBranch} P&L</span>
            </button>
          </div>

          {/* Structured P&L Table */}
          <div className="space-y-4 text-xs sm:text-sm">
            {/* Revenue Block */}
            <div className="rounded-2xl border border-[#EDE1D1] overflow-hidden">
              <div className="bg-[#FAF5EC] px-4 py-2.5 font-black text-[#7D0A14] flex justify-between items-center text-xs uppercase tracking-wide">
                <span>1. Operating Revenue Channels</span>
                <span>Amount (₹)</span>
              </div>
              <div className="divide-y divide-slate-100 bg-white">
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-700">B2C Retail Counter & Online Orders</span>
                  <span className="font-black text-slate-900">₹{currentMetrics.retailRev.toLocaleString('en-IN')}</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-700">B2B Wholesale & Client Slabs</span>
                  <span className="font-black text-slate-900">₹{currentMetrics.wholesaleRev.toLocaleString('en-IN')}</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-700">Corporate Catering & Banquets</span>
                  <span className="font-black text-slate-900">₹{currentMetrics.cateringRev.toLocaleString('en-IN')}</span>
                </div>
                <div className="px-4 py-3 bg-[#FAF5EC]/50 flex justify-between font-black text-slate-900 text-sm">
                  <span>Gross Operating Sales</span>
                  <span className="text-[#7D0A14]">₹{currentMetrics.turnover.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Direct COGS Block */}
            <div className="rounded-2xl border border-[#EDE1D1] overflow-hidden">
              <div className="bg-[#FAF5EC] px-4 py-2.5 font-black text-[#7D0A14] flex justify-between items-center text-xs uppercase tracking-wide">
                <span>2. Cost of Goods Sold (Direct Procurement)</span>
                <span>Amount (₹)</span>
              </div>
              <div className="divide-y divide-slate-100 bg-white">
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-700">Raw Produce, Grains & Sourcing</span>
                  <span className="font-black text-slate-900">₹{currentMetrics.rawProduce.toLocaleString('en-IN')}</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-700">Pure Ghee, Dairy & Cold-Chain Milk</span>
                  <span className="font-black text-slate-900">₹{currentMetrics.dairyGhee.toLocaleString('en-IN')}</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-700">Biodegradable Packaging & Sweet Boxes</span>
                  <span className="font-black text-slate-900">₹{currentMetrics.packaging.toLocaleString('en-IN')}</span>
                </div>
                <div className="px-4 py-3 bg-[#FAF5EC]/50 flex justify-between font-black text-emerald-900 text-sm">
                  <span>Gross Margin Profit ({currentMetrics.grossMargin})</span>
                  <span className="text-emerald-800">₹{currentMetrics.grossProfit.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Operating Expenses Block */}
            <div className="rounded-2xl border border-[#EDE1D1] overflow-hidden">
              <div className="bg-[#FAF5EC] px-4 py-2.5 font-black text-[#7D0A14] flex justify-between items-center text-xs uppercase tracking-wide">
                <span>3. Operating Overhead (OpEx)</span>
                <span>Amount (₹)</span>
              </div>
              <div className="divide-y divide-slate-100 bg-white">
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-700">Branch Staff & Kitchen Payroll</span>
                  <span className="font-black text-slate-900">₹{currentMetrics.payroll.toLocaleString('en-IN')}</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-700">Kitchen Power, Gas & Cold Storage</span>
                  <span className="font-black text-slate-900">₹{currentMetrics.utilities.toLocaleString('en-IN')}</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-700">Fleet Fuel, EV Charging & Logistics</span>
                  <span className="font-black text-slate-900">₹{currentMetrics.fleetFuel.toLocaleString('en-IN')}</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="font-semibold text-slate-700">Premises Lease Rental</span>
                  <span className="font-black text-slate-900">₹{currentMetrics.rent.toLocaleString('en-IN')}</span>
                </div>
                <div className="px-4 py-3 bg-[#FAF5EC]/50 flex justify-between font-black text-rose-900 text-sm">
                  <span>Total Operating Expenses</span>
                  <span className="text-rose-800">₹{currentMetrics.opex.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Net Bottom Line Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#7D0A14] to-[#4D060D] text-white flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[11px] uppercase font-bold text-amber-200 block">
                  Net {selectedBranch === 'all' ? 'Corporate' : selectedBranch} Profit (EBITDA)
                </span>
                <span className="text-2xl font-black">
                  ₹{currentMetrics.netProfit.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-amber-200 font-bold block">Profit Margin</span>
                <span className="text-2xl font-black text-amber-300">
                  {currentMetrics.netMargin}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: GENERAL LEDGER (FILTERED BY BRANCH)              */}
      {/* ========================================================= */}
      {activeTab === 'ledger' && (
        <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-4 shadow-xs">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-[#EDE1D1] pb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ledger by voucher, category, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-[#FAF5EC] border border-[#EDE1D1] rounded-xl text-xs font-semibold text-[#3D040A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 bg-[#FAF5EC] border border-[#EDE1D1] rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="all">All Cashflow</option>
                <option value="income">Credit (+ Inflow)</option>
                <option value="expense">Debit (− Outflow)</option>
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#EDE1D1]">
            <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#FAF5EC] text-slate-700 font-extrabold border-b border-[#EDE1D1]">
                  <th className="p-3.5 min-w-[120px]">Date & Voucher</th>
                  <th className="p-3.5 min-w-[220px]">Description & Category</th>
                  <th className="p-3.5 min-w-[150px]">Branch Hub</th>
                  <th className="p-3.5 min-w-[150px]">Account / Mode</th>
                  <th className="p-3.5 text-right min-w-[110px]">Amount (₹)</th>
                  <th className="p-3.5 text-center min-w-[90px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLedger.length > 0 ? (
                  filteredLedger.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5">
                        <div className="font-mono font-black text-xs text-[#7D0A14]">{t.id}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{t.date}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{t.refNo}</div>
                      </td>

                      <td className="p-3.5">
                        <div className="font-black text-slate-900">{t.description}</div>
                        <div className="text-[11px] font-bold text-amber-800 mt-0.5">
                          {t.category}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-xs text-slate-800 flex items-center gap-1">
                          <Store className="w-3.5 h-3.5 text-[#7D0A14] shrink-0" />
                          <span>{t.branch}</span>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                          {t.account}
                        </span>
                      </td>

                      <td className="p-3.5 text-right font-black text-sm">
                        {t.type === 'income' ? (
                          <span className="text-emerald-700 font-black flex items-center justify-end gap-1">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            +₹{t.amount.toLocaleString('en-IN')}
                          </span>
                        ) : (
                          <span className="text-rose-700 font-black flex items-center justify-end gap-1">
                            <ArrowDownRight className="w-3.5 h-3.5" />
                            −₹{t.amount.toLocaleString('en-IN')}
                          </span>
                        )}
                      </td>

                      <td className="p-3.5 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Audit Pass
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-400 font-medium">
                      No financial transactions match your current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 3: FULL BRANCH-BY-BRANCH COMPARISON MATRIX           */}
      {/* ========================================================= */}
      {activeTab === 'branches' && (
        <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-6 shadow-xs">
          <div className="border-b border-[#EDE1D1] pb-3">
            <h3 className="font-black text-lg text-[#3D040A]">
              Branch-by-Branch Comparative Financial Matrix
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Side-by-side comparison of sales revenue, raw COGS, operating overhead, and take-home margin across all 3 hubs.
            </p>
          </div>

          {/* Cards for each branch */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(BRANCH_FINANCIALS).map(([key, b]) => (
              <div
                key={key}
                onClick={() => {
                  setSelectedBranch(key);
                  setActiveTab('overview');
                  showToast(`📊 Filtered P&L for ${b.name}`);
                }}
                className={`rounded-2xl border p-4 transition-all cursor-pointer hover:shadow-md ${
                  selectedBranch === key
                    ? 'border-[#7D0A14] bg-[#FAF5EC] ring-2 ring-[#7D0A14]/20'
                    : 'border-[#EDE1D1] bg-white hover:border-[#7D0A14]/40'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#EDE1D1]">
                  <div>
                    <h4 className="font-black text-base text-[#3D040A]">{b.name}</h4>
                    <span className="text-[10px] font-mono text-[#7D0A14] font-bold">{b.branchCode}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                    {b.margin} Margin
                  </span>
                </div>

                <div className="space-y-2 text-xs pt-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Gross Turnover:</span>
                    <span className="font-black text-slate-900">₹{b.turnover.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Retail Counters:</span>
                    <span className="font-semibold text-slate-800">₹{b.retailRev.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>B2B Wholesale:</span>
                    <span className="font-semibold text-slate-800">₹{b.wholesaleRev.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Direct COGS:</span>
                    <span className="font-semibold text-slate-800">₹{b.cogs.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>OpEx & Payroll:</span>
                    <span className="font-semibold text-slate-800">₹{b.opex.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-[#EDE1D1] flex justify-between font-black text-emerald-800 text-sm">
                    <span>Net Profit:</span>
                    <span>₹{b.netProfit.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 text-center text-[11px] font-black text-[#7D0A14] hover:underline">
                  Click to inspect full P&L statement →
                </div>
              </div>
            ))}
          </div>

          {/* Side-by-Side Detailed Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#EDE1D1] mt-4">
            <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#FAF5EC] text-slate-700 font-extrabold border-b border-[#EDE1D1]">
                  <th className="p-3.5">Financial Metric</th>
                  <th className="p-3.5 text-right font-black text-slate-900">Branch 1 (Madhapur)</th>
                  <th className="p-3.5 text-right font-black text-slate-900">Branch 2 (Gachibowli)</th>
                  <th className="p-3.5 text-right font-black text-slate-900">Branch 3 (Jubilee Hills)</th>
                  <th className="p-3.5 text-right font-black text-[#7D0A14] bg-[#F5EAD9]/60">Total Consolidated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="p-3 font-bold text-slate-800">Gross Sales Turnover</td>
                  <td className="p-3 text-right font-black text-slate-900">₹5,42,000</td>
                  <td className="p-3 text-right font-black text-slate-900">₹4,88,000</td>
                  <td className="p-3 text-right font-black text-slate-900">₹4,55,200</td>
                  <td className="p-3 text-right font-black text-[#7D0A14] bg-[#FAF5EC]">₹14,85,200</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-600 pl-6">↳ Retail Counter Sales</td>
                  <td className="p-3 text-right text-slate-800">₹3,40,000</td>
                  <td className="p-3 text-right text-slate-800">₹2,80,000</td>
                  <td className="p-3 text-right text-slate-800">₹1,95,400</td>
                  <td className="p-3 text-right text-slate-900 font-bold bg-[#FAF5EC]">₹8,15,400</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-600 pl-6">↳ B2B Wholesale Sales</td>
                  <td className="p-3 text-right text-slate-800">₹1,62,000</td>
                  <td className="p-3 text-right text-slate-800">₹1,58,000</td>
                  <td className="p-3 text-right text-slate-800">₹2,25,800</td>
                  <td className="p-3 text-right text-slate-900 font-bold bg-[#FAF5EC]">₹5,45,800</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-600 pl-6">↳ Catering & Banquets</td>
                  <td className="p-3 text-right text-slate-800">₹40,000</td>
                  <td className="p-3 text-right text-slate-800">₹50,000</td>
                  <td className="p-3 text-right text-slate-800">₹34,000</td>
                  <td className="p-3 text-right text-slate-900 font-bold bg-[#FAF5EC]">₹1,24,000</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-800">Direct Procurement (COGS)</td>
                  <td className="p-3 text-right text-slate-800 font-semibold">₹2,38,000</td>
                  <td className="p-3 text-right text-slate-800 font-semibold">₹2,14,000</td>
                  <td className="p-3 text-right text-slate-800 font-semibold">₹2,00,000</td>
                  <td className="p-3 text-right font-black text-slate-900 bg-[#FAF5EC]">₹6,52,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-800">Gross Profit (Margin)</td>
                  <td className="p-3 text-right font-black text-emerald-800">₹3,04,000 (56.1%)</td>
                  <td className="p-3 text-right font-black text-emerald-800">₹2,74,000 (56.1%)</td>
                  <td className="p-3 text-right font-black text-emerald-800">₹2,55,200 (56.1%)</td>
                  <td className="p-3 text-right font-black text-emerald-900 bg-[#FAF5EC]">₹8,33,200 (56.1%)</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-800">Operating Expenses (OpEx)</td>
                  <td className="p-3 text-right text-rose-800 font-semibold">₹1,48,000</td>
                  <td className="p-3 text-right text-rose-800 font-semibold">₹1,36,000</td>
                  <td className="p-3 text-right text-rose-800 font-semibold">₹1,31,400</td>
                  <td className="p-3 text-right font-black text-rose-900 bg-[#FAF5EC]">₹4,15,400</td>
                </tr>
                <tr className="bg-amber-50/40">
                  <td className="p-3 font-black text-[#7D0A14] text-sm">Net Operating Profit</td>
                  <td className="p-3 text-right font-black text-slate-900 text-sm">₹1,56,000</td>
                  <td className="p-3 text-right font-black text-slate-900 text-sm">₹1,38,000</td>
                  <td className="p-3 text-right font-black text-slate-900 text-sm">₹1,23,800</td>
                  <td className="p-3 text-right font-black text-[#7D0A14] text-sm bg-[#FAF5EC]">₹4,17,800</td>
                </tr>
                <tr className="bg-emerald-50/40">
                  <td className="p-3 font-black text-emerald-900">Operating Profit Margin</td>
                  <td className="p-3 text-right font-black text-emerald-700">28.8%</td>
                  <td className="p-3 text-right font-black text-emerald-700">28.3%</td>
                  <td className="p-3 text-right font-black text-emerald-700">27.2%</td>
                  <td className="p-3 text-right font-black text-emerald-900 bg-[#FAF5EC]">28.1%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 4: GST & TAX COMPLIANCE AUDIT                       */}
      {/* ========================================================= */}
      {activeTab === 'gst' && (
        <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE1D1] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-lg text-[#3D040A]">
                  GST Tax Reconciliation & Input Tax Credit (ITC)
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Official GSTIN: <strong>36AAECS1234F1Z8</strong> (Telangana State) • Commercial Food Production Slabs
              </p>
            </div>
            <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
              100% Tax Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1] space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Output GST Collected</span>
              <div className="text-xl font-black text-slate-900">₹70,724</div>
              <p className="text-[11px] text-slate-500 font-medium">5% on Outward B2C & B2B Invoices</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-700">Eligible Input Tax Credit (ITC)</span>
              <div className="text-xl font-black text-emerald-900">₹44,210</div>
              <p className="text-[11px] text-emerald-700 font-medium">Auto-reconciled from GSTR-2B inward bills</p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-purple-700">Net GST Remittance Due</span>
              <div className="text-xl font-black text-purple-900">₹26,514</div>
              <p className="text-[11px] text-purple-700 font-medium">GSTR-3B monthly remittance scheduled</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-800">
                GSTR-1 Outward Return: Filed on Nov 11, 2026 (ARN: AA3611260019283)
              </span>
            </div>
            <span className="font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[10px]">
              Verified
            </span>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: RECORD NEW TRANSACTION ENTRY                      */}
      {/* ========================================================= */}
      {isNewTxnOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#EDE1D1] space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs">
                  <Receipt className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#3D040A]">
                    Record Financial Voucher
                  </h3>
                  <p className="text-xs text-slate-500">
                    Post income revenue or operating expense voucher to general ledger
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNewTxnOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTxn} className="space-y-3.5 text-xs">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF5EC] rounded-2xl border border-[#EDE1D1]">
                <button
                  type="button"
                  onClick={() => setNewTxn({ ...newTxn, type: 'expense' })}
                  className={`py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    newTxn.type === 'expense'
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-rose-600'
                  }`}
                >
                  − Expense / Debit
                </button>
                <button
                  type="button"
                  onClick={() => setNewTxn({ ...newTxn, type: 'income' })}
                  className={`py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    newTxn.type === 'income'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-emerald-600'
                  }`}
                >
                  + Income / Credit
                </button>
              </div>

              {/* Description */}
              <div>
                <label className="font-extrabold text-slate-800 block mb-1">
                  Description / Narration *
                </label>
                <input
                  type="text"
                  required
                  value={newTxn.description}
                  onChange={(e) => setNewTxn({ ...newTxn, description: e.target.value })}
                  placeholder="e.g. Procurement of Pure Cow Milk 200L"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                />
              </div>

              {/* Amount & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="1"
                    value={newTxn.amount}
                    onChange={(e) => setNewTxn({ ...newTxn, amount: e.target.value })}
                    placeholder="e.g. 15000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-black text-sm text-[#7D0A14] focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newTxn.date}
                    onChange={(e) => setNewTxn({ ...newTxn, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>
              </div>

              {/* Category & Branch */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Category
                  </label>
                  <select
                    value={newTxn.category}
                    onChange={(e) => setNewTxn({ ...newTxn, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  >
                    <option value="Dairy & Milk Procurement">Dairy & Milk Procurement</option>
                    <option value="Farm Produce & Sourcing">Farm Produce & Sourcing</option>
                    <option value="Biodegradable Packaging">Biodegradable Packaging</option>
                    <option value="Staff Wages & Payroll">Staff Wages & Payroll</option>
                    <option value="Kitchen Fuel & Utilities">Kitchen Fuel & Utilities</option>
                    <option value="Fleet Fuel & Logistics">Fleet Fuel & Logistics</option>
                    <option value="B2B Wholesale Sales">B2B Wholesale Sales</option>
                    <option value="B2C Counter Retail">B2C Counter Retail</option>
                    <option value="Catering & Banquets">Catering & Banquets</option>
                  </select>
                </div>

                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Branch Hub
                  </label>
                  <select
                    value={newTxn.branch}
                    onChange={(e) => setNewTxn({ ...newTxn, branch: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  >
                    <option value="Branch 1 (Madhapur)">Branch 1 (Madhapur)</option>
                    <option value="Branch 2 (Gachibowli)">Branch 2 (Gachibowli)</option>
                    <option value="Branch 3 (Jubilee Hills)">Branch 3 (Jubilee Hills)</option>
                    <option value="Central Production Commissary">Central Production Commissary</option>
                    <option value="All Branches / Central">All Branches / Central</option>
                  </select>
                </div>
              </div>

              {/* Account & Ref No */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Account / Mode
                  </label>
                  <select
                    value={newTxn.account}
                    onChange={(e) => setNewTxn({ ...newTxn, account: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  >
                    <option value="HDFC Corporate Current A/C">HDFC Corporate Current A/C</option>
                    <option value="ICICI Operations A/C">ICICI Operations A/C</option>
                    <option value="Cash Till Register">Cash Till Register</option>
                    <option value="Razorpay Escrow A/C">Razorpay Escrow A/C</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Reference / Bill No.
                  </label>
                  <input
                    type="text"
                    value={newTxn.refNo}
                    onChange={(e) => setNewTxn({ ...newTxn, refNo: e.target.value })}
                    placeholder="e.g. BILL-9921"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#EDE1D1]">
                <button
                  type="button"
                  onClick={() => setIsNewTxnOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Post to Ledger</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceAccounts;
