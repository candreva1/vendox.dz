import { Layout } from '@/components/Layout';
import { StatsCards } from '@/components/StatsCards';
import { OrdersChart } from '@/components/OrdersChart';
import { RecentOrders } from '@/components/RecentOrders';
import { RightPanel } from '@/components/RightPanel';
import { ProductsSection } from '@/components/ProductsSection';

export function DashboardPage() {
  return (
    <Layout>
      <div className="p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        {/* Center Column - Stats, Charts, Products */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <StatsCards />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <OrdersChart />
            <RecentOrders />
          </div>
          
          <ProductsSection />
        </div>
        
        {/* Left Column (RightPanel conceptually) - Filters, Donut, Links */}
        <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
          <RightPanel />
        </div>
      </div>
    </Layout>
  );
}
