import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Building2,
  Store,
  TrendingUp,
  DollarSign,
  Receipt,
  AlertTriangle,
  PieChart,
  Plus,
  Pencil,
  X,
  Save,
  Check
} from 'lucide-react';

export const ErpSuite = ({
  showToast,
  shopsList = [],
  currentShop = null,
  onSelectShop,
  onOpenAddBranch,
  onUpdateShopCash
}) => {
  // Active branch for ERP drill-down (falls back to first real branch)
  const activeBranch = currentShop || shopsList[0] || null;

  // Cash Counter Entry Modal State
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [activeCashShop, setActiveCashShop] = useState(null);
  const [cashForm, setCashForm] = useState({
    cashInCounter: '',
    digitalRevenue: '',
    cashierName: '',
    openingFloat: '2000',
    handoverBank: '0'
  });

  const handleOpenCashModal = (shop) => {
    setActiveCashShop(shop);
    const rev = shop.todayRevenue || 0;
    const currentCash = shop.cashInCounter !== undefined ? shop.cashInCounter : Math.round(rev * 0.42);
    const currentDigital = shop.digitalRevenue !== undefined ? shop.digitalRevenue : Math.max(0, rev - currentCash);
    setCashForm({
      cashInCounter: String(currentCash),
      digitalRevenue: String(currentDigital),
      cashierName: shop.lastCashier || shop.manager || '',
      openingFloat: shop.openingFloat !== undefined ? String(shop.openingFloat) : '2000',
      handoverBank: shop.handoverBank !== undefined ? String(shop.handoverBank) : '0'
    });
    setIsCashModalOpen(true);
  };

  const handleCashSubmit = (e) => {
    e.preventDefault();
    if (!activeCashShop) return;
    const cashVal = Number(cashForm.cashInCounter) || 0;
    const digitalVal = Number(cashForm.digitalRevenue) !== undefined && !isNaN(Number(cashForm.digitalRevenue))
      ? Number(cashForm.digitalRevenue)
      : Math.max(0, (activeCashShop.todayRevenue || 0) - cashVal);
    const floatVal = Number(cashForm.openingFloat) || 0;
    const handoverVal = Number(cashForm.handoverBank) || 0;

    if (onUpdateShopCash) {
      onUpdateShopCash(activeCashShop.id, {
        cashInCounter: cashVal,
        digitalRevenue: digitalVal,
        cashierName: cashForm.cashierName,
        openingFloat: floatVal,
        handoverBank: handoverVal
      });
    }

    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    setIsCashModalOpen(false);
    showToast(`💵 Cash Counter Entry saved for ${activeCashShop.shortName}! (₹${cashVal.toLocaleString('en-IN')})`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: MASTER BRANCHES SELECTOR & HEADER                      */}
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
                Unified multi-branch operations, daily sales, cash in counters & revenue contribution.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Active Branch:</span>
            <span className="px-3 py-1 rounded-xl bg-[#FAF5EC] border border-[#EDE1D1] text-[#7D0A14] font-black text-xs flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{activeBranch ? activeBranch.shortName : 'All Branches'}</span>
            </span>
          </div>
        </div>

        {/* Active Branches & Add Branch Option */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {shopsList.map((shop) => {
            const isSelected = activeBranch?.id === shop.id;
            const rev = shop.todayRevenue || 0;
            const cash = shop.cashInCounter !== undefined ? shop.cashInCounter : Math.round(rev * 0.42);

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
                  <div>
                    <span className="text-[#7D0A14]">₹{rev.toLocaleString('en-IN')}</span>
                    <span className="text-[9px] text-blue-700 font-semibold block">💵 ₹{cash.toLocaleString('en-IN')} cash</span>
                  </div>
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
      {/* SECTION 2: EXECUTIVE 360° COMMAND COCKPIT                         */}
      {/* ----------------------------------------------------------------- */}
      <div className="space-y-6">
        {/* Executive KPI Metric Tiles */}
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
              {activeBranch ? `₹${(activeBranch.todayRevenue || 0).toLocaleString('en-IN')}` : '₹0'}
            </div>
            <div className="text-[11px] text-emerald-700 font-bold mt-1">
              {activeBranch ? `${activeBranch.ordersCount || 0} Orders Today` : '↑ 14.2% vs target'} <span className="text-slate-400 font-normal">({activeBranch?.branchCode || 'Active'})</span>
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
              38.8%
            </div>
            <div className="text-[11px] text-emerald-700 font-bold mt-1">
              Target Margin: 35.0% <span className="text-slate-400 font-normal">(+3.8% Optimal)</span>
            </div>
          </div>

          {/* Cash in Counter */}
          <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black text-slate-400">Cash in Counters</span>
              <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
                <Receipt className="w-4 h-4" />
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-blue-900 mt-1">
              {activeBranch
                ? `₹${(activeBranch.cashInCounter !== undefined ? activeBranch.cashInCounter : Math.round((activeBranch.todayRevenue || 0) * 0.42)).toLocaleString('en-IN')}`
                : '₹0'}
            </div>
            <div className="text-[11px] text-blue-700 font-bold mt-1 flex items-center justify-between">
              <span>{activeBranch?.lastCashUpdated ? `Updated: ${activeBranch.lastCashUpdated}` : 'Live Register Count'}</span>
              {activeBranch && (
                <button
                  type="button"
                  onClick={() => handleOpenCashModal(activeBranch)}
                  className="underline hover:text-[#7D0A14] cursor-pointer font-bold"
                >
                  Edit Cash
                </button>
              )}
            </div>
            {/* Opening Till Float & Handover / Bank info display */}
            <div className="mt-2.5 pt-2 border-t border-[#EDE1D1] grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span className="text-slate-400 font-bold block">Opening Till Float</span>
                <span className="font-black text-slate-700">₹{(activeBranch?.openingFloat !== undefined ? activeBranch.openingFloat : 2000).toLocaleString('en-IN')}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 font-bold block">Handover / Bank</span>
                <span className="font-black text-slate-700">₹{(activeBranch?.handoverBank !== undefined ? activeBranch.handoverBank : 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Daily Food Waste */}
          <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-black text-slate-400">Daily Recorded Waste</span>
              <span className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
                <AlertTriangle className="w-4 h-4" />
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-rose-800 mt-1">
              ₹1,240
            </div>
            <div className="text-[11px] text-emerald-700 font-bold mt-1">
              0.85% of turnover <span className="text-slate-400 font-normal">(Benchmark &lt;2%)</span>
            </div>
          </div>
        </div>

        {/* Section: Full Screen Width Branches Summary Table */}
        <div className="w-full bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE1D1] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs">
                <Store className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-black text-base sm:text-lg text-[#3D040A]">
                  Branches Live Sales & Cash Counter Summary
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Real-time sales, counter cash audit, UPI/Card splits and order counts across all hubs
                </p>
              </div>
            </div>
            <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
              All {shopsList.length} Branches Active
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#EDE1D1]">
            <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#FAF5EC] text-slate-700 font-extrabold border-b border-[#EDE1D1]">
                  <th className="p-3 sm:p-3.5 sticky left-0 bg-[#FAF5EC] z-10 shadow-[2px_0_4px_rgba(0,0,0,0.03)] min-w-[170px]">
                    Branch Location
                  </th>
                  <th className="p-3 sm:p-3.5 min-w-[100px]">Today Sales</th>
                  <th className="p-3 sm:p-3.5 min-w-[110px]">Cash in Counter</th>
                  <th className="p-3 sm:p-3.5 min-w-[100px]">UPI / Card</th>
                  <th className="p-3 sm:p-3.5 text-center min-w-[80px]">Orders</th>
                  <th className="p-3 sm:p-3.5 text-right min-w-[110px]">Cash Entry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shopsList.map((shop) => {
                  const rev = shop.todayRevenue || 0;
                  const cash = shop.cashInCounter !== undefined ? shop.cashInCounter : Math.round(rev * 0.42);
                  const digital = shop.digitalRevenue !== undefined ? shop.digitalRevenue : Math.max(0, rev - cash);

                  return (
                    <tr
                      key={shop.id}
                      onClick={() => onSelectShop && onSelectShop(shop)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        activeBranch?.id === shop.id ? 'bg-[#FAF5EC]/70' : 'bg-white'
                      }`}
                    >
                      <td className={`p-3 sm:p-3.5 font-black text-slate-900 sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.03)] transition-colors ${
                        activeBranch?.id === shop.id ? 'bg-[#FAF5EC]' : 'bg-white'
                      }`}>
                        <div className="text-xs sm:text-sm font-black whitespace-nowrap">{shop.shortName}</div>
                        <div className="text-[11px] font-medium text-slate-500 mt-0.5 whitespace-nowrap">
                          {shop.lastCashier || shop.manager} • <span className="font-mono text-[#7D0A14] font-bold">{shop.branchCode}</span>
                        </div>
                      </td>
                      <td className="p-3 sm:p-3.5 font-black text-sm text-[#7D0A14]">
                        ₹{rev.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 sm:p-3.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCashModal(shop);
                          }}
                          className="text-left group cursor-pointer"
                          title="Click to update cash drawer amount"
                        >
                          <span className="font-black text-sm text-slate-900 group-hover:text-[#7D0A14] flex items-center gap-1.5">
                            <span>₹{cash.toLocaleString('en-IN')}</span>
                            <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#7D0A14]" />
                          </span>
                          {shop.lastCashUpdated ? (
                            <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                              ✓ Closed at {shop.lastCashUpdated}
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              Live count
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="p-3 sm:p-3.5 font-bold text-slate-700 text-sm">
                        ₹{digital.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 sm:p-3.5 text-center">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs">
                          {shop.ordersCount || 0} / {shop.dailyCapacity || 400}
                        </span>
                      </td>
                      <td className="p-3 sm:p-3.5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCashModal(shop);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#FAF5EC] hover:bg-[#7D0A14] text-[#7D0A14] hover:text-white font-black text-xs border border-[#EDE1D1] shadow-2xs transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Enter Cash</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section: Full Screen Width Branch Sales Contribution */}
        <div className="w-full bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-[#F5A623]" />
              <h3 className="font-black text-sm sm:text-base text-[#3D040A]">
                Branch Sales Contribution Breakdown
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">Today's Revenue Share</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(() => {
              const totalBranchRev = shopsList.reduce((acc, s) => acc + (s.todayRevenue || 0), 0);
              const barColors = ['bg-[#7D0A14]', 'bg-[#F5A623]', 'bg-emerald-600', 'bg-blue-600', 'bg-purple-600'];
              return shopsList.map((shop, idx) => {
                const rev = shop.todayRevenue || 0;
                const pct = totalBranchRev > 0 ? Math.round((rev / totalBranchRev) * 100) : 0;
                const barColor = barColors[idx % barColors.length];
                const cash = shop.cashInCounter !== undefined ? shop.cashInCounter : Math.round(rev * 0.42);
                const digital = shop.digitalRevenue !== undefined ? shop.digitalRevenue : Math.max(0, rev - cash);

                return (
                  <div
                    key={shop.id}
                    onClick={() => onSelectShop && onSelectShop(shop)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      activeBranch?.id === shop.id
                        ? 'border-[#7D0A14] bg-[#FAF5EC] shadow-2xs ring-1 ring-[#7D0A14]/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 font-black text-xs sm:text-sm truncate">
                        {shop.shortName}
                      </span>
                      <span className="text-[#7D0A14] font-black text-xs sm:text-sm">
                        {pct}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`${barColor} h-full rounded-full transition-all duration-300`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-1">
                      <span>Total: <strong className="text-slate-900">₹{rev.toLocaleString('en-IN')}</strong></span>
                      <span className="text-blue-800">Cash: ₹{cash.toLocaleString('en-IN')}</span>
                      <span className="text-emerald-800">UPI: ₹{digital.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* CASH COUNTER ENTRY & RECONCILIATION MODAL                         */}
      {/* ================================================================= */}
      {isCashModalOpen && activeCashShop && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={() => setIsCashModalOpen(false)}
        >
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#EDE1D1] relative animate-in zoom-in-95 duration-200 space-y-4 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs">
                  <Receipt className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#3D040A]">
                    Enter Counter Cash Details
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {activeCashShop.shortName} • {activeCashShop.branchCode}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCashModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCashSubmit} className="space-y-3.5 text-xs">
              {/* Branch Quick Summary Banner */}
              <div className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Today's Total Sales</span>
                  <span className="font-black text-[#7D0A14] text-base">
                    ₹{(activeCashShop.todayRevenue || 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Orders Completed</span>
                  <span className="font-black text-emerald-800 text-sm">
                    {activeCashShop.ordersCount || 0} Orders
                  </span>
                </div>
              </div>

              {/* Physical Cash in Drawer Input */}
              <div>
                <label className="font-extrabold text-slate-800 block mb-1">
                  💵 Physical Cash in Drawer / Till * (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-slate-400">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={cashForm.cashInCounter}
                    onChange={(e) => {
                      const val = e.target.value;
                      const num = Number(val) || 0;
                      const totalRev = activeCashShop.todayRevenue || 0;
                      const calculatedDigital = Math.max(0, totalRev - num);
                      setCashForm({
                        ...cashForm,
                        cashInCounter: val,
                        digitalRevenue: String(calculatedDigital)
                      });
                    }}
                    placeholder="e.g. 12500"
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-300 font-black text-sm text-[#7D0A14] focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                    required
                    autoFocus
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Actual physical currency count present in this branch's cash register.
                </span>
              </div>

              {/* UPI & Card Digital Collections */}
              <div>
                <label className="font-extrabold text-slate-800 block mb-1">
                  💳 UPI QR & Card Digital Collections (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-slate-400">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={cashForm.digitalRevenue}
                    onChange={(e) => setCashForm({ ...cashForm, digitalRevenue: e.target.value })}
                    placeholder="e.g. 15950"
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Auto-calculated from Total Sales − Counter Cash (or enter manually).
                </span>
              </div>

              {/* Opening Till Float & Handover / Bank */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Opening Till Float (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={cashForm.openingFloat}
                    onChange={(e) => setCashForm({ ...cashForm, openingFloat: e.target.value })}
                    placeholder="2000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Morning change float</span>
                </div>
                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Handover / Bank (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={cashForm.handoverBank}
                    onChange={(e) => setCashForm({ ...cashForm, handoverBank: e.target.value })}
                    placeholder="0"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Deposited or handed over</span>
                </div>
              </div>

              {/* Cashier / Manager Name */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Cashier / Staff Name
                </label>
                <input
                  type="text"
                  value={cashForm.cashierName}
                  onChange={(e) => setCashForm({ ...cashForm, cashierName: e.target.value })}
                  placeholder="e.g. Ramesh Varma"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCashModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer text-center"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Save Cash Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErpSuite;
