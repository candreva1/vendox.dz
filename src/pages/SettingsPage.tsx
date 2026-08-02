import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { isSheetsConfigured, SHEETS_CONFIG } from '@/services/googleSheets';
import { CheckCircle2, Save, Link as LinkIcon, AlertCircle } from 'lucide-react';

export function SettingsPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'store' | 'profile' | 'integration'>('store');
  const [toast, setToast] = useState('');

  // Store form state
  const [storeName, setStoreName] = useState('Tojar DZ');
  const [storePhone, setStorePhone] = useState('0555 12 34 56');

  // Integration state
  const [sheetId, setSheetId] = useState(SHEETS_CONFIG.spreadsheetId);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('تم حفظ إعدادات المتجر بنجاح');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('تم تحديث الملف الشخصي بنجاح');
  };

  const handleSaveSheets = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('tojar_sheets_id', sheetId);
    showToast('تم حفظ معرّف جدول البيانات');
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto w-full relative">
        
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 border border-emerald-400 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 font-bold animate-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5" />
            {toast}
          </div>
        )}

        <h1 className="text-2xl font-bold text-slate-200 mb-6">الإعدادات</h1>

        <div className="flex gap-4 border-b border-[#2a3142] mb-6 overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('store')}
            className={`pb-3 px-2 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'store' ? 'border-[#7c3aed] text-[#7c3aed]' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            إعدادات المتجر
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-2 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'profile' ? 'border-[#7c3aed] text-[#7c3aed]' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            الحساب الشخصي
          </button>
          <button 
            onClick={() => setActiveTab('integration')}
            className={`pb-3 px-2 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === 'integration' ? 'border-[#7c3aed] text-[#7c3aed]' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            تكامل Google Sheets
          </button>
        </div>

        {activeTab === 'store' && (
          <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-xl p-6">
            <form onSubmit={handleSaveStore} className="flex flex-col gap-6 max-w-xl">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">اسم المتجر</label>
                <input 
                  type="text" 
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-[#7c3aed]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">رقم هاتف الدعم</label>
                <input 
                  type="text" 
                  dir="ltr"
                  value={storePhone}
                  onChange={e => setStorePhone(e.target.value)}
                  className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-4 py-2.5 text-slate-200 text-left focus:outline-none focus:border-[#7c3aed] font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">العملة</label>
                  <input 
                    type="text" 
                    value="دينار جزائري (DZD)"
                    disabled
                    className="w-full bg-[#0f1117]/50 border border-[#2a3142]/50 rounded-lg px-4 py-2.5 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">الولاية الافتراضية</label>
                  <select className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-[#7c3aed]">
                    <option>الجزائر</option>
                    <option>وهران</option>
                    <option>قسنطينة</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 mt-2 border-t border-[#2a3142]">
                <button type="submit" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors w-fit">
                  <Save className="w-4 h-4" />
                  حفظ التغييرات
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-xl p-6">
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-6 max-w-xl">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">الاسم</label>
                <input 
                  type="text" 
                  defaultValue={currentUser?.nameAr}
                  className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-[#7c3aed]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  dir="ltr"
                  defaultValue={currentUser?.email}
                  disabled
                  className="w-full bg-[#0f1117]/50 border border-[#2a3142]/50 rounded-lg px-4 py-2.5 text-slate-500 font-mono text-left cursor-not-allowed"
                />
              </div>
              <div className="pt-4 mt-2 border-t border-[#2a3142]">
                <h3 className="text-sm font-bold text-slate-200 mb-4">تغيير كلمة المرور</h3>
                <div className="space-y-4">
                  <input type="password" placeholder="كلمة المرور الحالية" className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-[#7c3aed]" />
                  <input type="password" placeholder="كلمة المرور الجديدة" className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-[#7c3aed]" />
                  <input type="password" placeholder="تأكيد كلمة المرور الجديدة" className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-[#7c3aed]" />
                </div>
              </div>
              <div className="pt-4 mt-2 border-t border-[#2a3142]">
                <button type="submit" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors w-fit">
                  <Save className="w-4 h-4" />
                  تحديث الحساب
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'integration' && (
          <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-xl p-6">
            
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#2a3142]">
              <div>
                <h3 className="text-lg font-bold text-slate-200 mb-1">Google Sheets</h3>
                <p className="text-sm text-slate-400">مزامنة الطلبات والعملاء تلقائياً مع جداول جوجل.</p>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border ${sheetId ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                <span className={`w-2 h-2 rounded-full ${sheetId ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
                {sheetId ? 'متصل' : 'غير متصل'}
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6 flex gap-4 text-blue-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">كيفية الإعداد:</p>
                <ol className="list-decimal list-inside space-y-1 opacity-90">
                  <li>قم بإنشاء جدول بيانات جديد في Google Sheets.</li>
                  <li>انسخ المعرّف (Spreadsheet ID) من رابط الجدول.</li>
                  <li>شارك الجدول مع البريد الإلكتروني الخاص بالخدمة.</li>
                  <li>ألصق المعرّف أدناه واحفظ.</li>
                </ol>
              </div>
            </div>

            <form onSubmit={handleSaveSheets} className="flex flex-col gap-6 max-w-xl">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">معرّف جدول البيانات (Spreadsheet ID)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    dir="ltr"
                    value={sheetId}
                    onChange={e => setSheetId(e.target.value)}
                    placeholder="1BxiMVs0XRYFgwnLExsLhwL7bI7TYKQVjEU..."
                    className="w-full bg-[#0f1117] border border-[#2a3142] rounded-lg px-4 py-2.5 text-slate-200 text-left focus:outline-none focus:border-[#7c3aed] font-mono text-sm"
                  />
                  <button type="button" className="bg-[#2a3142] hover:bg-[#3b455c] text-white px-4 rounded-lg transition-colors flex items-center justify-center">
                    <LinkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="pt-4 mt-2 border-t border-[#2a3142]">
                <button type="submit" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors w-fit">
                  <Save className="w-4 h-4" />
                  حفظ المعرّف
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </Layout>
  );
}
