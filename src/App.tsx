import { Switch, Route, Redirect, Router } from 'wouter';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { ProductPage } from '@/pages/ProductPage';
import { CustomersPage } from '@/pages/CustomersPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { UsersPage } from '@/pages/UsersPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import type { Permission } from '@/types';

function ProtectedRoute({
  component: Component,
  permission,
}: {
  component: React.ComponentType;
  permission?: keyof Permission;
}) {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) return <Redirect to="/login" />;
  if (permission && !hasPermission(permission)) {
    return (
      <div
        className="h-screen w-full flex items-center justify-center bg-[#0f1117] text-slate-200 font-sans"
        dir="rtl"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">غير مصرح</h2>
          <p className="text-slate-400">
            ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة.
          </p>
        </div>
      </div>
    );
  }
  return <Component />;
}

// Stable named route components — avoids "Invalid hook call" from inline arrow functions
function RouteHome() { return <ProtectedRoute component={DashboardPage} />; }
function RouteOrders() { return <ProtectedRoute component={OrdersPage} />; }
function RouteProduct() { return <ProtectedRoute component={ProductPage} />; }
function RouteCustomers() { return <ProtectedRoute component={CustomersPage} />; }
function RouteAnalytics() { return <ProtectedRoute component={AnalyticsPage} />; }
function RouteUsers() { return <ProtectedRoute component={UsersPage} permission="canManageUsers" />; }
function RouteNotifications() { return <ProtectedRoute component={NotificationsPage} />; }
function RouteSettings() { return <ProtectedRoute component={SettingsPage} />; }
function RouteFallback() { return <Redirect to="/" />; }

function AppRoutes() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={RouteHome} />
      <Route path="/orders" component={RouteOrders} />
      <Route path="/products/:slug" component={RouteProduct} />
      <Route path="/customers" component={RouteCustomers} />
      <Route path="/analytics" component={RouteAnalytics} />
      <Route path="/users" component={RouteUsers} />
      <Route path="/notifications" component={RouteNotifications} />
      <Route path="/settings" component={RouteSettings} />
      <Route component={RouteFallback} />
    </Switch>
  );
}

export default function App() {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';
  return (
    <AuthProvider>
      <Router base={base}>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
