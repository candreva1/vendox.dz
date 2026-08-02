import { Home, ShoppingBag, Package, Users, BarChart3, Users2, Shield, Settings, Plus } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrders } from '@/data/mockData';

export function Sidebar() {
  const [location] = useLocation();
  const { hasPermission } = useAuth();
  
  const newOrdersCount = mockOrders.filter(o => o.status === 'new').length;

  const items = [
    { name: 'الرئيسية', icon: Home, path: '/' },
    { name: 'الطلبات', icon: ShoppingBag, badge: newOrdersCount, path: '/orders' },
    { name: 'المنتجات', icon: Package, path: '/products/kelo-cote' },
    { name: 'العملاء', icon: Users, path: '/customers' },
    { name: 'الإحصائيات', icon: BarChart3, path: '/analytics', permission: 'canViewAnalytics' },
    { name: 'المستخدمون', icon: Users2, path: '/users', permission: 'canManageUsers' },
    { name: 'الصلاحيات', icon: Shield, path: '/users', permission: 'canManageUsers' }, // Map to the same page for now
    { name: 'الإعدادات', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="w-[165px] bg-[#1a1f2e] border-l border-[#2a3142] flex-col h-screen shrink-0 hidden md:flex">
      <div className="h-16 flex items-center justify-center border-b border-[#2a3142]">
        <h1 className="text-xl font-bold text-white tracking-wider font-sans leading-tight text-center">
          TOJAR DZ<br/>
          <span className="text-xs text-slate-400 font-normal">لوحة التحكم</span>
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-2">
        {items.map((item) => {
          if (item.permission && !hasPermission(item.permission as any)) return null;
          
          const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path));
          
          return (
            <Link 
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full ${
                isActive 
                  ? 'bg-[#7c3aed] text-white' 
                  : 'text-slate-400 hover:bg-[#2a3142] hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="text-sm font-semibold">{item.name}</span>
              {item.badge ? (
                <span className="mr-auto bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-[#2a3142]">
        <button className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg py-2.5 px-2 flex items-center justify-center gap-2 text-sm font-semibold transition-colors">
          <Plus className="w-4 h-4 shrink-0" />
          <span className="truncate">طلب جديد (يدوي)</span>
        </button>
        <p className="text-[10px] text-slate-500 text-center mt-4">
          © 2026 Tojar DZ<br/>جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
}
