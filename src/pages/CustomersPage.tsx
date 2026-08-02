import { Layout } from '@/components/Layout';
import { mockCustomers } from '@/data/mockData';
import { Users, UserPlus, Search, MapPin, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function CustomersPage() {
  const [search, setSearch] = useState('');
  
  const filteredCustomers = mockCustomers.filter(c => 
    c.name.includes(search) || c.phone.includes(search) || c.wilaya.includes(search)
  );

  return (
    <Layout>
      <div className="p-4 md:p-6 flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-200">إدارة العملاء</h1>
          <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
            <UserPlus className="w-5 h-5" />
            <span>إضافة عميل</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-4 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold">إجمالي العملاء</p>
            <p className="text-2xl font-bold text-slate-200 mt-1 font-mono">{mockCustomers.length}</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-4 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold">نشط هذا الشهر</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">8</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-4 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold">أكثر ولاية</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">الجزائر</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-4 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold">متوسط الإنفاق</p>
            <p className="text-2xl font-bold text-blue-400 mt-1 font-mono" dir="ltr">41,200 دج</p>
          </div>
        </div>

        <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-xl flex flex-col">
          <div className="p-4 border-b border-[#2a3142] flex items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="بحث بالاسم، الهاتف، الولاية..." 
                className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg pl-4 pr-9 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#7c3aed]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right min-w-[800px]">
              <thead>
                <tr className="text-slate-400 border-b border-[#2a3142] bg-[#0f1117]/50">
                  <th className="py-3 px-5 font-semibold">العميل</th>
                  <th className="py-3 px-5 font-semibold">الولاية</th>
                  <th className="py-3 px-5 font-semibold text-center">إجمالي الطلبات</th>
                  <th className="py-3 px-5 font-semibold">إجمالي الإنفاق</th>
                  <th className="py-3 px-5 font-semibold">تاريخ الانضمام</th>
                  <th className="py-3 px-5 font-semibold text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map(customer => (
                  <tr key={customer.id} className="border-b border-[#2a3142]/50 hover:bg-[#2a3142]/30 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold shrink-0">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200">{customer.name}</p>
                          <p className="text-xs text-slate-500 font-mono" dir="ltr">{customer.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {customer.wilaya}
                      </div>
                    </td>
                    <td className="py-3 px-5 text-center font-mono text-slate-300 font-bold">{customer.totalOrders}</td>
                    <td className="py-3 px-5 font-mono text-emerald-400 font-bold" dir="ltr">{customer.totalSpent.toLocaleString()} دج</td>
                    <td className="py-3 px-5 text-slate-400 font-mono text-xs" dir="ltr">
                      {new Date(customer.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-center">
                        <button className="text-slate-400 hover:text-indigo-400 p-1.5 bg-[#0f1117] rounded-lg border border-[#2a3142] transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 font-semibold">لا يوجد عملاء مطابقون للبحث</td>
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
