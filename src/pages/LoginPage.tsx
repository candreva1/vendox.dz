import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (isAuthenticated) {
    setLocation('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(email, password)) {
      setLocation('/');
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4 selection:bg-purple-500/30 font-sans" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wider leading-tight">
            TOJAR DZ
          </h1>
          <p className="text-sm text-slate-400 mt-1">لوحة التحكم</p>
        </div>
        
        <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-xl p-6 md:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-200">مرحباً بك</h2>
            <p className="text-sm text-slate-400 mt-1">سجل دخولك للمتابعة</p>
          </div>

          {error && (
            <div className="mb-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-lg text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">البريد الإلكتروني</label>
              <input 
                type="email" 
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-4 py-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#7c3aed] transition-colors"
                placeholder="email@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">كلمة المرور</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg pl-10 pr-4 py-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#7c3aed] transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs font-semibold"
                >
                  {showPassword ? "إخفاء" : "إظهار"}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg py-2.5 font-bold transition-colors mt-2"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>

        <div className="mt-8 bg-[#1a1f2e]/50 border border-[#2a3142] rounded-lg p-4 text-sm">
          <p className="text-slate-300 font-semibold mb-2">بيانات تجريبية:</p>
          <ul className="text-slate-400 space-y-1 font-mono text-xs" dir="ltr">
            <li>Owner: soufiane@tojar.dz / admin123</li>
            <li>Admin: karim@tojar.dz / admin123</li>
            <li>Employee: amina@tojar.dz / emp123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
