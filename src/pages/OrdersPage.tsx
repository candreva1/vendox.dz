import { Layout } from '@/components/Layout';
import { mockOrders, mockProducts } from '@/data/mockData';
import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, ChevronDown } from 'lucide-react';
import type { OrderStatus, Order } from '@/types';

export function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const statusBadges: Record<OrderStatus, string> = {
    new: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    calling: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    shipped: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
    cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    returned: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  };

  const statusLabels: Record<OrderStatus, string> = {
    new: 'جديد',
    calling: 'قيد الاتصال',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    cancelled: 'ملغية',
    returned: 'مُرجعة',
  };

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search && !o.customer.name.includes(search) && !o.id.includes(search)) return false;
    return true;
  });

  const totalCount = orders.length;
  const todayCount = orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length;
  const pendingCount = orders.filter(o => o.status === 'new' || o.status === 'calling').length;
  const deliveredTodayCount = orders.filter(o => o.status === 'delivered' && new Date(o.updatedAt).toDateString() === new Date().toDateString()).length;

  return (
    <Layout>
      <div className="p-4 md:p-6 flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-200">إدارة الطلبات</h1>
          <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
            <Plus className="w-5 h-5" />
            <span>إضافة طلب</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-4 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold">إجمالي الطلبات</p>
            <p className="text-2xl font-bold text-slate-200 mt-1 font-mono">{totalCount}</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-4 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold">طلبات اليوم</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{todayCount}</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-4 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold">قيد المعالجة</p>
            <p className="text-2xl font-bold text-amber-400 mt-1 font-mono">{pendingCount}</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-4 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold">سلمت اليوم</p>
            <p className="text-2xl font-bold text-blue-400 mt-1 font-mono">{deliveredTodayCount}</p>
          </div>
        </div>

        <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-xl flex flex-col">
          {/* Filters Bar */}
          <div className="p-4 border-b border-[#2a3142] flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar">
              <button onClick={() => setStatusFilter('all')} className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap ${statusFilter === 'all' ? 'bg-[#7c3aed] text-white' : 'bg-[#0f1117] text-slate-400 border border-[#2a3142] hover:text-slate-200'}`}>
                كل الطلبات
              </button>
              {(Object.keys(statusLabels) as OrderStatus[]).map(status => (
                <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap ${statusFilter === status ? 'bg-[#7c3aed] text-white' : 'bg-[#0f1117] text-slate-400 border border-[#2a3142] hover:text-slate-200'}`}>
                  {statusLabels[status]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-[240px]">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="بحث..." 
                  className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg pl-4 pr-9 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#7c3aed]"
                />
              </div>
              <button className="bg-[#0f1117] border border-[#2a3142] p-2 rounded-lg text-slate-400 hover:text-slate-200 shrink-0">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right min-w-[900px]">
              <thead>
                <tr className="text-slate-400 border-b border-[#2a3142] bg-[#0f1117]/50">
                  <th className="py-3 px-4 font-semibold">رقم الطلب</th>
                  <th className="py-3 px-4 font-semibold">العميل</th>
                  <th className="py-3 px-4 font-semibold">الولاية</th>
                  <th className="py-3 px-4 font-semibold">المنتج</th>
                  <th className="py-3 px-4 font-semibold text-center">الكمية</th>
                  <th className="py-3 px-4 font-semibold">المبلغ</th>
                  <th className="py-3 px-4 font-semibold">الحالة</th>
                  <th className="py-3 px-4 font-semibold">التاريخ</th>
                  <th className="py-3 px-4 font-semibold text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="border-b border-[#2a3142]/50 hover:bg-[#2a3142]/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-300" dir="ltr">{order.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-200">{order.customer.name}</p>
                      <p className="text-xs text-slate-500 font-mono" dir="ltr">{order.phone}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{order.wilaya}</td>
                    <td className="py-3 px-4 text-slate-300 truncate max-w-[150px]">{order.product.nameAr}</td>
                    <td className="py-3 px-4 text-center font-mono text-slate-300">{order.quantity}</td>
                    <td className="py-3 px-4 font-mono text-slate-200 font-bold" dir="ltr">{order.total.toLocaleString()} دج</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border inline-block ${statusBadges[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-xs" dir="ltr">
                      {new Date(order.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="text-slate-400 hover:text-indigo-400 p-1">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-slate-400 hover:text-slate-200 p-1">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-500 font-semibold">لا توجد طلبات تطابق البحث</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}
