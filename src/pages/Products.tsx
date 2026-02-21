import { useState } from "react";
import { Search, Plus, Package, Star, Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardSidebar from "@/components/DashboardSidebar";
import MobileHeader from "@/components/MobileHeader";
import { toast } from "@/hooks/use-toast";

import imgHeadphones from "@/assets/products/headphones.jpg";
import imgSmartwatch from "@/assets/products/smartwatch.jpg";
import imgLaptopStand from "@/assets/products/laptop-stand.jpg";
import imgKeyboard from "@/assets/products/keyboard.jpg";
import imgUsbHub from "@/assets/products/usb-hub.jpg";
import imgEarbuds from "@/assets/products/earbuds.jpg";
import imgWebcam from "@/assets/products/webcam.jpg";
import imgSsd from "@/assets/products/ssd.jpg";
import imgMonitorArm from "@/assets/products/monitor-arm.jpg";
import imgSpeaker from "@/assets/products/speaker.jpg";
import imgDeskmat from "@/assets/products/deskmat.jpg";
import imgCharger from "@/assets/products/charger.jpg";

const categories = ["All", "Electronics", "Accessories", "Audio", "Peripherals", "Storage"];

const defaultProducts = [
  { id: 1, name: "Wireless Headphones", category: "Audio", price: "$249.99", stock: 142, sold: 1243, rating: 4.8, status: "Active", image: imgHeadphones },
  { id: 2, name: "Smart Watch Pro", category: "Electronics", price: "$399.00", stock: 58, sold: 987, rating: 4.6, status: "Active", image: imgSmartwatch },
  { id: 3, name: "Laptop Stand", category: "Accessories", price: "$79.50", stock: 230, sold: 856, rating: 4.9, status: "Active", image: imgLaptopStand },
  { id: 4, name: "Mechanical Keyboard", category: "Peripherals", price: "$189.00", stock: 87, sold: 743, rating: 4.7, status: "Active", image: imgKeyboard },
  { id: 5, name: "USB-C Hub", category: "Accessories", price: "$59.99", stock: 312, sold: 612, rating: 4.5, status: "Active", image: imgUsbHub },
  { id: 6, name: "Noise Cancelling Buds", category: "Audio", price: "$179.99", stock: 0, sold: 534, rating: 4.4, status: "Out of Stock", image: imgEarbuds },
  { id: 7, name: "Webcam HD", category: "Electronics", price: "$89.99", stock: 165, sold: 421, rating: 4.3, status: "Active", image: imgWebcam },
  { id: 8, name: "Portable SSD 1TB", category: "Storage", price: "$119.00", stock: 94, sold: 389, rating: 4.7, status: "Active", image: imgSsd },
  { id: 9, name: "Monitor Arm", category: "Accessories", price: "$134.50", stock: 12, sold: 298, rating: 4.6, status: "Low Stock", image: imgMonitorArm },
  { id: 10, name: "Bluetooth Speaker", category: "Audio", price: "$129.00", stock: 201, sold: 267, rating: 4.2, status: "Active", image: imgSpeaker },
  { id: 11, name: "Desk Mat XL", category: "Accessories", price: "$45.00", stock: 0, sold: 198, rating: 4.1, status: "Out of Stock", image: imgDeskmat },
  { id: 12, name: "Portable Charger", category: "Electronics", price: "$39.99", stock: 445, sold: 156, rating: 4.0, status: "Active", image: imgCharger },
];

const statusStyles: Record<string, string> = {
  Active: "bg-success/10 text-success border-success/20",
  "Low Stock": "bg-warning/10 text-warning border-warning/20",
  "Out of Stock": "bg-destructive/10 text-destructive border-destructive/20",
};

const Products = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState(defaultProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", stock: "" });

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({ title: "Missing fields", description: "Please fill in name, category, and price.", variant: "destructive" });
      return;
    }
    const stockNum = parseInt(newProduct.stock) || 0;
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: `$${parseFloat(newProduct.price).toFixed(2)}`,
      stock: stockNum,
      sold: 0,
      rating: 0,
      status: stockNum === 0 ? "Out of Stock" : "Active",
      image: imgCharger, // default placeholder
    };
    setProducts([product, ...products]);
    setNewProduct({ name: "", category: "", price: "", stock: "" });
    setDialogOpen(false);
    toast({ title: "Product added", description: `${product.name} has been added to your catalog.` });
  };

  return (
    <div className="min-h-screen bg-background dark">
      <DashboardSidebar />
      <main className="md:ml-60">
        <MobileHeader />
        <header className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Products</h1>
              <p className="text-sm text-muted-foreground">{products.length} products in your catalog</p>
            </div>
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground gap-1.5" onClick={() => setDialogOpen(true)}>
              <Plus className="h-3.5 w-3.5" />
              Add Product
            </Button>
          </div>
        </header>

        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm bg-card border-border" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <div key={product.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-glow transition-all duration-300 group">
                <div className="relative h-40 bg-muted overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className={`text-[10px] backdrop-blur-sm ${statusStyles[product.status] || ""}`}>
                      {product.status}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-card-foreground mb-1 truncate">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{product.category}</p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-lg font-semibold text-card-foreground">{product.price}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 text-warning fill-warning" />
                      {product.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
                    <span>{product.stock} in stock</span>
                    <span>{product.sold} sold</span>
                  </div>

                  <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input id="product-name" placeholder="e.g. Wireless Mouse" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={newProduct.category} onValueChange={(v) => setNewProduct({ ...newProduct, category: v })}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.filter((c) => c !== "All").map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-price">Price ($)</Label>
                <Input id="product-price" type="number" placeholder="0.00" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-stock">Stock</Label>
                <Input id="product-stock" type="number" placeholder="0" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button className="gradient-primary border-0 text-primary-foreground" onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
