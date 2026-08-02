export function RecentOrders() {
  const orders = [
    { time: '14:22', id: '#2581', customer: 'محمد أحمد', product: 'كيلو كوت', status: 'جديد', statusColor: 'emerald' },
    { time: '14:15', id: '#2580', customer: 'سارة بلقاسم', product: 'النظارات', status: 'جديد', statusColor: 'emerald' },
    { time: '14:07', id: '#2579', customer: 'يوسف لعروسي', product: 'المنتج الثالث', status: 'قيد الاتصال', statusColor: 'amber' },
    { time: '14:02', id: '#2578', customer: 'أمينة بوزيد', product: 'المنتج الرابع', status: 'جديد', statusColor: 'emerald' },
    { time: '13:58', id: '#2577', customer: 'إلياس حماني', product: 'كيلو كوت', status: 'تم الشحن', statusColor: 'blue' },
  ];

  const badges: Record<string, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  };

  return (
    <div className="bg-[#1a1f2e] rounded-xl border border-[#2a3142] p-5 flex flex-col min-h-[300px]">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-lg font-bold text-slate-200">آخر الطلبات</h2>
        <a href="#" className="text-sm text-[#7c3aed] hover:text-indigo-400 transition-colors font-semibold">عرض الكل</a>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm text-right min-w-[500px]">
          <thead>
            <tr className="text-slate-500 border-b border-[#2a3142]">
              <th className="pb-3 font-medium px-2">الطلب</th>
              <th className="pb-3 font-medium px-2">العميل</th>
              <th className="pb-3 font-medium px-2">المنتج</th>
              <th className="pb-3 font-medium px-2">الحالة</th>
              <th className="pb-3 font-medium px-2">الوقت</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="border-b border-[#2a3142]/50 last:border-0 hover:bg-[#2a3142]/30 transition-colors">
                <td className="py-3 px-2 font-medium text-slate-200">
                  <span className="font-mono">{order.id}</span>
                </td>
                <td className="py-3 px-2 text-slate-300">{order.customer}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#2a3142] shrink-0"></div>
                    <span className="text-slate-300 truncate max-w-[120px]">{order.product}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${badges[order.statusColor]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-slate-500 font-mono text-xs" dir="ltr">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
