import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileHeader from "@/components/MobileHeader";
import StatCard from "@/components/StatCard";
import RevenueChart from "@/components/RevenueChart";
import RecentOrders from "@/components/RecentOrders";
import TopProducts from "@/components/TopProducts";

const stats = [
  { title: "Total Revenue", value: "$84,254", change: "+14.2%", changeType: "positive" as const, icon: DollarSign },
  { title: "Orders", value: "3,847", change: "+8.1%", changeType: "positive" as const, icon: ShoppingCart },
  { title: "Customers", value: "12,491", change: "+22.4%", changeType: "positive" as const, icon: Users },
  { title: "Conversion", value: "3.24%", change: "-0.8%", changeType: "negative" as const, icon: TrendingUp },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <DashboardSidebar />
      <main className="md:ml-60">
        <MobileHeader />
        <header className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
              JD
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          <RevenueChart />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <RecentOrders />
            </div>
            <div className="lg:col-span-2">
              <TopProducts />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
