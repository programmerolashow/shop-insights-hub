import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", revenue: 4200, orders: 240 },
  { name: "Feb", revenue: 3800, orders: 210 },
  { name: "Mar", revenue: 5100, orders: 290 },
  { name: "Apr", revenue: 4600, orders: 260 },
  { name: "May", revenue: 5800, orders: 320 },
  { name: "Jun", revenue: 6200, orders: 350 },
  { name: "Jul", revenue: 5900, orders: 330 },
  { name: "Aug", revenue: 7100, orders: 390 },
  { name: "Sep", revenue: 6800, orders: 370 },
  { name: "Oct", revenue: 7500, orders: 410 },
  { name: "Nov", revenue: 8200, orders: 450 },
  { name: "Dec", revenue: 9100, orders: 500 },
];

const RevenueChart = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-card-foreground">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Monthly revenue & order trends</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-chart-2" />
            <span className="text-muted-foreground">Orders</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(162, 72%, 40%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(162, 72%, 40%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(200, 70%, 50%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(200, 70%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 16%)" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(220, 22%, 10%)",
              border: "1px solid hsl(220, 20%, 16%)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "hsl(220, 10%, 90%)",
            }}
            formatter={(value: number, name: string) =>
              name === "revenue" ? [`$${value.toLocaleString()}`, "Revenue"] : [value, "Orders"]
            }
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(162, 72%, 40%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="hsl(200, 70%, 50%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorOrders)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
