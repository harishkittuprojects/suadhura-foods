import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Clock,
  Calendar as CalendarIcon,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Building2,
  Store,
  DollarSign,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  Check,
  TrendingUp,
  Award,
  Briefcase,
  FileText,
  BadgePercent
} from 'lucide-react';
import { DatePickerDMY, formatDateDMY } from './DatePickerDMY';

const STORAGE_KEY = 'sumadhura_employees_v1';

// Initial realistic seed employees across Sumadhura's 3 branches
const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-001',
    name: 'Ramesh Varma',
    role: 'Store Manager & Cashier',
    branch: 'Branch 1 (Madhapur)',
    branchCode: 'SMD-HYD-001',
    phone: '+91 98480 12345',
    email: 'ramesh.v@sumadhurafoods.com',
    hourlyRate: 250,
    shift: 'Full Day (09:00 - 18:00)',
    status: 'active',
    joiningDate: '2024-01-15',
    workHistory: {
      '2026-11-01': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-02': { hours: 8.5, status: 'present', shift: 'Day' },
      '2026-11-03': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-04': { hours: 9, status: 'overtime', shift: 'Day' },
      '2026-11-05': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-06': { hours: 8.5, status: 'present', shift: 'Day' },
      '2026-11-07': { hours: 0, status: 'leave', shift: 'Off' },
      '2026-11-08': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-09': { hours: 8.5, status: 'present', shift: 'Day' },
      '2026-11-10': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-11': { hours: 9, status: 'overtime', shift: 'Day' },
      '2026-11-12': { hours: 8.5, status: 'present', shift: 'Day' },
      '2026-11-13': { hours: 8.5, status: 'present', shift: 'Day' }
    }
  },
  {
    id: 'EMP-002',
    name: 'K. Venkat Rao',
    role: 'Master Chef & Kitchen Lead',
    branch: 'Branch 3 (Jubilee Hills)',
    branchCode: 'SMD-HYD-003',
    phone: '+91 98480 54321',
    email: 'venkat.k@sumadhurafoods.com',
    hourlyRate: 320,
    shift: 'Morning (06:00 - 14:30)',
    status: 'active',
    joiningDate: '2023-03-10',
    workHistory: {
      '2026-11-01': { hours: 8.5, status: 'present', shift: 'Morning' },
      '2026-11-02': { hours: 8.5, status: 'present', shift: 'Morning' },
      '2026-11-03': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-04': { hours: 8.5, status: 'present', shift: 'Morning' },
      '2026-11-05': { hours: 8.5, status: 'present', shift: 'Morning' },
      '2026-11-06': { hours: 9, status: 'overtime', shift: 'Morning' },
      '2026-11-07': { hours: 8.5, status: 'present', shift: 'Morning' },
      '2026-11-08': { hours: 8.5, status: 'present', shift: 'Morning' },
      '2026-11-09': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-10': { hours: 8.5, status: 'present', shift: 'Morning' },
      '2026-11-11': { hours: 8.5, status: 'present', shift: 'Morning' },
      '2026-11-12': { hours: 9, status: 'overtime', shift: 'Morning' },
      '2026-11-13': { hours: 8.5, status: 'present', shift: 'Morning' }
    }
  },
  {
    id: 'EMP-003',
    name: 'Priya Reddy',
    role: 'Operations & Branch Manager',
    branch: 'Branch 2 (Gachibowli)',
    branchCode: 'SMD-HYD-002',
    phone: '+91 99887 76655',
    email: 'priya.r@sumadhurafoods.com',
    hourlyRate: 280,
    shift: 'Full Day (09:30 - 18:30)',
    status: 'active',
    joiningDate: '2023-07-01',
    workHistory: {
      '2026-11-01': { hours: 9, status: 'present', shift: 'Day' },
      '2026-11-02': { hours: 9, status: 'present', shift: 'Day' },
      '2026-11-03': { hours: 9, status: 'present', shift: 'Day' },
      '2026-11-04': { hours: 9, status: 'present', shift: 'Day' },
      '2026-11-05': { hours: 9, status: 'present', shift: 'Day' },
      '2026-11-06': { hours: 0, status: 'leave', shift: 'Off' },
      '2026-11-07': { hours: 9, status: 'present', shift: 'Day' },
      '2026-11-08': { hours: 9, status: 'present', shift: 'Day' },
      '2026-11-09': { hours: 9, status: 'present', shift: 'Day' },
      '2026-11-10': { hours: 9, status: 'present', shift: 'Day' },
      '2026-11-11': { hours: 9, status: 'present', shift: 'Day' },
      '2026-11-12': { hours: 9.5, status: 'overtime', shift: 'Day' },
      '2026-11-13': { hours: 9, status: 'present', shift: 'Day' }
    }
  },
  {
    id: 'EMP-004',
    name: 'Suresh Kumar',
    role: 'Packaging & Dispatch Specialist',
    branch: 'Branch 1 (Madhapur)',
    branchCode: 'SMD-HYD-001',
    phone: '+91 97001 23456',
    email: 'suresh.k@sumadhurafoods.com',
    hourlyRate: 180,
    shift: 'Morning (07:00 - 15:30)',
    status: 'active',
    joiningDate: '2023-11-20',
    workHistory: {
      '2026-11-01': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-02': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-03': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-04': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-05': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-06': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-07': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-08': { hours: 0, status: 'leave', shift: 'Off' },
      '2026-11-09': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-10': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-11': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-12': { hours: 8, status: 'present', shift: 'Morning' },
      '2026-11-13': { hours: 8, status: 'present', shift: 'Morning' }
    }
  },
  {
    id: 'EMP-005',
    name: 'Rajesh Goud',
    role: 'Express Fleet Lead Rider',
    branch: 'Branch 2 (Gachibowli)',
    branchCode: 'SMD-HYD-002',
    phone: '+91 96112 34567',
    email: 'rajesh.g@sumadhurafoods.com',
    hourlyRate: 160,
    shift: 'Evening (14:00 - 22:30)',
    status: 'active',
    joiningDate: '2024-02-05',
    workHistory: {
      '2026-11-01': { hours: 8, status: 'present', shift: 'Evening' },
      '2026-11-02': { hours: 8, status: 'present', shift: 'Evening' },
      '2026-11-03': { hours: 8, status: 'present', shift: 'Evening' },
      '2026-11-04': { hours: 8.5, status: 'present', shift: 'Evening' },
      '2026-11-05': { hours: 8, status: 'present', shift: 'Evening' },
      '2026-11-06': { hours: 8, status: 'present', shift: 'Evening' },
      '2026-11-07': { hours: 8, status: 'present', shift: 'Evening' },
      '2026-11-08': { hours: 8, status: 'present', shift: 'Evening' },
      '2026-11-09': { hours: 8, status: 'present', shift: 'Evening' },
      '2026-11-10': { hours: 0, status: 'leave', shift: 'Off' },
      '2026-11-11': { hours: 8, status: 'present', shift: 'Evening' },
      '2026-11-12': { hours: 8, status: 'present', shift: 'Evening' },
      '2026-11-13': { hours: 8, status: 'present', shift: 'Evening' }
    }
  },
  {
    id: 'EMP-006',
    name: 'Anitha Sharma',
    role: 'Quality & Inventory Controller',
    branch: 'Branch 3 (Jubilee Hills)',
    branchCode: 'SMD-HYD-003',
    phone: '+91 95551 23456',
    email: 'anitha.s@sumadhurafoods.com',
    hourlyRate: 210,
    shift: 'Day (08:30 - 16:30)',
    status: 'active',
    joiningDate: '2024-08-12',
    workHistory: {
      '2026-11-01': { hours: 7.5, status: 'present', shift: 'Day' },
      '2026-11-02': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-03': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-04': { hours: 7.5, status: 'present', shift: 'Day' },
      '2026-11-05': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-06': { hours: 7.5, status: 'present', shift: 'Day' },
      '2026-11-07': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-08': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-09': { hours: 0, status: 'leave', shift: 'Off' },
      '2026-11-10': { hours: 7.5, status: 'present', shift: 'Day' },
      '2026-11-11': { hours: 8, status: 'present', shift: 'Day' },
      '2026-11-12': { hours: 7.5, status: 'present', shift: 'Day' },
      '2026-11-13': { hours: 7.5, status: 'present', shift: 'Day' }
    }
  }
];

