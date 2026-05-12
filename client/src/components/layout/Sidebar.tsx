import { useLocation } from "wouter";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Zap, Shield, FileText, Plus, Search, Heart, ShieldCheck } from "lucide-react";

const navigationItems = [
  { href: "/", label: "Overview", icon: BarChart3 },
  { href: "/programs", label: "Impact Financing Hub", icon: Zap },
  { href: "/monitoring-control", label: "Monitoring & Control", icon: ShieldCheck },
  { href: "/donate", label: "Donations", icon: Heart },
  { href: "/transparency", label: "Transparency", icon: Shield },
  { href: "/reports", label: "Reports", icon: FileText },
];

export default function Sidebar() {
  const [location, setLocation] = useLocation();

  return (
    <aside className="w-56 glass-card border-r border-[hsla(185,80%,60%,0.1)] h-screen sticky top-14 overflow-y-auto flex-shrink-0">
      <div className="p-4">
        <div className="space-y-0.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <button
                key={item.href}
                onClick={() => setLocation(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all text-left ${
                  isActive
                    ? "bg-[hsla(185,100%,40%,0.15)] text-[hsl(185,100%,60%)] border border-[hsla(185,100%,40%,0.25)]"
                    : "text-[hsl(185,15%,55%)] hover:text-[hsl(185,20%,82%)] hover:bg-[hsla(185,100%,40%,0.07)]"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[hsl(185,100%,50%)]" : ""}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        <Separator className="my-4 bg-[hsla(185,30%,20%,0.5)]" />

        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-[hsl(185,15%,35%)] uppercase tracking-wider px-3">Quick Actions</p>
          <button
            onClick={() => setLocation("/portal/donor")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(43,96%,56%)] text-[hsl(195,55%,8%)] text-xs font-semibold hover:bg-[hsl(43,96%,50%)] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />Create Program
          </button>
          <button
            onClick={() => setLocation("/portal/provider")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-[hsla(185,100%,40%,0.3)] text-[hsl(185,100%,60%)] text-xs font-medium hover:bg-[hsla(185,100%,40%,0.08)] transition-colors"
          >
            <Search className="h-3.5 w-3.5" />Provider Workspace
          </button>
        </div>
      </div>
    </aside>
  );
}
