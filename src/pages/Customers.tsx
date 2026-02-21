import { useState } from "react";
import { Search, Download, Mail, UserPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileHeader from "@/components/MobileHeader";
import { toast } from "@/hooks/use-toast";
import { exportToCsv } from "@/lib/exportCsv";

const defaultCustomers = [
  { id: 1, name: "Sarah Chen", email: "sarah@email.com", orders: 24, spent: "$4,892", joined: "Jan 12, 2025", status: "Active", avatar: "SC" },
  { id: 2, name: "Marcus Johnson", email: "marcus@email.com", orders: 18, spent: "$3,241", joined: "Mar 5, 2025", status: "Active", avatar: "MJ" },
  { id: 3, name: "Emily Davis", email: "emily@email.com", orders: 31, spent: "$6,120", joined: "Nov 22, 2024", status: "VIP", avatar: "ED" },
  { id: 4, name: "Alex Rivera", email: "alex@email.com", orders: 7, spent: "$890", joined: "Aug 14, 2025", status: "Active", avatar: "AR" },
  { id: 5, name: "Jordan Lee", email: "jordan@email.com", orders: 2, spent: "$245", joined: "Feb 1, 2026", status: "New", avatar: "JL" },
  { id: 6, name: "Olivia Park", email: "olivia@email.com", orders: 42, spent: "$8,723", joined: "Jun 3, 2024", status: "VIP", avatar: "OP" },
  { id: 7, name: "Daniel Kim", email: "daniel@email.com", orders: 0, spent: "$0", joined: "Feb 10, 2026", status: "Inactive", avatar: "DK" },
  { id: 8, name: "Mia Thompson", email: "mia@email.com", orders: 15, spent: "$2,340", joined: "Sep 28, 2025", status: "Active", avatar: "MT" },
  { id: 9, name: "Ethan Wright", email: "ethan@email.com", orders: 9, spent: "$1,567", joined: "Jul 7, 2025", status: "Active", avatar: "EW" },
  { id: 10, name: "Sophia Martinez", email: "sophia@email.com", orders: 27, spent: "$5,432", joined: "Apr 19, 2025", status: "VIP", avatar: "SM" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/20",
  VIP: "bg-primary/10 text-primary border-primary/20",
  New: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Inactive: "bg-muted text-muted-foreground border-border",
};

const filters = ["All", "Active", "VIP", "New", "Inactive"];

const Customers = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [customers, setCustomers] = useState(defaultCustomers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "" });

  const filtered = customers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || c.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      toast({ title: "Missing fields", description: "Please fill in name and email.", variant: "destructive" });
      return;
    }
    const initials = newCustomer.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    const customer = {
      id: customers.length + 1,
      name: newCustomer.name,
      email: newCustomer.email,
      orders: 0,
      spent: "$0",
      joined: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "New",
      avatar: initials,
    };
    setCustomers([customer, ...customers]);
    setNewCustomer({ name: "", email: "" });
    setDialogOpen(false);
    toast({ title: "Customer added", description: `${customer.name} has been added.` });
  };

  const handleExport = () => {
    exportToCsv("customers.csv", ["Name", "Email", "Orders", "Total Spent", "Joined", "Status"],
      filtered.map((c) => [c.name, c.email, String(c.orders), c.spent, c.joined, c.status]));
    toast({ title: "Export complete", description: `${filtered.length} customers exported to CSV.` });
  };

  return (
    <div className="min-h-screen bg-background dark">
      <DashboardSidebar />
      <main className="md:ml-60">
        <MobileHeader />
        <header className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Customers</h1>
              <p className="text-sm text-muted-foreground">{customers.length} total customers</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={handleExport}>
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
              <Button size="sm" className="gradient-primary border-0 text-primary-foreground gap-1.5" onClick={() => setDialogOpen(true)}>
                <UserPlus className="h-3.5 w-3.5" />
                Add Customer
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              {filters.map((f) => (
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
              <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm bg-card border-border" />
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground text-xs border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 font-medium">Customer</th>
                    <th className="text-center px-5 py-3 font-medium hidden sm:table-cell">Orders</th>
                    <th className="text-right px-5 py-3 font-medium">Total Spent</th>
                    <th className="text-left px-5 py-3 font-medium hidden lg:table-cell">Joined</th>
                    <th className="text-center px-5 py-3 font-medium">Status</th>
                    <th className="text-center px-5 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((customer) => (
                    <tr key={customer.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">
                            {customer.avatar}
                          </div>
                          <div>
                            <div className="text-card-foreground font-medium">{customer.name}</div>
                            <div className="text-xs text-muted-foreground">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-center font-mono text-muted-foreground hidden sm:table-cell">{customer.orders}</td>
                      <td className="px-5 py-3.5 text-right font-mono text-card-foreground">{customer.spent}</td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden lg:table-cell">{customer.joined}</td>
                      <td className="px-5 py-3.5 text-center">
                        <Badge variant="outline" className={`text-[10px] ${statusStyles[customer.status]}`}>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Mail className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Showing {filtered.length} of {customers.length}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft className="h-3.5 w-3.5" /></Button>
                <span className="text-xs text-muted-foreground px-2">Page 1 of 1</span>
                <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="customer-name">Full Name</Label>
              <Input id="customer-name" placeholder="e.g. John Doe" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-email">Email</Label>
              <Input id="customer-email" type="email" placeholder="john@email.com" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button className="gradient-primary border-0 text-primary-foreground" onClick={handleAddCustomer}>Add Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