export const EmployeeManager = ({ shopsList = [], currentShop = null, showToast = () => {} }) => {
  // Load from localStorage or use initial seed data
  const [employees, setEmployees] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_EMPLOYEES;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch {}
  }, [employees]);

  // Tab mode: 'list' (Table / Cards) or 'calendar' (Interactive Hours & Attendance Calendar)
  const [activeView, setActiveView] = useState('list');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLogHoursModalOpen, setIsLogHoursModalOpen] = useState(false);
  const [employeeToLog, setEmployeeToLog] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState('2026-11-13'); // Today
  const [isDayDetailModalOpen, setIsDayDetailModalOpen] = useState(false);

  // Calendar filter state
  const [calendarEmployeeFilter, setCalendarEmployeeFilter] = useState('all');
  const [calendarMonth, setCalendarMonth] = useState({ year: 2026, month: 10 }); // 0-indexed: 10 = November

  // New Employee Form
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: 'Cashier & Staff',
    branch: 'Branch 1 (Madhapur)',
    phone: '',
    email: '',
    hourlyRate: '200',
    shift: 'Full Day (09:00 - 18:00)',
    status: 'active'
  });

  // Log Hours Form
  const [logHoursForm, setLogHoursForm] = useState({
    employeeId: '',
    date: '2026-11-13',
    hours: '8.0',
    shift: 'Day',
    status: 'present',
    notes: ''
  });

  // Filtered employees list
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchSearch =
        searchQuery === '' ||
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.phone.includes(searchQuery) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchBranch =
        selectedBranch === 'all' ||
        emp.branch.toLowerCase().includes(selectedBranch.toLowerCase());

      const matchRole =
        selectedRole === 'all' ||
        emp.role.toLowerCase().includes(selectedRole.toLowerCase());

      const matchStatus =
        selectedStatus === 'all' || emp.status === selectedStatus;

      return matchSearch && matchBranch && matchRole && matchStatus;
    });
  }, [employees, searchQuery, selectedBranch, selectedRole, selectedStatus]);

  // Dynamic calculations for KPI summary
  const stats = useMemo(() => {
    const todayStr = '2026-11-13';
    let todayHours = 0;
    let monthHours = 0;
    let totalPayroll = 0;
    let activeStaffCount = 0;

    employees.forEach((emp) => {
      if (emp.status === 'active') activeStaffCount++;
      const todayRecord = emp.workHistory?.[todayStr];
      if (todayRecord && todayRecord.hours) {
        todayHours += Number(todayRecord.hours);
      }

      // Sum all hours in current month (2026-11)
      let empMonthHours = 0;
      Object.entries(emp.workHistory || {}).forEach(([d, rec]) => {
        if (d.startsWith('2026-11') && rec.hours) {
          empMonthHours += Number(rec.hours);
        }
      });
      monthHours += empMonthHours;
      totalPayroll += empMonthHours * (Number(emp.hourlyRate) || 0);
    });

    return {
      activeStaffCount,
      totalStaff: employees.length,
      todayHours: todayHours.toFixed(1),
      monthHours: monthHours.toFixed(1),
      totalPayroll: Math.round(totalPayroll)
    };
  }, [employees]);

  // Helper to compute an employee's total hours
  const getEmployeeStats = (emp) => {
    const todayStr = '2026-11-13';
    const todayHours = emp.workHistory?.[todayStr]?.hours || 0;
    
    // Week hours (Nov 8 - Nov 13)
    let weekHours = 0;
    for (let day = 8; day <= 13; day++) {
      const dStr = `2026-11-${String(day).padStart(2, '0')}`;
      if (emp.workHistory?.[dStr]?.hours) {
        weekHours += Number(emp.workHistory[dStr].hours);
      }
    }

    // Month hours (Nov 1 - Nov 30)
    let monthHours = 0;
    Object.entries(emp.workHistory || {}).forEach(([d, rec]) => {
      if (d.startsWith('2026-11') && rec.hours) {
        monthHours += Number(rec.hours);
      }
    });

    const monthPay = Math.round(monthHours * (Number(emp.hourlyRate) || 0));

    return { todayHours, weekHours: weekHours.toFixed(1), monthHours: monthHours.toFixed(1), monthPay };
  };

  // Add Employee Handler
  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmployee.name.trim()) {
      showToast('⚠️ Please enter an employee name', 'error');
      return;
    }

    const nextId = `EMP-${String(employees.length + 1).padStart(3, '0')}`;
    const newEmp = {
      id: nextId,
      name: newEmployee.name.trim(),
      role: newEmployee.role,
      branch: newEmployee.branch,
      phone: newEmployee.phone || '+91 98480 00000',
      email: newEmployee.email || `${newEmployee.name.toLowerCase().replace(/\s+/g, '.')}@sumadhurafoods.com`,
      hourlyRate: Number(newEmployee.hourlyRate) || 200,
      shift: newEmployee.shift,
      status: newEmployee.status,
      joiningDate: new Date().toISOString().split('T')[0],
      workHistory: {
        '2026-11-13': { hours: 8, status: 'present', shift: 'Day' }
      }
    };

    setEmployees([newEmp, ...employees]);
    showToast(`✅ Successfully added ${newEmp.name} (${newEmp.id}) to ${newEmp.branch}!`, 'success');
    setIsAddModalOpen(false);
    setNewEmployee({
      name: '',
      role: 'Cashier & Staff',
      branch: 'Branch 1 (Madhapur)',
      phone: '',
      email: '',
      hourlyRate: '200',
      shift: 'Full Day (09:00 - 18:00)',
      status: 'active'
    });
  };

  // Delete Employee Handler
  const handleDeleteEmployee = (emp) => {
    setEmployees(employees.filter((e) => e.id !== emp.id));
    showToast(`🗑 Removed employee ${emp.name} (${emp.id}) from system.`, 'info');
    setEmployeeToDelete(null);
  };

  // Log Hours Handler
  const handleLogHoursSubmit = (e) => {
    e.preventDefault();
    if (!logHoursForm.employeeId) {
      showToast('⚠️ Please select an employee', 'error');
      return;
    }

    const targetEmp = employees.find((e) => e.id === logHoursForm.employeeId);
    if (!targetEmp) return;

    const updatedEmployees = employees.map((emp) => {
      if (emp.id === logHoursForm.employeeId) {
        return {
          ...emp,
          workHistory: {
            ...emp.workHistory,
            [logHoursForm.date]: {
              hours: Number(logHoursForm.hours) || 0,
              shift: logHoursForm.shift,
              status: logHoursForm.status,
              notes: logHoursForm.notes
            }
          }
        };
      }
      return emp;
    });

    setEmployees(updatedEmployees);
    showToast(`⏱ Logged ${logHoursForm.hours} hours for ${targetEmp.name} on ${logHoursForm.date}!`, 'success');
    setIsLogHoursModalOpen(false);
  };

  // Open Log Hours for specific employee
  const openLogHoursForEmployee = (emp, dateStr = '2026-11-13') => {
    const existing = emp.workHistory?.[dateStr];
    setEmployeeToLog(emp);
    setLogHoursForm({
      employeeId: emp.id,
      date: dateStr,
      hours: existing ? String(existing.hours) : '8.0',
      shift: existing ? existing.shift : 'Day',
      status: existing ? existing.status : 'present',
      notes: existing?.notes || ''
    });
    setIsLogHoursModalOpen(true);
  };

  // Calendar Days generator (November 2026: 30 days)
  const calendarDays = useMemo(() => {
    const year = calendarMonth.year;
    const month = calendarMonth.month; // 10 = Nov
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun

    const days = [];
    // Leading empty slots
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ empty: true, key: `empty-${i}` });
    }

    // Days 1 through totalDays
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      
      // Calculate day totals
      let presentCount = 0;
      let dayTotalHours = 0;
      const attendees = [];

      employees.forEach((emp) => {
        const record = emp.workHistory?.[dateStr];
        if (record && record.hours > 0) {
          presentCount++;
          dayTotalHours += Number(record.hours);
          attendees.push({
            employee: emp,
            record
          });
        }
      });

      days.push({
        empty: false,
        dayNum: d,
        dateStr,
        isToday: dateStr === '2026-11-13',
        presentCount,
        dayTotalHours,
        attendees
      });
    }

    return days;
  }, [calendarMonth, employees]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* 1. Header Banner & View Switcher */}
      <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs shrink-0">
            <Users className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#3D040A] tracking-tight">
                Staff & Employee Hub
              </h2>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FAF5EC] text-[#7D0A14] border border-[#EDE1D1]">
                {employees.length} Members
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage team profiles, monitor daily shift attendance, and track hours worked across all branches.
            </p>
          </div>
        </div>

        {/* Action Controls & View Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Toggle */}
          <div className="flex items-center bg-[#FAF5EC] p-1 rounded-2xl border border-[#EDE1D1]">
            <button
              type="button"
              onClick={() => setActiveView('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeView === 'list'
                  ? 'bg-[#7D0A14] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#7D0A14]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Staff List</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                activeView === 'calendar'
                  ? 'bg-[#7D0A14] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-[#7D0A14]'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Hours Calendar</span>
            </button>
          </div>

          {/* Quick Log Hours */}
          <button
            type="button"
            onClick={() => {
              if (employees.length > 0) {
                openLogHoursForEmployee(employees[0]);
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF5EC] hover:bg-[#F3EAD9] border border-[#EDE1D1] text-[#7D0A14] font-black text-xs transition-all shadow-2xs cursor-pointer active:scale-95"
            title="Log shift hours for an employee"
          >
            <Clock className="w-3.5 h-3.5 text-[#7D0A14]" />
            <span>Log Hours</span>
          </button>

          {/* Add Employee CTA */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-amber-300" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Active Staff */}
        <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black text-slate-400">Active Staff</span>
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#3D040A] mt-1">
            {stats.activeStaffCount} <span className="text-sm font-semibold text-slate-400">/ {stats.totalStaff}</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            ● 100% On-Duty Staff Verified
          </div>
        </div>

        {/* Today's Logged Hours */}
        <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black text-slate-400">Hours Worked Today</span>
            <span className="p-1.5 rounded-lg bg-amber-100 text-[#7D0A14]">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#7D0A14] mt-1">
            {stats.todayHours} <span className="text-sm font-semibold text-slate-400">hrs</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Across 3 active branch counters
          </div>
        </div>

        {/* Month Cumulative Hours */}
        <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black text-slate-400">November Logged Hours</span>
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-blue-900 mt-1">
            {stats.monthHours} <span className="text-sm font-semibold text-slate-400">hrs</span>
          </div>
          <div className="text-[11px] text-blue-700 font-bold mt-1">
            Avg {(Number(stats.monthHours) / (stats.activeStaffCount || 1)).toFixed(0)} hrs / staff
          </div>
        </div>

        {/* Estimated Monthly Payroll */}
        <div className="bg-white rounded-2xl border border-[#EDE1D1] shadow-2xs p-4 flex flex-col justify-between hover:border-[#7D0A14]/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-black text-slate-400">Est. Month Payroll</span>
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-800">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-purple-900 mt-1">
            ₹{stats.totalPayroll.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Accrued based on hourly rates
          </div>
        </div>
      </div>

      {/* VIEW 1: STAFF LIST & HOURS BREAKDOWN */}
      {activeView === 'list' && (
        <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-4 shadow-xs">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-[#EDE1D1] pb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search staff by name, role, phone or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-[#FAF5EC] border border-[#EDE1D1] rounded-xl text-xs font-semibold text-[#3D040A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]/20 focus:border-[#7D0A14]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Branch Filter */}
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-3 py-2 bg-[#FAF5EC] border border-[#EDE1D1] rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]/20"
              >
                <option value="all">All Branches</option>
                <option value="Branch 1">Branch 1 (Madhapur)</option>
                <option value="Branch 2">Branch 2 (Gachibowli)</option>
                <option value="Branch 3">Branch 3 (Jubilee Hills)</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-[#FAF5EC] border border-[#EDE1D1] rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]/20"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
          </div>

          {/* Table / Card List */}
          <div className="overflow-x-auto rounded-2xl border border-[#EDE1D1]">
            <table className="w-full text-left text-xs sm:text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#FAF5EC] text-slate-700 font-extrabold border-b border-[#EDE1D1]">
                  <th className="p-3.5 min-w-[200px]">Employee Details</th>
                  <th className="p-3.5 min-w-[150px]">Branch & Shift</th>
                  <th className="p-3.5 text-center min-w-[90px]">Hourly Rate</th>
                  <th className="p-3.5 text-center min-w-[100px]">Today's Hours</th>
                  <th className="p-3.5 text-center min-w-[100px]">Month Total</th>
                  <th className="p-3.5 text-right min-w-[110px]">Est. Payout</th>
                  <th className="p-3.5 text-right min-w-[130px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => {
                    const empStats = getEmployeeStats(emp);
                    const initials = emp.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2);

                    return (
                      <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Employee Avatar & Info */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#7D0A14] text-amber-300 font-black flex items-center justify-center text-xs shadow-2xs shrink-0">
                              {initials}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-black text-sm text-[#3D040A]">{emp.name}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">
                                  {emp.id}
                                </span>
                              </div>
                              <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                                {emp.role}
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <span>{emp.phone}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Branch & Shift */}
                        <td className="p-3.5">
                          <div className="font-bold text-xs text-[#7D0A14] flex items-center gap-1">
                            <Store className="w-3.5 h-3.5 shrink-0" />
                            <span>{emp.branch}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                            {emp.shift}
                          </div>
                          <div className="mt-1">
                            {emp.status === 'active' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                                On Leave
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Hourly Rate */}
                        <td className="p-3.5 text-center font-black text-sm text-slate-800">
                          ₹{emp.hourlyRate}
                          <span className="text-[10px] text-slate-400 font-normal block">/ hr</span>
                        </td>

                        {/* Today's Hours */}
                        <td className="p-3.5 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-xl font-black text-xs ${
                            empStats.todayHours > 0
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {empStats.todayHours > 0 ? `${empStats.todayHours} hrs` : 'Off'}
                          </span>
                        </td>

                        {/* Month Total Hours */}
                        <td className="p-3.5 text-center">
                          <div className="font-black text-sm text-slate-900">
                            {empStats.monthHours} hrs
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            Week: {empStats.weekHours} hrs
                          </div>
                        </td>

                        {/* Estimated Payout */}
                        <td className="p-3.5 text-right font-black text-sm text-purple-900">
                          ₹{empStats.monthPay.toLocaleString('en-IN')}
                          <span className="text-[10px] text-slate-400 font-medium block">Nov accrued</span>
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openLogHoursForEmployee(emp)}
                              className="px-2.5 py-1.5 rounded-xl bg-[#FAF5EC] hover:bg-[#7D0A14] text-[#7D0A14] hover:text-white font-black text-xs border border-[#EDE1D1] shadow-2xs transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1"
                              title="Log or edit hours"
                            >
                              <Clock className="w-3 h-3" />
                              <span>Log</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setCalendarEmployeeFilter(emp.id);
                                setActiveView('calendar');
                              }}
                              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-colors"
                              title="View Attendance Calendar"
                            >
                              <CalendarIcon className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setEmployeeToDelete(emp)}
                              className="p-1.5 rounded-xl text-rose-500 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors"
                              title={`Delete ${emp.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Users className="w-8 h-8 text-slate-300" />
                        <p className="text-sm font-bold text-slate-600">No staff found matching filters</p>
                        <p className="text-xs text-slate-400">Try adjusting your search query or branch filter.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE HOURS & ATTENDANCE CALENDAR ("and calender") */}
      {activeView === 'calendar' && (
        <div className="bg-white rounded-3xl border border-[#EDE1D1] p-5 sm:p-6 space-y-5 shadow-xs">
          {/* Calendar Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE1D1] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs">
                <CalendarIcon className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-black text-lg text-[#3D040A]">
                  Shift Attendance & Logged Hours Calendar
                </h3>
                <p className="text-xs text-slate-500">
                  Select any day to view staff presence, logged shift hours, and overtime breakdown.
                </p>
              </div>
            </div>

            {/* Filter by Staff on Calendar */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Filter Staff:</span>
              <select
                value={calendarEmployeeFilter}
                onChange={(e) => setCalendarEmployeeFilter(e.target.value)}
                className="px-3 py-1.5 bg-[#FAF5EC] border border-[#EDE1D1] rounded-xl text-xs font-bold text-[#7D0A14] focus:outline-none focus:ring-2 focus:ring-[#7D0A14]/20"
              >
                <option value="all">👥 All Staff ({employees.length})</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.id})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Month Indicator & Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#FAF5EC] p-3 rounded-2xl border border-[#EDE1D1]">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-[#3D040A]">
                November 2026
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7D0A14] text-amber-300">
                Current Pay Cycle
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-600">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Present (8h+)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Overtime (9h+)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span>Leave / Off</span>
              </div>
            </div>
          </div>

          {/* Calendar 7-Column Grid */}
          <div className="border border-[#EDE1D1] rounded-2xl overflow-hidden shadow-2xs">
            {/* Days of week header */}
            <div className="grid grid-cols-7 bg-[#FAF5EC] border-b border-[#EDE1D1] text-center text-xs font-black text-slate-700 py-2.5">
              <div className="text-rose-700">SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div className="text-rose-700">SAT</div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 divide-x divide-y divide-[#EDE1D1] bg-white">
              {calendarDays.map((item) => {
                if (item.empty) {
                  return <div key={item.key} className="min-h-[90px] bg-slate-50/50 p-2" />;
                }

                // If filtering by a specific employee
                let singleEmpRecord = null;
                if (calendarEmployeeFilter !== 'all') {
                  const target = employees.find((e) => e.id === calendarEmployeeFilter);
                  singleEmpRecord = target?.workHistory?.[item.dateStr];
                }

                return (
                  <div
                    key={item.dateStr}
                    onClick={() => {
                      setSelectedCalendarDay(item.dateStr);
                      setIsDayDetailModalOpen(true);
                    }}
                    className={`min-h-[90px] sm:min-h-[105px] p-2 flex flex-col justify-between transition-all cursor-pointer hover:bg-amber-50/40 ${
                      item.isToday
                        ? 'bg-[#FAF5EC] ring-2 ring-inset ring-[#7D0A14]'
                        : ''
                    }`}
                  >
                    {/* Day number header */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-black w-6 h-6 rounded-full flex items-center justify-center ${
                          item.isToday
                            ? 'bg-[#7D0A14] text-white shadow-xs'
                            : 'text-slate-800'
                        }`}
                      >
                        {item.dayNum}
                      </span>
                      {item.isToday && (
                        <span className="text-[9px] font-black uppercase text-[#7D0A14] bg-amber-100 px-1.5 py-0.2 rounded">
                          Today
                        </span>
                      )}
                    </div>

                    {/* Content: All Staff mode vs Single Staff mode */}
                    <div className="mt-1 space-y-1">
                      {calendarEmployeeFilter === 'all' ? (
                        <>
                          {item.presentCount > 0 ? (
                            <div className="text-[11px] font-black text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-1.5 py-1">
                              <div>{item.presentCount} Staff on duty</div>
                              <div className="text-[10px] text-slate-600 font-bold">
                                {item.dayTotalHours} hrs total
                              </div>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-medium block italic">
                              No records
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {singleEmpRecord && singleEmpRecord.hours > 0 ? (
                            <div className={`text-[11px] font-black rounded-lg px-1.5 py-1 border ${
                              singleEmpRecord.status === 'overtime'
                                ? 'bg-blue-50 text-blue-900 border-blue-200'
                                : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            }`}>
                              <div>{singleEmpRecord.hours} hrs</div>
                              <div className="text-[10px] font-medium capitalize text-slate-600">
                                {singleEmpRecord.shift} shift
                              </div>
                            </div>
                          ) : singleEmpRecord && singleEmpRecord.status === 'leave' ? (
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded block">
                              Off / Leave
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-300 font-medium block">
                              —
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: ADD NEW EMPLOYEE                                  */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#EDE1D1] space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs">
                  <UserPlus className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#3D040A]">
                    Add New Staff Member
                  </h3>
                  <p className="text-xs text-slate-500">
                    Create employee profile and assign branch & shift schedule
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-3.5 text-xs">
              {/* Full Name */}
              <div>
                <label className="font-extrabold text-slate-800 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  placeholder="e.g. Ramesh Varma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                />
              </div>

              {/* Role & Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Designation / Role *
                  </label>
                  <select
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  >
                    <option value="Store Manager & Cashier">Store Manager & Cashier</option>
                    <option value="Master Chef & Kitchen Lead">Master Chef & Kitchen Lead</option>
                    <option value="Operations & Branch Manager">Operations & Branch Manager</option>
                    <option value="Packaging & Dispatch Specialist">Packaging & Dispatch Specialist</option>
                    <option value="Express Fleet Lead Rider">Express Fleet Lead Rider</option>
                    <option value="Quality & Inventory Controller">Quality & Inventory Controller</option>
                    <option value="Kitchen Helper & Prep">Kitchen Helper & Prep</option>
                  </select>
                </div>

                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Assigned Branch *
                  </label>
                  <select
                    value={newEmployee.branch}
                    onChange={(e) => setNewEmployee({ ...newEmployee, branch: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  >
                    <option value="Branch 1 (Madhapur)">Branch 1 (Madhapur)</option>
                    <option value="Branch 2 (Gachibowli)">Branch 2 (Gachibowli)</option>
                    <option value="Branch 3 (Jubilee Hills)">Branch 3 (Jubilee Hills)</option>
                    <option value="All Branches / Central">All Branches / Central</option>
                  </select>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    placeholder="+91 98480 00000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    placeholder="staff@sumadhurafoods.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>
              </div>

              {/* Hourly Rate & Standard Shift */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Hourly Pay Rate (₹/hr) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      required
                      min="50"
                      step="10"
                      value={newEmployee.hourlyRate}
                      onChange={(e) => setNewEmployee({ ...newEmployee, hourlyRate: e.target.value })}
                      placeholder="200"
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-300 font-bold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Default Shift *
                  </label>
                  <select
                    value={newEmployee.shift}
                    onChange={(e) => setNewEmployee({ ...newEmployee, shift: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  >
                    <option value="Morning (06:00 - 14:30)">Morning (06:00 - 14:30)</option>
                    <option value="Day (08:30 - 16:30)">Day (08:30 - 16:30)</option>
                    <option value="Full Day (09:00 - 18:00)">Full Day (09:00 - 18:00)</option>
                    <option value="Evening (14:00 - 22:30)">Evening (14:00 - 22:30)</option>
                  </select>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#EDE1D1]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-amber-300" />
                  <span>Save Employee</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: LOG / RECORD WORK HOURS                           */}
      {/* ========================================================= */}
      {isLogHoursModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EDE1D1] space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs">
                  <Clock className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#3D040A]">
                    Log Shift Work Hours
                  </h3>
                  <p className="text-xs text-slate-500">
                    Record actual hours worked on shift for payroll calculation
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLogHoursModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogHoursSubmit} className="space-y-3.5 text-xs">
              {/* Employee Selector */}
              <div>
                <label className="font-extrabold text-slate-800 block mb-1">
                  Employee *
                </label>
                <select
                  required
                  value={logHoursForm.employeeId}
                  onChange={(e) => setLogHoursForm({ ...logHoursForm, employeeId: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                >
                  <option value="">Select Employee...</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.id}) — {emp.branch}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Hours */}
              <div className="grid grid-cols-2 gap-3">
                <DatePickerDMY
                  label="Date"
                  required
                  value={logHoursForm.date}
                  onChange={(val) => setLogHoursForm({ ...logHoursForm, date: val })}
                />

                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Hours Worked *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="16"
                    step="0.5"
                    value={logHoursForm.hours}
                    onChange={(e) => setLogHoursForm({ ...logHoursForm, hours: e.target.value })}
                    placeholder="8.0"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-black text-sm text-[#7D0A14] focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  />
                </div>
              </div>

              {/* Shift & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Shift
                  </label>
                  <select
                    value={logHoursForm.shift}
                    onChange={(e) => setLogHoursForm({ ...logHoursForm, shift: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Day">Day</option>
                    <option value="Evening">Evening</option>
                    <option value="Overtime">Overtime Extension</option>
                  </select>
                </div>

                <div>
                  <label className="font-extrabold text-slate-800 block mb-1">
                    Attendance Status
                  </label>
                  <select
                    value={logHoursForm.status}
                    onChange={(e) => setLogHoursForm({ ...logHoursForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                  >
                    <option value="present">Present (Full Day)</option>
                    <option value="overtime">Overtime (&gt;8 hrs)</option>
                    <option value="half_day">Half Day</option>
                    <option value="leave">Leave / Day Off</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={logHoursForm.notes}
                  onChange={(e) => setLogHoursForm({ ...logHoursForm, notes: e.target.value })}
                  placeholder="e.g. Covered evening rush hour peak"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#7D0A14]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#EDE1D1]">
                <button
                  type="button"
                  onClick={() => setIsLogHoursModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#7D0A14] hover:bg-[#60060E] text-white font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Save Work Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: DELETE CONFIRMATION                              */}
      {/* ========================================================= */}
      {employeeToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-rose-200 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-[#3D040A]">
                Delete Employee Profile?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove <strong>{employeeToDelete.name}</strong> ({employeeToDelete.id}) from the system?
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1">
              <div><span className="text-slate-400">Branch:</span> <span className="font-bold text-slate-800">{employeeToDelete.branch}</span></div>
              <div><span className="text-slate-400">Role:</span> <span className="font-bold text-slate-800">{employeeToDelete.role}</span></div>
              <div><span className="text-slate-400">Hourly Rate:</span> <span className="font-bold text-slate-800">₹{employeeToDelete.hourlyRate}/hr</span></div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEmployeeToDelete(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteEmployee(employeeToDelete)}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-sm cursor-pointer active:scale-95 transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: CALENDAR DAY DETAIL BREAKDOWN                    */}
      {/* ========================================================= */}
      {isDayDetailModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#EDE1D1] space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDE1D1] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7D0A14] text-amber-300 flex items-center justify-center shadow-xs">
                  <CalendarIcon className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-[#3D040A]">
                    Daily Shift Attendance: {formatDateDMY(selectedCalendarDay)}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Breakdown of staff hours worked on this date
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDayDetailModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of employees and their records for this date */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {employees.map((emp) => {
                const dayRecord = emp.workHistory?.[selectedCalendarDay];
                return (
                  <div
                    key={emp.id}
                    className="p-3 rounded-2xl bg-[#FAF5EC] border border-[#EDE1D1] flex items-center justify-between text-xs hover:border-[#7D0A14]/30 transition-all"
                  >
                    <div>
                      <div className="font-black text-slate-900">{emp.name}</div>
                      <div className="text-[11px] text-slate-500">{emp.branch} • {emp.role}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      {dayRecord && dayRecord.hours > 0 ? (
                        <div className="text-right">
                          <span className="font-black text-[#7D0A14] text-sm block">
                            {dayRecord.hours} hrs
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold">
                            ₹{Math.round(dayRecord.hours * emp.hourlyRate)} earned
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-[#EDE1D1]">
                          Off / Not Logged
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setIsDayDetailModalOpen(false);
                          openLogHoursForEmployee(emp, selectedCalendarDay);
                        }}
                        className="px-2.5 py-1 rounded-xl bg-white hover:bg-[#7D0A14] text-[#7D0A14] hover:text-white font-black text-[11px] border border-[#EDE1D1] shadow-2xs transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsDayDetailModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#FAF5EC] hover:bg-[#F3EAD9] text-[#7D0A14] font-black text-xs border border-[#EDE1D1] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManager;

