import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
}

const StatCard = ({ title, value, change, changeType, icon: Icon }: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-glow transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
          <Icon className="h-4 w-4 text-accent-foreground" />
        </div>
      </div>
      <div className="font-mono text-2xl font-semibold text-card-foreground mb-1">{value}</div>
      <div className="flex items-center gap-1 text-xs">
        {changeType === "positive" ? (
          <TrendingUp className="h-3 w-3 text-success" />
        ) : (
          <TrendingDown className="h-3 w-3 text-destructive" />
        )}
        <span className={changeType === "positive" ? "text-success" : "text-destructive"}>
          {change}
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;
