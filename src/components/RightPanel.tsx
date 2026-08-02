import { Filter, Calendar, Plus, Package, Users, Settings } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function RightPanel() {
  const pieData = [
    { name: 'كيلو كوت', value: 12, color: '#10b981' }, 
    { name: 'النظارات', value: 9, color: '#3b82f6' }, 
    { name: 'المنتج الثالث', value: 7, color: '#7c3aed' }, 
    { name: 'المنتج الرابع', value: 7, color: '#f59e0b' }, 
  ];

  const quickLinks = [
    { name: 'إضافة طلب جديد', icon: Plus },
    { name: 'إدارة المنتجات', icon: Package },
    { name: 'إدارة المستخدمين', icon: Users },
    { name: 'الإعدادات العامة', icon: Settings },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Order Filter */}
      <div className="bg-[#1a1f2e] rounded-xl border border-[#2a3142] p-5">
        <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#7c3aed]" />
          تصفية الطلبات
        </h3>
        
        <div className="flex flex-col gap-3">
          <select className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-[#7c3aed] appearance-none cursor-pointer">
            <option>كل المنتجات</option>
          </select>
          <select className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-[#7c3aed] appearance-none cursor-pointer">
            <option>كل الحالات</option>
          </select>
          <select className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-[#7c3aed] appearance-none cursor-pointer">
            <option>كل الولايات</option>
          </select>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input type="text" placeholder="من تاريخ" className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg pr-8 pl-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-[#7c3aed]" />
              <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <input type="text" placeholder="إلى تاريخ" className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg pr-8 pl-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-[#7c3aed]" />
              <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
          
          <button className="w-full mt-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-bold transition-colors">
            <Filter className="w-4 h-4" />
            <span>تصفية</span>
          </button>
        </div>
      </div>
      
      {/* Donut Chart */}
      <div className="bg-[#1a1f2e] rounded-xl border border-[#2a3142] p-5">
        <h3 className="font-bold text-slate-200 mb-4">توزيع الطلبات حسب المنتج</h3>
        
        <div className="relative h-[200px] w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{backgroundColor: '#0f1117', borderColor: '#2a3142', borderRadius: '8px', textAlign: 'right', fontFamily: 'Cairo'}} 
                itemStyle={{color: '#f8fafc', fontWeight: 'bold'}}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-slate-400 font-bold mb-1">إجمالي</span>
            <span className="text-2xl font-bold text-slate-100 font-sans leading-none">35</span>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col gap-2.5">
          {pieData.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-300 font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-mono text-xs">{Math.round((item.value/35)*100)}%</span>
                <span className="font-bold text-slate-200 font-sans">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="bg-[#1a1f2e] rounded-xl border border-[#2a3142] p-5">
        <h3 className="font-bold text-slate-200 mb-4">روابط سريعة</h3>
        <div className="flex flex-col gap-2">
          {quickLinks.map((link, i) => (
            <button key={i} className="flex items-center gap-3 text-right text-sm font-semibold text-slate-300 hover:text-white hover:bg-[#2a3142] py-2.5 px-3 rounded-lg transition-colors bg-[#0f1117]/50 border border-[#2a3142]/50">
              <link.icon className="w-4 h-4 text-[#7c3aed]" />
              <span>{link.name}</span>
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
}
