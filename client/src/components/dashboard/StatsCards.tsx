import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, FolderOpen, Users, Shield } from "lucide-react";

export default function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const statsData = [
    {
      title: "Total Donated",
      value: `$${stats?.totalDonated?.toLocaleString() || '0'}`,
      change: "+12% this month",
      changeType: "positive",
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-secondary",
    },
    {
      title: "Active Projects", 
      value: stats?.activeProjects?.toString() || '0',
      change: "3 new this week",
      changeType: "positive",
      icon: FolderOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-primary",
    },
    {
      title: "People Helped",
      value: stats?.peopleHelped?.toLocaleString() || '0',
      change: "+34% this month",
      changeType: "positive",
      icon: Users,
      iconBg: "bg-red-100",
      iconColor: "text-accent",
    },
    {
      title: "Transparency Score",
      value: `${stats?.transparencyScore?.toFixed(1) || '0'}%`,
      change: "Excellent rating",
      changeType: "positive",
      icon: Shield,
      iconBg: "bg-yellow-100",
      iconColor: "text-warning",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <Card key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  {isLoading ? (
                    <div className="h-8 bg-gray-300 rounded w-20 animate-pulse mt-1"></div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  )}
                  <p className={`text-sm font-medium mt-1 ${
                    stat.changeType === "positive" ? "text-secondary" : "text-accent"
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`${stat.iconColor} text-lg h-6 w-6`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
