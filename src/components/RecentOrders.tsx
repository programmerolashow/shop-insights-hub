import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "#ORD-7291", customer: "Sarah Chen", product: "Wireless Headphones", amount: "$249.99", status: "Delivered", date: "Feb 20" },
  { id: "#ORD-7290", customer: "Marcus Johnson", product: "Smart Watch Pro", amount: "$399.00", status: "Shipped", date: "Feb 20" },
  { id: "#ORD-7289", customer: "Emily Davis", product: "Laptop Stand", amount: "$79.50", status: "Processing", date: "Feb 19" },
  { id: "#ORD-7288", customer: "Alex Rivera", product: "USB-C Hub", amount: "$59.99", status: "Delivered", date: "Feb 19" },
  { id: "#ORD-7287", customer: "Jordan Lee", product: "Mechanical Keyboard", amount: "$189.00", status: "Cancelled", date: "Feb 18" },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-success/10 text-success border-success/20",
  Shipped: "bg-primary/10 text-primary border-primary/20",
  Processing: "bg-warning/10 text-warning border-warning/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const RecentOrders = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-card-foreground">Recent Orders</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Latest customer transactions</p>
        </div>
        <button className="text-xs text-primary hover:underline">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs border-b border-border">
              <th className="text-left pb-3 font-medium">Order</th>
              <th className="text-left pb-3 font-medium">Customer</th>
              <th className="text-left pb-3 font-medium hidden sm:table-cell">Product</th>
              <th className="text-right pb-3 font-medium">Amount</th>
              <th className="text-center pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="py-3 font-mono text-xs text-muted-foreground">{order.id}</td>
                <td className="py-3 text-card-foreground font-medium">{order.customer}</td>
                <td className="py-3 text-muted-foreground hidden sm:table-cell">{order.product}</td>
                <td className="py-3 text-right font-mono text-card-foreground">{order.amount}</td>
                <td className="py-3 text-center">
                  <Badge variant="outline" className={`text-[10px] ${statusStyles[order.status]}`}>
                    {order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
