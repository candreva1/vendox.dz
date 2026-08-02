import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Lock } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

export function AnalyticsPage() {
  const { hasPermission } = useAuth();

  if (!hasPermission('canViewAnalytics')) {
    return (
      <Layout>
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">غير مصرح</h2>
          <p className="text-slate-400 max-w-md">ليس لديك الصلاحيات الكافية لعرض صفحة الإحصائيات والتحليلات.</p>
        </div>
      </Layout>
    );
  }

  const revenueData = [
    { name: '1 يوليو', value: 120000 },
    { name: '5 يوليو', value: 250000 },
    { name: '10 يوليو', value: 180000 },
    { name: '15 يوليو', value: 310000 },
    { name: '20 يوليو', value: 220000 },
    { name: '25 يوليو', value: 450000 },
    { name: '30 يوليو', value: 380000 },
  ];

  const wilayaData = [
    { name: 'الجزائر', value: 45, color: '#7c3aed' },
    { name: 'وهران', value: 25, color: '#3b82f6' },
    { name: 'قسنطينة', value: 15, color: '#10b981' },
    { name: 'سطيف', value: 10, color: '#f59e0b' },
    { name: 'أخرى', value: 5, color: '#64748b' },
  ];

  const productData = mockProducts.map(p => ({
    name: p.nameAr,
    orders: p.totalOrders,
  }));

  return (
    <Layout>
      <div className="p-4 md:p-6 flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-200">الإحصائيات والتحليلات</h1>
          <select className="bg-[#1a1f2e] border border-[#2a3142] text-slate-200 text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-[#7c3aed]">
            <option>آخر 30 يوم</option>
            <option>هذا الشهر</option>
            <option>آخر 7 أيام</option>
          </select>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold mb-1">إجمالي الإيرادات</p>
            <p className="text-2xl font-bold text-slate-200 font-mono" dir="ltr">1,902,400 دج</p>
            <p className="text-xs text-emerald-400 mt-2 font-semibold">↑ 12.5% عن الشهر الماضي</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold mb-1">إجمالي الطلبات</p>
            <p className="text-2xl font-bold text-slate-200 font-mono">853</p>
            <p className="text-xs text-emerald-400 mt-2 font-semibold">↑ 8.2% عن الشهر الماضي</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold mb-1">معدل التسليم</p>
            <p className="text-2xl font-bold text-slate-200 font-mono" dir="ltr">76.4%</p>
            <p className="text-xs text-rose-400 mt-2 font-semibold">↓ 2.1% عن الشهر الماضي</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl">
            <p className="text-slate-400 text-sm font-semibold mb-1">إجمالي العملاء</p>
            <p className="text-2xl font-bold text-slate-200 font-mono">612</p>
            <p className="text-xs text-emerald-400 mt-2 font-semibold">↑ 15.3% عن الشهر الماضي</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl flex flex-col min-h-[350px]">
            <h3 className="font-bold text-slate-200 mb-6">الإيرادات (آخر 30 يوم)</h3>
            <div className="flex-1 w-full h-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 5, right: 0, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3142" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontFamily: 'Cairo'}} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontFamily: 'Cairo'}} tickLine={false} axisLine={false} dx={-10} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0f1117', borderColor: '#2a3142', borderRadius: '8px', textAlign: 'right', fontFamily: 'Cairo'}}
                    itemStyle={{color: '#f8fafc', fontWeight: 'bold'}}
                  />
                  <Area type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl flex flex-col min-h-[350px]">
            <h3 className="font-bold text-slate-200 mb-6">الطلبات حسب المنتج</h3>
            <div className="flex-1 w-full h-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3142" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontFamily: 'Cairo'}} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{fill: '#cbd5e1', fontSize: 12, fontFamily: 'Cairo'}} tickLine={false} axisLine={false} width={100} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0f1117', borderColor: '#2a3142', borderRadius: '8px', textAlign: 'right', fontFamily: 'Cairo'}}
                    cursor={{fill: '#2a3142', opacity: 0.4}}
                  />
                  <Bar dataKey="orders" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl flex flex-col min-h-[350px]">
            <h3 className="font-bold text-slate-200 mb-6">توزيع الطلبات حسب الولاية</h3>
            <div className="flex-1 w-full h-full relative" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wilayaData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {wilayaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0f1117', borderColor: '#2a3142', borderRadius: '8px', textAlign: 'right', fontFamily: 'Cairo'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl">
            <h3 className="font-bold text-slate-200 mb-4">أفضل المنتجات</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead>
                  <tr className="text-slate-400 border-b border-[#2a3142]">
                    <th className="pb-3 font-semibold">المنتج</th>
                    <th className="pb-3 font-semibold text-center">الطلبات</th>
                    <th className="pb-3 font-semibold">الإيرادات</th>
                    <th className="pb-3 font-semibold text-left">معدل النمو</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.map((p, i) => (
                    <tr key={p.id} className="border-b border-[#2a3142]/30 last:border-0">
                      <td className="py-3 text-slate-200 font-medium">{p.nameAr}</td>
                      <td className="py-3 text-center text-slate-300 font-mono">{p.totalOrders}</td>
                      <td className="py-3 text-emerald-400 font-mono font-bold" dir="ltr">{p.revenue.toLocaleString()} دج</td>
                      <td className="py-3 text-left">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${i%2===0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {i%2===0 ? '+12%' : '+4%'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
