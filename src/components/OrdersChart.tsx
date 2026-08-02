import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { name: '25 يوليو', value: 22 },
  { name: '26 يوليو', value: 35 },
  { name: '27 يوليو', value: 45 },
  { name: '28 يوليو', value: 60 },
  { name: '29 يوليو', value: 40 },
  { name: '30 يوليو', value: 52 },
  { name: '31 يوليو', value: 48 },
];

export function OrdersChart() {
  return (
    <div className="bg-[#1a1f2e] rounded-xl border border-[#2a3142] p-5 flex flex-col min-h-[300px]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-200">الطلبات خلال آخر 7 أيام</h2>
        <button className="flex items-center gap-2 text-sm text-slate-400 bg-[#0f1117] border border-[#2a3142] px-3 py-1.5 rounded-lg hover:text-slate-200 transition-colors">
          <span>آخر 7 أيام</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 w-full h-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3142" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              tick={{fill: '#64748b', fontSize: 12, fontFamily: 'Cairo'}} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              orientation="right" 
              stroke="#94a3b8" 
              tick={{fill: '#64748b', fontSize: 12, fontFamily: 'Cairo'}} 
              tickLine={false} 
              axisLine={false} 
              ticks={[0, 20, 40, 60, 80]}
              dx={10}
            />
            <Tooltip 
              contentStyle={{backgroundColor: '#0f1117', borderColor: '#2a3142', borderRadius: '8px', textAlign: 'right', fontFamily: 'Cairo'}} 
              itemStyle={{color: '#f8fafc', fontWeight: 'bold'}}
              labelStyle={{color: '#94a3b8', marginBottom: '4px'}}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#7c3aed" 
              strokeWidth={3} 
              dot={{r: 4, fill: '#1a1f2e', stroke: '#7c3aed', strokeWidth: 2}} 
              activeDot={{r: 6, fill: '#7c3aed', stroke: '#0f1117', strokeWidth: 2}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
