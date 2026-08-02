import { Layout } from '@/components/Layout';
import { mockProducts, mockOrders } from '@/data/mockData';
import { useParams } from 'wouter';
import { Package, TrendingUp, ShoppingBag, Box, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ProductPage() {
  const { slug } = useParams();
  const product = mockProducts.find(p => p.slug === slug);

  if (!product) {
    return (
      <Layout>
        <div className="p-6 flex flex-col items-center justify-center h-full">
          <Package className="w-16 h-16 text-slate-600 mb-4" />
          <h2 className="text-xl font-bold text-slate-300">المنتج غير موجود</h2>
          <p className="text-slate-500 mt-2">عذراً، لم نتمكن من العثور على المنتج المطلوب.</p>
        </div>
      </Layout>
    );
  }

  const productOrders = mockOrders.filter(o => o.product.id === product.id);

  const chartData = [
    { name: 'السبت', value: 12 },
    { name: 'الأحد', value: 19 },
    { name: 'الإثنين', value: 15 },
    { name: 'الثلاثاء', value: 22 },
    { name: 'الأربعاء', value: 18 },
    { name: 'الخميس', value: 25 },
    { name: 'الجمعة', value: 14 },
  ];

  return (
    <Layout>
      <div className="p-4 md:p-6 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#2a3142] rounded-xl flex items-center justify-center border border-[#7c3aed]/30 shrink-0">
              <Package className="w-8 h-8 text-[#7c3aed]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-200">{product.nameAr}</h1>
              <p className="text-slate-400 font-mono" dir="ltr">{product.name}</p>
            </div>
            <div className="mr-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Box className="w-3 h-3" />
              متوفر ({product.stock})
            </div>
          </div>
          
          <button className="bg-[#2a3142] hover:bg-[#3b455c] text-white px-4 py-2 rounded-lg font-bold transition-colors">
            تعديل المنتج
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-sm font-semibold">إجمالي الطلبات</p>
              <ShoppingBag className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-slate-200 font-mono">{product.totalOrders}</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-sm font-semibold">طلبات اليوم</p>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-emerald-400 font-mono">{product.todayOrders}</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-sm font-semibold">المبيعات الإجمالية</p>
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-slate-200 font-mono" dir="ltr">{product.revenue.toLocaleString()} دج</p>
          </div>
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-400 text-sm font-semibold">المخزون المتبقي</p>
              <Box className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-amber-400 font-mono">{product.stock}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl flex flex-col min-h-[350px]">
            <h3 className="font-bold text-slate-200 mb-6">أداء المنتج (آخر 7 أيام)</h3>
            <div className="flex-1 w-full h-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3142" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontFamily: 'Cairo'}} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#94a3b8" tick={{fill: '#64748b', fontSize: 12, fontFamily: 'Cairo'}} tickLine={false} axisLine={false} dx={10} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0f1117', borderColor: '#2a3142', borderRadius: '8px', textAlign: 'right', fontFamily: 'Cairo'}}
                    itemStyle={{color: '#7c3aed', fontWeight: 'bold'}}
                    cursor={{fill: '#2a3142', opacity: 0.4}}
                  />
                  <Bar dataKey="value" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Details */}
          <div className="bg-[#1a1f2e] border border-[#2a3142] p-5 rounded-xl">
            <h3 className="font-bold text-slate-200 mb-6">تفاصيل المنتج</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">السعر</p>
                <p className="font-bold text-slate-200 font-mono" dir="ltr">{product.price.toLocaleString()} دج</p>
              </div>
              <div className="h-px w-full bg-[#2a3142]"></div>
              <div>
                <p className="text-xs text-slate-500 mb-1">الوصف</p>
                <p className="text-sm text-slate-300 leading-relaxed">{product.description || 'لا يوجد وصف متاح.'}</p>
              </div>
              <div className="h-px w-full bg-[#2a3142]"></div>
              <div>
                <p className="text-xs text-slate-500 mb-1">المعرف (Slug)</p>
                <p className="text-sm font-mono text-slate-400" dir="ltr">{product.slug}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Orders Table */}
        <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-xl flex flex-col">
          <div className="p-5 border-b border-[#2a3142]">
            <h3 className="font-bold text-slate-200">الطلبات الأخيرة لهذا المنتج</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right min-w-[700px]">
              <thead>
                <tr className="text-slate-400 border-b border-[#2a3142] bg-[#0f1117]/50">
                  <th className="py-3 px-5 font-semibold">رقم الطلب</th>
                  <th className="py-3 px-5 font-semibold">العميل</th>
                  <th className="py-3 px-5 font-semibold">الولاية</th>
                  <th className="py-3 px-5 font-semibold text-center">الكمية</th>
                  <th className="py-3 px-5 font-semibold">الحالة</th>
                  <th className="py-3 px-5 font-semibold">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {productOrders.slice(0, 10).map(order => (
                  <tr key={order.id} className="border-b border-[#2a3142]/50 hover:bg-[#2a3142]/30 transition-colors">
                    <td className="py-3 px-5 font-mono text-slate-300" dir="ltr">{order.id}</td>
                    <td className="py-3 px-5 font-semibold text-slate-200">{order.customer.name}</td>
                    <td className="py-3 px-5 text-slate-300">{order.wilaya}</td>
                    <td className="py-3 px-5 text-center font-mono text-slate-300">{order.quantity}</td>
                    <td className="py-3 px-5">
                      <span className="text-xs font-bold text-slate-300 bg-[#2a3142] px-2 py-1 rounded-md">{order.status}</span>
                    </td>
                    <td className="py-3 px-5 text-slate-400 font-mono text-xs" dir="ltr">
                      {new Date(order.createdAt).toLocaleDateString('en-GB')}
                    </td>
                  </tr>
                ))}
                {productOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 font-semibold">لا توجد طلبات لهذا المنتج</td>
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
