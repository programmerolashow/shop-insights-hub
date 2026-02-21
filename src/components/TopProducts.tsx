const products = [
  { name: "Wireless Headphones", sales: 1243, revenue: "$310,750", trend: "+12%" },
  { name: "Smart Watch Pro", sales: 987, revenue: "$393,213", trend: "+8%" },
  { name: "Laptop Stand", sales: 856, revenue: "$68,000", trend: "+23%" },
  { name: "Mechanical Keyboard", sales: 743, revenue: "$140,427", trend: "+5%" },
  { name: "USB-C Hub", sales: 612, revenue: "$36,659", trend: "-3%" },
];

const TopProducts = () => {
  const maxSales = Math.max(...products.map((p) => p.sales));

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-card-foreground">Top Products</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Best sellers this month</p>
        </div>
      </div>
      <div className="space-y-4">
        {products.map((product, i) => (
          <div key={product.name} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-4 font-mono">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-card-foreground font-medium truncate">{product.name}</span>
                <span className="text-xs font-mono text-muted-foreground ml-2">{product.revenue}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${(product.sales / maxSales) * 100}%` }}
                />
              </div>
            </div>
            <span
              className={`text-xs font-mono ${
                product.trend.startsWith("+") ? "text-success" : "text-destructive"
              }`}
            >
              {product.trend}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
