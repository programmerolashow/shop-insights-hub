import { useState } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart3, CreditCard, Settings } from "lucide-react";

const navItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Products", url: "/products", icon: Package },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Transactions", url: "/transactions", icon: CreditCard },
  { title: "Settings", url: "/settings", icon: Settings },
];

const MobileHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center">
            <TrendingUp className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">Storefront</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-foreground p-1">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
          <nav className="fixed top-0 left-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-50 p-4 space-y-1">
            <div className="flex items-center gap-2.5 px-3 py-3 mb-4 border-b border-sidebar-border">
              <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center">
                <TrendingUp className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sidebar-accent-foreground font-semibold">Storefront</span>
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                end={item.url === "/"}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                onClick={() => setOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </>
      )}
    </div>
  );
};

export default MobileHeader;
