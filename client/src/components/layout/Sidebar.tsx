import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Heart, 
  FolderOpen, 
  TrendingUp, 
  Shield, 
  FileText,
  Plus,
  Search,
  Users,
  Brain,
  Blocks,
  Calculator,
  HeartHandshake
} from "lucide-react";

const navigationItems = [
  { href: "/", label: "Огляд", icon: BarChart3 },
  { href: "/programs", label: "Програми", icon: Users },
  { href: "/feel-again", label: "Feel Again", icon: HeartHandshake },
  { href: "/projects", label: "Проекти", icon: FolderOpen },
  { href: "/ai-analytics", label: "AI Аналітика", icon: Brain },
  { href: "/blockchain-monitor", label: "Blockchain", icon: Blocks },
  { href: "/efficiency-index", label: "CIE Індекс", icon: Calculator },
  { href: "/donate", label: "Донати", icon: Heart },
  { href: "/transparency", label: "Прозорість", icon: Shield },
  { href: "/reports", label: "Звіти", icon: FileText },
];

export default function Sidebar() {
  const [location, setLocation] = useLocation();

  return (
    <aside className="w-64 bg-white shadow-sm h-screen sticky top-16 overflow-y-auto">
      <div className="p-6">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <button
                key={item.href}
                onClick={() => setLocation(item.href)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Quick Actions
          </h3>
          <Button 
            className="w-full bg-secondary hover:bg-green-700 text-white"
            onClick={() => setLocation("/create-campaign")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => setLocation("/projects")}
          >
            <Search className="mr-2 h-4 w-4" />
            Find Projects
          </Button>
        </div>
      </div>
    </aside>
  );
}
