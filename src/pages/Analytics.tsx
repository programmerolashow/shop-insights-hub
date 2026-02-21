import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Eye, ShoppingCart, MousePointerClick, DollarSign } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatCard from "@/components/StatCard";

const revenueByMonth = [
  { name: "Jan", revenue: 42000, profit: 12600 },
  { name: "Feb", revenue: 38000, profit: 11400 },
  { name: "Mar", revenue: 51000, profit: 16830 },
  { name: "Apr", revenue: 46000, profit: 14260 },
  { name: "May", revenue: 58000, profit: 18560 },
  { name: "Jun", revenue: 62000, profit: 20460 },
  { name: "Jul", revenue: 59000, profit: 18880 },
  { name: "Aug", revenue: 71000, profit: 24140 },
  { name: "Sep", revenue: 68000, profit: 22440 },
  { name: "Oct", revenue: 75000, profit: 25500 },
  { name: "Nov", revenue: 82000, profit: 28700 },
  { name: "Dec", revenue: 91000, profit: 32760 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "hsl(162, 72%, 40%)" },
  { name: "Audio", value: 28, color: "hsl(200, 70%, 50%)" },
  { name: "Accessories", value: 22, color: "hsl(280, 60%, 55%)" },
  { name: "Peripherals", value: 10, color: "hsl(35, 90%, 55%)" },
  { name: "Storage", value: 5, color: "hsl(340, 65%, 55%)" },
];

const trafficData = [
  { name: "Mon", visitors: 1200, conversions: 84 },
  { name: "Tue", visitors: 1450, conversions: 102 },
  { name: "Wed", visitors: 1380, conversions: 95 },
  { name: "Thu", visitors: 1600, conversions: 128 },
  { name: "Fri", visitors: 1820, conversions: 146 },
  { name: "Sat", visitors: 2100, conversions: 168 },
  { name: "Sun", visitors: 1750, conversions: 122 },
];

const topChannels = [
  { channel: "Organic Search", visitors: 12400, conversion: "4.2%", revenue: "$38,200" },
  { channel: "Direct", visitors: 8900, conversion: "5.1%", revenue: "$29,100" },
  { channel: "Social Media", visitors: 6200, conversion: "2.8%", revenue: "$14,800" },
  { channel: "Email", visitors: 4100, conversion: "6.3%", revenue: "$18,500" },
  { channel: "Referral", visitors: 2800, conversion: "3.5%", revenue: "$8,900" },
];

const stats = [
  { title: "Page Views", value: "284K", change: "+18.2%", changeType: "positive" as const, icon: Eye },
  { title: "Add to Cart", value: "12.4K", change: "+9.7%", changeType: "positive" as const, icon: ShoppingCart },
  { title: "Click Rate", value: "3.8%", change: "+0.4%", changeType: "positive" as const, icon: MousePointerClick },
  { title: "Avg. Order", value: "$127", change: "-2.1%", changeType: "negative" as const, icon: DollarSign },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <DashboardSidebar />
      <main className="md:ml-60">
        <header className="border-b border-border px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
            <p className="text-sm text-muted-foreground">Detailed performance insights and trends</p>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Revenue & Profit */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-card-foreground">Revenue vs Profit</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Monthly comparison over the year</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary" /><span className="text-muted-foreground">Revenue</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-chart-2" /><span className="text-muted-foreground">Profit</span></div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(220, 22%, 10%)", border: "1px solid hsl(220, 20%, 16%)", borderRadius: "8px", fontSize: "12px", color: "hsl(220, 10%, 90%)" }} formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Bar dataKey="revenue" fill="hsl(162, 72%, 40%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="hsl(200, 70%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Traffic */}
            <div className="lg:col-span-3 bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-card-foreground mb-1">Weekly Traffic</h3>
              <p className="text-sm text-muted-foreground mb-6">Visitors and conversions this week</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="gradVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(162, 72%, 40%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(162, 72%, 40%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(220, 22%, 10%)", border: "1px solid hsl(220, 20%, 16%)", borderRadius: "8px", fontSize: "12px", color: "hsl(220, 10%, 90%)" }} />
                  <Area type="monotone" dataKey="visitors" stroke="hsl(162, 72%, 40%)" strokeWidth={2} fill="url(#gradVisitors)" />
                  <Line type="monotone" dataKey="conversions" stroke="hsl(35, 90%, 55%)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown */}
            <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
              <h3 className="font-semibold text-card-foreground mb-1">Sales by Category</h3>
              <p className="text-sm text-muted-foreground mb-4">Revenue distribution</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                    {categoryData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(220, 22%, 10%)", border: "1px solid hsl(220, 20%, 16%)", borderRadius: "8px", fontSize: "12px", color: "hsl(220, 10%, 90%)" }} formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-muted-foreground">{cat.name}</span>
                    </div>
                    <span className="font-mono text-card-foreground">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Channels */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-card-foreground mb-1">Top Channels</h3>
            <p className="text-sm text-muted-foreground mb-4">Traffic sources ranked by visitors</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground text-xs border-b border-border">
                    <th className="text-left pb-3 font-medium">Channel</th>
                    <th className="text-right pb-3 font-medium">Visitors</th>
                    <th className="text-right pb-3 font-medium">Conversion</th>
                    <th className="text-right pb-3 font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topChannels.map((ch) => (
                    <tr key={ch.channel} className="border-b border-border/50 last:border-0">
                      <td className="py-3 text-card-foreground font-medium">{ch.channel}</td>
                      <td className="py-3 text-right font-mono text-muted-foreground">{ch.visitors.toLocaleString()}</td>
                      <td className="py-3 text-right font-mono text-primary">{ch.conversion}</td>
                      <td className="py-3 text-right font-mono text-card-foreground">{ch.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
