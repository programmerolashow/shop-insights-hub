import { useState } from "react";
import { Search, Download, ArrowUpRight, ArrowDownLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileHeader from "@/components/MobileHeader";

const transactions = [
  { id: "TXN-9281", type: "Sale", customer: "Sarah Chen", method: "Visa •••• 4242", amount: "+$249.99", date: "Feb 20, 2026 14:32", status: "Completed" },
  { id: "TXN-9280", type: "Sale", customer: "Marcus Johnson", method: "Mastercard •••• 8891", amount: "+$399.00", date: "Feb 20, 2026 12:15", status: "Completed" },
  { id: "TXN-9279", type: "Refund", customer: "Sophia Martinez", method: "Visa •••• 3312", amount: "-$39.99", date: "Feb 19, 2026 18:44", status: "Completed" },
  { id: "TXN-9278", type: "Sale", customer: "Emily Davis", method: "Apple Pay", amount: "+$79.50", date: "Feb 19, 2026 11:20", status: "Pending" },
  { id: "TXN-9277", type: "Sale", customer: "Alex Rivera", method: "PayPal", amount: "+$59.99", date: "Feb 19, 2026 09:05", status: "Completed" },
  { id: "TXN-9276", type: "Payout", customer: "Store Account", method: "Bank Transfer", amount: "-$12,500.00", date: "Feb 18, 2026 00:00", status: "Completed" },
  { id: "TXN-9275", type: "Sale", customer: "Olivia Park", method: "Visa •••• 5567", amount: "+$134.50", date: "Feb 18, 2026 16:30", status: "Completed" },
  { id: "TXN-9274", type: "Refund", customer: "Jordan Lee", method: "Mastercard •••• 7743", amount: "-$189.00", date: "Feb 18, 2026 10:12", status: "Processing" },
  { id: "TXN-9273", type: "Sale", customer: "Daniel Kim", method: "Google Pay", amount: "+$89.99", date: "Feb 17, 2026 15:48", status: "Completed" },
  { id: "TXN-9272", type: "Sale", customer: "Mia Thompson", method: "Visa •••• 1124", amount: "+$180.00", date: "Feb 17, 2026 13:22", status: "Completed" },
  { id: "TXN-9271", type: "Chargeback", customer: "Unknown", method: "Mastercard •••• 9901", amount: "-$249.99", date: "Feb 16, 2026 09:00", status: "Disputed" },
  { id: "TXN-9270", type: "Sale", customer: "Ethan Wright", method: "Apple Pay", amount: "+$179.99", date: "Feb 16, 2026 08:33", status: "Completed" },
];

const typeStyles: Record<string, string> = {
  Sale: "bg-success/10 text-success border-success/20",
  Refund: "bg-warning/10 text-warning border-warning/20",
  Payout: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Chargeback: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusStyles: Record<string, string> = {
  Completed: "bg-success/10 text-success border-success/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Processing: "bg-primary/10 text-primary border-primary/20",
  Disputed: "bg-destructive/10 text-destructive border-destructive/20",
};

const typeFilters = ["All", "Sale", "Refund", "Payout", "Chargeback"];

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.customer.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || t.type === activeFilter;
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
              <h1 className="text-xl font-semibold text-foreground">Transactions</h1>
              <p className="text-sm text-muted-foreground">Payment history and financial records</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <span className="text-xs text-muted-foreground">Total Sales</span>
              <div className="font-mono text-xl font-semibold text-card-foreground mt-1">$1,422.96</div>
              <span className="text-xs text-success">Today</span>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <span className="text-xs text-muted-foreground">Refunds</span>
              <div className="font-mono text-xl font-semibold text-card-foreground mt-1">$228.99</div>
              <span className="text-xs text-warning">2 this week</span>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <span className="text-xs text-muted-foreground">Payouts</span>
              <div className="font-mono text-xl font-semibold text-card-foreground mt-1">$12,500</div>
              <span className="text-xs text-muted-foreground">Last: Feb 18</span>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <span className="text-xs text-muted-foreground">Disputes</span>
              <div className="font-mono text-xl font-semibold text-destructive mt-1">1</div>
              <span className="text-xs text-destructive">Action needed</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              {typeFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeFilter === f ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm bg-card border-border" />
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground text-xs border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 font-medium">Transaction</th>
                    <th className="text-center px-5 py-3 font-medium">Type</th>
                    <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Customer</th>
                    <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Method</th>
                    <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Date</th>
                    <th className="text-right px-5 py-3 font-medium">Amount</th>
                    <th className="text-center px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((txn) => (
                    <tr key={txn.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{txn.id}</td>
                      <td className="px-5 py-3.5 text-center">
                        <Badge variant="outline" className={`text-[10px] ${typeStyles[txn.type]}`}>{txn.type}</Badge>
                      </td>
                      <td className="px-5 py-3.5 text-card-foreground hidden md:table-cell">{txn.customer}</td>
                      <td className="px-5 py-3.5 text-muted-foreground text-xs hidden lg:table-cell">{txn.method}</td>
                      <td className="px-5 py-3.5 text-muted-foreground text-xs hidden lg:table-cell">{txn.date}</td>
                      <td className="px-5 py-3.5 text-right font-mono font-medium">
                        <span className={txn.amount.startsWith("+") ? "text-success" : "text-destructive"}>
                          {txn.amount}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <Badge variant="outline" className={`text-[10px] ${statusStyles[txn.status]}`}>{txn.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Showing {filtered.length} of {transactions.length}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft className="h-3.5 w-3.5" /></Button>
                <span className="text-xs text-muted-foreground px-2">Page 1 of 1</span>
                <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
