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
import AIAnalytics from "@/pages/ai-analytics";
import BlockchainMonitor from "@/pages/blockchain-monitor";
import Donate from "@/pages/donate";
import Transparency from "@/pages/transparency";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/projects" component={Projects} />
          <Route path="/programs" component={Programs} />
          <Route path="/ai-analytics" component={AIAnalytics} />
          <Route path="/blockchain-monitor" component={BlockchainMonitor} />
          <Route path="/donate" component={Donate} />
          <Route path="/transparency" component={Transparency} />
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
