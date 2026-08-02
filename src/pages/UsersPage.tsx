import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, UserPlus, Check, X, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { User, ROLE_PERMISSIONS } from '@/types';

export function UsersPage() {
  const { hasPermission, currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('tojar_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  if (!hasPermission('canManageUsers')) {
    return (
      <Layout>
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">غير مصرح</h2>
          <p className="text-slate-400 max-w-md">ليس لديك الصلاحيات الكافية لإدارة المستخدمين والصلاحيات.</p>
        </div>
      </Layout>
    );
  }

  const roleBadges: Record<string, string> = {
    owner: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    admin: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    employee: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  const roleLabels: Record<string, string> = {
    owner: 'المالك',
    admin: 'المسؤول',
    employee: 'الموظف',
  };

  const permissionsList = [
    { key: 'canViewDashboard', label: 'عرض لوحة التحكم' },
    { key: 'canManageOrders', label: 'إدارة الطلبات' },
    { key: 'canDeleteOrders', label: 'حذف الطلبات' },
    { key: 'canManageProducts', label: 'إدارة المنتجات' },
    { key: 'canViewCustomers', label: 'عرض العملاء' },
    { key: 'canViewAnalytics', label: 'عرض الإحصائيات' },
    { key: 'canManageUsers', label: 'إدارة المستخدمين' },
  ];

  return (
    <Layout>
      <div className="p-4 md:p-6 flex flex-col gap-8">
        
        {/* Users Section */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-slate-200">إدارة المستخدمين</h1>
            <button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors">
              <UserPlus className="w-5 h-5" />
              <span>إضافة مستخدم</span>
            </button>
          </div>

          <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-xl overflow-x-auto">
            <table className="w-full text-sm text-right min-w-[700px]">
              <thead>
                <tr className="text-slate-400 border-b border-[#2a3142] bg-[#0f1117]/50">
                  <th className="py-3 px-5 font-semibold">الاسم</th>
                  <th className="py-3 px-5 font-semibold">البريد الإلكتروني</th>
                  <th className="py-3 px-5 font-semibold">الدور</th>
                  <th className="py-3 px-5 font-semibold text-center">الحالة</th>
                  <th className="py-3 px-5 font-semibold text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-[#2a3142]/50 hover:bg-[#2a3142]/30 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#2a3142] flex items-center justify-center font-bold text-slate-300">
                          {u.nameAr.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200">{u.nameAr}</p>
                          <p className="text-xs text-slate-500 font-mono" dir="ltr">{u.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-slate-400 font-mono" dir="ltr">{u.email}</td>
                    <td className="py-3 px-5">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold border inline-block ${roleBadges[u.role]}`}>
                        {roleLabels[u.role]}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-center">
                      {u.isActive ? (
                        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs font-bold">نشط</span>
                      ) : (
                        <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded text-xs font-bold">معطل</span>
                      )}
                    </td>
                    <td className="py-3 px-5 text-center">
                      <button className="text-slate-400 hover:text-indigo-400 text-xs font-bold transition-colors">تعديل</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Permissions Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-[#7c3aed]" />
            <h2 className="text-xl font-bold text-slate-200">مصفوفة الصلاحيات</h2>
          </div>

          <div className="bg-[#1a1f2e] border border-[#2a3142] rounded-xl overflow-x-auto">
            <table className="w-full text-sm text-right min-w-[600px]">
              <thead>
                <tr className="text-slate-400 border-b border-[#2a3142] bg-[#0f1117]/50">
                  <th className="py-4 px-5 font-semibold w-1/3">الصلاحية</th>
                  <th className="py-4 px-5 font-semibold text-center text-purple-400">المالك</th>
                  <th className="py-4 px-5 font-semibold text-center text-blue-400">المسؤول</th>
                  <th className="py-4 px-5 font-semibold text-center text-emerald-400">الموظف</th>
                </tr>
              </thead>
              <tbody>
                {permissionsList.map((perm, i) => (
                  <tr key={i} className="border-b border-[#2a3142]/50 hover:bg-[#2a3142]/30 transition-colors">
                    <td className="py-3 px-5 font-medium text-slate-300">{perm.label}</td>
                    {(['owner', 'admin', 'employee'] as const).map(role => (
                      <td key={role} className="py-3 px-5 text-center">
                        {ROLE_PERMISSIONS[role][perm.key as keyof typeof ROLE_PERMISSIONS[typeof role]] ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-rose-500/50 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 border-t border-[#2a3142] bg-[#0f1117]/30 text-xs text-slate-500 text-center">
              الصلاحيات المحددة هنا ثابتة ولا يمكن تعديلها حالياً.
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
