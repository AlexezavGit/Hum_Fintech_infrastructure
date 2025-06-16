import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import ActiveProjects from "@/components/dashboard/ActiveProjects";
import QuickDonate from "@/components/dashboard/QuickDonate";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TransparencyMetrics from "@/components/dashboard/TransparencyMetrics";
import FinancialDashboard from "@/components/dashboard/FinancialDashboard";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

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
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with humanitarian aid distribution.</p>
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
