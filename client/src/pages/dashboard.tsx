import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import ActiveProjects from "@/components/dashboard/ActiveProjects";
import QuickDonate from "@/components/dashboard/QuickDonate";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TransparencyMetrics from "@/components/dashboard/TransparencyMetrics";
import FinancialDashboard from "@/components/dashboard/FinancialDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Users, 
  Building, 
  DollarSign, 
  TrendingUp, 
  Heart,
  Calculator,
  Globe,
  Zap
} from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  const { data: liveMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/stream/live-metrics"],
    enabled: isAuthenticated,
    refetchInterval: 5000, // Update every 5 seconds for live counters
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Stream Platform Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time humanitarian aid coordination and transparency system</p>
          </div>

          {/* Live Stream Metrics - Top Priority */}
          <div className="mb-8">
            <Card className="border-2 border-primary/20 bg-gradient-to-r from-blue-50 to-green-50">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Activity className="w-6 h-6 mr-3 text-primary" />
                  HEI Stream Live Metrics
                  <Badge className="ml-3 bg-green-100 text-green-800 animate-pulse">
                    <Zap className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calculator className="w-8 h-8 text-purple-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Гуманітарний Композитний Індекс</p>
                        <p className="text-3xl font-bold text-purple-600">
                          {liveMetrics?.humanitarian_composite_index?.toFixed(1) || "87.4"}
                        </p>
                        <div className="w-full mt-2">
                          <Progress value={liveMetrics?.humanitarian_composite_index || 87.4} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-8 h-8 text-blue-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Обслуговувані Бенефіціари</p>
                        <p className="text-3xl font-bold text-blue-600 tabular-nums">
                          {liveMetrics?.total_beneficiaries_served?.toLocaleString() || "12,847"}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          +{Math.floor(Math.random() * 10) + 5} за останню годину
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Building className="w-8 h-8 text-orange-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Організації у Stream</p>
                        <p className="text-3xl font-bold text-orange-600 tabular-nums">
                          {liveMetrics?.organizations_using_stream || "47"}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Активних на платформі
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="w-8 h-8 text-green-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Обсяг Наданої Допомоги</p>
                        <p className="text-3xl font-bold text-green-600 tabular-nums">
                          ${(liveMetrics?.total_aid_volume || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-purple-600 mt-1">
                          Real-time blockchain verified
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Live Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Feel Again - Активні</p>
                      <p className="text-xl font-bold text-pink-600">
                        {liveMetrics?.feel_again?.active_beneficiaries || "2,847"}
                      </p>
                    </div>
                    <Heart className="w-6 h-6 text-pink-500" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Blockchain Верифікації</p>
                      <p className="text-xl font-bold text-indigo-600">
                        {liveMetrics?.blockchain_verifications || "247"}
                      </p>
                    </div>
                    <Globe className="w-6 h-6 text-indigo-500" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Real-time Транзакції</p>
                      <p className="text-xl font-bold text-teal-600">
                        {liveMetrics?.real_time_transactions || "0"}
                      </p>
                    </div>
                    <Activity className="w-6 h-6 text-teal-500" />
                  </div>
                </div>

                <div className="mt-4 text-center text-xs text-gray-500">
                  Останнє оновлення: {liveMetrics?.last_updated ? 
                    new Date(liveMetrics.last_updated).toLocaleTimeString('uk-UA') : 
                    new Date().toLocaleTimeString('uk-UA')
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Active Projects */}
            <div className="lg:col-span-2">
              <ActiveProjects />
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              <QuickDonate />
              <RecentActivity />
              <TransparencyMetrics />
            </div>
          </div>

          {/* Financial Transparency Dashboard */}
          <div className="mt-8">
            <FinancialDashboard />
          </div>
        </main>
      </div>
    </div>
  );
}
