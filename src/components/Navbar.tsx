import { Search, Moon, Bell, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockNotifications } from '@/data/mockData';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';

export function Navbar() {
  const { currentUser, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  const getRoleLabel = (role?: string) => {
    if (role === 'owner') return 'المالك';
    if (role === 'admin') return 'المسؤول';
    return 'الموظف';
  };

  return (
    <div className="h-16 border-b border-[#2a3142] bg-[#1a1f2e] flex items-center justify-between px-4 lg:px-6 shrink-0 relative z-20">
      <div className="relative w-full max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="ابحث عن طلب أو عميل..." 
          className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg pl-4 pr-10 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[#7c3aed] transition-colors"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-200 transition-colors hidden sm:block">
          <Moon className="w-5 h-5" />
        </button>
        
        <Link href="/notifications" className="relative text-slate-400 hover:text-slate-200 transition-colors">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Link>
        
        <div className="h-8 w-[1px] bg-[#2a3142] mx-1"></div>
        
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-[#2a3142] p-1.5 rounded-lg transition-colors text-right"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold overflow-hidden border border-indigo-500/30 shrink-0">
              <img 
                src={`https://ui-avatars.com/api/?name=${currentUser?.name || 'User'}&background=random`} 
                alt="Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-200 leading-none">{currentUser?.name}</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-none">{getRoleLabel(currentUser?.role)}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block shrink-0" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1f2e] border border-[#2a3142] rounded-lg shadow-lg overflow-hidden py-1">
              <Link href="/settings" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-[#2a3142] hover:text-white transition-colors w-full text-right">
                <User className="w-4 h-4 text-slate-400" />
                <span>الملف الشخصي</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors w-full text-right">
                <LogOut className="w-4 h-4" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
