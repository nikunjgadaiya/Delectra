import React, { useState, useEffect } from 'react';
import { Lock, AlertCircle, ChevronLeft, ChevronDown, Eye, EyeOff, Search, Calendar, Mail, Phone, MapPin, Filter, X, Trash2, ArrowUpDown, TrendingUp, Edit2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COOLDOWN_STAGES = [
  30 * 1000, 60 * 1000, 5 * 60 * 1000, 10 * 60 * 1000, 30 * 60 * 1000, 60 * 60 * 1000
];

const STATUSES = ['new', 'pending', 'contacted', 'working', 'in hold', 'completed', 'rejected'];

const STATUS_COLORS: Record<string, { bg: string, text: string, border: string, dot: string }> = {
  'new': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', dot: 'bg-cyan-400' },
  'pending': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', dot: 'bg-yellow-400' },
  'contacted': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-400' },
  'working': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20', dot: 'bg-purple-400' },
  'in hold': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', dot: 'bg-orange-400' },
  'completed': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', dot: 'bg-green-400' },
  'rejected': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', dot: 'bg-red-400' }
};

// Custom Calendar Range Picker Component
const CustomCalendar = ({ startDate, endDate, onChange }: any) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    clickedDate.setHours(0,0,0,0);
    
    if (!startDate || (startDate && endDate)) {
      onChange(clickedDate, null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        onChange(clickedDate, startDate);
      } else {
        onChange(startDate, clickedDate);
      }
    }
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blankDays = Array.from({ length: firstDay }, (_, i) => i);

  const getDayStatus = (day: number) => {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getTime();
    const start = startDate ? startDate.getTime() : null;
    const end = endDate ? endDate.getTime() : null;
    
    if (start && !end && d === start) return 'start';
    if (start && end) {
      if (d === start) return 'start';
      if (d === end) return 'end';
      if (d > start && d < end) return 'in-range';
    }
    return 'none';
  };

  return (
    <div className="w-[280px] select-none p-2">
      <div className="flex justify-between items-center mb-6 px-1">
        <button onClick={handlePrevMonth} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><ChevronLeft className="w-4 h-4 text-gray-400 hover:text-white" /></button>
        <div className="text-white font-bold text-sm tracking-wide">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={handleNextMonth} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><ChevronLeft className="w-4 h-4 text-gray-400 hover:text-white rotate-180" /></button>
      </div>
      <div className="grid grid-cols-7 gap-y-4 mb-3">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-2 gap-x-0">
        {blankDays.map(b => <div key={`blank-${b}`} className="w-full h-8" />)}
        {days.map(day => {
          const status = getDayStatus(day);
          const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const dayOfWeek = dateObj.getDay();
          
          let wrapperClass = "relative w-full h-8 flex items-center justify-center ";
          
          if (status === 'start' && endDate) wrapperClass += "bg-secondary/20 rounded-l-full";
          else if (status === 'end') wrapperClass += "bg-secondary/20 rounded-r-full";
          else if (status === 'in-range') {
            wrapperClass += "bg-secondary/20";
            if (dayOfWeek === 0) wrapperClass += " rounded-l-full";
            if (dayOfWeek === 6) wrapperClass += " rounded-r-full";
          }
          
          let dayClass = "w-8 h-8 flex items-center justify-center text-[13px] rounded-full cursor-pointer transition-all z-10 relative ";
          
          if (status === 'start' || status === 'end') {
            dayClass += "bg-secondary text-black font-bold shadow-[0_0_15px_rgba(221,183,255,0.6)]";
          } else if (status === 'in-range') {
            dayClass += "text-white font-medium hover:bg-white/10";
          } else {
            dayClass += "text-gray-400 hover:bg-white/10 hover:text-white";
          }

          return (
            <div key={day} className={wrapperClass}>
              <div 
                onClick={() => handleDayClick(day)}
                className={dayClass}
              >
                {day}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

const StatusDropdown = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  const colors = STATUS_COLORS[value] || { bg: 'bg-white/5', text: 'text-white', border: 'border-white/20', dot: 'bg-gray-400' };
  
  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 ${colors.bg} ${colors.text} ${colors.border} border text-[10px] px-3 py-1.5 rounded-lg transition-colors font-bold tracking-widest uppercase font-heading focus:outline-none hover:opacity-80`}
      >
        {value}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 bg-[#111] border border-white/10 rounded-lg shadow-2xl z-50 py-1.5 w-36 overflow-hidden"
          >
            {STATUSES.map(s => {
              const sColors = STATUS_COLORS[s];
              return (
                <button
                  key={s}
                  onClick={() => { onChange(s); setIsOpen(false); }}
                  className={`w-full flex items-center px-4 py-2.5 text-[10px] uppercase tracking-widest font-heading font-bold transition-colors ${sColors.text} ${
                    value === s ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-2 ${sColors.dot}`} />
                  {s}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  // Submissions state
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // New Filter, Sort, Tab states
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilterOption, setActiveFilterOption] = useState('all');
  const [showSort, setShowSort] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', dir: 'desc' });
  const [activeTab, setActiveTab] = useState('new');
  const actionMenuRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target as Node)) {
        setShowDatePicker(false);
        setShowFilter(false);
        setShowSort(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Login attempt tracking
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);

  useEffect(() => {
    const storedAttempts = localStorage.getItem('admin_failed_attempts');
    const storedCooldown = localStorage.getItem('admin_cooldown_end');
    if (storedAttempts) setFailedAttempts(parseInt(storedAttempts));
    if (storedCooldown) setCooldownEnd(parseInt(storedCooldown));
  }, []);

  useEffect(() => {
    localStorage.setItem('admin_failed_attempts', failedAttempts.toString());
  }, [failedAttempts]);

  useEffect(() => {
    if (cooldownEnd) {
      localStorage.setItem('admin_cooldown_end', cooldownEnd.toString());
    } else {
      localStorage.removeItem('admin_cooldown_end');
    }
  }, [cooldownEnd]);

  useEffect(() => {
    if (isLoggedIn) {
      const existing = localStorage.getItem('contact_submissions');
      if (existing) {
        // Migration mapping to ensure backwards compat with old submissions lacking status/remarks/sales
        const parsed = JSON.parse(existing).map((s: any) => ({
          ...s,
          status: s.status || 'new',
          remarks: s.remarks || '',
          sales: s.sales || 0
        }));
        setSubmissions(parsed);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, showSplash]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (cooldownEnd) {
      interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, cooldownEnd - now);
        setCooldownRemaining(remaining);
        
        if (remaining === 0) {
          setCooldownEnd(null);
        }
      }, 1000);
      setCooldownRemaining(Math.max(0, cooldownEnd - Date.now()));
    }
    return () => clearInterval(interval);
  }, [cooldownEnd]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldownEnd && cooldownRemaining > 0) return;

    if (username === 'admin' && password === 'Nikunj#15') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_auth', 'true');
      setError('');
      setFailedAttempts(0);
      setCooldownEnd(null);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      setError('Password or username is incorrect');
      
      if (newAttempts >= 3) {
        const stageIndex = Math.min(newAttempts - 3, COOLDOWN_STAGES.length - 1);
        const cooldownMs = COOLDOWN_STAGES[stageIndex];
        setCooldownEnd(Date.now() + cooldownMs);
      }
    }
  };

  const updateSubmission = (id: string, updates: any) => {
    const newSubs = submissions.map(s => s.id === id ? { ...s, ...updates } : s);
    setSubmissions(newSubs);
    localStorage.setItem('contact_submissions', JSON.stringify(newSubs));
  };

  const deleteSubmission = (id: string) => {
    const newSubs = submissions.filter(s => s.id !== id);
    setSubmissions(newSubs);
    localStorage.setItem('contact_submissions', JSON.stringify(newSubs));
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  let filteredSubmissions = submissions.filter(sub => {
    const searchMatch = !searchQuery || 
      [sub.name, sub.email, sub.phone, sub.city, sub.country, sub.description, sub.remarks]
        .some(val => val && val.toLowerCase().includes(searchQuery.toLowerCase()));

    let dateMatch = true;
    if (startDate) {
      const subDate = new Date(sub.date);
      subDate.setHours(0,0,0,0);
      const start = new Date(startDate);
      start.setHours(0,0,0,0);
      if (subDate < start) dateMatch = false;
      if (endDate) {
         const end = new Date(endDate);
         end.setHours(23,59,59,999);
         if (subDate > end) dateMatch = false;
      }
    }
    
    let tabMatch = false;
    if (activeTab === 'all') {
      tabMatch = sub.status !== 'deleted';
    } else {
      tabMatch = sub.status === activeTab;
    }
    
    let advancedFilterMatch = true;
    if (activeFilterOption === 'has-sales') advancedFilterMatch = Number(sub.sales) > 0;
    if (activeFilterOption === 'no-sales') advancedFilterMatch = Number(sub.sales) === 0;
    if (activeFilterOption === 'has-remarks') advancedFilterMatch = sub.remarks && sub.remarks.length > 0;

    return searchMatch && dateMatch && tabMatch && advancedFilterMatch;
  });

  filteredSubmissions.sort((a, b) => {
    if (sortConfig.key === 'date') {
      return sortConfig.dir === 'desc' 
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortConfig.key === 'sales') {
       return sortConfig.dir === 'desc' 
         ? Number(b.sales || 0) - Number(a.sales || 0)
         : Number(a.sales || 0) - Number(b.sales || 0);
    }
    return 0;
  });

  const totalSales = filteredSubmissions.reduce((sum, sub) => sum + (Number(sub.sales) || 0), 0);
  
  // Immersive graph generation
  const salesDataPoints = filteredSubmissions.map(s => Number(s.sales) || 0).reverse();
  const maxSale = Math.max(...salesDataPoints, 1);
  const pathPoints = salesDataPoints.map((val, i) => {
    const x = salesDataPoints.length > 1 ? (i / (salesDataPoints.length - 1)) * 100 : 50;
    const y = 100 - ((val / maxSale) * 80); 
    return `${x},${y}`;
  });
  const graphPath = pathPoints.length > 1 
    ? `M0,100 L0,${pathPoints[0].split(',')[1]} L${pathPoints.join(' L')} L100,${pathPoints[pathPoints.length-1].split(',')[1]} L100,100 Z` 
    : "M0,100 L0,90 L100,90 L100,100 Z";

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-on-surface p-4 md:p-8 selection:bg-secondary/30 relative z-50">
        <AnimatePresence>
          {showSplash && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <img src="/logo.png" alt="Delectra" className="h-12 md:h-16 mx-auto mb-10 object-contain" />
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <Lock className="w-10 h-10 text-secondary" />
                </div>
                <h1 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tighter mb-4">
                  Welcome Sir.
                </h1>
                <p className="text-secondary font-heading uppercase tracking-widest text-sm">
                  Access Granted
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-white">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <a href="/" className="text-sm font-heading tracking-widest text-secondary hover:text-white transition-colors uppercase hidden md:block">
                Back to Site
              </a>
              <button 
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem('admin_auth');
                }}
                className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm"
              >
                Log Out
              </button>
            </div>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-heading mb-2 text-white">Filtered Leads</h3>
              <p className="text-4xl font-bold text-secondary">{filteredSubmissions.length}</p>
            </div>
            <div className="glass-card p-6 relative overflow-hidden group col-span-1 md:col-span-2">
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-heading mb-2 text-white">Total Sales</h3>
                  <p className="text-4xl font-bold text-green-400">₹{totalSales.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-bold text-xs">Live Range</span>
                </div>
              </div>
              <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-1000" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d={graphPath} fill="url(#sales-gradient)" />
                <defs>
                  <linearGradient id="sales-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          <div className="glass-card p-4 md:p-8 min-h-[60vh]">
             {/* Tabs */}
             <div className="flex gap-2 border-b border-white/10 mb-6 overflow-x-auto pb-4 hide-scrollbar">
               {['all', ...STATUSES, 'deleted'].map(tab => {
                 const count = tab === 'all' 
                   ? submissions.filter(s => s.status !== 'deleted').length 
                   : submissions.filter(s => s.status === tab).length;
                   
                 let activeStyle = '';
                 let inactiveStyle = '';
                 let badgeActive = 'bg-black/20 text-black';
                 let badgeInactive = 'bg-black/20 text-current';

                 if (tab === 'all') {
                   activeStyle = 'bg-secondary text-black border-transparent shadow-[0_0_15px_rgba(221,183,255,0.4)]';
                   inactiveStyle = 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white';
                   badgeInactive = 'bg-white/10 text-white';
                 } else if (tab === 'deleted') {
                   activeStyle = 'bg-red-500 text-black border-transparent shadow-[0_0_15px_rgba(239,68,68,0.4)]';
                   inactiveStyle = 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20';
                 } else {
                   const c = STATUS_COLORS[tab];
                   activeStyle = `${c.dot} text-black border-transparent`;
                   inactiveStyle = `${c.bg} ${c.text} ${c.border} hover:opacity-80`;
                 }

                 return (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)} 
                     className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-heading uppercase tracking-widest whitespace-nowrap transition-all border ${
                       activeTab === tab ? activeStyle : inactiveStyle
                     }`}
                   >
                     {tab === 'all' ? 'All Leads' : tab}
                     {count > 0 && (
                       <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab ? badgeActive : badgeInactive}`}>
                         {count}
                       </span>
                     )}
                   </button>
                 );
               })}
             </div>

             <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
               <h2 className="text-2xl font-heading text-white hidden md:block">Submissions</h2>
               
               <div className="flex flex-wrap gap-3 w-full xl:w-auto items-center" ref={actionMenuRef}>
                 <div className="relative w-full md:w-auto flex-grow md:flex-grow-0">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                   <input
                     type="text"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Search keyword..."
                     className="w-full md:w-48 bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-secondary transition-colors placeholder-gray-500"
                   />
                 </div>
                 
                 {/* Calendar Button */}
                 <div className="relative">
                   <button 
                     onClick={() => {
                       setShowDatePicker(!showDatePicker);
                       setShowFilter(false);
                       setShowSort(false);
                     }}
                     className={`flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm font-bold font-heading ${(startDate || endDate) ? 'text-secondary border-secondary/50' : 'text-white'}`}
                   >
                     <Calendar className="w-4 h-4" />
                     <span className="hidden sm:inline">Date</span>
                   </button>
                   <AnimatePresence>
                     {showDatePicker && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
                         className="absolute top-12 right-0 md:left-0 md:right-auto bg-[#111] border border-white/10 rounded-xl p-4 shadow-2xl z-50"
                       >
                         <CustomCalendar 
                           startDate={startDate} 
                           endDate={endDate} 
                           onChange={(start: Date, end: Date) => {
                             setStartDate(start);
                             setEndDate(end);
                           }} 
                         />
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>

                 {/* Filter Button */}
                 <div className="relative">
                   <button 
                     onClick={() => {
                       setShowFilter(!showFilter);
                       setShowDatePicker(false);
                       setShowSort(false);
                     }}
                     className={`flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm font-bold font-heading ${activeFilterOption !== 'all' ? 'text-secondary border-secondary/50' : 'text-white'}`}
                   >
                     <Filter className="w-4 h-4" />
                     <span className="hidden sm:inline">Filter</span>
                   </button>
                   <AnimatePresence>
                     {showFilter && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
                         className="absolute top-12 right-0 md:left-0 md:right-auto bg-[#111] border border-white/10 rounded-xl p-2 shadow-2xl z-50 w-48 flex flex-col gap-1"
                       >
                         {[
                           {id: 'all', label: 'All Options'},
                           {id: 'has-sales', label: 'Has Sales (₹)'},
                           {id: 'no-sales', label: 'No Sales Yet'},
                           {id: 'has-remarks', label: 'Has Admin Remarks'}
                         ].map(opt => (
                           <button 
                             key={opt.id}
                             onClick={() => { setActiveFilterOption(opt.id); setShowFilter(false); }}
                             className={`text-left px-3 py-2 text-sm rounded-lg transition-colors ${activeFilterOption === opt.id ? 'bg-secondary text-black font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                           >
                             {opt.label}
                           </button>
                         ))}
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>

                 {/* Sort Button */}
                 <div className="relative">
                   <button 
                     onClick={() => {
                       setShowSort(!showSort);
                       setShowDatePicker(false);
                       setShowFilter(false);
                     }}
                     className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm font-bold font-heading text-white"
                   >
                     <ArrowUpDown className="w-4 h-4" />
                     <span className="hidden sm:inline">Sort</span>
                   </button>
                   <AnimatePresence>
                     {showSort && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
                         className="absolute top-12 right-0 bg-[#111] border border-white/10 rounded-xl p-2 shadow-2xl z-50 w-48 flex flex-col gap-1"
                       >
                         {[
                           {key: 'date', dir: 'desc', label: 'Newest First'},
                           {key: 'date', dir: 'asc', label: 'Oldest First'},
                           {key: 'sales', dir: 'desc', label: 'Highest Sale'},
                           {key: 'sales', dir: 'asc', label: 'Lowest Sale'}
                         ].map(opt => (
                           <button 
                             key={`${opt.key}-${opt.dir}`}
                             onClick={() => { setSortConfig({key: opt.key, dir: opt.dir}); setShowSort(false); }}
                             className={`text-left px-3 py-2 text-sm rounded-lg transition-colors ${sortConfig.key === opt.key && sortConfig.dir === opt.dir ? 'bg-secondary text-black font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                           >
                             {opt.label}
                           </button>
                         ))}
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>

                 <AnimatePresence>
                   {activeTab === 'deleted' && filteredSubmissions.length > 0 && (
                     <motion.button
                       initial={{ opacity: 0, scale: 0.8, width: 0, paddingLeft: 0, paddingRight: 0 }}
                       animate={{ opacity: 1, scale: 1, width: 'auto', paddingLeft: 16, paddingRight: 16 }}
                       exit={{ opacity: 0, scale: 0.8, width: 0, paddingLeft: 0, paddingRight: 0 }}
                       onClick={() => {
                         if(window.confirm('Empty trash? This will permanently delete all submissions in the deleted tab.')) {
                           const newSubs = submissions.filter(s => s.status !== 'deleted');
                           setSubmissions(newSubs);
                           localStorage.setItem('contact_submissions', JSON.stringify(newSubs));
                         }
                       }}
                       className="flex items-center gap-2 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-bold font-heading hover:bg-red-500/20 transition-all whitespace-nowrap overflow-hidden mr-2"
                     >
                       <Trash2 className="w-4 h-4 shrink-0" />
                       <span className="hidden sm:inline">Empty Trash</span>
                     </motion.button>
                   )}
                 </AnimatePresence>

                 <AnimatePresence>
                   {(searchQuery || startDate || endDate || activeFilterOption !== 'all') && (
                     <motion.button
                       initial={{ opacity: 0, scale: 0.8, width: 0, paddingLeft: 0, paddingRight: 0 }}
                       animate={{ opacity: 1, scale: 1, width: 'auto', paddingLeft: 16, paddingRight: 16 }}
                       exit={{ opacity: 0, scale: 0.8, width: 0, paddingLeft: 0, paddingRight: 0 }}
                       onClick={() => {
                         setSearchQuery('');
                         setStartDate(null);
                         setEndDate(null);
                         setActiveFilterOption('all');
                         setShowDatePicker(false);
                         setShowFilter(false);
                         setShowSort(false);
                       }}
                       className="flex items-center gap-2 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-bold font-heading hover:bg-red-500/20 transition-all whitespace-nowrap overflow-hidden"
                     >
                       <X className="w-4 h-4 shrink-0" />
                       <span className="hidden sm:inline">Clear</span>
                     </motion.button>
                   )}
                 </AnimatePresence>
               </div>
             </div>

             <div className="space-y-4">
                {filteredSubmissions.length === 0 ? (
                  <div className="text-center py-24 border border-dashed border-white/10 rounded-xl">
                    <p className="text-gray-500">No submissions found in this view.</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {filteredSubmissions.map((sub, index) => (
                      <motion.div 
                        key={sub.id} 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{ zIndex: filteredSubmissions.length - index }}
                        className={`border ${sub.status === 'new' ? 'border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'border-white/10'} bg-[#0a0a0a] rounded-2xl p-6 md:p-8 hover:bg-[#111] transition-all relative group flex flex-col gap-5`}
                        onMouseEnter={() => {
                          if (sub.status === 'new') {
                            updateSubmission(sub.id, { status: 'pending' });
                          }
                        }}
                      >
                         {/* Header Section */}
                         <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-20">
                           <div>
                             <h4 className="text-2xl font-bold text-white tracking-tight mb-2">{sub.name}</h4>
                             <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400 font-medium">
                               <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Mail className="w-4 h-4"/> {sub.email}</span>
                               {sub.phone && <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Phone className="w-4 h-4"/> {sub.phone}</span>}
                               <span className="flex items-center gap-2 hover:text-white transition-colors"><MapPin className="w-4 h-4" /> {sub.city}{sub.city && sub.country ? ', ' : ''}{sub.country}</span>
                             </div>
                           </div>
                           
                           <div className="flex flex-col items-start md:items-end gap-3 mt-2 md:mt-0 shrink-0">
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Stage</span>
                                <StatusDropdown 
                                  value={sub.status || 'new'} 
                                  onChange={(val) => updateSubmission(sub.id, { status: val })}
                                />
                                
                                {/* Action Buttons Inline */}
                                {sub.status === 'deleted' ? (
                                  <div className="flex items-center gap-2 ml-1">
                                    <button 
                                      onClick={() => updateSubmission(sub.id, { status: 'pending' })}
                                      className="p-1.5 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors"
                                      title="Restore Submission"
                                    >
                                      <RotateCcw className="w-4 h-4" />
                                    </button>
                                    <button 
                                      onClick={() => {
                                        if(window.confirm('Permanently delete this submission? This cannot be undone.')) {
                                          deleteSubmission(sub.id);
                                        }
                                      }}
                                      className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                                      title="Permanently Delete"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => updateSubmission(sub.id, { status: 'deleted' })}
                                    className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 ml-1"
                                    title="Move to Trash"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl focus-within:border-green-500/50 focus-within:bg-green-500/10 transition-all">
                                <span className="text-green-500/70 text-sm font-bold">₹</span>
                                <input 
                                  type="number" 
                                  value={sub.sales || ''} 
                                  onChange={(e) => updateSubmission(sub.id, { sales: e.target.value })} 
                                  placeholder="0"
                                  className="w-24 bg-transparent text-sm text-green-400 font-bold focus:outline-none placeholder-gray-600"
                                />
                              </div>
                           </div>
                         </div>
                         
                         {/* Body Grid: Description & Admin Remarks side by side */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2 relative z-0 border-t border-white/5 pt-6">
                           <div>
                             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                               Message
                             </label>
                             <p className="text-gray-300 text-[15px] leading-relaxed font-light">
                               {sub.description}
                             </p>
                           </div>
                           
                           <div className="flex flex-col justify-between h-full">
                             <div>
                               <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                 <Edit2 className="w-3 h-3" /> Admin Remarks
                               </label>
                               <textarea
                                 value={sub.remarks || ''}
                                 onChange={(e) => updateSubmission(sub.id, { remarks: e.target.value })}
                                 placeholder="Add private tracking remarks here..."
                                 className="w-full bg-transparent border-b border-white/10 pb-2 text-sm text-white resize-none focus:outline-none focus:border-secondary transition-colors placeholder-gray-700 font-light min-h-[40px]"
                                 rows={2}
                               />
                             </div>
                             
                             <div className="text-sm font-bold text-white text-right mt-6 flex justify-end items-center opacity-80">
                               {new Date(sub.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                             </div>
                           </div>
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
             </div>
          </div>
        </div>
      </div>
    );
  }

  const isLocked = cooldownEnd !== null && cooldownRemaining > 0;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 selection:bg-secondary/30 relative z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 w-full max-w-md relative"
      >
        <a href="/" className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </a>
        
        <div className="text-center mb-8 mt-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
            <Lock className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-white">Admin Access</h2>
          <p className="text-on-surface-variant text-sm mt-2">Classified access only</p>
        </div>

        {error && !isLocked && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {isLocked && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 text-yellow-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">
              Too many failed attempts. Try again in {formatTime(cooldownRemaining)}.
            </p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={isLocked}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors disabled:opacity-50"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLocked}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-secondary transition-colors disabled:opacity-50"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLocked}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={isLocked}
            className="w-full bg-secondary text-black font-bold font-heading uppercase tracking-widest py-4 rounded-xl mt-4 hover:shadow-[0_0_20px_rgba(221,183,255,0.4)] transition-all disabled:opacity-50 disabled:hover:shadow-none"
          >
            {isLocked ? 'Locked' : 'Authenticate'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
