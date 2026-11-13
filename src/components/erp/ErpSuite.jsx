import React from 'react';
import {
  Building2,
  Store,
  TrendingUp,
  DollarSign,
  Receipt,
  AlertTriangle,
  PieChart,
  Plus
} from 'lucide-react';

export const ErpSuite = ({
  showToast,
  shopsList = [],
  currentShop = null,
  onSelectShop,
  onOpenAddBranch
}) => {
  // Active branch for ERP drill-down (falls back to first real branch)
  const activeBranch = currentShop || shopsList[0] || null;

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
              {activeBranch ? `₹${Math.round((activeBranch.todayRevenue || 0) * 0.42).toLocaleString('en-IN')}` : '₹0'}
            </div>
            <div className="text-[11px] text-blue-700 font-bold mt-1">
              Fleet: {activeBranch?.dispatchFleetCount || 8} Riders • {activeBranch?.coldChainTemp || '3.8°C OK'}
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

        {/* Section: Branches Summary & Sales Contribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Branches Summary Table */}
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
                  {shopsList.map((shop) => {
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
    </div>
  );
};

export default ErpSuite;
