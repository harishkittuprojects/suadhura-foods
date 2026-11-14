import React from 'react';
import { Calendar } from 'lucide-react';

/**
 * Format ISO date string (YYYY-MM-DD) into Indian standard Day/Month/Year (DD/MM/YYYY)
 */
export const formatDateDMY = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return dateStr || '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [y, m, d] = parts;
    return `${d}/${m}/${y}`;
  }
  return dateStr;
};

/**
 * Custom DatePicker ensuring Day comes FIRST (Day / Month / Year)
 * regardless of operating system / browser locale settings.
 */
export const DatePickerDMY = ({
  value = '2026-11-14',
  onChange = () => {},
  label = 'Date',
  required = false,
  className = ''
}) => {
  const today = new Date();
  const todayY = String(today.getFullYear());
  const todayM = String(today.getMonth() + 1).padStart(2, '0');
  const todayD = String(today.getDate()).padStart(2, '0');

  let year = todayY;
  let month = todayM;
  let day = todayD;

  if (value && typeof value === 'string') {
    const parts = value.split('-');
    if (parts.length === 3) {
      year = parts[0] || todayY;
      month = parts[1] || todayM;
      day = parts[2] || todayD;
    }
  }

  const handlePartChange = (part, newVal) => {
    let newY = year;
    let newM = month;
    let newD = day;

    if (part === 'day') newD = newVal;
    if (part === 'month') newM = newVal;
    if (part === 'year') newY = newVal;

    // Clamp days if month has fewer days (e.g. Feb 28/29, Apr 30)
    const maxDays = new Date(parseInt(newY, 10), parseInt(newM, 10), 0).getDate();
    if (parseInt(newD, 10) > maxDays) {
      newD = String(maxDays).padStart(2, '0');
    }

    const formatted = `${newY}-${newM}-${newD}`;
    onChange(formatted);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <label className="font-extrabold text-slate-800 text-xs flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-rose-600 font-bold">*</span>}
        </label>
        <span className="text-[10px] font-bold text-amber-900 bg-amber-100/70 border border-amber-300 px-1.5 py-0.5 rounded-md tracking-wider">
          Day / Month / Year
        </span>
      </div>

      <div className="flex items-center gap-1 p-1 bg-white border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-[#7D0A14] focus-within:border-transparent transition-all shadow-2xs">
        {/* 1. Day Selector (FIRST) */}
        <div className="flex-1 min-w-[50px]">
          <select
            value={day}
            onChange={(e) => handlePartChange('day', e.target.value)}
            className="w-full px-1.5 py-1.5 text-xs font-black text-slate-900 bg-[#FAF5EC] hover:bg-[#F3EAD9] rounded-lg border border-[#EDE1D1] focus:outline-none focus:bg-white text-center cursor-pointer"
            title="Day (DD)"
          >
            {Array.from({ length: 31 }, (_, i) => {
              const val = String(i + 1).padStart(2, '0');
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>

        <span className="text-slate-400 font-black text-xs select-none">/</span>

        {/* 2. Month Selector (SECOND) */}
        <div className="flex-1 min-w-[72px]">
          <select
            value={month}
            onChange={(e) => handlePartChange('month', e.target.value)}
            className="w-full px-1 py-1.5 text-xs font-black text-slate-900 bg-[#FAF5EC] hover:bg-[#F3EAD9] rounded-lg border border-[#EDE1D1] focus:outline-none focus:bg-white text-center cursor-pointer"
            title="Month (MM)"
          >
            <option value="01">01 (Jan)</option>
            <option value="02">02 (Feb)</option>
            <option value="03">03 (Mar)</option>
            <option value="04">04 (Apr)</option>
            <option value="05">05 (May)</option>
            <option value="06">06 (Jun)</option>
            <option value="07">07 (Jul)</option>
            <option value="08">08 (Aug)</option>
            <option value="09">09 (Sep)</option>
            <option value="10">10 (Oct)</option>
            <option value="11">11 (Nov)</option>
            <option value="12">12 (Dec)</option>
          </select>
        </div>

        <span className="text-slate-400 font-black text-xs select-none">/</span>

        {/* 3. Year Selector (THIRD) */}
        <div className="w-[62px] shrink-0">
          <select
            value={year}
            onChange={(e) => handlePartChange('year', e.target.value)}
            className="w-full px-1 py-1.5 text-xs font-black text-slate-900 bg-[#FAF5EC] hover:bg-[#F3EAD9] rounded-lg border border-[#EDE1D1] focus:outline-none focus:bg-white text-center cursor-pointer"
            title="Year (YYYY)"
          >
            {['2024', '2025', '2026', '2027', '2028', '2029', '2030'].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Calendar Picker Icon Button */}
        <div className="relative shrink-0 flex items-center pr-1">
          <label
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#7D0A14] flex items-center justify-center cursor-pointer transition-colors"
            title="Open calendar picker"
          >
            <Calendar className="w-4 h-4 text-[#7D0A14]" />
            <input
              type="date"
              value={value || ''}
              onChange={(e) => {
                if (e.target.value) onChange(e.target.value);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default DatePickerDMY;

