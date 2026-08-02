import { Layout } from '@/components/Layout';
import { mockNotifications } from '@/data/mockData';
import { useState } from 'react';
import { ShoppingBag, RefreshCw, Bell, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'orders') return n.type === 'new_order';
    if (filter === 'system') return n.type === 'system';
    return true;
  });

  const getIcon = (type: string) => {
    switch(type) {
      case 'new_order': return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'status_change': return <RefreshCw className="w-5 h-5 text-blue-400" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      default: return <Bell className="w-5 h-5 text-amber-400" />;
    }
  };

  const getIconBg = (type: string) => {
    switch(type) {
      case 'new_order': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'status_change': return 'bg-blue-500/10 border-blue-500/20';
      case 'alert': return 'bg-rose-500/10 border-rose-500/20';
      default: return 'bg-amber-500/10 border-amber-500/20';
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto w-full">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-200 flex items-center gap-3">
            الإشعارات
            <span className="bg-[#7c3aed] text-white text-xs px-2 py-0.5 rounded-full font-mono">
              {notifications.filter(n => !n.isRead).length} جديد
            </span>
          </h1>
          <button 
            onClick={markAllAsRead}
            className="text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            تحديد الكل كمقروء
          </button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-1">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'unread', label: 'غير مقروء' },
            { id: 'orders', label: 'طلبات جديدة' },
            { id: 'system', label: 'تنبيهات النظام' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                filter === tab.id 
                  ? 'bg-[#7c3aed] text-white' 
                  : 'bg-[#1a1f2e] text-slate-400 border border-[#2a3142] hover:bg-[#2a3142]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-xl p-12 flex flex-col items-center justify-center text-center">
              <Bell className="w-12 h-12 text-slate-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-300">لا توجد إشعارات</h3>
              <p className="text-sm text-slate-500 mt-1">كل شيء على ما يرام!</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                onClick={() => markAsRead(notification.id)}
                className={`bg-[#1a1f2e] border border-[#2a3142] rounded-xl p-4 flex gap-4 cursor-pointer transition-colors relative overflow-hidden ${
                  !notification.isRead ? 'hover:bg-[#2a3142]/60' : 'opacity-70 hover:opacity-100 hover:bg-[#2a3142]/40'
                }`}
              >
                {!notification.isRead && (
                  <div className="absolute top-0 right-0 w-1 h-full bg-[#7c3aed]"></div>
                )}
                
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 ${getIconBg(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h4 className={`font-bold text-sm ${!notification.isRead ? 'text-slate-200' : 'text-slate-300'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-slate-500 font-mono shrink-0" dir="ltr">
                      {new Date(notification.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{notification.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </Layout>
  );
}
