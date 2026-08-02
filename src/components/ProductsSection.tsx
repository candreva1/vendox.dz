export function ProductsSection() {
  const products = [
    { name: 'كيلو كوت', orders: 12, today: 4, price: '22,800 دج', color: 'bg-emerald-500', btnColor: 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' },
    { name: 'النظارات', orders: 9, today: 3, price: '31,500 دج', color: 'bg-blue-500', btnColor: 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' },
    { name: 'المنتج الثالث', orders: 7, today: 3, price: '18,900 دج', color: 'bg-[#7c3aed]', btnColor: 'bg-[#7c3aed]/10 text-[#7c3aed] hover:bg-[#7c3aed]/20' },
    { name: 'المنتج الرابع', orders: 7, today: 2, price: '14,000 دج', color: 'bg-amber-500', btnColor: 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' },
  ];

  return (
    <div className="flex flex-col gap-4 mt-2">
      <h2 className="text-lg font-bold text-slate-200">المنتجات</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {products.map((p, i) => (
          <div key={i} className="bg-[#1a1f2e] rounded-xl border border-[#2a3142] p-4 flex flex-col">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#2a3142] flex items-center justify-center shrink-0">
                <span className={`w-2 h-2 rounded-full ${p.color}`}></span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-200 text-sm truncate">{p.name}</h3>
                <div className="text-[11px] text-slate-400 mt-1 font-medium">
                  <span className="font-bold text-slate-200 font-sans">{p.orders}</span> إجمالي • <span className="font-bold text-slate-200 font-sans">{p.today}</span> اليوم
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2a3142]/50">
              <div>
                <p className="text-[10px] text-slate-500 mb-0.5 font-semibold">سعر الوحدة</p>
                <p className="font-bold text-slate-200 text-sm font-mono" dir="ltr">{p.price}</p>
              </div>
              <button className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${p.btnColor}`}>
                عرض الطلبات
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
