import { useState } from "react";
import { Search, Filter, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { exportToCsv } from "@/lib/exportCsv";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileHeader from "@/components/MobileHeader";

const allOrders = [
  { id: "#ORD-7291", customer: "Sarah Chen", email: "sarah@email.com", product: "Wireless Headphones", amount: "$249.99", status: "Delivered", date: "Feb 20, 2026", items: 2 },
  { id: "#ORD-7290", customer: "Marcus Johnson", email: "marcus@email.com", product: "Smart Watch Pro", amount: "$399.00", status: "Shipped", date: "Feb 20, 2026", items: 1 },
  { id: "#ORD-7289", customer: "Emily Davis", email: "emily@email.com", product: "Laptop Stand", amount: "$79.50", status: "Processing", date: "Feb 19, 2026", items: 3 },
  { id: "#ORD-7288", customer: "Alex Rivera", email: "alex@email.com", product: "USB-C Hub", amount: "$59.99", status: "Delivered", date: "Feb 19, 2026", items: 1 },
  { id: "#ORD-7287", customer: "Jordan Lee", email: "jordan@email.com", product: "Mechanical Keyboard", amount: "$189.00", status: "Cancelled", date: "Feb 18, 2026", items: 1 },
  { id: "#ORD-7286", customer: "Olivia Park", email: "olivia@email.com", product: "Monitor Arm", amount: "$134.50", status: "Delivered", date: "Feb 18, 2026", items: 2 },
  { id: "#ORD-7285", customer: "Daniel Kim", email: "daniel@email.com", product: "Webcam HD", amount: "$89.99", status: "Shipped", date: "Feb 17, 2026", items: 1 },
  { id: "#ORD-7284", customer: "Mia Thompson", email: "mia@email.com", product: "Desk Mat XL", amount: "$45.00", status: "Processing", date: "Feb 17, 2026", items: 4 },
  { id: "#ORD-7283", customer: "Ethan Wright", email: "ethan@email.com", product: "Noise Cancelling Buds", amount: "$179.99", status: "Delivered", date: "Feb 16, 2026", items: 1 },
  { id: "#ORD-7282", customer: "Sophia Martinez", email: "sophia@email.com", product: "Portable Charger", amount: "$39.99", status: "Refunded", date: "Feb 16, 2026", items: 2 },
  { id: "#ORD-7281", customer: "Liam Anderson", email: "liam@email.com", product: "Bluetooth Speaker", amount: "$129.00", status: "Delivered", date: "Feb 15, 2026", items: 1 },
  { id: "#ORD-7280", customer: "Ava Wilson", email: "ava@email.com", product: "Tablet Stand", amount: "$34.99", status: "Shipped", date: "Feb 15, 2026", items: 1 },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-success/10 text-success border-success/20",
  Shipped: "bg-primary/10 text-primary border-primary/20",
  Processing: "bg-warning/10 text-warning border-warning/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  Refunded: "bg-muted text-muted-foreground border-border",
};

const statusFilters = ["All", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"];

const Orders = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = allOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || order.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background dark">
      <DashboardSidebar />
      <main className="md:ml-60">
        <MobileHeader />
        <header className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Orders</h1>
              <p className="text-sm text-muted-foreground">Manage and track all customer orders</p>
            </div>
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground gap-1.5" onClick={() => {
              exportToCsv("orders.csv", ["Order", "Customer", "Email", "Product", "Items", "Amount", "Status", "Date"],
                filtered.map((o) => [o.id, o.customer, o.email, o.product, String(o.items), o.amount, o.status, o.date]));
              toast({ title: "Export complete", description: `${filtered.length} orders exported to CSV.` });
            }}>
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm bg-card border-border"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground text-xs border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 font-medium">Order</th>
                    <th className="text-left px-5 py-3 font-medium">Customer</th>
                    <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Product</th>
                    <th className="text-center px-5 py-3 font-medium hidden sm:table-cell">Items</th>
                    <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Date</th>
                    <th className="text-right px-5 py-3 font-medium">Amount</th>
                    <th className="text-center px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{order.id}</td>
                      <td className="px-5 py-3.5">
                        <div>
                          <div className="text-card-foreground font-medium">{order.customer}</div>
                          <div className="text-xs text-muted-foreground">{order.email}</div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">{order.product}</td>
                      <td className="px-5 py-3.5 text-center text-muted-foreground hidden sm:table-cell font-mono">{order.items}</td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden lg:table-cell">{order.date}</td>
                      <td className="px-5 py-3.5 text-right font-mono text-card-foreground">{order.amount}</td>
                      <td className="px-5 py-3.5 text-center">
                        <Badge variant="outline" className={`text-[10px] ${statusStyles[order.status]}`}>
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">
                        No orders found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Showing {filtered.length} of {allOrders.length} orders
              </span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <span className="text-xs text-muted-foreground px-2">Page 1 of 1</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;
