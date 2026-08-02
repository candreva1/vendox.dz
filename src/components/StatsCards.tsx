import { ShoppingBag, ClipboardList, Phone, Truck, XCircle } from 'lucide-react';

export function StatsCards() {
  const stats = [
    {
      title: "إجمالي الطلبات اليوم",
      value: "35",
      subtitle: "↑ + عن أمس",
      icon: ShoppingBag,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "طلبات جديدة",
      value: "12",
      subtitle: "تحتاج متابعة",
      icon: ClipboardList,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "قيد الاتصال",
      value: "8",
      subtitle: "جاز التواصل",
      icon: Phone,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      title: "تم الشحن",
      value: "10",
      subtitle: "هذا اليوم",
      icon: Truck,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "ملغية",
      value: "5",
      subtitle: "هذا اليوم",
      icon: XCircle,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-[#1a1f2e] rounded-xl p-4 border border-[#2a3142] flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-slate-100 font-sans">{stat.value}</span>
          </div>
          <h3 className="text-sm font-bold text-slate-200 mt-2">{stat.title}</h3>
          <p className="text-xs text-slate-400 mt-1">{stat.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
