import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Projects from "@/pages/projects";
import Programs from "@/pages/programs";
import MonitoringControl from "@/pages/monitoring-control";
import EfficiencyIndex from "@/pages/efficiency-index";
import FeelAgainProgram from "@/pages/feel-again-program";
import Donate from "@/pages/donate";
import Transparency from "@/pages/transparency";
import Reports from "@/pages/reports";
import PortalSelect from "@/pages/portal-select";
import PortalBeneficiary from "@/pages/portal-beneficiary";
import PortalProvider from "@/pages/portal-provider";
import PortalDonor from "@/pages/portal-donor";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Portal routes — always accessible, no auth required */}
      <Route path="/portal" component={PortalSelect} />
      <Route path="/portal/beneficiary" component={PortalBeneficiary} />
      <Route path="/portal/provider" component={PortalProvider} />
      <Route path="/portal/donor" component={PortalDonor} />

      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/projects" component={Projects} />
          <Route path="/programs" component={Programs} />
          <Route path="/monitoring-control" component={MonitoringControl} />
          <Route path="/feel-again" component={FeelAgainProgram} />
          <Route path="/donate" component={Donate} />
          <Route path="/transparency" component={Transparency} />
          <Route path="/reports" component={Reports} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
