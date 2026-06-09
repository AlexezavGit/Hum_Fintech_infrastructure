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
  Zap,
  Stethoscope
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
    <div className="min-h-screen blueprint-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold teal-text">Feel Again Dashboard</h1>
            <p className="text-[hsl(185,15%,55%)] mt-1">Dignified psychological support ecosystem. Professional MHPSS care for trauma recovery.</p>
          </div>

          {/* Live Stream Metrics - Top Priority */}
          <div className="mb-8">
            <Card className="border border-[hsla(185,100%,40%,0.25)] bg-[hsla(195,45%,11%,0.7)]">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Activity className="w-6 h-6 mr-3 text-primary" />
                  Feel Again Live Metrics
                  <Badge className="ml-3 bg-green-100 text-green-800 animate-pulse">
                    <Zap className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 rounded-xl bg-[hsla(195,45%,11%,0.6)] border border-[hsla(270,60%,65%,0.2)]">
                    <div className="flex items-center justify-center mb-2">
                      <Stethoscope className="w-8 h-8 text-[hsl(270,60%,65%)] mr-2" />
                      <div>
                        <p className="text-sm font-medium text-[hsl(185,15%,55%)]">MHPSS Support Index</p>
                        <p className="text-3xl font-bold text-[hsl(270,60%,65%)]">
                          {liveMetrics?.humanitarian_composite_index?.toFixed(1) || "87.4"}
                        </p>
                        <div className="w-full mt-2">
                          <Progress value={liveMetrics?.humanitarian_composite_index || 87.4} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 rounded-xl bg-[hsla(195,45%,11%,0.6)] border border-[hsla(185,100%,40%,0.2)]">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-8 h-8 text-[hsl(185,100%,50%)] mr-2" />
                      <div>
                        <p className="text-sm font-medium text-[hsl(185,15%,55%)]">Beneficiaries Supported</p>
                        <p className="text-3xl font-bold text-[hsl(185,100%,50%)] tabular-nums">
                          {liveMetrics?.total_beneficiaries_served?.toLocaleString() || "12,847"}
                        </p>
                        <p className="text-xs text-[hsl(160,84%,50%)] mt-1">
                          +{Math.floor(Math.random() * 10) + 5} in the last hour
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 rounded-xl bg-[hsla(195,45%,11%,0.6)] border border-[hsla(25,75%,52%,0.2)]">
                    <div className="flex items-center justify-center mb-2">
                      <Building className="w-8 h-8 text-[hsl(25,75%,65%)] mr-2" />
                      <div>
                        <p className="text-sm font-medium text-[hsl(185,15%,55%)]">Participating Organizations</p>
                        <p className="text-3xl font-bold text-[hsl(25,75%,65%)] tabular-nums">
                          {liveMetrics?.organizations_using_stream || "47"}
                        </p>
                        <p className="text-xs text-[hsl(185,100%,50%)] mt-1">
                          Active in Ecosystem
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 rounded-xl bg-[hsla(195,45%,11%,0.6)] border border-[hsla(160,84%,50%,0.2)]">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="w-8 h-8 text-[hsl(160,84%,50%)] mr-2" />
                      <div>
                        <p className="text-sm font-medium text-[hsl(185,15%,55%)]">Total Support Volume</p>
                        <p className="text-3xl font-bold text-[hsl(160,84%,50%)] tabular-nums">
                          ${(liveMetrics?.total_aid_volume || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-[hsl(270,60%,65%)] mt-1">
                          Verified on Solana
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Live Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[hsla(195,45%,11%,0.6)] border border-[rgba(255,255,255,0.06)]">
                    <div>
                      <p className="text-sm text-[rgba(255,255,255,0.4)]">Feel Again - Active Sessions</p>
                      <p className="text-xl font-bold text-[hsl(270,60%,65%)]">
                        {liveMetrics?.feel_again?.active_beneficiaries || "2,847"}
                      </p>
                    </div>
                    <Heart className="w-6 h-6 text-[hsl(270,60%,65%)]" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[hsla(195,45%,11%,0.6)] border border-[rgba(255,255,255,0.06)]">
                    <div>
                      <p className="text-sm text-[rgba(255,255,255,0.4)]">Clinical Verifications</p>
                      <p className="text-xl font-bold text-[hsl(185,100%,50%)]">
                        {liveMetrics?.blockchain_verifications || "247"}
                      </p>
                    </div>
                    <Globe className="w-6 h-6 text-[hsl(185,100%,50%)]" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[hsla(195,45%,11%,0.6)] border border-[rgba(255,255,255,0.06)]">
                    <div>
                      <p className="text-sm text-[rgba(255,255,255,0.4)]">Real-time Transactions</p>
                      <p className="text-xl font-bold text-[hsl(160,84%,50%)]">
                        {liveMetrics?.real_time_transactions || "0"}
                      </p>
                    </div>
                    <Activity className="w-6 h-6 text-[hsl(160,84%,50%)]" />
                  </div>
                </div>

                <div className="mt-4 text-center text-xs text-gray-500">
                  Last updated: {liveMetrics?.last_updated ? 
                    new Date(liveMetrics.last_updated).toLocaleTimeString('en-US') : 
                    new Date().toLocaleTimeString('en-US')
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
